# Stock Portfolio Client

A modern, real-time stock portfolio management application built with Next.js, React, and TypeScript. This application provides comprehensive portfolio analytics, sector-wise allocation visualization, and real-time stock price updates with an intuitive, responsive user interface.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Key Components](#key-components)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Styling & Theming](#styling--theming)
- [Development](#development)
- [Build & Deployment](#build--deployment)

## 🎯 Overview

Stock Portfolio Client is a sophisticated web application designed for investors to monitor and analyze their stock portfolios in real-time. The application fetches live stock data from a backend API, displays comprehensive portfolio metrics, and provides detailed insights into sector-wise allocations and individual stock performance.

### Key Capabilities

- **Real-time Portfolio Tracking**: Automatically refreshes stock prices every 21 seconds
- **Comprehensive Analytics**: Total investment, present value, gain/loss calculations with percentage returns
- **Sector Analysis**: Visual and tabular representation of sector-wise portfolio distribution
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark/Light Theme**: User-friendly theme switching capability
- **Interactive Filtering**: Filter holdings by sector for focused analysis

## ✨ Features

### Portfolio Dashboard
- **Summary Cards**: Four key metrics displayed prominently
  - Total Investment (initial capital)
  - Present Value (current portfolio value)
  - Total Gain/Loss (absolute change)
  - Return Percentage (percentage return)

### Holdings Management
- **Comprehensive Stock Table**: Desktop view with detailed columns
  - Company name and exchange (NSE/BSE)
  - Purchase price and quantity
  - Investment amount and portfolio percentage
  - Current Market Price (CMP) with refresh indicator
  - Present value and gain/loss (absolute and percentage)
  - P/E Ratio and latest earnings information
- **Mobile-Optimized Cards**: Responsive card layout for smaller screens
- **Sector Filtering**: Filter holdings by sector with dedicated sector summary cards

### Sector Analysis
- **Sector Allocation Chart**: Interactive pie chart showing portfolio distribution across sectors
- **Sector Summary Table**: Detailed breakdown of each sector including:
  - Number of stocks per sector
  - Sector value and weight percentage
  - Sector-level profit/loss with percentage returns

### User Experience
- **Auto-refresh Indicator**: Visual feedback during data updates
- **Last Update Timestamp**: Display of most recent data refresh time
- **Theme Toggle**: Seamless switching between light and dark modes
- **Smooth Animations**: Transitions and loading states for better UX

## 🛠 Technology Stack

### Core Framework
- **Next.js 16.0.2**: React framework with App Router for server-side rendering and routing
- **React 19.2.0**: Modern React with latest features and performance optimizations
- **TypeScript 5**: Type-safe development with enhanced developer experience

### State Management & Data Fetching
- **TanStack React Query 5.90.8**: Powerful data synchronization library for server state management
  - Automatic background refetching
  - Caching and request deduplication
  - Optimistic updates support

### UI Components & Styling
- **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development
- **Radix UI**: Accessible, unstyled component primitives
- **Lucide React**: Modern icon library
- **Recharts 3.4.1**: Composable charting library for data visualization
- **Class Variance Authority**: Type-safe component variant management

### Development Tools
- **ESLint**: Code linting with Next.js configuration
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing with Tailwind integration

## 📁 Project Structure

```
stock-portfolio-client/
├── app/                          # Next.js App Router directory
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Main portfolio dashboard page
│   ├── globals.css              # Global styles and theme variables
│   └── favicon.ico              # Application favicon
│
├── components/                   # React components
│   ├── charts/                  # Chart components
│   │   └── SectorDistributionPieChart.tsx
│   ├── providers/               # Context providers
│   │   └── ReactQueryProvider.tsx
│   ├── ui/                      # Reusable UI components (shadcn/ui)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── table.tsx
│   ├── Header.tsx               # Application header with theme toggle
│   ├── SectorAllocationCard.tsx # Sector allocation visualization
│   ├── SectorSummaryCard.tsx    # Sector-specific summary card
│   ├── StocksTable.tsx           # Main holdings table component
│   ├── SummaryCard.tsx          # Portfolio summary cards
│   ├── stock-card-mobile.tsx    # Mobile-optimized stock cards
│   └── ThemeToggle.tsx          # Theme switching component
│
├── hooks/                       # Custom React hooks
│   ├── useMobile.ts             # Responsive breakpoint detection
│   ├── usePortfolioStocks.ts    # Stock data fetching hook
│   ├── useScreenSize.ts         # Screen size detection
│   └── useSSE.ts                # Server-Sent Events hook (for future use)
│
├── lib/                         # Utility libraries
│   ├── api/                     # API client configuration
│   │   ├── client.ts            # HTTP client with error handling
│   │   └── endpoints.ts         # API endpoint definitions
│   ├── formatCurrency.ts        # Currency formatting utilities
│   └── utils.ts                 # General utility functions
│
├── types/                       # TypeScript type definitions
│   └── portfolio.ts             # Portfolio, Stock, and Sector types
│
├── data/                        # Mock data (for development/fallback)
│   └── mockDataPortfolio.ts     # Sample portfolio data
│
├── public/                      # Static assets
│   └── *.svg                    # SVG icons and images
│
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── components.json              # shadcn/ui component configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **Package Manager**: Bun (recommended), npm, yarn, or pnpm
- **Backend API**: The application expects a backend API running (default: `http://localhost:8080`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stock-portfolio-client
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```
   
   If not specified, the application defaults to `http://localhost:8080`.

4. **Start the development server**
   ```bash
   bun dev
   # or
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8080` |

### API Endpoints

The application expects the following backend endpoints:

- **GET `/stocks`**: Fetch all portfolio stocks
  - Returns: `ApiResponse<StockResponse[]>`
  - Response structure includes:
    - Stock identification (id, name, shortName)
    - Market data (price, exchange, yahoo_symbol, google_symbol)
    - Financial metrics (peRatio, earningsPerShare)
    - Portfolio data (purchasePrice, quantity, investment, portfolioPercentage, sector)

- **GET `/stocks/stream`**: Server-Sent Events endpoint (for future real-time updates)
  - Currently implemented but not actively used

### Auto-refresh Configuration

Stock data automatically refreshes every **21 seconds** using React Query's `refetchInterval`. This can be modified in `hooks/usePortfolioStocks.ts`:

```typescript
refetchInterval: 20000, // 20 seconds in milliseconds
```

## 🧩 Key Components

### Main Dashboard (`app/page.tsx`)

The central component orchestrating the entire portfolio view:

- **State Management**: Manages last update time, refresh status, and sector filter
- **Data Normalization**: Transforms API response to application-specific format
- **Portfolio Calculations**: Computes total investment, present value, and gain/loss
- **Sector Grouping**: Aggregates stocks by sector for analysis
- **Conditional Rendering**: Displays filtered views based on sector selection

### StocksTable Component

Responsive table component that adapts to screen size:

- **Desktop View**: Full-featured table with all stock metrics
- **Mobile View**: Card-based layout optimized for smaller screens
- **Refresh Indicator**: Visual feedback during data updates
- **Color-coded Metrics**: Green for profits, red for losses

### SectorAllocationCard Component

Comprehensive sector analysis visualization:

- **Interactive Pie Chart**: Visual representation of sector distribution
- **Sector Summary Table**: Detailed breakdown with P&L metrics
- **Responsive Layout**: Adapts to different screen sizes

### SummaryCards Component

Portfolio-level metrics display:

- **Four Key Metrics**: Total Investment, Present Value, Gain/Loss, Return %
- **Visual Indicators**: Trending icons for profit/loss
- **Responsive Grid**: Adapts from 2 columns (mobile) to 4 columns (desktop)

## 🔄 State Management

### React Query Integration

The application uses **TanStack React Query** for efficient server state management:

- **Automatic Caching**: Stock data is cached to minimize API calls
- **Background Refetching**: Data updates every 21 seconds without user interaction
- **Error Handling**: Built-in error states and retry logic
- **Loading States**: Seamless loading indicators during data fetches

### Local State Management

React hooks manage component-level state:

- **useState**: For UI state (theme, filters, refresh indicators)
- **useEffect**: For side effects (theme persistence, refresh timing)
- **Custom Hooks**: Encapsulated logic for reusability

### Data Flow

```
API Endpoint → React Query Hook → Component State → UI Rendering
     ↓              ↓                    ↓              ↓
/stocks    usePortfolioStocks()    page.tsx      StocksTable
```

## 🌐 API Integration

### API Client (`lib/api/client.ts`)

Centralized HTTP client with:

- **Base URL Configuration**: Environment-based API URL
- **Error Handling**: Comprehensive error catching and reporting
- **Request Configuration**: Default headers and cache settings
- **Type Safety**: Generic type support for responses

### Data Transformation

API responses are normalized in `app/page.tsx`:

- Maps backend `StockResponse` to application `Stock` type
- Calculates derived fields (presentValue, gainLoss, gainLossPercentage)
- Handles missing or incomplete data gracefully
- Falls back to mock data when API is unavailable

### Mock Data Fallback

The application includes mock data (`data/mockDataPortfolio.ts`) for:

- Development without backend
- Testing and demonstration
- Graceful degradation when API is unavailable

## 🎨 Styling & Theming

### Tailwind CSS

Utility-first CSS framework providing:

- **Responsive Design**: Mobile-first breakpoints
- **Dark Mode Support**: System-aware theme switching
- **Custom Color Palette**: Consistent design tokens
- **Component Variants**: Reusable style patterns

### Theme System

- **Light/Dark Modes**: User-controlled theme switching
- **CSS Variables**: Theme-aware color system
- **Persistent Theme**: Theme preference stored in DOM
- **Smooth Transitions**: Animated theme changes

### Component Styling

- **shadcn/ui Components**: Accessible, customizable UI primitives
- **Consistent Spacing**: Standardized padding and margins
- **Typography Scale**: Hierarchical text sizing
- **Color Semantics**: Meaningful color usage (profit/loss indicators)

## 💻 Development

### Available Scripts

```bash
# Start development server
bun dev          # or npm run dev

# Build for production
bun build        # or npm run build

# Start production server
bun start        # or npm start

# Run linter
bun lint         # or npm run lint
```

### Code Organization

- **Component Co-location**: Related files grouped together
- **Type Safety**: Comprehensive TypeScript coverage
- **Custom Hooks**: Reusable logic extraction
- **Utility Functions**: Shared helper functions

### Best Practices

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality enforcement
- **Component Composition**: Reusable, composable components
- **Performance**: Optimized re-renders with React Query

## 🏗 Build & Deployment

### Production Build

```bash
bun build
```

This creates an optimized production build in the `.next` directory.

### Deployment Options

#### Vercel (Recommended)

1. Push code to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Configure environment variables
4. Deploy automatically on push

#### Other Platforms

The application can be deployed to any platform supporting Next.js:

- **Netlify**: Automatic deployments with Next.js support
- **AWS Amplify**: Full-stack deployment platform
- **Docker**: Containerized deployment
- **Self-hosted**: Node.js server deployment

### Environment Configuration

Ensure production environment variables are set:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

### Performance Optimization

Next.js automatically optimizes:

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Built-in image optimization
- **Font Optimization**: Automatic font loading optimization
- **Static Generation**: Pre-rendering where possible

## 📊 Data Models

### Stock Interface

```typescript
interface Stock {
  id: string;
  company: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercentage: number;
  exchange: string;
  cmp: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercentage: number;
  peRatio: number;
  latestEarnings: string;
  sector: string;
}
```

### PortfolioSummary Interface

```typescript
interface PortfolioSummary {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  gainLossPercentage: number;
}
```

### SectorSummary Interface

```typescript
interface SectorSummary {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  gainLossPercentage: number;
  sectorWeightPercentage: number;
  stocks: Stock[];
}
```

## 🔮 Future Enhancements

Potential areas for future development:

- **Real-time Updates**: Server-Sent Events (SSE) integration for live price updates
- **Historical Data**: Price history charts and trend analysis
- **Portfolio Comparison**: Compare multiple portfolios
- **Export Functionality**: PDF/CSV export of portfolio data
- **Alerts & Notifications**: Price alerts and portfolio change notifications
- **Advanced Analytics**: Technical indicators and performance metrics
- **User Authentication**: Multi-user support with personal portfolios

## 📝 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. For questions or issues, please contact the development team.

---

**Built with ❤️ using Next.js, React, and TypeScript**
