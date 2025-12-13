import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    
    if (!username) {
      return Response.json(
        { success: false, message: "Username is required" },
        { status: 400 }
      );
    }

    const existingVerifiedUser = await User.findOne({
      username,
      isVerified: true
    });

    if (existingVerifiedUser) {
      return Response.json(
        { success: false, message: "Username already exists" },
        { status: 400 }
      );
    }

    return Response.json(
      { success: true, message: "Username available" },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR checking the username", error);
    return Response.json(
      { success: false, message: "ERROR checking username" },
      { status: 500 }
    );
  }
}
