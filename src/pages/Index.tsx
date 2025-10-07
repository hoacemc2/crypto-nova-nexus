import { Hero } from "@/components/Hero";
import { CryptoList } from "@/components/CryptoList";
import { Features } from "@/components/Features";
import { CallToAction } from "@/components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CryptoList />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Index;
