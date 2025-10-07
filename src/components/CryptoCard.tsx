import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CryptoCardProps {
  name: string;
  symbol: string;
  price: string;
  change: number;
  icon: string;
}

export const CryptoCard = ({ name, symbol, price, change, icon }: CryptoCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card className="gradient-card border-primary/20 p-6 hover:border-accent/50 transition-all duration-300 hover:glow-primary">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-muted-foreground text-sm">{symbol}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-accent' : 'text-destructive'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="font-semibold">{isPositive ? '+' : ''}{change}%</span>
        </div>
      </div>
      <div className="text-2xl font-bold">{price}</div>
    </Card>
  );
};
