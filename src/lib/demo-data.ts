// Demo data structure for Fed/CPI Market Event Demo Module

export interface MarketDataPoint {
  timestamp: Date
  symbol: string
  price: number
  volume: number
  change: number
  changePercent: number
}

export interface NewsItem {
  timestamp: Date
  headline: string
  source: string
  sentimentScore: number // -1 to 1, where -1 is negative, 1 is positive
  category: 'news' | 'social' | 'analysis'
}

export interface AIDecision {
  timestamp: Date
  type: 'risk_system' | 'ai_engine' | 'strategy_manager' | 'execution'
  action: string
  details: string
  impact: string
}

export interface PortfolioPerformancePoint {
  timestamp: Date
  staticStrategyValue: number
  cognitumAIValue: number
  staticStrategyReturn: number
  cognitumAIReturn: number
}

export interface RiskManagerState {
  timestamp: Date
  stormAlertLevel: 'low' | 'medium' | 'high' | 'critical'
  volatilityRegimeProbability: number
  marketStressScore: number
  riskMetrics: {
    var: number
    expectedShortfall: number
    beta: number
    correlation: number
  }
}

export interface AlternativeDataFeed {
  timestamp: Date
  sentimentTrend: 'bullish' | 'bearish' | 'neutral'
  socialVolume: number
  newsFlow: number
  unusualActivity: boolean
  signals: string[]
}

export interface MarketEvent {
  id: string
  name: string
  description: string
  date: Date
  duration: number // in minutes
  marketData: MarketDataPoint[]
  newsFeed: NewsItem[]
  aiDecisions: AIDecision[]
  portfolioPerformance: PortfolioPerformancePoint[]
  riskManagerStates: RiskManagerState[]
  alternativeDataFeeds: AlternativeDataFeed[]
  keyMoments: {
    timestamp: Date
    label: string
    description: string
  }[]
}

// Fed Interest Rate Announcement (March 20, 2024)
export const fedRateAnnouncementEvent: MarketEvent = {
  id: 'fed-rate-mar-2024',
  name: 'Fed Interest Rate Announcement',
  description: 'Federal Reserve announces interest rate decision and economic projections',
  date: new Date('2024-03-20T10:00:00'),
  duration: 120,
  marketData: [
    // Pre-announcement data (9:00-10:00)
    { timestamp: new Date('2024-03-20T09:00:00'), symbol: 'SPY', price: 515.20, volume: 45000000, change: 0.15, changePercent: 0.03 },
    { timestamp: new Date('2024-03-20T09:15:00'), symbol: 'SPY', price: 515.45, volume: 48000000, change: 0.40, changePercent: 0.08 },
    { timestamp: new Date('2024-03-20T09:30:00'), symbol: 'SPY', price: 515.80, volume: 52000000, change: 0.75, changePercent: 0.15 },
    { timestamp: new Date('2024-03-20T09:45:00'), symbol: 'SPY', price: 516.10, volume: 55000000, change: 1.05, changePercent: 0.20 },
    // Announcement time (10:00)
    { timestamp: new Date('2024-03-20T10:00:00'), symbol: 'SPY', price: 516.20, volume: 60000000, change: 1.15, changePercent: 0.22 },
    // Immediate reaction (10:00-10:30)
    { timestamp: new Date('2024-03-20T10:05:00'), symbol: 'SPY', price: 514.80, volume: 95000000, change: -0.25, changePercent: -0.05 },
    { timestamp: new Date('2024-03-20T10:10:00'), symbol: 'SPY', price: 513.20, volume: 120000000, change: -1.85, changePercent: -0.36 },
    { timestamp: new Date('2024-03-20T10:15:00'), symbol: 'SPY', price: 512.50, volume: 100000000, change: -2.55, changePercent: -0.50 },
    { timestamp: new Date('2024-03-20T10:20:00'), symbol: 'SPY', price: 512.80, volume: 85000000, change: -2.25, changePercent: -0.44 },
    { timestamp: new Date('2024-03-20T10:25:00'), symbol: 'SPY', price: 513.50, volume: 75000000, change: -1.55, changePercent: -0.30 },
    { timestamp: new Date('2024-03-20T10:30:00'), symbol: 'SPY', price: 514.20, volume: 70000000, change: -0.85, changePercent: -0.17 },
    // VIX data
    { timestamp: new Date('2024-03-20T09:00:00'), symbol: 'VIX', price: 16.50, volume: 1500000, change: -0.20, changePercent: -1.20 },
    { timestamp: new Date('2024-03-20T09:30:00'), symbol: 'VIX', price: 16.80, volume: 1800000, change: 0.10, changePercent: 0.60 },
    { timestamp: new Date('2024-03-20T10:00:00'), symbol: 'VIX', price: 17.20, volume: 2500000, change: 0.50, changePercent: 3.00 },
    { timestamp: new Date('2024-03-20T10:15:00'), symbol: 'VIX', price: 22.50, volume: 5500000, change: 5.80, changePercent: 34.70 },
    { timestamp: new Date('2024-03-20T10:30:00'), symbol: 'VIX', price: 20.80, volume: 4200000, change: 4.10, changePercent: 24.50 },
  ],
  newsFeed: [
    {
      timestamp: new Date('2024-03-20T09:45:00'),
      headline: "Fed decision expected to hold rates steady, focus on inflation",
      source: "Financial Times",
      sentimentScore: 0.2,
      category: 'news'
    },
    {
      timestamp: new Date('2024-03-20T10:00:00'),
      headline: "FED HOLDS RATES STEADY, BUT SIGNALS FEWER CUTS IN 2024",
      source: "Bloomberg",
      sentimentScore: -0.6,
      category: 'news'
    },
    {
      timestamp: new Date('2024-03-20T10:02:00'),
      headline: "Market reacts negatively to Fed's hawkish tone on rate cuts",
      source: "Reuters",
      sentimentScore: -0.7,
      category: 'news'
    },
    {
      timestamp: new Date('2024-03-20T10:05:00'),
      headline: "Traders pricing out June rate cut expectations",
      source: "CNBC",
      sentimentScore: -0.5,
      category: 'news'
    },
  ],
  aiDecisions: [
    {
      timestamp: new Date('2024-03-20T09:58:00'),
      type: 'risk_system',
      action: 'Volatility Regime Alert',
      details: 'Volatility Regime Probability: 85%',
      impact: 'Storm Alert Level: High'
    },
    {
      timestamp: new Date('2024-03-20T10:00:01'),
      type: 'ai_engine',
      action: 'Portfolio Hedge Execution',
      details: 'Reducing portfolio Delta exposure by 40%',
      impact: 'Executing volatility hedge'
    },
    {
      timestamp: new Date('2024-03-20T10:00:02'),
      type: 'strategy_manager',
      action: 'Strategy Reallocation',
      details: 'Increasing allocation to "Long Volatility" strategy from 10% to 25%',
      impact: 'Enhanced portfolio protection'
    },
    {
      timestamp: new Date('2024-03-20T10:30:00'),
      type: 'ai_engine',
      action: 'Profit Capture',
      details: 'Capturing gains on volatility position as VIX spikes +35%',
      impact: 'Re-evaluating regime and adjusting exposure'
    }
  ],
  portfolioPerformance: [
    {
      timestamp: new Date('2024-03-20T09:00:00'),
      staticStrategyValue: 1000000,
      cognitumAIValue: 1000000,
      staticStrategyReturn: 0,
      cognitumAIReturn: 0
    },
    {
      timestamp: new Date('2024-03-20T10:00:00'),
      staticStrategyValue: 1002000,
      cognitumAIValue: 1001500,
      staticStrategyReturn: 0.20,
      cognitumAIReturn: 0.15
    },
    {
      timestamp: new Date('2024-03-20T10:30:00'),
      staticStrategyValue: 985000,
      cognitumAIValue: 1025000,
      staticStrategyReturn: -1.50,
      cognitumAIReturn: 2.50
    }
  ],
  riskManagerStates: [
    {
      timestamp: new Date('2024-03-20T09:58:00'),
      stormAlertLevel: 'high',
      volatilityRegimeProbability: 0.85,
      marketStressScore: 7.2,
      riskMetrics: {
        var: 2.5,
        expectedShortfall: 4.2,
        beta: 1.05,
        correlation: 0.85
      }
    },
    {
      timestamp: new Date('2024-03-20T10:15:00'),
      stormAlertLevel: 'critical',
      volatilityRegimeProbability: 0.95,
      marketStressScore: 8.8,
      riskMetrics: {
        var: 4.1,
        expectedShortfall: 6.8,
        beta: 1.15,
        correlation: 0.92
      }
    }
  ],
  alternativeDataFeeds: [
    {
      timestamp: new Date('2024-03-20T09:45:00'),
      sentimentTrend: 'neutral',
      socialVolume: 8500,
      newsFlow: 120,
      unusualActivity: false,
      signals: ['Market awaiting Fed decision', 'Low volatility expectations']
    },
    {
      timestamp: new Date('2024-03-20T10:05:00'),
      sentimentTrend: 'bearish',
      socialVolume: 25000,
      newsFlow: 350,
      unusualActivity: true,
      signals: ['Negative sentiment spike', 'Unusual options activity', 'High social volume']
    }
  ],
  keyMoments: [
    {
      timestamp: new Date('2024-03-20T09:58:00'),
      label: 'Pre-Event Alert',
      description: 'AI detects high volatility probability before announcement'
    },
    {
      timestamp: new Date('2024-03-20T10:00:00'),
      label: 'Fed Announcement',
      description: 'Federal Reserve announces rates unchanged with hawkish tone'
    },
    {
      timestamp: new Date('2024-03-20T10:15:00'),
      label: 'Market Peak Volatility',
      description: 'VIX spikes +35%, SPY drops -1.5%'
    },
    {
      timestamp: new Date('2024-03-20T10:30:00'),
      label: 'AI Profit Capture',
      description: 'AI captures gains on volatility positions'
    }
  ]
}

// CPI Report Release (April 10, 2024)
export const cpiReportEvent: MarketEvent = {
  id: 'cpi-apr-2024',
  name: 'CPI Report Release',
  description: 'Consumer Price Index report reveals inflation data',
  date: new Date('2024-04-10T08:30:00'),
  duration: 120,
  marketData: [
    // Pre-CPI data (7:30-8:30)
    { timestamp: new Date('2024-04-10T07:30:00'), symbol: 'SPY', price: 518.45, volume: 40000000, change: 0.25, changePercent: 0.05 },
    { timestamp: new Date('2024-04-10T07:45:00'), symbol: 'SPY', price: 518.80, volume: 42000000, change: 0.60, changePercent: 0.12 },
    { timestamp: new Date('2024-04-10T08:00:00'), symbol: 'SPY', price: 519.20, volume: 45000000, change: 1.00, changePercent: 0.19 },
    { timestamp: new Date('2024-04-10T08:15:00'), symbol: 'SPY', price: 519.50, volume: 50000000, change: 1.30, changePercent: 0.25 },
    // CPI release (8:30)
    { timestamp: new Date('2024-04-10T08:30:00'), symbol: 'SPY', price: 519.60, volume: 55000000, change: 1.40, changePercent: 0.27 },
    // Immediate reaction (8:30-9:00)
    { timestamp: new Date('2024-04-10T08:35:00'), symbol: 'SPY', price: 521.20, volume: 95000000, change: 3.00, changePercent: 0.58 },
    { timestamp: new Date('2024-04-10T08:40:00'), symbol: 'SPY', price: 522.80, volume: 110000000, change: 4.60, changePercent: 0.89 },
    { timestamp: new Date('2024-04-10T08:45:00'), symbol: 'SPY', price: 523.50, volume: 100000000, change: 5.30, changePercent: 1.02 },
    { timestamp: new Date('2024-04-10T08:50:00'), symbol: 'SPY', price: 524.20, volume: 90000000, change: 6.00, changePercent: 1.16 },
    { timestamp: new Date('2024-04-10T08:55:00'), symbol: 'SPY', price: 524.80, volume: 85000000, change: 6.60, changePercent: 1.27 },
    { timestamp: new Date('2024-04-10T09:00:00'), symbol: 'SPY', price: 525.20, volume: 80000000, change: 7.00, changePercent: 1.35 },
    // QQQ data
    { timestamp: new Date('2024-04-10T07:30:00'), symbol: 'QQQ', price: 445.67, volume: 25000000, change: 0.15, changePercent: 0.03 },
    { timestamp: new Date('2024-04-10T08:00:00'), symbol: 'QQQ', price: 446.20, volume: 28000000, change: 0.68, changePercent: 0.15 },
    { timestamp: new Date('2024-04-10T08:30:00'), symbol: 'QQQ', price: 446.50, volume: 32000000, change: 0.98, changePercent: 0.22 },
    { timestamp: new Date('2024-04-10T09:00:00'), symbol: 'QQQ', price: 452.80, volume: 65000000, change: 7.28, changePercent: 1.63 },
  ],
  newsFeed: [
    {
      timestamp: new Date('2024-04-10T08:15:00'),
      headline: "Economists expect CPI to show cooling inflation",
      source: "Wall Street Journal",
      sentimentScore: 0.3,
      category: 'news'
    },
    {
      timestamp: new Date('2024-04-10T08:30:00'),
      headline: "CPI COOLS MORE THAN EXPECTED, INFLATION EASING",
      source: "Bloomberg",
      sentimentScore: 0.8,
      category: 'news'
    },
    {
      timestamp: new Date('2024-04-10T08:32:00'),
      headline: "Markets surge on better-than-expected inflation data",
      source: "Reuters",
      sentimentScore: 0.9,
      category: 'news'
    },
    {
      timestamp: new Date('2024-04-10T08:35:00'),
      headline: "Rate cut expectations rise following CPI report",
      source: "CNBC",
      sentimentScore: 0.7,
      category: 'news'
    },
  ],
  aiDecisions: [
    {
      timestamp: new Date('2024-04-10T08:25:00'),
      type: 'risk_system',
      action: 'Inflation Data Analysis',
      details: 'Pre-CPI analysis shows potential for positive surprise',
      impact: 'Preparing for bullish scenario'
    },
    {
      timestamp: new Date('2024-04-10T08:30:01'),
      type: 'ai_engine',
      action: 'Bullish Position Adjustment',
      details: 'Increasing portfolio Delta exposure by 30%',
      impact: 'Capitalizing on market rally'
    },
    {
      timestamp: new Date('2024-04-10T08:30:02'),
      type: 'strategy_manager',
      action: 'Strategy Activation',
      details: 'Activating "Inflation Sensitive" strategy with 20% allocation',
      impact: 'Enhanced returns during CPI-driven rally'
    },
    {
      timestamp: new Date('2024-04-10T09:00:00'),
      type: 'ai_engine',
      action: 'Profit Taking',
      details: 'Taking partial profits on initial surge, maintaining core position',
      impact: 'Securing gains while maintaining upside exposure'
    }
  ],
  portfolioPerformance: [
    {
      timestamp: new Date('2024-04-10T07:30:00'),
      staticStrategyValue: 1000000,
      cognitumAIValue: 1000000,
      staticStrategyReturn: 0,
      cognitumAIReturn: 0
    },
    {
      timestamp: new Date('2024-04-10T08:30:00'),
      staticStrategyValue: 1002700,
      cognitumAIValue: 1002500,
      staticStrategyReturn: 0.27,
      cognitumAIReturn: 0.25
    },
    {
      timestamp: new Date('2024-04-10T09:00:00'),
      staticStrategyValue: 1013500,
      cognitumAIValue: 1038000,
      staticStrategyReturn: 1.35,
      cognitumAIReturn: 3.80
    }
  ],
  riskManagerStates: [
    {
      timestamp: new Date('2024-04-10T08:25:00'),
      stormAlertLevel: 'low',
      volatilityRegimeProbability: 0.25,
      marketStressScore: 2.8,
      riskMetrics: {
        var: 1.2,
        expectedShortfall: 2.1,
        beta: 0.95,
        correlation: 0.65
      }
    },
    {
      timestamp: new Date('2024-04-10T08:45:00'),
      stormAlertLevel: 'medium',
      volatilityRegimeProbability: 0.45,
      marketStressScore: 4.2,
      riskMetrics: {
        var: 1.8,
        expectedShortfall: 3.2,
        beta: 1.02,
        correlation: 0.72
      }
    }
  ],
  alternativeDataFeeds: [
    {
      timestamp: new Date('2024-04-10T08:15:00'),
      sentimentTrend: 'bullish',
      socialVolume: 12000,
      newsFlow: 180,
      unusualActivity: false,
      signals: ['Positive sentiment on inflation', 'Expectations of cooling CPI']
    },
    {
      timestamp: new Date('2024-04-10T08:35:00'),
      sentimentTrend: 'bullish',
      socialVolume: 35000,
      newsFlow: 420,
      unusualActivity: true,
      signals: ['Bullish sentiment confirmed', 'High social volume', 'Positive momentum signals']
    }
  ],
  keyMoments: [
    {
      timestamp: new Date('2024-04-10T08:25:00'),
      label: 'Pre-CPI Analysis',
      description: 'AI analyzes pre-CPI data and prepares for bullish scenario'
    },
    {
      timestamp: new Date('2024-04-10T08:30:00'),
      label: 'CPI Release',
      description: 'CPI report shows better-than-expected inflation cooling'
    },
    {
      timestamp: new Date('2024-04-10T08:45:00'),
      label: 'Market Rally',
      description: 'SPY surges +1.35%, QQQ up +1.63%'
    },
    {
      timestamp: new Date('2024-04-10T09:00:00'),
      label: 'AI Profit Taking',
      description: 'AI secures gains while maintaining strategic positions'
    }
  ]
}

export const demoEvents = [
  fedRateAnnouncementEvent,
  cpiReportEvent
]