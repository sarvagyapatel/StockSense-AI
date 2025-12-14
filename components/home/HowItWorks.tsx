const steps = [
  {
    step: "01",
    title: "Create an Account",
    description:
      "Register securely and access your personalized dashboard.",
  },
  {
    step: "02",
    title: "Search & Track Stocks",
    description:
      "Find stocks, add them to your watchlist, and monitor price movements.",
  },
  {
    step: "03",
    title: "Read News & AI Insights",
    description:
      "Get summarized market news and AI-generated insights instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          How StockSense AI Works
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-lg bg-background p-6 shadow-sm"
            >
              <div className="text-primary font-bold text-xl">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
