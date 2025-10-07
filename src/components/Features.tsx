import { Shield, Zap, PiggyBank, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your assets are protected with industry-leading security measures and cold storage."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Execute trades in milliseconds with our high-performance trading engine."
  },
  {
    icon: PiggyBank,
    title: "Low Fees",
    description: "Keep more of your profits with our competitive trading fees starting at 0.1%."
  },
  {
    icon: Smartphone,
    title: "Trade Anywhere",
    description: "Access your portfolio on any device with our mobile and desktop apps."
  }
];

export const Features = () => {
  return (
    <section className="py-24 px-4">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the best cryptocurrency trading platform with features designed for your success.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="gradient-card border-primary/20 p-6 hover:border-accent/50 transition-all duration-300 hover:glow-primary"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-4 glow-primary">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
