"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Making Sense of the Market
        </h2>
        <p className="mt-4 max-w-xl mx-auto opacity-90">
          No trading calls. No hype. Just clear insights backed by data and AI.
        </p>

        <div className="mt-8">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => router.push("/register")}
          >
            Create Free Account
          </Button>
        </div>
      </div>
    </section>
  );
}
