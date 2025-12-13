import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body: LoginBody = await request.json();
    const { email, password } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user._id.toString(),
      username: user.username
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful"
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`
        }
      }
    );
  } catch (error) {
    console.error("Login error", error);
    return Response.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    );
  }
}
