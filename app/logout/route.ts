export async function POST() {
    console.log("Logging out user");
  return new Response(
    JSON.stringify({ success: true, message: "Logged out" }),
    {
      status: 200,
      headers: {
        "Set-Cookie": "token=; HttpOnly; Path=/; Max-Age=0"
      }
    }
  );
}
