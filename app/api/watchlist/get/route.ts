import dbConnect from "@/lib/mongodb";
import { Watchlist } from "@/models/Watchlist";

export async function GET(req: Request) {
  await dbConnect();

  const userId = req.headers.get("x-user-id");

  if (!userId) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const watchlist = await Watchlist.aggregate([
    { $match: { userId } },
    { $sort: { createdAt: -1 } },
  ]);

  return Response.json({
    success: true,
    data: watchlist,
  });
}
