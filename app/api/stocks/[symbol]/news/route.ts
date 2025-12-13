export async function GET(
  req: Request,
  context: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await context.params;

  const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return Response.json({
    success: true,
    message: "News fetched",
    data: data.feed || [],
  });
}
