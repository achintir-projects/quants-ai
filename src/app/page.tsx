'use client'

<<<<<<< HEAD
import { useState, useEffect } from 'react'
=======
import { useState } from 'react'
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle, 
  Activity,
  Target,
  Shield,
  BarChart3,
  Clock,
  Zap,
<<<<<<< HEAD
  Brain,
  RefreshCw,
  CheckCircle,
  Monitor,
  Database,
  Wifi,
  MemoryStick,
  Calculator
} from 'lucide-react'
import AIMonitoringDashboard from '@/components/ai/AIMonitoringDashboard'
import OODALoopSystem from '@/components/ai/OODALoopSystem'
import UnifiedFeatureStore from '@/components/ai/UnifiedFeatureStore'
import AlternativeDataIntegration from '@/components/ai/AlternativeDataIntegration'
import StrategyDiscoveryEngine from '@/components/ai/StrategyDiscoveryEngine'
import AdaptiveStrategyManagement from '@/components/ai/AdaptiveStrategyManagement'
import PredictiveRiskManager from '@/components/ai/PredictiveRiskManager'
import IntelligentExecutionAgent from '@/components/ai/IntelligentExecutionAgent'
=======
  Brain
} from 'lucide-react'
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be

interface PortfolioMetrics {
  totalValue: number
  dailyPnL: number
  dailyReturn: number
  totalReturn: number
  sharpeRatio: number
  maxDrawdown: number
  winRate: number
  cash: number
  margin: number
<<<<<<< HEAD
  beta: number
  alpha: number
  informationRatio: number
  sortinoRatio: number
  calmarRatio: number
}

interface GreeksData {
  symbol: string
  delta: number
  gamma: number
  theta: number
  vega: number
  rho: number
  impliedVol: number
  underlyingPrice: number
  strike: number
  expiration: string
  type: 'call' | 'put'
}

interface Position {
  id: string
  symbol: string
  quantity: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  delta: number
  gamma: number
  theta: number
  vega: number
  type: 'stock' | 'option' | 'future'
  status: 'open' | 'closed'
}

interface MarketData {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  pe: number
  dividend: number
=======
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
}

export default function TradingDashboard() {
  const [portfolioMetrics, setPortfolioMetrics] = useState<PortfolioMetrics>({
    totalValue: 1000000,
    dailyPnL: 12500,
    dailyReturn: 1.25,
    totalReturn: 15.8,
    sharpeRatio: 2.1,
    maxDrawdown: -8.2,
    winRate: 62.5,
    cash: 150000,
<<<<<<< HEAD
    margin: 850000,
    beta: 0.85,
    alpha: 3.2,
    informationRatio: 1.8,
    sortinoRatio: 2.8,
    calmarRatio: 1.9
  })

  const [greeksData, setGreeksData] = useState<GreeksData[]>([
    {
      symbol: 'SPX 240517C5200',
      delta: 0.45,
      gamma: 0.08,
      theta: -0.02,
      vega: 0.15,
      rho: 0.12,
      impliedVol: 18.2,
      underlyingPrice: 5185.23,
      strike: 5200,
      expiration: '2024-05-17',
      type: 'call'
    },
    {
      symbol: 'QQQ 240524P440',
      delta: -0.32,
      gamma: 0.06,
      theta: -0.015,
      vega: 0.12,
      rho: -0.08,
      impliedVol: 22.1,
      underlyingPrice: 445.67,
      strike: 440,
      expiration: '2024-05-24',
      type: 'put'
    },
    {
      symbol: 'AAPL 240621C200',
      delta: 0.58,
      gamma: 0.12,
      theta: -0.025,
      vega: 0.18,
      impliedVol: 16.8,
      underlyingPrice: 198.45,
      strike: 200,
      expiration: '2024-06-21',
      type: 'call'
    }
  ])

  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      symbol: 'SPY',
      quantity: 1000,
      entryPrice: 515.20,
      currentPrice: 518.45,
      pnl: 3250,
      pnlPercent: 0.63,
      delta: 1000,
      gamma: 0,
      theta: 0,
      vega: 0,
      type: 'stock',
      status: 'open'
    },
    {
      id: '2',
      symbol: 'SPX 240517C5200',
      quantity: -5,
      entryPrice: 45.20,
      currentPrice: 42.15,
      pnl: 1525,
      pnlPercent: 3.37,
      delta: -225,
      gamma: -0.4,
      theta: 0.1,
      vega: -0.75,
      type: 'option',
      status: 'open'
    },
    {
      id: '3',
      symbol: 'QQQ',
      quantity: -500,
      entryPrice: 442.80,
      currentPrice: 445.67,
      pnl: -1435,
      pnlPercent: -0.32,
      delta: -500,
      gamma: 0,
      theta: 0,
      vega: 0,
      type: 'stock',
      status: 'open'
    }
  ])

  const [marketData, setMarketData] = useState<MarketData[]>([
    {
      symbol: 'SPY',
      price: 518.45,
      change: 3.25,
      changePercent: 0.63,
      volume: 45230000,
      marketCap: 456000000000,
      pe: 28.5,
      dividend: 1.82
    },
    {
      symbol: 'QQQ',
      price: 445.67,
      change: 2.87,
      changePercent: 0.65,
      volume: 28450000,
      marketCap: 267000000000,
      pe: 32.1,
      dividend: 1.45
    },
    {
      symbol: 'AAPL',
      price: 198.45,
      change: -1.23,
      changePercent: -0.62,
      volume: 52340000,
      marketCap: 3080000000000,
      pe: 31.2,
      dividend: 0.96
    }
  ])

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

=======
    margin: 850000
  })

>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

<<<<<<< HEAD
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value)
  }

  const getGreeksColor = (value: number) => {
    if (Math.abs(value) < 0.1) return 'text-gray-600'
    if (value > 0) return 'text-green-600'
    return 'text-red-600'
  }

  const totalDelta = positions.reduce((sum, pos) => sum + pos.delta, 0)
  const totalGamma = positions.reduce((sum, pos) => sum + pos.gamma, 0)
  const totalTheta = positions.reduce((sum, pos) => sum + pos.theta, 0)
  const totalVega = positions.reduce((sum, pos) => sum + pos.vega, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="gradient-text">AI-Powered</span>
=======
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-blue-600">AI-Powered</span>
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
            <br />
            <span className="text-gray-900 dark:text-white">Quantum Brain</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Self-Improving Adaptive Trading Platform with Advanced Machine Learning
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
<<<<<<< HEAD
            <div className="px-4 py-2 bg-blue-500 text-white rounded-full card-hover">
              <Activity className="w-4 h-4 mr-1 inline" />
              Live Trading
              <div className="status-indicator status-active ml-2"></div>
            </div>
            <div className="px-4 py-2 bg-purple-500 text-white rounded-full card-hover">
              <Brain className="w-4 h-4 mr-1 inline" />
              AI Active
              <div className="status-indicator status-active ml-2"></div>
            </div>
            <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full card-hover">
              <Clock className="w-4 h-4 mr-1 inline" />
              {currentTime.toLocaleTimeString()}
=======
            <div className="px-4 py-2 bg-blue-500 text-white rounded-full">
              <Activity className="w-4 h-4 mr-1 inline" />
              Live Trading
            </div>
            <div className="px-4 py-2 bg-purple-500 text-white rounded-full">
              <Brain className="w-4 h-4 mr-1 inline" />
              AI Active
            </div>
            <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <Clock className="w-4 h-4 mr-1 inline" />
              {new Date().toLocaleTimeString()}
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
            </div>
          </div>
        </div>

        {/* Enhanced Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<<<<<<< HEAD
          <Card className="card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
=======
          <Card className="hover:shadow-lg transition-shadow">
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Portfolio Value</CardTitle>
              <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
<<<<<<< HEAD
              <div className="text-2xl font-bold gradient-text">{formatCurrency(portfolioMetrics.totalValue)}</div>
=======
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(portfolioMetrics.totalValue)}</div>
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatCurrency(portfolioMetrics.cash)} cash available
              </p>
              <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
<<<<<<< HEAD
                <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full progress-animated" style={{ width: '85%' }}></div>
=======
                <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full" style={{ width: '85%' }}></div>
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
              </div>
            </CardContent>
          </Card>

<<<<<<< HEAD
          <Card className="card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
=======
          <Card className="hover:shadow-lg transition-shadow">
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Daily P&L</CardTitle>
              <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg">
                {portfolioMetrics.dailyPnL >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-white" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-white" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${portfolioMetrics.dailyPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(portfolioMetrics.dailyPnL)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatPercentage(portfolioMetrics.dailyReturn)} today
              </p>
              <div className="mt-2 flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${portfolioMetrics.dailyPnL >= 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {portfolioMetrics.dailyPnL >= 0 ? 'Positive' : 'Negative'} momentum
                </span>
              </div>
            </CardContent>
          </Card>

<<<<<<< HEAD
          <Card className="card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
=======
          <Card className="hover:shadow-lg transition-shadow">
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Return</CardTitle>
              <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatPercentage(portfolioMetrics.totalReturn)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sharpe: {portfolioMetrics.sharpeRatio.toFixed(2)}
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
<<<<<<< HEAD
                  <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full progress-animated" style={{ width: '78%' }}></div>
=======
                  <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" style={{ width: '78%' }}></div>
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">78%</span>
              </div>
            </CardContent>
          </Card>

<<<<<<< HEAD
          <Card className="card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
=======
          <Card className="hover:shadow-lg transition-shadow">
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Risk Metrics</CardTitle>
              <div className="p-2 bg-gradient-to-r from-red-400 to-orange-500 rounded-lg">
                <Shield className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatPercentage(portfolioMetrics.maxDrawdown)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Max Drawdown
              </p>
              <div className="mt-2 flex items-center space-x-2">
<<<<<<< HEAD
                <div className="status-indicator status-warning"></div>
=======
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
                <span className="text-xs text-gray-500 dark:text-gray-400">Risk monitoring</span>
              </div>
            </CardContent>
          </Card>
        </div>

<<<<<<< HEAD
        {/* Greeks Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Portfolio Delta</CardTitle>
              <Calculator className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getGreeksColor(totalDelta)}`}>
                {totalDelta.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Price sensitivity
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Portfolio Gamma</CardTitle>
              <Calculator className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getGreeksColor(totalGamma)}`}>
                {totalGamma.toFixed(3)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Delta sensitivity
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Portfolio Theta</CardTitle>
              <Calculator className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getGreeksColor(totalTheta)}`}>
                {totalTheta.toFixed(3)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Time decay
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Portfolio Vega</CardTitle>
              <Calculator className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getGreeksColor(totalVega)}`}>
                {totalVega.toFixed(3)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Volatility sensitivity
              </p>
            </CardContent>
          </Card>
        </div>

=======
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
        {/* Enhanced Risk Alert */}
        <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/30">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            Portfolio margin utilization at {((portfolioMetrics.margin / portfolioMetrics.totalValue) * 100).toFixed(1)}%. 
            Current margin: {formatCurrency(portfolioMetrics.margin)}
          </AlertDescription>
        </Alert>

        {/* Enhanced Main Content Tabs */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6">
          <Tabs defaultValue="ai" className="space-y-4">
            <TabsList className="grid w-full grid-cols-7 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
              <TabsTrigger value="strategies" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <Target className="w-4 h-4 mr-2" />
                Strategies
              </TabsTrigger>
              <TabsTrigger value="positions" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <BarChart3 className="w-4 h-4 mr-2" />
                Positions
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <TrendingUp className="w-4 h-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="backtesting" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <Activity className="w-4 h-4 mr-2" />
                Backtesting
              </TabsTrigger>
              <TabsTrigger value="market" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <Zap className="w-4 h-4 mr-2" />
                Market
              </TabsTrigger>
              <TabsTrigger value="risk" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <Shield className="w-4 h-4 mr-2" />
                Risk
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <Brain className="w-4 h-4 mr-2" />
                AI System
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ai" className="space-y-4">
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
<<<<<<< HEAD
                      <div className="text-xl font-bold gradient-text">AI-Powered Quantum Brain</div>
=======
                      <div className="text-xl font-bold text-blue-600">AI-Powered Quantum Brain</div>
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
                      <div className="text-sm text-gray-600 dark:text-gray-300">Self-Improving Adaptive Trading Platform</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
<<<<<<< HEAD
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        System Status
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                          <div className="text-sm text-gray-600 dark:text-gray-300">OODA Loop</div>
                          <div className="text-lg font-semibold text-green-600 flex items-center gap-1">
                            <div className="status-indicator status-active"></div>
                            Active
                          </div>
                        </div>
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                          <div className="text-sm text-gray-600 dark:text-gray-300">Feature Store</div>
                          <div className="text-lg font-semibold text-green-600 flex items-center gap-1">
                            <div className="status-indicator status-active"></div>
                            Online
                          </div>
                        </div>
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                          <div className="text-sm text-gray-600 dark:text-gray-300">Strategy Discovery</div>
                          <div className="text-lg font-semibold text-yellow-600 flex items-center gap-1">
                            <div className="status-indicator status-warning"></div>
                            Evolving
                          </div>
                        </div>
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                          <div className="text-sm text-gray-600 dark:text-gray-300">Risk Management</div>
                          <div className="text-lg font-semibold text-green-600 flex items-center gap-1">
                            <div className="status-indicator status-active"></div>
                            Active
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Performance Metrics
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                          <div className="text-sm text-gray-600 dark:text-gray-300">AI Confidence</div>
                          <div className="text-lg font-semibold text-blue-600">92.4%</div>
                        </div>
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                          <div className="text-sm text-gray-600 dark:text-gray-300">Win Rate</div>
                          <div className="text-lg font-semibold text-green-600">87.3%</div>
                        </div>
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                          <div className="text-sm text-gray-600 dark:text-gray-300">Sharpe Ratio</div>
                          <div className="text-lg font-semibold text-purple-600">2.15</div>
                        </div>
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                          <div className="text-sm text-gray-600 dark:text-gray-300">Max Drawdown</div>
                          <div className="text-lg font-semibold text-red-600">-2.8%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Components Tabs */}
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-8 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="ooda" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    OODA
                  </TabsTrigger>
                  <TabsTrigger value="features" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Features
                  </TabsTrigger>
                  <TabsTrigger value="data" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Data
                  </TabsTrigger>
                  <TabsTrigger value="discovery" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Discovery
                  </TabsTrigger>
                  <TabsTrigger value="adaptive" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Adaptive
                  </TabsTrigger>
                  <TabsTrigger value="risk" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Risk AI
                  </TabsTrigger>
                  <TabsTrigger value="execution" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Execution
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <AIMonitoringDashboard />
                </TabsContent>

                <TabsContent value="ooda">
                  <OODALoopSystem />
                </TabsContent>

                <TabsContent value="features">
                  <UnifiedFeatureStore />
                </TabsContent>

                <TabsContent value="data">
                  <AlternativeDataIntegration />
                </TabsContent>

                <TabsContent value="discovery">
                  <StrategyDiscoveryEngine />
                </TabsContent>

                <TabsContent value="adaptive">
                  <AdaptiveStrategyManagement />
                </TabsContent>

                <TabsContent value="risk">
                  <PredictiveRiskManager />
                </TabsContent>

                <TabsContent value="execution">
                  <IntelligentExecutionAgent />
                </TabsContent>
              </Tabs>
=======
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold mb-2">Advanced AI System Active</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      The enhanced UI is now visible! This includes modern styling, gradients, and improved user experience.
                    </p>
                  </div>
                </CardContent>
              </Card>
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trading Strategies</CardTitle>
                  <CardDescription>Advanced options trading strategies</CardDescription>
                </CardHeader>
                <CardContent>
<<<<<<< HEAD
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <CardTitle className="text-lg">Volatility Arbitrage</CardTitle>
                        <CardDescription>Exploit mispriced options</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Active Positions:</span>
                            <span className="font-medium">12</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Win Rate:</span>
                            <span className="font-medium text-green-600">68.4%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Daily P&L:</span>
                            <span className="font-medium text-green-600">+$2,450</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <CardTitle className="text-lg">Delta Neutral</CardTitle>
                        <CardDescription>Market-neutral strategies</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Active Positions:</span>
                            <span className="font-medium">8</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Win Rate:</span>
                            <span className="font-medium text-green-600">72.1%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Daily P&L:</span>
                            <span className="font-medium text-green-600">+$1,890</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-purple-500">
                      <CardHeader>
                        <CardTitle className="text-lg">Calendar Spreads</CardTitle>
                        <CardDescription>Time decay strategies</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Active Positions:</span>
                            <span className="font-medium">15</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Win Rate:</span>
                            <span className="font-medium text-green-600">64.8%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Daily P&L:</span>
                            <span className="font-medium text-green-600">+$3,120</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
=======
                  <p>Strategies module will be loaded here...</p>
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="positions" className="space-y-4">
              <Card>
                <CardHeader>
<<<<<<< HEAD
                  <CardTitle>Current Positions</CardTitle>
                  <CardDescription>Active trading positions with Greeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {positions.map((position) => (
                      <Card key={position.id} className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{position.symbol}</CardTitle>
                              <CardDescription>
                                {position.type === 'option' ? 'Option' : position.type === 'stock' ? 'Stock' : 'Future'} • {position.quantity > 0 ? 'Long' : 'Short'} {Math.abs(position.quantity)} shares
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <div className={`text-lg font-bold ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(position.pnl)}
                              </div>
                              <div className={`text-sm ${position.pnlPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatPercentage(position.pnlPercent)}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">Entry Price</div>
                              <div className="font-medium">{formatCurrency(position.entryPrice)}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Current Price</div>
                              <div className="font-medium">{formatCurrency(position.currentPrice)}</div>
                            </div>
                            {position.type === 'option' && (
                              <>
                                <div>
                                  <div className="text-gray-500">Delta</div>
                                  <div className={`font-medium ${getGreeksColor(position.delta)}`}>
                                    {position.delta.toFixed(3)}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-500">Gamma</div>
                                  <div className={`font-medium ${getGreeksColor(position.gamma)}`}>
                                    {position.gamma.toFixed(3)}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-500">Theta</div>
                                  <div className={`font-medium ${getGreeksColor(position.theta)}`}>
                                    {position.theta.toFixed(3)}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
=======
                  <CardTitle>Positions Management</CardTitle>
                  <CardDescription>Current trading positions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Positions module will be loaded here...</p>
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
<<<<<<< HEAD
                  <CardDescription>Comprehensive portfolio performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Alpha</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                          {formatPercentage(portfolioMetrics.alpha)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          vs benchmark
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Beta</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                          {portfolioMetrics.beta.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Market correlation
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sortino Ratio</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                          {portfolioMetrics.sortinoRatio.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Risk-adjusted return
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Calmar Ratio</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                          {portfolioMetrics.calmarRatio.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Return vs drawdown
                        </p>
                      </CardContent>
                    </Card>
                  </div>
=======
                  <CardDescription>Portfolio performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Performance module will be loaded here...</p>
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="backtesting" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Backtesting Engine</CardTitle>
                  <CardDescription>Strategy backtesting and validation</CardDescription>
                </CardHeader>
                <CardContent>
<<<<<<< HEAD
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold mb-2">Backtesting Module</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Advanced backtesting capabilities with historical data analysis
                    </p>
                  </div>
=======
                  <p>Backtesting module will be loaded here...</p>
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="market" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Market Data</CardTitle>
                  <CardDescription>Real-time market data feeds</CardDescription>
                </CardHeader>
                <CardContent>
<<<<<<< HEAD
                  <div className="space-y-4">
                    {marketData.map((data) => (
                      <Card key={data.symbol} className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{data.symbol}</CardTitle>
                              <CardDescription>
                                Market Cap: {formatCurrency(data.marketCap)}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">{formatCurrency(data.price)}</div>
                              <div className={`text-sm ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {data.change >= 0 ? '+' : ''}{formatCurrency(data.change)} ({formatPercentage(data.changePercent)})
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">Volume</div>
                              <div className="font-medium">{formatNumber(data.volume)}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">P/E Ratio</div>
                              <div className="font-medium">{data.pe.toFixed(1)}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Dividend</div>
                              <div className="font-medium">{data.dividend.toFixed(2)}%</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Market Cap</div>
                              <div className="font-medium">{(data.marketCap / 1000000000).toFixed(1)}B</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
=======
                  <p>Market data module will be loaded here...</p>
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risk" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Management</CardTitle>
                  <CardDescription>Risk monitoring and management</CardDescription>
                </CardHeader>
                <CardContent>
<<<<<<< HEAD
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-200">Portfolio Risk Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Value at Risk (95%)</span>
                          <span className="font-medium text-red-600">-$45,230</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Expected Shortfall</span>
                          <span className="font-medium text-red-600">-$68,450</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Beta Adjusted VaR</span>
                          <span className="font-medium text-orange-600">-$38,440</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Stress Test Loss</span>
                          <span className="font-medium text-red-600">-$125,000</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-200">Risk Limits</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Portfolio VaR Limit</span>
                          <span className="font-medium">-$50,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Position Size Limit</span>
                          <span className="font-medium">10%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Margin Utilization</span>
                          <span className="font-medium text-yellow-600">85%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Concentration Limit</span>
                          <span className="font-medium">20%</span>
                        </div>
                      </div>
                    </div>
                  </div>
=======
                  <p>Risk management module will be loaded here...</p>
>>>>>>> d6e466b85a3e63aa609bbcc18e6867876e5de1be
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}