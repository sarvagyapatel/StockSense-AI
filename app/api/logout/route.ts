import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete({
    name: "token",
    path: "/",
  });

  return Response.json(
    {
      success: true,
      message: "Logged out successfully",
    },
    { status: 200 }
  );
}
