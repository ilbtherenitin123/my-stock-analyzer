import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

const phaseDescriptions = [
  {
    phase: "Base",
    description: "Stock consolidating, building support levels",
    color: "bg-muted text-muted-foreground",
    characteristics: ["Sideways movement", "Lower volume", "Range-bound"]
  },
  {
    phase: "Breakout", 
    description: "Stock breaking above resistance with volume",
    color: "bg-success text-success-foreground shadow-success",
    characteristics: ["Price > resistance", "High volume", "Strong momentum"]
  },
  {
    phase: "Breakout+Retest",
    description: "Testing previous resistance as new support",
    color: "bg-warning text-warning-foreground",
    characteristics: ["Pullback to support", "Lower volume", "Above EMA20"]
  },
  {
    phase: "Post-Breakout",
    description: "Continued movement after successful breakout",
    color: "bg-primary text-primary-foreground",
    characteristics: ["Extended move", "Momentum signals", "Higher highs"]
  }
];

export function TradingPhases() {
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          Trading Phase Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {phaseDescriptions.map((item) => (
          <div key={item.phase} className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge className={item.color}>
                {item.phase}
              </Badge>
              <span className="font-medium">{item.description}</span>
            </div>
            <div className="flex flex-wrap gap-2 ml-2">
              {item.characteristics.map((char, index) => (
                <span key={index} className="text-xs bg-muted/50 px-2 py-1 rounded font-mono">
                  {char}
                </span>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}