"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Smarter Stock Insights
          <span className="block text-primary">Powered by AI</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-muted-foreground text-lg">
          Track stocks, analyze real-time market news, and get AI-generated
          insights to understand risks and opportunities — all in one place.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" onClick={() => router.push("/register")}>
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </section>
  );
}
