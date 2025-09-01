import { StockAnalyzer } from "@/components/StockAnalyzer";
import { MarketOverview } from "@/components/MarketOverview";
import { TradingPhases } from "@/components/TradingPhases";
import tradingHero from "@/assets/trading-hero.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-background relative"
      style={{
        backgroundImage: `url(${tradingHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      <div className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        <StockAnalyzer />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MarketOverview />
          <TradingPhases />
        </div>
        
        <footer className="text-center text-muted-foreground text-sm">
          <p>Technical analysis for educational purposes. Not financial advice.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;