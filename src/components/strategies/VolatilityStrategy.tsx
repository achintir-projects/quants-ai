'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Settings,
  Play,
  Pause,
  BarChart3,
  Target,
  Zap
} from 'lucide-react'

interface StrategyParameters {
  edgeThreshold: number
  maxPositionSize: number
  hedgeFrequency: number
  volatilityWindow: number
  riskPerTrade: number
  maxPortfolioRisk: number
  underlyingSymbols: string[]
  minLiquidity: number
  maxSpread: number
}

interface StrategySignal {
  id: string
  symbol: string
  underlying: string
  strategy: string
  signal: 'BUY' | 'SELL'
  edge: number
  confidence: number
  impliedVol: number
  realizedVol: number
  timestamp: Date
  status: 'PENDING' | 'EXECUTED' | 'EXPIRED'
}

interface StrategyPerformance {
  totalTrades: number
  winRate: number
  profitFactor: number
  sharpeRatio: number
  maxDrawdown: number
  totalReturn: number
  currentDrawdown: number
  dailyPnL: number
  monthlyPnL: number
}

export default function VolatilityStrategy() {
  const [parameters, setParameters] = useState<StrategyParameters>({
    edgeThreshold: 15,
    maxPositionSize: 100000,
    hedgeFrequency: 30,
    volatilityWindow: 20,
    riskPerTrade: 2,
    maxPortfolioRisk: 15,
    underlyingSymbols: ['SPX', 'QQQ', 'IWM'],
    minLiquidity: 1000,
    maxSpread: 0.05
  })

  const [signals, setSignals] = useState<StrategySignal[]>([
    {
      id: '1',
      symbol: 'SPX 240517C5200',
      underlying: 'SPX',
      strategy: 'Delta-Neutral Volatility',
      signal: 'SELL',
      edge: 22.5,
      confidence: 85,
      impliedVol: 18.2,
      realizedVol: 14.1,
      timestamp: new Date(),
      status: 'PENDING'
    },
    {
      id: '2',
      symbol: 'QQQ 240524P440',
      underlying: 'QQQ',
      strategy: 'Skew Arbitrage',
      signal: 'BUY',
      edge: 18.7,
      confidence: 72,
      impliedVol: 22.1,
      realizedVol: 18.6,
      timestamp: new Date(Date.now() - 300000),
      status: 'EXECUTED'
    },
    {
      id: '3',
      symbol: 'SPX 240531C5250',
      underlying: 'SPX',
      strategy: 'Calendar Spread',
      signal: 'SELL',
      edge: 12.3,
      confidence: 68,
      impliedVol: 16.8,
      realizedVol: 14.7,
      timestamp: new Date(Date.now() - 600000),
      status: 'EXPIRED'
    }
  ])

  const [performance, setPerformance] = useState<StrategyPerformance>({
    totalTrades: 156,
    winRate: 64.1,
    profitFactor: 1.82,
    sharpeRatio: 2.15,
    maxDrawdown: -8.7,
    totalReturn: 18.9,
    currentDrawdown: -2.1,
    dailyPnL: 5200,
    monthlyPnL: 28500
  })

  const [isRunning, setIsRunning] = useState(false)

  const updateParameter = (key: keyof StrategyParameters, value: any) => {
    setParameters(prev => ({ ...prev, [key]: value }))
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

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BUY': return 'bg-green-500'
      case 'SELL': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500'
      case 'EXECUTED': return 'bg-green-500'
      case 'EXPIRED': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Strategy Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Volatility Trading Strategies</h2>
          <p className="text-muted-foreground">Advanced quantitative options trading strategies</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isRunning ? "default" : "secondary"}>
            {isRunning ? <Zap className="w-3 h-3 mr-1" /> : <Pause className="w-3 h-3 mr-1" />}
            {isRunning ? 'Active' : 'Paused'}
          </Badge>
          <Button
            onClick={() => setIsRunning(!isRunning)}
            variant={isRunning ? "destructive" : "default"}
          >
            {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isRunning ? 'Stop' : 'Start'}
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatPercentage(performance.totalReturn)}
            </div>
            <p className="text-xs text-muted-foreground">
              Sharpe: {performance.sharpeRatio.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performance.winRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {performance.totalTrades} trades
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily P&L</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${performance.dailyPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(performance.dailyPnL)}
            </div>
            <p className="text-xs text-muted-foreground">
              Monthly: {formatCurrency(performance.monthlyPnL)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Drawdown</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatPercentage(performance.currentDrawdown)}
            </div>
            <p className="text-xs text-muted-foreground">
              Max: {formatPercentage(performance.maxDrawdown)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="parameters" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="signals">Trading Signals</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="backtest">Backtest</TabsTrigger>
        </TabsList>

        <TabsContent value="parameters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Strategy Parameters
              </CardTitle>
              <CardDescription>
                Configure the parameters for your volatility trading strategies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edgeThreshold">Edge Threshold (%)</Label>
                    <div className="mt-2">
                      <Slider
                        value={[parameters.edgeThreshold]}
                        onValueChange={(value) => updateParameter('edgeThreshold', value[0])}
                        max={50}
                        min={5}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>5%</span>
                        <span className="font-medium">{parameters.edgeThreshold}%</span>
                        <span>50%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="maxPositionSize">Max Position Size</Label>
                    <Input
                      id="maxPositionSize"
                      type="number"
                      value={parameters.maxPositionSize}
                      onChange={(e) => updateParameter('maxPositionSize', Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hedgeFrequency">Hedge Frequency (minutes)</Label>
                    <Select
                      value={parameters.hedgeFrequency.toString()}
                      onValueChange={(value) => updateParameter('hedgeFrequency', Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="volatilityWindow">Volatility Window (days)</Label>
                    <Input
                      id="volatilityWindow"
                      type="number"
                      value={parameters.volatilityWindow}
                      onChange={(e) => updateParameter('volatilityWindow', Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="riskPerTrade">Risk Per Trade (%)</Label>
                    <div className="mt-2">
                      <Slider
                        value={[parameters.riskPerTrade]}
                        onValueChange={(value) => updateParameter('riskPerTrade', value[0])}
                        max={10}
                        min={0.5}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>0.5%</span>
                        <span className="font-medium">{parameters.riskPerTrade}%</span>
                        <span>10%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="maxPortfolioRisk">Max Portfolio Risk (%)</Label>
                    <div className="mt-2">
                      <Slider
                        value={[parameters.maxPortfolioRisk]}
                        onValueChange={(value) => updateParameter('maxPortfolioRisk', value[0])}
                        max={50}
                        min={5}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>5%</span>
                        <span className="font-medium">{parameters.maxPortfolioRisk}%</span>
                        <span>50%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="minLiquidity">Min Liquidity (contracts)</Label>
                    <Input
                      id="minLiquidity"
                      type="number"
                      value={parameters.minLiquidity}
                      onChange={(e) => updateParameter('minLiquidity', Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxSpread">Max Spread (%)</Label>
                    <div className="mt-2">
                      <Slider
                        value={[parameters.maxSpread * 100]}
                        onValueChange={(value) => updateParameter('maxSpread', value[0] / 100)}
                        max={20}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>1%</span>
                        <span className="font-medium">{(parameters.maxSpread * 100).toFixed(1)}%</span>
                        <span>20%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Parameters</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Trading Signals
              </CardTitle>
              <CardDescription>
                Real-time trading signals generated by the strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {signals.map((signal) => (
                  <Card key={signal.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {signal.symbol}
                            <Badge className={getSignalColor(signal.signal)}>
                              {signal.signal}
                            </Badge>
                            <Badge className={getStatusColor(signal.status)}>
                              {signal.status}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            {signal.underlying} • {signal.strategy}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            Edge: {signal.edge.toFixed(1)}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Confidence: {signal.confidence}%
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Implied Vol</div>
                          <div className="text-lg font-semibold">{signal.impliedVol.toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Realized Vol</div>
                          <div className="text-lg font-semibold">{signal.realizedVol.toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Vol Spread</div>
                          <div className="text-lg font-semibold">
                            {(signal.impliedVol - signal.realizedVol).toFixed(1)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Actions</div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" disabled={signal.status !== 'PENDING'}>
                              Execute
                            </Button>
                            <Button size="sm" variant="outline">
                              Analyze
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Strategy Performance
              </CardTitle>
              <CardDescription>
                Detailed performance metrics and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Performance charts and analytics coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backtest" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Backtesting Engine
              </CardTitle>
              <CardDescription>
                Test your strategy parameters against historical data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calculator className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Backtesting engine coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}