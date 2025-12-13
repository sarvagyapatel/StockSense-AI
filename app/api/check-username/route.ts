import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return Response.json(
      { success: false, message: "Username required" },
      { status: 400 }
    );
  }

  const exists = await User.findOne({ username, isVerified: true });

  if (exists) {
    return Response.json(
      { success: false, message: "Username not available" },
      { status: 409 }
    );
  }

  return Response.json(
    { success: true, message: "Username available" },
    { status: 200 }
  );
}
