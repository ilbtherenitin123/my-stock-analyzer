import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown, AlertCircle, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import tradingHero from "@/assets/trading-hero.jpg";

// Mock data and analysis logic
const mockAnalysis = (ticker: string) => {
  const verdicts = ['Green', 'Orange', 'Red'] as const;
  const phases = ['Base', 'Breakout', 'Breakout+Retest', 'Post-Breakout'] as const;
  
  // Simple hash function for consistent results per ticker
  const hash = ticker.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  
  const verdict = verdicts[hash % 3];
  const phase = phases[hash % 4];
  
  const reasons = [
    'EMA20>EMA50 ↑',
    'MACD > signal ↑',
    `RSI ${45 + (hash % 25)} ok`,
    `Accum−Dist = +${1 + (hash % 5)}`,
    'OBV ↑10d',
    'A/D ↑10d',
    'Donchian breakout',
    `Breakout on ${(1.2 + (hash % 20) / 10).toFixed(1)}× vol`
  ].slice(0, 4 + (hash % 4));

  const metrics = {
    ema20: 145.67 + (hash % 50),
    ema50: 142.33 + (hash % 40),
    rsi14: 45 + (hash % 35),
    macd: (hash % 10) / 10,
    macdSignal: (hash % 8) / 10,
    avgVol20: 1000000 + (hash % 500000),
    volToday: 1200000 + (hash % 800000),
    upper20: 150.25 + (hash % 30),
    lower20: 135.75 + (hash % 20),
    resistance50: 148.90 + (hash % 25),
    obvSlope10: -500000 + (hash % 1000000),
    adSlope10: -100000 + (hash % 200000),
    mfi14: 35 + (hash % 45),
    accumDays20: hash % 8,
    distDays20: hash % 6,
    accumMinusDist: (hash % 8) - (hash % 6)
  };

  return { verdict, phase, reasons, metrics };
};

interface AnalysisResult {
  verdict: 'Green' | 'Orange' | 'Red';
  phase: string;
  reasons: string[];
  metrics: any;
}

export function StockAnalyzer() {
  const [ticker, setTicker] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!ticker.trim()) {
      toast({
        title: "Enter a ticker symbol",
        description: "Please enter a valid stock ticker to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = mockAnalysis(ticker.toUpperCase());
      setAnalysis(result);
      setIsLoading(false);
      toast({
        title: "Analysis Complete",
        description: `${ticker.toUpperCase()} analysis ready with ${result.verdict} verdict.`,
      });
    }, 1500);
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Green': return 'success';
      case 'Orange': return 'warning';
      case 'Red': return 'danger';
      default: return 'secondary';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'Green': return <TrendingUp className="w-4 h-4" />;
      case 'Red': return <TrendingDown className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Stock Technical Analyzer
        </h1>
        <p className="text-muted-foreground text-lg">
          Advanced technical analysis with real-time verdicts and phase detection
        </p>
      </div>

      {/* Input Section */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Analyze Stock
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter ticker symbol (e.g., AAPL, GOOGL, TSLA)"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              className="text-lg"
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <Button 
              onClick={handleAnalyze} 
              disabled={isLoading}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              size="lg"
            >
              {isLoading ? (
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Activity className="w-4 h-4" />
              )}
              {isLoading ? 'Analyzing...' : 'Analyze'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Verdict Card */}
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Analysis Verdict</span>
                <Badge 
                  variant="secondary" 
                  className={`
                    ${analysis.verdict === 'Green' ? 'bg-success text-success-foreground shadow-success' : ''}
                    ${analysis.verdict === 'Orange' ? 'bg-warning text-warning-foreground' : ''}
                    ${analysis.verdict === 'Red' ? 'bg-danger text-danger-foreground shadow-danger' : ''}
                  `}
                >
                  {getVerdictIcon(analysis.verdict)}
                  {analysis.verdict}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">PHASE</h4>
                <p className="text-lg font-mono">{analysis.phase}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">KEY SIGNALS</h4>
                <div className="space-y-1">
                  {analysis.reasons.map((reason, index) => (
                    <div key={index} className="text-sm font-mono bg-muted/50 px-2 py-1 rounded">
                      {reason}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Card */}
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle>Technical Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">EMA20:</span>
                  <span className="font-mono ml-2">${analysis.metrics.ema20.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">EMA50:</span>
                  <span className="font-mono ml-2">${analysis.metrics.ema50.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">RSI14:</span>
                  <span className="font-mono ml-2">{analysis.metrics.rsi14.toFixed(1)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">MFI14:</span>
                  <span className="font-mono ml-2">{analysis.metrics.mfi14.toFixed(1)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">MACD:</span>
                  <span className="font-mono ml-2">{analysis.metrics.macd.toFixed(3)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Signal:</span>
                  <span className="font-mono ml-2">{analysis.metrics.macdSignal.toFixed(3)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Vol Ratio:</span>
                  <span className="font-mono ml-2">{(analysis.metrics.volToday / analysis.metrics.avgVol20).toFixed(1)}x</span>
                </div>
                <div>
                  <span className="text-muted-foreground">A-D Net:</span>
                  <span className="font-mono ml-2">{analysis.metrics.accumMinusDist > 0 ? '+' : ''}{analysis.metrics.accumMinusDist}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}