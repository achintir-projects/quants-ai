'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { 
  Play, 
  Pause, 
  StopCircle, 
  RefreshCw, 
  Download, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Target,
  Activity,
  Clock,
  DollarSign,
  AlertTriangle,
  Settings,
  Eye,
  Save,
  Trash2,
  Zap,
  Calendar,
  Percent,
  Plus
} from 'lucide-react'

interface BacktestConfig {
  id: string
  name: string
  strategy: string
  startDate: string
  endDate: string
  initialCapital: number
  parameters: Record<string, any>
  status: 'DRAFT' | 'RUNNING' | 'COMPLETED' | 'FAILED'
  createdAt: Date
}

interface BacktestResult {
  id: string
  totalReturn: number
  sharpeRatio: number
  maxDrawdown: number
  winRate: number
  profitFactor: number
  totalTrades: number
  finalCapital: number
  annualizedReturn: number
  volatility: number
  calmarRatio: number
  sortinoRatio: number
  trades: TradeResult[]
  equity_curve: EquityPoint[]
  drawdown_curve: DrawdownPoint[]
}

interface TradeResult {
  id: string
  timestamp: Date
  symbol: string
  type: 'BUY_TO_OPEN' | 'SELL_TO_OPEN' | 'BUY_TO_CLOSE' | 'SELL_TO_CLOSE'
  quantity: number
  price: number
  commission: number
  slippage: number
  pnl: number
  cumulative_pnl: number
  strategy: string
}

interface EquityPoint {
  date: string
  value: number
  return: number
}

interface DrawdownPoint {
  date: string
  value: number
  drawdown: number
}

interface StrategyParameter {
  name: string
  type: 'number' | 'string' | 'boolean' | 'select'
  label: string
  description: string
  default: any
  min?: number
  max?: number
  step?: number
  options?: string[]
}

export default function BacktestingEngine() {
  const [backtests, setBacktests] = useState<BacktestConfig[]>([
    {
      id: '1',
      name: 'Volatility Strategy Backtest',
      strategy: 'DELTA_NEUTRAL_VOLATILITY',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      initialCapital: 1000000,
      parameters: {
        volatility_threshold: 0.3,
        hedge_ratio: 0.95,
        max_position_size: 0.1,
        stop_loss: 0.05
      },
      status: 'COMPLETED',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Skew Arbitrage Test',
      strategy: 'SKEW_ARBITRAGE',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      initialCapital: 500000,
      parameters: {
        skew_threshold: 0.15,
        hedge_frequency: 'DAILY',
        max_leverage: 2.0
      },
      status: 'RUNNING',
      createdAt: new Date('2024-02-01')
    }
  ])

  const [selectedBacktest, setSelectedBacktest] = useState<BacktestConfig>(backtests[0])
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<BacktestResult | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const [newBacktest, setNewBacktest] = useState({
    name: '',
    strategy: '',
    startDate: '',
    endDate: '',
    initialCapital: 1000000,
    parameters: {}
  })

  const strategyParameters: Record<string, StrategyParameter[]> = {
    DELTA_NEUTRAL_VOLATILITY: [
      {
        name: 'volatility_threshold',
        type: 'number',
        label: 'Volatility Threshold',
        description: 'Minimum volatility level to trigger trades',
        default: 0.3,
        min: 0.1,
        max: 1.0,
        step: 0.05
      },
      {
        name: 'hedge_ratio',
        type: 'number',
        label: 'Hedge Ratio',
        description: 'Target delta hedge ratio',
        default: 0.95,
        min: 0.8,
        max: 1.0,
        step: 0.01
      },
      {
        name: 'max_position_size',
        type: 'number',
        label: 'Max Position Size',
        description: 'Maximum position size as percentage of capital',
        default: 0.1,
        min: 0.01,
        max: 0.5,
        step: 0.01
      },
      {
        name: 'stop_loss',
        type: 'number',
        label: 'Stop Loss',
        description: 'Stop loss threshold as percentage',
        default: 0.05,
        min: 0.01,
        max: 0.2,
        step: 0.01
      }
    ],
    SKEW_ARBITRAGE: [
      {
        name: 'skew_threshold',
        type: 'number',
        label: 'Skew Threshold',
        description: 'Minimum skew difference to trigger trades',
        default: 0.15,
        min: 0.05,
        max: 0.5,
        step: 0.05
      },
      {
        name: 'hedge_frequency',
        type: 'select',
        label: 'Hedge Frequency',
        description: 'How often to rebalance hedges',
        default: 'DAILY',
        options: ['HOURLY', 'DAILY', 'WEEKLY']
      },
      {
        name: 'max_leverage',
        type: 'number',
        label: 'Max Leverage',
        description: 'Maximum leverage allowed',
        default: 2.0,
        min: 1.0,
        max: 5.0,
        step: 0.1
      }
    ],
    CALENDAR_SPREAD: [
      {
        name: 'min_days_to_expiry',
        type: 'number',
        label: 'Min Days to Expiry',
        description: 'Minimum days to expiration for near-term options',
        default: 7,
        min: 1,
        max: 30,
        step: 1
      },
      {
        name: 'max_days_to_expiry',
        type: 'number',
        label: 'Max Days to Expiry',
        description: 'Maximum days to expiration for far-term options',
        default: 45,
        min: 30,
        max: 90,
        step: 1
      },
      {
        name: 'spread_width',
        type: 'number',
        label: 'Spread Width',
        description: 'Target spread width in days',
        default: 30,
        min: 7,
        max: 60,
        step: 1
      }
    ]
  }

  const mockResults: BacktestResult = {
    id: '1',
    totalReturn: 18.5,
    sharpeRatio: 2.1,
    maxDrawdown: -8.2,
    winRate: 62.5,
    profitFactor: 1.8,
    totalTrades: 145,
    finalCapital: 1185000,
    annualizedReturn: 18.5,
    volatility: 8.8,
    calmarRatio: 2.26,
    sortinoRatio: 2.8,
    trades: [
      {
        id: '1',
        timestamp: new Date('2024-01-15'),
        symbol: 'SPX 240217C5000',
        type: 'BUY_TO_OPEN',
        quantity: 10,
        price: 125.50,
        commission: 50,
        slippage: 25,
        pnl: 0,
        cumulative_pnl: 0,
        strategy: 'DELTA_NEUTRAL_VOLATILITY'
      },
      {
        id: '2',
        timestamp: new Date('2024-01-15'),
        symbol: 'SPX 240217P4800',
        type: 'SELL_TO_OPEN',
        quantity: -15,
        price: 8.75,
        commission: 75,
        slippage: 18,
        pnl: 0,
        cumulative_pnl: 0,
        strategy: 'DELTA_NEUTRAL_VOLATILITY'
      }
    ],
    equity_curve: [
      { date: '2024-01-01', value: 1000000, return: 0 },
      { date: '2024-01-31', value: 1025000, return: 2.5 },
      { date: '2024-02-29', value: 1080000, return: 8.0 },
      { date: '2024-03-31', value: 1120000, return: 12.0 },
      { date: '2024-04-30', value: 1158000, return: 15.8 },
      { date: '2024-05-31', value: 1185000, return: 18.5 }
    ],
    drawdown_curve: [
      { date: '2024-01-01', value: 1000000, drawdown: 0 },
      { date: '2024-01-15', value: 985000, drawdown: -1.5 },
      { date: '2024-02-10', value: 975000, drawdown: -2.5 },
      { date: '2024-03-05', value: 918000, drawdown: -8.2 },
      { date: '2024-03-20', value: 950000, drawdown: -5.0 },
      { date: '2024-04-15', value: 980000, drawdown: -2.0 },
      { date: '2024-05-31', value: 1185000, drawdown: 0 }
    ]
  }

  useEffect(() => {
    if (selectedBacktest.status === 'COMPLETED') {
      setResults(mockResults)
    }
  }, [selectedBacktest])

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false)
            setSelectedBacktest(prevBacktest => ({
              ...prevBacktest,
              status: 'COMPLETED'
            }))
            setResults(mockResults)
            return 100
          }
          return prev + Math.random() * 10
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isRunning])

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
      case 'COMPLETED': return 'bg-green-500'
      case 'RUNNING': return 'bg-blue-500'
      case 'FAILED': return 'bg-red-500'
      case 'DRAFT': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const handleParameterChange = (paramName: string, value: any) => {
    setNewBacktest(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [paramName]: value
      }
    }))
  }

  const startBacktest = () => {
    setIsRunning(true)
    setProgress(0)
    setSelectedBacktest(prev => ({
      ...prev,
      status: 'RUNNING'
    }))
  }

  const stopBacktest = () => {
    setIsRunning(false)
    setSelectedBacktest(prev => ({
      ...prev,
      status: 'FAILED'
    }))
  }

  const createNewBacktest = () => {
    const newBacktestConfig: BacktestConfig = {
      id: Date.now().toString(),
      name: newBacktest.name,
      strategy: newBacktest.strategy,
      startDate: newBacktest.startDate,
      endDate: newBacktest.endDate,
      initialCapital: newBacktest.initialCapital,
      parameters: newBacktest.parameters,
      status: 'DRAFT',
      createdAt: new Date()
    }
    
    setBacktests(prev => [newBacktestConfig, ...prev])
    setSelectedBacktest(newBacktestConfig)
    setIsCreating(false)
    setNewBacktest({
      name: '',
      strategy: '',
      startDate: '',
      endDate: '',
      initialCapital: 1000000,
      parameters: {}
    })
  }

  return (
    <div className="space-y-6">
      {/* Backtesting Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Backtesting Engine</h2>
          <p className="text-muted-foreground">Test and optimize your trading strategies</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Backtest
          </Button>
        </div>
      </div>

      {/* Backtest Progress */}
      {isRunning && (
        <Alert>
          <Activity className="h-4 w-4" />
          <AlertDescription>
            Backtest in progress... {progress.toFixed(1)}% complete
            <Progress value={progress} className="mt-2" />
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <Tabs defaultValue="backtests" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="backtests">Backtests</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="trades">Trade Log</TabsTrigger>
        </TabsList>

        <TabsContent value="backtests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Backtest History
              </CardTitle>
              <CardDescription>
                View and manage your backtesting history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backtests.map((backtest) => (
                  <div 
                    key={backtest.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedBacktest.id === backtest.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedBacktest(backtest)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{backtest.name}</h3>
                          <Badge className={getStatusColor(backtest.status)}>
                            {backtest.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {backtest.strategy} • {backtest.startDate} to {backtest.endDate}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Capital: {formatCurrency(backtest.initialCapital)}</span>
                          <span>Created: {backtest.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {backtest.status === 'RUNNING' && (
                          <Button size="sm" variant="destructive" onClick={(e) => {
                            e.stopPropagation()
                            stopBacktest()
                          }}>
                            <StopCircle className="w-4 h-4" />
                          </Button>
                        )}
                        {backtest.status === 'DRAFT' && (
                          <Button size="sm" onClick={(e) => {
                            e.stopPropagation()
                            startBacktest()
                          }}>
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          {isCreating ? (
            <Card>
              <CardHeader>
                <CardTitle>Create New Backtest</CardTitle>
                <CardDescription>Configure your backtest parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Backtest Name</Label>
                    <Input
                      id="name"
                      value={newBacktest.name}
                      onChange={(e) => setNewBacktest(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter backtest name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="strategy">Strategy</Label>
                    <Select onValueChange={(value) => setNewBacktest(prev => ({ ...prev, strategy: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DELTA_NEUTRAL_VOLATILITY">Delta-Neutral Volatility</SelectItem>
                        <SelectItem value="SKEW_ARBITRAGE">Skew Arbitrage</SelectItem>
                        <SelectItem value="CALENDAR_SPREAD">Calendar Spread</SelectItem>
                        <SelectItem value="DISPERSION_TRADING">Dispersion Trading</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newBacktest.startDate}
                      onChange={(e) => setNewBacktest(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newBacktest.endDate}
                      onChange={(e) => setNewBacktest(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="initialCapital">Initial Capital</Label>
                    <Input
                      id="initialCapital"
                      type="number"
                      value={newBacktest.initialCapital}
                      onChange={(e) => setNewBacktest(prev => ({ ...prev, initialCapital: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                {newBacktest.strategy && strategyParameters[newBacktest.strategy] && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Strategy Parameters</h3>
                    {strategyParameters[newBacktest.strategy].map((param) => (
                      <div key={param.name} className="space-y-2">
                        <Label htmlFor={param.name}>{param.label}</Label>
                        <p className="text-sm text-muted-foreground">{param.description}</p>
                        {param.type === 'number' && (
                          <div className="space-y-2">
                            <Slider
                              value={[newBacktest.parameters[param.name] || param.default]}
                              onValueChange={(value) => handleParameterChange(param.name, value[0])}
                              min={param.min}
                              max={param.max}
                              step={param.step}
                              className="w-full"
                            />
                            <div className="text-sm text-muted-foreground">
                              Current: {newBacktest.parameters[param.name] || param.default}
                            </div>
                          </div>
                        )}
                        {param.type === 'select' && (
                          <Select onValueChange={(value) => handleParameterChange(param.name, value)}>
                            <SelectTrigger>
                              <SelectValue placeholder={param.default} />
                            </SelectTrigger>
                            <SelectContent>
                              {param.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={createNewBacktest}>Create Backtest</Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Backtest Configuration</CardTitle>
                <CardDescription>View and modify backtest parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Backtest Name</Label>
                      <div className="text-lg font-medium">{selectedBacktest.name}</div>
                    </div>
                    <div>
                      <Label>Strategy</Label>
                      <div className="text-lg font-medium">{selectedBacktest.strategy}</div>
                    </div>
                    <div>
                      <Label>Date Range</Label>
                      <div className="text-lg font-medium">
                        {selectedBacktest.startDate} to {selectedBacktest.endDate}
                      </div>
                    </div>
                    <div>
                      <Label>Initial Capital</Label>
                      <div className="text-lg font-medium">{formatCurrency(selectedBacktest.initialCapital)}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Parameters</h3>
                    <div className="grid gap-4">
                      {Object.entries(selectedBacktest.parameters).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{key.replace(/_/g, ' ')}</div>
                            <div className="text-sm text-muted-foreground">
                              {strategyParameters[selectedBacktest.strategy]?.find(p => p.name === key)?.description}
                            </div>
                          </div>
                          <div className="text-lg font-semibold">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {selectedBacktest.status === 'DRAFT' && (
                      <Button onClick={startBacktest}>
                        <Play className="w-4 h-4 mr-2" />
                        Start Backtest
                      </Button>
                    )}
                    {selectedBacktest.status === 'RUNNING' && (
                      <Button variant="destructive" onClick={stopBacktest}>
                        <StopCircle className="w-4 h-4 mr-2" />
                        Stop Backtest
                      </Button>
                    )}
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Configuration
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {results ? (
            <div className="space-y-6">
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {formatPercentage(results.totalReturn)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(results.finalCapital)} final value
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{results.sharpeRatio.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                      Risk-adjusted return
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
                      {formatPercentage(results.maxDrawdown)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Maximum loss
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{results.winRate.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">
                      {results.totalTrades} total trades
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Performance Metrics</CardTitle>
                  <CardDescription>Comprehensive backtest performance analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Annualized Return</div>
                        <div className="text-2xl font-bold text-green-600">
                          {formatPercentage(results.annualizedReturn)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Volatility</div>
                        <div className="text-2xl font-bold">{results.volatility.toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Profit Factor</div>
                        <div className="text-2xl font-bold">{results.profitFactor.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Calmar Ratio</div>
                        <div className="text-2xl font-bold">{results.calmarRatio.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Sortino Ratio</div>
                        <div className="text-2xl font-bold">{results.sortinoRatio.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Trades</div>
                        <div className="text-2xl font-bold">{results.totalTrades}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Initial Capital</div>
                        <div className="text-2xl font-bold">{formatCurrency(selectedBacktest.initialCapital)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Final Capital</div>
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(results.finalCapital)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total P&L</div>
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.finalCapital - selectedBacktest.initialCapital)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Equity Curve */}
              <Card>
                <CardHeader>
                  <CardTitle>Equity Curve</CardTitle>
                  <CardDescription>Portfolio value over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">Equity curve visualization</p>
                      <p className="text-sm text-gray-400">Interactive chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Drawdown Curve */}
              <Card>
                <CardHeader>
                  <CardTitle>Drawdown Analysis</CardTitle>
                  <CardDescription>Portfolio drawdown over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingDown className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">Drawdown curve visualization</p>
                      <p className="text-sm text-gray-400">Interactive chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Available</h3>
                  <p className="text-gray-500 mb-4">Run a backtest to see performance results</p>
                  <Button onClick={startBacktest}>
                    <Play className="w-4 h-4 mr-2" />
                    Start Backtest
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="trades" className="space-y-4">
          {results ? (
            <Card>
              <CardHeader>
                <CardTitle>Trade Log</CardTitle>
                <CardDescription>Detailed record of all trades executed during backtest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {results.trades.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{trade.symbol}</span>
                          <Badge variant={trade.type.includes('BUY') ? 'default' : 'secondary'}>
                            {trade.type}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {trade.timestamp.toLocaleDateString()} • {trade.strategy}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {trade.quantity > 0 ? '+' : ''}{trade.quantity} @ ${trade.price.toFixed(2)}
                        </div>
                        <div className={`text-sm ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          P&L: {formatCurrency(trade.pnl)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Target className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Trade Data</h3>
                  <p className="text-gray-500 mb-4">Run a backtest to see trade history</p>
                  <Button onClick={startBacktest}>
                    <Play className="w-4 h-4 mr-2" />
                    Start Backtest
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}