import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { username, email, password }: RegisterBody = await req.json();

    if (!username || !email || !password) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashed });

    return Response.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Registration failed" },
      { status: 500 }
    );
  }
}
