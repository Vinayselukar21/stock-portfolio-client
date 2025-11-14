'use client';

import { useEffect, useState } from "react";
import { mockStocks } from "@/data/mockDataPortfolio";
import { Header } from "@/components/Header";
import { SectorAllocationCard } from "@/components/SectorAllocationCard";
import { SectorSummaryCard } from "@/components/SectorSummaryCard";
import { StocksTable } from "@/components/StocksTable";
import { SummaryCards } from "@/components/SummaryCard";
import { Button } from "@/components/ui/button";
import { useStocks } from "@/hooks/usePortfolioStocks";
import { PortfolioSummary, SectorSummary } from "@/types/portfolio";

export default function Home() {
  // Debug render calls
  console.log("render");

  // State for last update time, refreshing spinner, and selected sector filter
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedSector, setSelectedSector] = useState('all');

  // Fetch stocks using the custom hook (react-query)
  const fetchStocksQuery = useStocks();
  const realStocksData = fetchStocksQuery?.data?.data;

  // Sync refresh state with .isRefetching (react-query): 
  // When fetching, update state and show spinner for 1s
  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (fetchStocksQuery.isRefetching) {
      // Defer state update to avoid render cascade
      timeout = setTimeout(() => {
        setIsRefreshing(true);
        setLastUpdate(new Date());
        // Hide refreshing spinner after 1s
        setTimeout(() => setIsRefreshing(false), 1000);
      }, 0);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [fetchStocksQuery.isRefetching]);

  // Normalize stocks data for table and summary (fallback to mock data)
  const stocksData = realStocksData
    ? realStocksData.map(stock => ({
        id: stock.id,
        company: stock.name || stock.shortName,
        purchasePrice: stock.purchasePrice,
        quantity: stock.quantity,
        investment: stock.investment,
        portfolioPercentage: parseFloat(stock.portfolioPercentage),
        exchange: stock.exchange,
        cmp: stock.price,
        presentValue: stock.price * stock.quantity,
        gainLoss: (stock.price * stock.quantity) - (stock.investment),
        gainLossPercentage: 9.62, // TODO: Replace with actual calculation if available
        peRatio: parseFloat(stock.peRatio.raw),
        latestEarnings: "₹6,128 Cr (Q2 FY24)", // Placeholder, update if available
        sector: stock.sector,
      }))
    : mockStocks;

  // Utility: Group stocks by sector and compute sector stats
  const groupBySector = (): SectorSummary[] => {
    const sectorMap = new Map<string, SectorSummary>();

    stocksData.forEach((stock) => {
      if (!sectorMap.has(stock.sector)) {
        sectorMap.set(stock.sector, {
          sector: stock.sector,
          totalInvestment: 0,
          totalPresentValue: 0,
          totalGainLoss: 0,
          gainLossPercentage: 0,
          sectorWeightPercentage: 0,
          stocks: [],
        });
      }

      // Add stock to sector summary and accumulate stats
      const sector = sectorMap.get(stock.sector)!;
      sector.stocks.push(stock);
      sector.totalInvestment += stock.investment;
      sector.totalPresentValue += stock.presentValue;
      sector.totalGainLoss += stock.gainLoss;
      sector.sectorWeightPercentage += stock.portfolioPercentage;
    });

    // Compute gain/loss percentage for each sector
    sectorMap.forEach((sector) => {
      sector.gainLossPercentage =
        (sector.totalGainLoss / sector.totalInvestment) * 100;
    });

    return Array.from(sectorMap.values());
  };

  // Utility: Calculate total portfolio summary
  const calculatePortfolioSummary = (): PortfolioSummary => {
    const totalInvestment = stocksData.reduce((sum, stock) => sum + stock.investment, 0);
    const totalPresentValue = stocksData.reduce((sum, stock) => sum + stock.presentValue, 0);
    const totalGainLoss = totalPresentValue - totalInvestment;
    const gainLossPercentage = (totalGainLoss / totalInvestment) * 100;

    return {
      totalInvestment,
      totalPresentValue,
      totalGainLoss,
      gainLossPercentage,
    };
  };

  // Get sector summaries and overall portfolio stats
  const sectorSummaries = groupBySector();
  const portfolioSummary = calculatePortfolioSummary();

  // Render
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header with last update and refresh spinner */}
        <Header lastUpdate={lastUpdate} isRefreshing={isRefreshing} />

        {/* Portfolio summary cards */}
        <SummaryCards summary={portfolioSummary} />

        {/* Section title */}
        <h2 className="text-2xl font-light tracking-wide mb-4 text-foreground">
          Holdings
        </h2>

        {/* Sector selection buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant="outline"
            className={
              selectedSector === 'all'
                ? 'border-black'
                : 'text-muted-foreground border-muted'
            }
            onClick={() => setSelectedSector('all')}
          >
            All Holdings
          </Button>
          {sectorSummaries.map((sector) => (
            <Button
              key={sector.sector}
              variant="outline"
              className={
                sector.sector === selectedSector
                  ? 'border-black'
                  : 'text-muted-foreground border-muted'
              }
              onClick={() => setSelectedSector(sector.sector)}
            >
              {sector.sector}
            </Button>
          ))}
        </div>

        {/* Holdings table for all or sector-specific (with summary) */}
        {selectedSector === 'all' ? (
          <StocksTable stocks={stocksData} isRefreshing={isRefreshing} />
        ) : (
          <div>
            <SectorSummaryCard
              sectorSummary={sectorSummaries.find(
                (sector) => sector.sector === selectedSector
              )}
            />
            <StocksTable
              stocks={
                sectorSummaries.find(
                  (sector) => sector.sector === selectedSector
                )?.stocks || []
              }
              isRefreshing={isRefreshing}
            />
          </div>
        )}

        {/* Sector allocation graph/card */}
        <SectorAllocationCard sectorSummaries={sectorSummaries} />
      </div>
    </div>
  );
}

