"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Stock } from "@/types/portfolio"

interface StockCardMobileProps {
    stock: Stock
    formatCurrency: (value: number) => string
}

interface Props {
    label: string
    value: string
}
  
function Item({ label, value }: Props) {
    return (
        <div className="bg-secondary/30 rounded-md px-2 py-1.5">
            <div className="text-xs text-muted-foreground font-light mb-0.5">{label}</div>
            <div className="font-semibold text-xs text-foreground">{value}</div>
        </div>
    )
}

export default function StockCardMobile({ stock, formatCurrency }: StockCardMobileProps) {
    const isProfit = stock.gainLoss >= 0

    return (
        <Card className="border-border hover:border-primary/20 transition-colors overflow-hidden">
            <CardContent className="p-3">
                {/* Header with company name and badge */}
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                        <h3 className="font-semibold text-sm text-foreground">{stock.company}</h3>
                        <Badge variant="outline" className="mt-0.5 text-xs h-5">
                            {stock.exchange}
                        </Badge>
                    </div>
                    <div className="text-right">
                        <div
                            className={`font-semibold text-sm ${isProfit ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                                }`}
                        >
                            {formatCurrency(stock.gainLoss)}
                        </div>
                        <div
                            className={`text-xs font-light ${isProfit ? "text-green-600/70 dark:text-green-400/70" : "text-red-600/70 dark:text-red-400/70"
                                }`}
                        >
                            {isProfit ? "+" : ""}
                            {stock.gainLossPercentage.toFixed(2)}%
                        </div>
                    </div>
                </div>

                {/* Key metrics grid */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <Item label="Quantity" value={stock.quantity.toString()} />
                    <Item label="Current Price" value={formatCurrency(stock.cmp)} />
                    <Item label="Purchase Price" value={formatCurrency(stock.purchasePrice)} />
                    <Item label="P/E Ratio" value={stock.peRatio ? stock.peRatio.toFixed(1) : "-"} />
                </div>

                {/* Investment details */}
                <div className="border-t border-border pt-2 mb-2">
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                            <div className="text-xs text-muted-foreground font-light mb-0.5">Investment</div>
                            <div className="font-semibold text-xs">{formatCurrency(stock.investment)}</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground font-light mb-0.5">Current Value</div>
                            <div className="font-semibold text-xs">{formatCurrency(stock.presentValue)}</div>
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground font-light mb-0.5">Portfolio %</div>
                            <div className="font-semibold text-xs">{stock.portfolioPercentage.toFixed(1)}%</div>
                        </div>
                    </div>
                </div>

                {/* Earnings info */}
                <div className="bg-secondary/50 rounded-md px-2 py-1.5 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Latest Earnings</span>
                    <span className="text-xs font-medium text-foreground">{stock.latestEarnings}</span>
                </div>
            </CardContent>
        </Card>
    )
}
