import { CryptoCard } from "./CryptoCard";

const cryptos = [
  { name: "Bitcoin", symbol: "BTC", price: "$43,250.00", change: 2.34, icon: "₿" },
  { name: "Ethereum", symbol: "ETH", price: "$2,280.50", change: 4.12, icon: "Ξ" },
  { name: "Cardano", symbol: "ADA", price: "$0.58", change: -1.23, icon: "₳" },
  { name: "Solana", symbol: "SOL", price: "$98.45", change: 5.67, icon: "◎" },
  { name: "Polkadot", symbol: "DOT", price: "$7.23", change: 1.89, icon: "●" },
  { name: "Ripple", symbol: "XRP", price: "$0.62", change: -0.45, icon: "✕" }
];

export const CryptoList = () => {
  return (
    <section className="py-24 px-4 bg-card/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Popular Cryptocurrencies
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track and trade the most popular digital assets in real-time.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cryptos.map((crypto, index) => (
            <CryptoCard key={index} {...crypto} />
          ))}
        </div>
      </div>
    </section>
  );
};
