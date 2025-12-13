import dbConnect from "@/lib/mongodb";
import { Watchlist } from "@/models/Watchlist";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ symbol: string }> }
) {
  await dbConnect();

  const userId = req.headers.get("x-user-id");
  const { symbol } = await context.params;

  if (!userId) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const result = await Watchlist.deleteOne({
    userId,
    symbol,
  });

  if (result.deletedCount === 0) {
    return Response.json(
      { success: false, message: "Stock not found in watchlist" },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    message: "Removed from watchlist",
  });
}
