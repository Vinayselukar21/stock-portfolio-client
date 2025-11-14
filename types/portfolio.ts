export interface Stock {
  id: string;
  company: string; // stock name
  purchasePrice: number; // purchase price
  quantity: number; // quantity
  investment: number; // purchase price * quantity
  portfolioPercentage: number; // proportional weight
  exchange: string; // stock exchange NSE/BSE
  cmp: number; // current market price - yahoo finance
  presentValue: number; // cmp * quantity
  gainLoss: number; // present value - investment
  gainLossPercentage: number;
  peRatio: number; // P/E Ratio - google finance
  latestEarnings: string; // day change or earnings per share
  sector: string; // stock sector
}

export interface SectorSummary {
  sector: string; // stock sector
  totalInvestment: number;  // purchase price * quantity
  totalPresentValue: number; // cpm * quantity
  totalGainLoss: number; // totalPresentValue - totalInvestment
  gainLossPercentage: number;
  sectorWeightPercentage: number
  stocks: Stock[];
}

export interface PortfolioSummary {
  totalInvestment: number; // add (purchase price * quantity ) for all stocks in protfolio
  totalPresentValue: number; // add (cpm * quantity ) for all stocks in protfolio
  totalGainLoss: number; // add (cpm * quantity ) - (purchase price * quantity ) for all stocks in protfolio
  gainLossPercentage: number;
}
