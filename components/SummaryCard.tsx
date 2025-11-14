import { Card, CardContent } from "@/components/ui/card";
import { PortfolioSummary } from "@/types/portfolio";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SummaryCardsProps {
    summary: PortfolioSummary;
}

export const SummaryCards = ({ summary }: SummaryCardsProps) => {
    const isProfit = summary.totalGainLoss >= 0;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const cards = [
        {
            label: "Total Investment",
            value: formatCurrency(summary.totalInvestment),
            subtitle: "Initial capital",
            delay: 0.1,
        },
        {
            label: "Present Value",
            value: formatCurrency(summary.totalPresentValue),
            subtitle: "Current portfolio",
            delay: 0.2,
        },
        {
            label: "Total Gain/Loss",
            value: formatCurrency(summary.totalGainLoss),
            subtitle: "Absolute change",
            isColored: true,
            delay: 0.3,
        },
        {
            label: "Return",
            value: `${isProfit ? "+" : ""}${summary.gainLossPercentage.toFixed(2)}%`,
            subtitle: "Percentage return",
            isColored: true,
            delay: 0.4,
        },
    ];

    return (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mb-4">
            {cards.map((card, index) => (
                <div key={card.label}>
                    <Card className="border-border hover:border-primary/20 transition-colors overflow-hidden p-0">
                        <CardContent className="p-4 lg:p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                                    {card.label}
                                </div>
                                {card.isColored && (
                                    <div>
                                        {isProfit ? (
                                            <TrendingUp className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <TrendingDown className="h-4 w-4 text-red-500" />
                                        )}
                                    </div>

                                )}
                            </div>
                            <div className={`md:2xl lg:text-3xl font-light mb-1 ${card.isColored
                                ? isProfit
                                    ? "text-green-500"
                                    : "text-red-500"
                                : "text-muted-foreground"
                                }`}>
                                {card.value}
                            </div>
                            <div className="text-xs text-muted-foreground font-light">
                                {card.subtitle}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    );
};
