import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Stock Search & Watchlist",
    description:
      "Search global stocks and build your personal watchlist with one click.",
  },
  {
    title: "Real-Time Quotes",
    description:
      "View up-to-date prices, daily change, volume, and key trading metrics.",
  },
  {
    title: "Market News Analysis",
    description:
      "Stay updated with curated stock-specific news and sentiment signals.",
  },
  {
    title: "AI-Generated Insights",
    description:
      "Understand risks, opportunities, and outlook without financial jargon.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Analyze Stocks
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
