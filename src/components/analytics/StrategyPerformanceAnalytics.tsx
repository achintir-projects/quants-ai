'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Activity,
  DollarSign,
  Percent,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Zap,
  AlertTriangle,
  Clock,
  Award,
  Star,
  PieChart
} from 'lucide-react'

interface PerformanceMetric {
  strategy: string
  totalReturn: number
  sharpeRatio: number
  sortinoRatio: number
  maxDrawdown: number
  calmarRatio: number
  winRate: number
  profitFactor: number
  totalTrades: number
  avgTrade: number
  stdDev: number
  informationRatio: number
  beta: number
  alpha: number
  treynorRatio: number
  var_95: number
  var_99: number
  expectedShortfall: number
  uptime: number
  bestMonth: number
  worstMonth: number
  avgMonthlyReturn: number
  positiveMonths: number
  negativeMonths: number
  consecutiveWins: number
  consecutiveLosses: number
  largestWin: number
  largestLoss: number
  avgWin: number
  avgLoss: number
  payoffRatio: number
  recoveryFactor: number
  kellyCriterion: number
  ulcerIndex: number
  sterlingRatio: number
  burkeRatio: number
  martinRatio: number
}

interface MonthlyPerformance {
  month: string
  return: number
  volatility: number
  sharpe: number
  drawdown: number
  trades: number
  winRate: number
}

interface DrawdownAnalysis {
  startDate: string
  endDate: string
  depth: number
  duration: number
  recovery: number
  type: 'NORMAL' | 'SEVERE' | 'EXTREME'
}

interface RiskMetrics {
  var_95_daily: number
  var_95_monthly: number
  var_95_annual: number
  expected_shortfall_95: number
  beta_sp500: number
  beta_nasdaq: number
  correlation_sp500: number
  correlation_nasdaq: number
  tracking_error: number
  information_ratio: number
  downside_deviation: number
  upside_deviation: number
  omega_ratio: number
  sortino_ratio: number
  calmar_ratio: number
  sterling_ratio: number
}

export default function StrategyPerformanceAnalytics() {
  const [selectedStrategy, setSelectedStrategy] = useState('all')
  const [timeframe, setTimeframe] = useState('1y')
  const [benchmark, setBenchmark] = useState('SPX')

  const performanceData: PerformanceMetric[] = [
    {
      strategy: 'Delta-Neutral Volatility',
      totalReturn: 18.5,
      sharpeRatio: 2.1,
      sortinoRatio: 2.8,
      maxDrawdown: -8.2,
      calmarRatio: 2.26,
      winRate: 62.5,
      profitFactor: 1.8,
      totalTrades: 145,
      avgTrade: 1275,
      stdDev: 8.8,
      informationRatio: 0.85,
      beta: 0.65,
      alpha: 8.2,
      treynorRatio: 12.4,
      var_95: -2.1,
      var_99: -3.5,
      expectedShortfall: -2.8,
      uptime: 78.5,
      bestMonth: 8.2,
      worstMonth: -3.8,
      avgMonthlyReturn: 1.54,
      positiveMonths: 9,
      negativeMonths: 3,
      consecutiveWins: 7,
      consecutiveLosses: 3,
      largestWin: 8900,
      largestLoss: -4200,
      avgWin: 2100,
      avgLoss: -1250,
      payoffRatio: 1.68,
      recoveryFactor: 2.25,
      kellyCriterion: 0.18,
      ulcerIndex: 3.2,
      sterlingRatio: 1.85,
      burkeRatio: 1.42,
      martinRatio: 2.15
    },
    {
      strategy: 'Skew Arbitrage',
      totalReturn: 12.8,
      sharpeRatio: 1.8,
      sortinoRatio: 2.2,
      maxDrawdown: -6.5,
      calmarRatio: 1.97,
      winRate: 58.4,
      profitFactor: 1.6,
      totalTrades: 89,
      avgTrade: 1438,
      stdDev: 7.1,
      informationRatio: 0.72,
      beta: 0.45,
      alpha: 6.8,
      treynorRatio: 15.1,
      var_95: -1.8,
      var_99: -2.9,
      expectedShortfall: -2.3,
      uptime: 82.1,
      bestMonth: 6.5,
      worstMonth: -2.9,
      avgMonthlyReturn: 1.07,
      positiveMonths: 10,
      negativeMonths: 2,
      consecutiveWins: 5,
      consecutiveLosses: 2,
      largestWin: 6800,
      largestLoss: -3200,
      avgWin: 1850,
      avgLoss: -1100,
      payoffRatio: 1.68,
      recoveryFactor: 1.97,
      kellyCriterion: 0.15,
      ulcerIndex: 2.8,
      sterlingRatio: 1.62,
      burkeRatio: 1.28,
      martinRatio: 1.85
    },
    {
      strategy: 'Calendar Spread',
      totalReturn: 8.5,
      sharpeRatio: 1.4,
      sortinoRatio: 1.8,
      maxDrawdown: -4.2,
      calmarRatio: 2.02,
      winRate: 71.2,
      profitFactor: 2.1,
      totalTrades: 67,
      avgTrade: 1269,
      stdDev: 6.1,
      informationRatio: 0.58,
      beta: 0.25,
      alpha: 4.2,
      treynorRatio: 18.8,
      var_95: -1.2,
      var_99: -2.1,
      expectedShortfall: -1.7,
      uptime: 85.3,
      bestMonth: 4.2,
      worstMonth: -1.8,
      avgMonthlyReturn: 0.71,
      positiveMonths: 11,
      negativeMonths: 1,
      consecutiveWins: 4,
      consecutiveLosses: 1,
      largestWin: 4200,
      largestLoss: -1800,
      avgWin: 1650,
      avgLoss: -850,
      payoffRatio: 1.94,
      recoveryFactor: 2.02,
      kellyCriterion: 0.12,
      ulcerIndex: 1.9,
      sterlingRatio: 1.48,
      burkeRatio: 1.15,
      martinRatio: 1.62
    }
  ]

  const monthlyData: MonthlyPerformance[] = [
    { month: '2024-01', return: 2.5, volatility: 8.2, sharpe: 1.8, drawdown: -1.2, trades: 12, winRate: 58.3 },
    { month: '2024-02', return: 5.5, volatility: 7.8, sharpe: 2.2, drawdown: -0.8, trades: 15, winRate: 66.7 },
    { month: '2024-03', return: 4.0, volatility: 9.1, sharpe: 1.6, drawdown: -2.5, trades: 18, winRate: 61.1 },
    { month: '2024-04', return: 3.8, volatility: 8.5, sharpe: 1.7, drawdown: -1.8, trades: 14, winRate: 64.3 },
    { month: '2024-05', return: 2.7, volatility: 7.9, sharpe: 1.9, drawdown: -1.5, trades: 16, winRate: 68.8 }
  ]

  const drawdownData: DrawdownAnalysis[] = [
    { startDate: '2024-01-15', endDate: '2024-01-25', depth: -1.5, duration: 10, recovery: 8, type: 'NORMAL' },
    { startDate: '2024-02-10', endDate: '2024-02-20', depth: -2.5, duration: 10, recovery: 12, type: 'NORMAL' },
    { startDate: '2024-03-05', endDate: '2024-03-15', depth: -8.2, duration: 10, recovery: 25, type: 'SEVERE' },
    { startDate: '2024-04-10', endDate: '2024-04-20', depth: -2.0, duration: 10, recovery: 15, type: 'NORMAL' }
  ]

  const riskMetrics: RiskMetrics = {
    var_95_daily: -2.1,
    var_95_monthly: -9.5,
    var_95_annual: -33.2,
    expected_shortfall_95: -2.8,
    beta_sp500: 0.65,
    beta_nasdaq: 0.72,
    correlation_sp500: 0.58,
    correlation_nasdaq: 0.64,
    tracking_error: 8.5,
    information_ratio: 0.85,
    downside_deviation: 6.2,
    upside_deviation: 8.8,
    omega_ratio: 1.45,
    sortino_ratio: 2.8,
    calmar_ratio: 2.26,
    sterling_ratio: 1.85
  }

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

  const formatNumber = (value: number) => {
    return value.toFixed(2)
  }

  const getPerformanceColor = (value: number) => {
    if (value > 0) return 'text-green-600'
    if (value < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getRiskColor = (value: number) => {
    if (value > 0.1) return 'text-red-600'
    if (value > 0.05) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getDrawdownColor = (depth: number) => {
    if (depth < -10) return 'bg-red-500'
    if (depth < -5) return 'bg-orange-500'
    return 'bg-yellow-500'
  }

  const filteredData = selectedStrategy === 'all' 
    ? performanceData 
    : performanceData.filter(d => d.strategy === selectedStrategy)

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Strategy Performance Analytics</h2>
          <p className="text-muted-foreground">Comprehensive performance analysis and metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Strategies</SelectItem>
              {performanceData.map(d => (
                <SelectItem key={d.strategy} value={d.strategy}>{d.strategy}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="drawdown">Drawdowns</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatPercentage(filteredData.reduce((sum, d) => sum + d.totalReturn, 0) / filteredData.length)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average across strategies
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(filteredData.reduce((sum, d) => sum + d.sharpeRatio, 0) / filteredData.length)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Risk-adjusted return
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(filteredData.reduce((sum, d) => sum + d.winRate, 0) / filteredData.length)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Average win rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatPercentage(Math.min(...filteredData.map(d => d.maxDrawdown)))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Worst drawdown
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Strategy Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Strategy Performance Comparison</CardTitle>
              <CardDescription>Detailed metrics across all strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredData.map((data) => (
                  <div key={data.strategy} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{data.strategy}</h3>
                      <Badge variant={data.totalReturn > 0 ? "default" : "secondary"}>
                        {data.totalReturn > 0 ? "Profitable" : "Loss"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Total Return</div>
                        <div className={`text-lg font-semibold ${getPerformanceColor(data.totalReturn)}`}>
                          {formatPercentage(data.totalReturn)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                        <div className="text-lg font-semibold">{formatNumber(data.sharpeRatio)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Max Drawdown</div>
                        <div className={`text-lg font-semibold ${getPerformanceColor(data.maxDrawdown)}`}>
                          {formatPercentage(data.maxDrawdown)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Win Rate</div>
                        <div className="text-lg font-semibold">{formatNumber(data.winRate)}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Profit Factor</div>
                        <div className="text-lg font-semibold">{formatNumber(data.profitFactor)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Trades</div>
                        <div className="text-lg font-semibold">{data.totalTrades}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Return Distribution</CardTitle>
                <CardDescription>Distribution of strategy returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Return distribution chart</p>
                    <p className="text-sm text-gray-400">Interactive visualization would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk vs Return</CardTitle>
                <CardDescription>Risk-return scatter plot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Target className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Risk-return analysis</p>
                    <p className="text-sm text-gray-400">Interactive scatter plot would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          {/* Risk Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Value at Risk (VaR)</CardTitle>
                <CardDescription>Maximum expected loss at confidence levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Daily 95% VaR</span>
                  <span className={`font-semibold ${getPerformanceColor(riskMetrics.var_95_daily)}`}>
                    {formatPercentage(riskMetrics.var_95_daily)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Monthly 95% VaR</span>
                  <span className={`font-semibold ${getPerformanceColor(riskMetrics.var_95_monthly)}`}>
                    {formatPercentage(riskMetrics.var_95_monthly)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Annual 95% VaR</span>
                  <span className={`font-semibold ${getPerformanceColor(riskMetrics.var_95_annual)}`}>
                    {formatPercentage(riskMetrics.var_95_annual)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expected Shortfall</span>
                  <span className={`font-semibold ${getPerformanceColor(riskMetrics.expected_shortfall_95)}`}>
                    {formatPercentage(riskMetrics.expected_shortfall_95)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Market Risk</CardTitle>
                <CardDescription>Beta and correlation analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Beta (S&P 500)</span>
                  <span className="font-semibold">{formatNumber(riskMetrics.beta_sp500)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Beta (NASDAQ)</span>
                  <span className="font-semibold">{formatNumber(riskMetrics.beta_nasdaq)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Correlation (S&P 500)</span>
                  <span className="font-semibold">{formatNumber(riskMetrics.correlation_sp500)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Correlation (NASDAQ)</span>
                  <span className="font-semibold">{formatNumber(riskMetrics.correlation_nasdaq)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tracking Error</span>
                  <span className={`font-semibold ${getRiskColor(riskMetrics.tracking_error / 100)}`}>
                    {formatPercentage(riskMetrics.tracking_error)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Advanced Ratios</CardTitle>
                <CardDescription>Sophisticated risk-adjusted metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Information Ratio</span>
                  <span className="font-semibold">{formatNumber(riskMetrics.information_ratio)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sortino Ratio</span>
                  <span className="font-semibold">{formatNumber(riskMetrics.sortino_ratio)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Calmar Ratio</span>
                  <span className="font-semibold">{formatNumber(riskMetrics.calmar_ratio)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sterling Ratio</span>
                  <span className="font-semibold">{formatNumber(riskMetrics.sterling_ratio)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Omega Ratio</span>
                  <span className="font-semibold">{formatNumber(riskMetrics.omega_ratio)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Analysis Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Value at Risk Analysis</CardTitle>
                <CardDescription>VaR at different confidence levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">VaR analysis chart</p>
                    <p className="text-sm text-gray-400">Interactive VaR visualization would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Correlation Matrix</CardTitle>
                <CardDescription>Correlation with benchmark indices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Correlation matrix</p>
                    <p className="text-sm text-gray-400">Interactive correlation heatmap would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drawdown" className="space-y-6">
          {/* Drawdown Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Drawdown Analysis</CardTitle>
              <CardDescription>Historical drawdown periods and recovery analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drawdownData.map((drawdown) => (
                  <div key={drawdown.startDate} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">
                          {drawdown.startDate} - {drawdown.endDate}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Duration: {drawdown.duration} days
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getDrawdownColor(drawdown.depth)}>
                          {drawdown.type}
                        </Badge>
                        <span className={`text-lg font-bold ${getPerformanceColor(drawdown.depth)}`}>
                          {formatPercentage(drawdown.depth)}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Depth</div>
                        <div className={`font-semibold ${getPerformanceColor(drawdown.depth)}`}>
                          {formatPercentage(drawdown.depth)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-semibold">{drawdown.duration} days</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Recovery</div>
                        <div className="font-semibold">{drawdown.recovery} days</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Type</div>
                        <Badge className={getDrawdownColor(drawdown.depth)}>
                          {drawdown.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Drawdown Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Drawdown Curve</CardTitle>
              <CardDescription>Portfolio drawdown over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingDown className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Drawdown curve visualization</p>
                  <p className="text-sm text-gray-400">Interactive drawdown chart would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          {/* Monthly Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Breakdown</CardTitle>
              <CardDescription>Detailed monthly performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((month) => (
                  <div key={month.month} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{month.month}</h3>
                      <span className={`text-lg font-bold ${getPerformanceColor(month.return)}`}>
                        {formatPercentage(month.return)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Return</div>
                        <div className={`font-semibold ${getPerformanceColor(month.return)}`}>
                          {formatPercentage(month.return)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Volatility</div>
                        <div className="font-semibold">{formatNumber(month.volatility)}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Sharpe</div>
                        <div className="font-semibold">{formatNumber(month.sharpe)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Trades</div>
                        <div className="font-semibold">{month.trades}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Win Rate</div>
                        <div className="font-semibold">{formatNumber(month.winRate)}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Chart</CardTitle>
              <CardDescription>Monthly returns and volatility over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Monthly performance chart</p>
                  <p className="text-sm text-gray-400">Interactive monthly visualization would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          {/* Advanced Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trade Statistics</CardTitle>
                <CardDescription>Detailed trading performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredData.map((data) => (
                  <div key={data.strategy} className="border-b pb-2 last:border-b-0">
                    <div className="font-medium text-sm">{data.strategy}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Avg Trade: <span className="font-semibold">{formatCurrency(data.avgTrade)}</span></div>
                      <div>Std Dev: <span className="font-semibold">{formatNumber(data.stdDev)}%</span></div>
                      <div>Largest Win: <span className="font-semibold text-green-600">{formatCurrency(data.largestWin)}</span></div>
                      <div>Largest Loss: <span className="font-semibold text-red-600">{formatCurrency(data.largestLoss)}</span></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Win/Loss Analysis</CardTitle>
                <CardDescription>Winning and losing trade statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredData.map((data) => (
                  <div key={data.strategy} className="border-b pb-2 last:border-b-0">
                    <div className="font-medium text-sm">{data.strategy}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Avg Win: <span className="font-semibold text-green-600">{formatCurrency(data.avgWin)}</span></div>
                      <div>Avg Loss: <span className="font-semibold text-red-600">{formatCurrency(data.avgLoss)}</span></div>
                      <div>Payoff Ratio: <span className="font-semibold">{formatNumber(data.payoffRatio)}</span></div>
                      <div>Consecutive Wins: <span className="font-semibold">{data.consecutiveWins}</span></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Advanced Ratios</CardTitle>
                <CardDescription>Sophisticated performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredData.map((data) => (
                  <div key={data.strategy} className="border-b pb-2 last:border-b-0">
                    <div className="font-medium text-sm">{data.strategy}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Kelly: <span className="font-semibold">{formatNumber(data.kellyCriterion)}</span></div>
                      <div>Ulcer: <span className="font-semibold">{formatNumber(data.ulcerIndex)}</span></div>
                      <div>Martin: <span className="font-semibold">{formatNumber(data.martinRatio)}</span></div>
                      <div>Burke: <span className="font-semibold">{formatNumber(data.burkeRatio)}</span></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Advanced Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monte Carlo Simulation</CardTitle>
                <CardDescription>Probabilistic performance scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Monte Carlo simulation</p>
                    <p className="text-sm text-gray-400">Probabilistic scenario analysis would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficiency Frontier</CardTitle>
                <CardDescription>Optimal portfolio allocation analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Award className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Efficiency frontier</p>
                    <p className="text-sm text-gray-400">Portfolio optimization visualization would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}