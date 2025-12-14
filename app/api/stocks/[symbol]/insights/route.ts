const ALPHA_VANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY!;
const GROQ_API_KEY = process.env.GROQ_API_KEY!;

export const runtime = "nodejs";

export async function POST(
  _req: Request,
  context: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await context.params;
    const upperSymbol = symbol.toUpperCase();

    if (!upperSymbol) {
      return Response.json(
        { success: false, message: "Stock symbol is required" },
        { status: 400 }
      );
    }

    const newsUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${upperSymbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const newsRes = await fetch(newsUrl, { cache: "no-store" });
    const newsData = await newsRes.json();

    if (newsData.Note) {
      return Response.json(
        {
          success: false,
          message: "Alpha Vantage rate limit exceeded",
        },
        { status: 429 }
      );
    }

    const news = (newsData.feed || []).slice(0, 6);

    if (!news.length) {
      return Response.json(
        {
          success: false,
          message: "No sufficient news data to generate insights",
        },
        { status: 404 }
      );
    }

    const prompt = `
You are a financial analysis assistant.

Stock: ${upperSymbol}

Recent News:
${news
  .map(
    (n: any, i: number) =>
      `${i + 1}. ${n.title} - ${n.summary}`
  )
  .join("\n")}

TASKS:
1. Summarize overall sentiment.
2. Identify major risks.
3. Identify potential opportunities.
4. Describe short-term vs long-term outlook.

RULES:
- DO NOT give buy/sell/hold advice.
- Be neutral and educational.
- Respond ONLY with valid JSON.
- No markdown, no explanations, no extra text.

JSON FORMAT:
{
  "sentiment": string,
  "risks": string[],
  "opportunities": string[],
  "outlook": string
}
`;
    const aiRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.4,
        }),
      }
    );

    if (!aiRes.ok) {
      const errorText = await aiRes.text();
      console.error("Groq API error:", errorText);

      return Response.json(
        {
          success: false,
          message: "Groq API request failed",
          error: errorText,
        },
        { status: 502 }
      );
    }

    const aiData = await aiRes.json();

    if (!aiData.choices || aiData.choices.length === 0) {
      console.error("Groq returned empty choices:", aiData);
      throw new Error("AI returned no choices");
    }

    const content = aiData.choices[0]?.message?.content;

    if (!content) {
      console.error("Groq returned no content:", aiData);
      throw new Error("AI did not return content");
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      console.error("Invalid JSON from AI:", content);
      return Response.json(
        {
          success: false,
          message: "AI returned invalid JSON",
          raw: content,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "AI insights generated successfully",
        data: parsed,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating AI insights:", error);

    return Response.json(
      { success: false, message: "Failed to generate AI insights" },
      { status: 500 }
    );
  }
}
