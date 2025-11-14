import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/useMobile";
import { Stock } from "@/types/portfolio";
import StockCardMobile from "./stock-card-mobile";


export const StocksTable = ({ stocks, isRefreshing }: { stocks: Stock[], isRefreshing: boolean }) => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(value);
    };

    const isMobile = useIsMobile()

    return (
        !isMobile ? <Card className="border-border hover:border-primary/20 transition-colors mb-4 overflow-hidden gap-0">
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-border">
                                <TableHead className="p-4 font-normal text-xs">Company</TableHead>
                                <TableHead className="p-4 text-right font-normal text-xs">Purchase Price</TableHead>
                                <TableHead className="p-4 text-right font-normal text-xs">Qty</TableHead>
                                <TableHead className="p-4 text-right font-normal text-xs">Investment</TableHead>
                                <TableHead className="p-4 text-right font-normal text-xs">Portfolio %</TableHead>
                                <TableHead className="p-4 text-right font-normal text-xs">CMP</TableHead>
                                <TableHead className="p-4 text-right font-normal text-xs">Present Value</TableHead>
                                <TableHead className="p-4 text-right font-normal text-xs">Gain/Loss</TableHead>
                                <TableHead className="p-4 text-right font-normal text-xs">P/E</TableHead>
                                <TableHead className="p-4 font-normal text-xs">Latest Earnings</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stocks.map((stock) => {
                                const isStockProfit = stock.gainLoss >= 0;
                                return (
                                    <TableRow key={stock.id} className="border-border hover:bg-secondary/30 transition-colors">
                                        <TableCell className="p-4 font-normal text-sm">{stock.company} • <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs font-light text-muted-foreground">
                                            {stock.exchange}
                                        </span></TableCell>
                                        <TableCell className="p-4 text-right text-sm font-light">{formatCurrency(stock.purchasePrice)}</TableCell>
                                        <TableCell className="p-4 text-right text-sm font-light">{stock.quantity}</TableCell>
                                        <TableCell className="p-4 text-right text-sm font-light">{formatCurrency(stock.investment)}</TableCell>
                                        <TableCell className="p-4 text-right text-sm font-light">{stock.portfolioPercentage.toFixed(1)}%</TableCell>
                                        <TableCell className="p-4 text-right font-normal text-sm">
                                            <div
                                                className={
                                                    `px-2 rounded transition-colors duration-300 ${
                                                        isRefreshing 
                                                            ? "bg-muted text-muted-foreground"
                                                            : "bg-transparent text-foreground"
                                                    }`
                                                }
                                            >
                                                {formatCurrency(stock.cmp)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-4 text-right font-normal text-sm">{formatCurrency(stock.presentValue)}</TableCell>
                                        <TableCell className="p-4 text-right">
                                            <div className="flex flex-col items-end gap-0.5">
                                                <span className={`font-normal text-sm ${isStockProfit ? "text-green-500" : "text-red-500"}`}>
                                                    {formatCurrency(stock.gainLoss)}
                                                </span>
                                                <span className={`text-xs font-light ${isStockProfit ? "text-green-500" : "text-red-500"}`}>
                                                    {isStockProfit ? "+" : ""}{stock.gainLossPercentage.toFixed(2)}%
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-4 text-right text-sm font-light">{stock.peRatio ? stock.peRatio.toFixed(1) : '-'}</TableCell>
                                        <TableCell className="p-4 text-sm text-muted-foreground font-light">{stock.latestEarnings}</TableCell>
                                    </TableRow>

                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
            :
            <div className="space-y-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-sm font-semibold text-foreground">All Holdings</h2>
                    <span className="text-xs text-muted-foreground">{stocks.length} stocks</span>
                </div>
                {stocks.map((stock) => (
                    <StockCardMobile key={stock.id} stock={stock} formatCurrency={formatCurrency} />
                ))}
            </div>

    );
};
