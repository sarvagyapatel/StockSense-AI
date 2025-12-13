interface AlphaVantageQuote {
  "01. symbol": string;
  "02. open": string;
  "03. high": string;
  "04. low": string;
  "05. price": string;
  "06. volume": string;
  "07. latest trading day": string;
  "08. previous close": string;
  "09. change": string;
  "10. change percent": string;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await context.params;
    const upperSymbol = symbol.toUpperCase();
    const ALPHA_BASE_URL = "https://www.alphavantage.co/query";
    const API_KEY = process.env.ALPHAVANTAGE_API_KEY!;
    const url = `${ALPHA_BASE_URL}?function=GLOBAL_QUOTE&symbol=${upperSymbol}&apikey=${API_KEY}`;
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();

    if (data.Note) {
      return Response.json(
        {
          success: false,
          message: "Alpha Vantage rate limit exceeded. Try again later.",
        },
        { status: 429 }
      );
    }

    const quote: AlphaVantageQuote | undefined = data["Global Quote"];

    if (!quote || Object.keys(quote).length === 0) {
      return Response.json(
        {
          success: false,
          message: `No quote data found for symbol ${upperSymbol}`,
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: {
        symbol: quote["01. symbol"],
        price: Number(quote["05. price"]),
        open: Number(quote["02. open"]),
        high: Number(quote["03. high"]),
        low: Number(quote["04. low"]),
        previousClose: Number(quote["08. previous close"]),
        change: Number(quote["09. change"]),
        changePercent: quote["10. change percent"],
        volume: Number(quote["06. volume"]),
        latestTradingDay: quote["07. latest trading day"],
      },
    });
  } catch (error) {
    console.error("Error fetching stock quote:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch stock quote",
      },
      { status: 500 }
    );
  }
}
