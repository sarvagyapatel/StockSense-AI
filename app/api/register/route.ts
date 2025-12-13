import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body: RegisterBody = await request.json();
    const { username, email, password } = body;
    
    if (!username || !email || !password) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const token = signToken({
      userId: user._id.toString(),
      username: user.username
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully"
      }),
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`
        }
      }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      { success: false, message: "Error registering user" },
      { status: 500 }
    );
  }
}
