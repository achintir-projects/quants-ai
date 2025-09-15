'use client'

import { useState } from 'react'
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
  Brain
} from 'lucide-react'

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
    margin: 850000
  })

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-blue-600">AI-Powered</span>
            <br />
            <span className="text-gray-900 dark:text-white">Quantum Brain</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Self-Improving Adaptive Trading Platform with Advanced Machine Learning
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
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
            </div>
          </div>
        </div>

        {/* Enhanced Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Portfolio Value</CardTitle>
              <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(portfolioMetrics.totalValue)}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatCurrency(portfolioMetrics.cash)} cash available
              </p>
              <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
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

          <Card className="hover:shadow-lg transition-shadow">
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
                  <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">78%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
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
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Risk monitoring</span>
              </div>
            </CardContent>
          </Card>
        </div>

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
                      <div className="text-xl font-bold text-blue-600">AI-Powered Quantum Brain</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Self-Improving Adaptive Trading Platform</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold mb-2">Advanced AI System Active</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      The enhanced UI is now visible! This includes modern styling, gradients, and improved user experience.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trading Strategies</CardTitle>
                  <CardDescription>Advanced options trading strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Strategies module will be loaded here...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="positions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Positions Management</CardTitle>
                  <CardDescription>Current trading positions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Positions module will be loaded here...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Portfolio performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Performance module will be loaded here...</p>
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
                  <p>Backtesting module will be loaded here...</p>
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
                  <p>Market data module will be loaded here...</p>
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
                  <p>Risk management module will be loaded here...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}