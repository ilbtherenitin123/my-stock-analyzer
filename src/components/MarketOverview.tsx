import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const mockMarketData = [
  { symbol: "SPY", price: 445.67, change: +2.34, changePercent: +0.53, verdict: "Green" },
  { symbol: "QQQ", price: 378.91, change: +1.87, changePercent: +0.49, verdict: "Green" },
  { symbol: "IWM", price: 198.45, change: -0.76, changePercent: -0.38, verdict: "Orange" },
  { symbol: "VIX", price: 18.23, change: -1.45, changePercent: -7.37, verdict: "Green" },
];

export function MarketOverview() {
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {mockMarketData.map((item) => (
            <div key={item.symbol} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold">{item.symbol}</span>
                <Badge 
                  variant="secondary"
                  className={`
                    ${item.verdict === 'Green' ? 'bg-success text-success-foreground' : ''}
                    ${item.verdict === 'Orange' ? 'bg-warning text-warning-foreground' : ''}
                    ${item.verdict === 'Red' ? 'bg-danger text-danger-foreground' : ''}
                  `}
                >
                  {item.verdict === 'Green' ? <TrendingUp className="w-3 h-3" /> : 
                   item.verdict === 'Red' ? <TrendingDown className="w-3 h-3" /> : 
                   <Activity className="w-3 h-3" />}
                </Badge>
              </div>
              <div className="text-lg font-mono">${item.price.toFixed(2)}</div>
              <div className={`text-sm font-mono ${item.change >= 0 ? 'text-chart-green' : 'text-chart-red'}`}>
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}