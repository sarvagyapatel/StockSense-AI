export async function GET(req: Request) {
    console.log("API Key:", process.env.ALPHAVANTAGE_API_KEY);
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return Response.json(
      { success: false, message: "Query required" },
      { status: 400 }
    );
  }

  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return Response.json({
    success: true,
    message: "Search results fetched",
    data: data.bestMatches || [],
  });
}
