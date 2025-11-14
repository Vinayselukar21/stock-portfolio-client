import { SectorSummary } from "@/types/portfolio";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "@/lib/formatCurrency";

export const SectorSummaryCard = ({ sectorSummary }: { sectorSummary: SectorSummary | undefined }) => {
    if (!sectorSummary) {
        return null
    }
    const isProfit = sectorSummary.totalGainLoss >= 0;
    return (
        <Card className="mb-4">
            <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 text-sm font-light">

                    <div>
                        <div className="text-xs text-muted-foreground mb-1">Sector</div>
                        <div className="font-normal">{sectorSummary.sector}</div>
                    </div>

                    <div>
                        <div className="text-xs text-muted-foreground mb-1">Sector Investment</div>
                        <div className="font-normal">{formatCurrency(sectorSummary.totalInvestment)}</div>
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground mb-1">Sector Value</div>
                        <div className="font-normal">{formatCurrency(sectorSummary.totalPresentValue)}</div>
                    </div>
                    <div className="flex items-center gap-2 ">
                        <div>
                            <div className="text-xs text-muted-foreground mb-1">Sector P&L</div>
                            <div className={`font-normal flex items-center gap-1 ${isProfit ? "text-green-500" : "text-red-500"}`}>
                                {formatCurrency(sectorSummary.totalGainLoss)}
                                {isProfit ? (
                                    <TrendingUp className="h-3.5 w-3.5" />
                                ) : (
                                    <TrendingDown className="h-3.5 w-3.5" />
                                )}
                                <span className="text-xs">
                                    ({isProfit ? "+" : ""}{sectorSummary.gainLossPercentage.toFixed(2)}%)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}