import { SectorSummary } from "@/types/portfolio"
import SectorDistributionPieChart from "./charts/SectorDistributionPieChart"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatCurrency"

export const SectorAllocationCard = ({ sectorSummaries }: { sectorSummaries: SectorSummary[] }) => {

    return (
        <Card className="gap-0">
            <CardHeader className="p-4 lg:p-6 pb-2 lg:pb-3">
                <CardTitle className="text-xl">
                    Sector Allocation
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 lg:p-6 flex flex-col md:flex-row">
                <SectorDistributionPieChart chartData={sectorSummaries?.map(sector => {
                    return {
                        name: sector.sector,
                        value: sector.sectorWeightPercentage
                    }
                })} />
                <div className="flex-1  p-0 md:p-6 ">
                    <Table className="w-full text-sm font-light mb-4" key="sector-allocation-table">
                        <TableHeader className="border-b">
                            <TableRow className="border-none">
                                <TableHead className="p-4 text-left font-normal text-xs text-muted-foreground">Sector</TableHead>
                                <TableHead className="p-4 text-right font-normal text-xs text-muted-foreground">Value</TableHead>
                                <TableHead className="p-4 text-right font-normal text-xs text-muted-foreground">P&amp;L</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sectorSummaries?.map((sector) => {
                                const isProfit = sector.totalGainLoss >= 0;
                                return (
                                    <TableRow key={sector.sector} className="border-b">
                                        <TableCell className="p-2 pl-0 md:p-4 font-light tracking-wide text-foreground text-xs md:text-md">
                                            <div>
                                                {sector.sector}</div>
                                            <div>
                                                Stocks: {sector?.stocks?.length}
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-2 md:p-4 text-right font-normal text-xs md:text-md">
                                            <div>
                                                {formatCurrency(sector.totalPresentValue)} </div>
                                            <div> {sector.sectorWeightPercentage}%</div>
                                        </TableCell>
                                        <TableCell className="p-2 pr-0 md:p-4 text-right text-xs md:text-md">
                                            <div className={`font-normal ${isProfit ? "text-green-500" : "text-red-500"} mr-2`}>
                                                {formatCurrency(sector.totalGainLoss)}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                ({isProfit ? "+" : ""}
                                                {sector.gainLossPercentage.toFixed(2)}%)
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}