import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="py-24 px-4">
      <div className="container">
        <div className="gradient-hero rounded-3xl p-12 md:p-16 text-center glow-primary">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Trading Today
          </h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Join millions of users who trust our platform for secure and seamless cryptocurrency trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="group">
              Create Free Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-background/10 border-foreground/20 hover:bg-background/20">
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
