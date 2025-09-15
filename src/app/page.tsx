'use client'

import { useState, useEffect } from 'react'
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
  Zap
} from 'lucide-react'
import VolatilityStrategy from '@/components/strategies/VolatilityStrategy'
import SkewArbitrage from '@/components/strategies/SkewArbitrage'
import CalendarSpread from '@/components/strategies/CalendarSpread'
import RiskManagement from '@/components/risk/RiskManagement'
import PortfolioManagement from '@/components/portfolio/PortfolioManagement'

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

interface Strategy {
  id: string
  name: string
  type: string
  status: string
  allocation: number
  dailyPnL: number
  totalReturn: number
  tradesCount: number
  winRate: number
}

interface Position {
  id: string
  symbol: string
  underlying: string
  type: string
  quantity: number
  entryPrice: number
  currentPrice: number
  unrealizedPnL: number
  strategy: string
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

  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: '1',
      name: 'Delta-Neutral Volatility',
      type: 'DELTA_NEUTRAL_VOLATILITY',
      status: 'ACTIVE',
      allocation: 35,
      dailyPnL: 5200,
      totalReturn: 18.2,
      tradesCount: 145,
      winRate: 65.5
    },
    {
      id: '2',
      name: 'Skew Arbitrage',
      type: 'SKEW_ARBITRAGE',
      status: 'ACTIVE',
      allocation: 25,
      dailyPnL: 3100,
      totalReturn: 12.8,
      tradesCount: 89,
      winRate: 58.4
    },
    {
      id: '3',
      name: 'Calendar Spread',
      type: 'CALENDAR_SPREAD',
      status: 'PAUSED',
      allocation: 20,
      dailyPnL: -800,
      totalReturn: 8.5,
      tradesCount: 67,
      winRate: 71.2
    },
    {
      id: '4',
      name: 'Dispersion Trading',
      type: 'DISPERSION_TRADING',
      status: 'ACTIVE',
      allocation: 20,
      dailyPnL: 5000,
      totalReturn: 22.1,
      tradesCount: 112,
      winRate: 68.3
    }
  ])

  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      symbol: 'SPX 240517C5200',
      underlying: 'SPX',
      type: 'CALL',
      quantity: 10,
      entryPrice: 12.50,
      currentPrice: 15.20,
      unrealizedPnL: 2700,
      strategy: 'Delta-Neutral Volatility'
    },
    {
      id: '2',
      symbol: 'SPX 240517P4800',
      underlying: 'SPX',
      type: 'PUT',
      quantity: -15,
      entryPrice: 8.75,
      currentPrice: 6.20,
      unrealizedPnL: 3825,
      strategy: 'Delta-Neutral Volatility'
    },
    {
      id: '3',
      symbol: 'QQQ 240524P440',
      underlying: 'QQQ',
      type: 'PUT',
      quantity: 25,
      entryPrice: 3.20,
      currentPrice: 4.15,
      unrealizedPnL: 2375,
      strategy: 'Skew Arbitrage'
    }
  ])

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500'
      case 'PAUSED': return 'bg-yellow-500'
      case 'STOPPED': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quantitative Trading Dashboard</h1>
            <p className="text-muted-foreground">Advanced Options Trading Platform</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Activity className="w-3 h-3 mr-1" />
              Live Trading
            </Badge>
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(portfolioMetrics.totalValue)}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(portfolioMetrics.cash)} cash available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily P&L</CardTitle>
              {portfolioMetrics.dailyPnL >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${portfolioMetrics.dailyPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(portfolioMetrics.dailyPnL)}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatPercentage(portfolioMetrics.dailyReturn)} today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatPercentage(portfolioMetrics.totalReturn)}
              </div>
              <p className="text-xs text-muted-foreground">
                Sharpe: {portfolioMetrics.sharpeRatio.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Metrics</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatPercentage(portfolioMetrics.maxDrawdown)}
              </div>
              <p className="text-xs text-muted-foreground">
                Max Drawdown
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Risk Alert */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Portfolio margin utilization at {((portfolioMetrics.margin / portfolioMetrics.totalValue) * 100).toFixed(1)}%. 
            Current margin: {formatCurrency(portfolioMetrics.margin)}
          </AlertDescription>
        </Alert>

        {/* Main Content Tabs */}
        <Tabs defaultValue="strategies" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="risk">Risk Management</TabsTrigger>
          </TabsList>

          <TabsContent value="strategies" className="space-y-4">
            <Tabs defaultValue="volatility" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="volatility">Volatility Trading</TabsTrigger>
                <TabsTrigger value="skew">Skew Arbitrage</TabsTrigger>
                <TabsTrigger value="calendar">Calendar Spread</TabsTrigger>
              </TabsList>
              
              <TabsContent value="volatility">
                <VolatilityStrategy />
              </TabsContent>
              
              <TabsContent value="skew">
                <SkewArbitrage />
              </TabsContent>
              
              <TabsContent value="calendar">
                <CalendarSpread />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="positions" className="space-y-4">
            <div className="grid gap-4">
              {positions.map((position) => (
                <Card key={position.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          {position.symbol}
                          <Badge variant={position.type === 'CALL' ? 'default' : 'secondary'}>
                            {position.type}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {position.underlying} • {position.strategy}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${position.unrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(position.unrealizedPnL)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {position.quantity > 0 ? 'Long' : 'Short'} {Math.abs(position.quantity)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Entry Price</div>
                        <div className="text-lg font-semibold">${position.entryPrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Current Price</div>
                        <div className="text-lg font-semibold">${position.currentPrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">P&L per Contract</div>
                        <div className={`text-lg font-semibold ${position.unrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${((position.currentPrice - position.entryPrice) * (position.quantity > 0 ? 1 : -1)).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Actions</div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Hedge
                          </Button>
                          <Button size="sm" variant="outline">
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <PortfolioManagement />
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <RiskManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}