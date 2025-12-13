import dbConnect from "@/lib/mongodb";
import { Watchlist } from "@/models/Watchlist";

export async function POST(req: Request) {
  await dbConnect();

  const userId = req.headers.get("x-user-id")!;
  const { symbol, name } = await req.json();

  if (!symbol || !name) {
    return Response.json(
      { success: false, message: "Symbol and name required" },
      { status: 400 }
    );
  }

  try {
    const item = await Watchlist.create({ userId, symbol, name });

    return Response.json({
      success: true,
      message: "Added to watchlist",
      data: item,
    });
  } catch {
    return Response.json(
      { success: false, message: "Already in watchlist" },
      { status: 409 }
    );
  }
}
