'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Target,
  Brain,
  BarChart3,
  Timer,
  DollarSign,
  Percent,
  Gauge,
  Rocket,
  Shield,
  Clock
} from 'lucide-react'

interface ExecutionOrder {
  id: string
  symbol: string
  side: 'BUY' | 'SELL'
  quantity: number
  type: 'MARKET' | 'LIMIT' | 'TWAP' | 'VWAP'
  status: 'PENDING' | 'EXECUTING' | 'COMPLETED' | 'CANCELLED' | 'FAILED'
  fillPrice?: number
  targetPrice?: number
  filledQuantity: number
  remainingQuantity: number
  averageSlippage: number
  marketImpact: number
  startTime: string
  estimatedCompletion: string
}

interface ReinforcementLearningModel {
  modelId: string
  name: string
  accuracy: number
  reward: number
  episodes: number
  convergenceRate: number
  status: 'TRAINING' | 'DEPLOYED' | 'EVALUATING' | 'OPTIMIZING'
  lastTrained: string
  performance: {
    winRate: number
    averageReward: number
    sharpeRatio: number
    maxDrawdown: number
  }
}

interface MarketImpactModel {
  asset: string
  currentImpact: number
  predictedImpact: number
  confidence: number
  factors: {
    orderSize: number
    marketDepth: number
    volatility: number
    timeOfDay: number
    liquidityScore: number
  }
  recommendation: 'PROCEED' | 'ADJUST' | 'DELAY' | 'CANCEL'
}

interface ExecutionMetrics {
  totalOrders: number
  activeOrders: number
  completionRate: number
  averageSlippage: number
  totalMarketImpact: number
  efficiency: number
  throughput: number
  latency: number
}

export default function IntelligentExecutionAgent() {
  const [executionOrders, setExecutionOrders] = useState<ExecutionOrder[]>([
    {
      id: '1',
      symbol: 'SPY',
      side: 'BUY',
      quantity: 10000,
      type: 'VWAP',
      status: 'EXECUTING',
      targetPrice: 450.25,
      fillPrice: 450.18,
      filledQuantity: 6500,
      remainingQuantity: 3500,
      averageSlippage: 0.07,
      marketImpact: 0.12,
      startTime: '2024-01-15T14:30:00Z',
      estimatedCompletion: '2024-01-15T16:00:00Z'
    },
    {
      id: '2',
      symbol: 'QQQ',
      side: 'SELL',
      quantity: 5000,
      type: 'TWAP',
      status: 'COMPLETED',
      targetPrice: 380.50,
      fillPrice: 380.48,
      filledQuantity: 5000,
      remainingQuantity: 0,
      averageSlippage: 0.02,
      marketImpact: 0.05,
      startTime: '2024-01-15T13:00:00Z',
      estimatedCompletion: '2024-01-15T15:00:00Z'
    },
    {
      id: '3',
      symbol: 'TLT',
      side: 'BUY',
      quantity: 15000,
      type: 'LIMIT',
      status: 'PENDING',
      targetPrice: 95.80,
      filledQuantity: 0,
      remainingQuantity: 15000,
      averageSlippage: 0,
      marketImpact: 0,
      startTime: '2024-01-15T15:30:00Z',
      estimatedCompletion: '2024-01-15T16:30:00Z'
    }
  ])

  const [rlModels, setRlModels] = useState<ReinforcementLearningModel[]>([
    {
      modelId: '1',
      name: 'VWAP Execution Agent',
      accuracy: 94.2,
      reward: 0.85,
      episodes: 15000,
      convergenceRate: 92.5,
      status: 'DEPLOYED',
      lastTrained: '2024-01-15T08:00:00Z',
      performance: {
        winRate: 87.3,
        averageReward: 0.82,
        sharpeRatio: 2.15,
        maxDrawdown: -2.8
      }
    },
    {
      modelId: '2',
      name: 'Market Impact Optimizer',
      accuracy: 89.7,
      reward: 0.78,
      episodes: 12000,
      convergenceRate: 88.3,
      status: 'TRAINING',
      lastTrained: '2024-01-15T10:00:00Z',
      performance: {
        winRate: 82.1,
        averageReward: 0.75,
        sharpeRatio: 1.92,
        maxDrawdown: -3.5
      }
    },
    {
      modelId: '3',
      name: 'Liquidity Seeker',
      accuracy: 91.5,
      reward: 0.81,
      episodes: 13500,
      convergenceRate: 90.8,
      status: 'DEPLOYED',
      lastTrained: '2024-01-15T09:00:00Z',
      performance: {
        winRate: 85.6,
        averageReward: 0.79,
        sharpeRatio: 2.05,
        maxDrawdown: -3.1
      }
    }
  ])

  const [marketImpactModels, setMarketImpactModels] = useState<MarketImpactModel[]>([
    {
      asset: 'SPY',
      currentImpact: 0.12,
      predictedImpact: 0.15,
      confidence: 92,
      factors: {
        orderSize: 0.8,
        marketDepth: 0.7,
        volatility: 0.6,
        timeOfDay: 0.4,
        liquidityScore: 0.8
      },
      recommendation: 'PROCEED'
    },
    {
      asset: 'QQQ',
      currentImpact: 0.08,
      predictedImpact: 0.22,
      confidence: 87,
      factors: {
        orderSize: 0.9,
        marketDepth: 0.5,
        volatility: 0.7,
        timeOfDay: 0.8,
        liquidityScore: 0.6
      },
      recommendation: 'ADJUST'
    },
    {
      asset: 'TLT',
      currentImpact: 0.05,
      predictedImpact: 0.18,
      confidence: 78,
      factors: {
        orderSize: 0.7,
        marketDepth: 0.4,
        volatility: 0.5,
        timeOfDay: 0.6,
        liquidityScore: 0.5
      },
      recommendation: 'DELAY'
    }
  ])

  const [executionMetrics, setExecutionMetrics] = useState<ExecutionMetrics>({
    totalOrders: 156,
    activeOrders: 3,
    completionRate: 94.2,
    averageSlippage: 0.05,
    totalMarketImpact: 0.08,
    efficiency: 91.5,
    throughput: 12.3,
    latency: 45
  })

  const [isExecuting, setIsExecuting] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (!isExecuting) return

    const interval = setInterval(() => {
      // Simulate real-time execution updates
      setExecutionOrders(prev => prev.map(order => {
        if (order.status === 'EXECUTING') {
          const newFilled = Math.min(order.quantity, order.filledQuantity + Math.floor(Math.random() * 500))
          return {
            ...order,
            filledQuantity: newFilled,
            remainingQuantity: order.quantity - newFilled,
            averageSlippage: order.averageSlippage + (Math.random() - 0.5) * 0.01,
            marketImpact: order.marketImpact + (Math.random() - 0.5) * 0.02,
            status: newFilled === order.quantity ? 'COMPLETED' : 'EXECUTING'
          }
        }
        return order
      }))

      // Update RL model performance
      setRlModels(prev => prev.map(model => ({
        ...model,
        accuracy: Math.max(0, Math.min(100, model.accuracy + (Math.random() - 0.5) * 0.5)),
        reward: Math.max(0, Math.min(1, model.reward + (Math.random() - 0.5) * 0.02)),
        performance: {
          ...model.performance,
          winRate: Math.max(0, Math.min(100, model.performance.winRate + (Math.random() - 0.5) * 1)),
          averageReward: Math.max(0, Math.min(1, model.performance.averageReward + (Math.random() - 0.5) * 0.02))
        }
      })))

      // Update market impact predictions
      setMarketImpactModels(prev => prev.map(model => ({
        ...model,
        currentImpact: Math.max(0, model.currentImpact + (Math.random() - 0.5) * 0.02),
        predictedImpact: Math.max(0, model.predictedImpact + (Math.random() - 0.5) * 0.03),
        confidence: Math.max(0, Math.min(100, model.confidence + (Math.random() - 0.5) * 2))
      })))

      // Update execution metrics
      setExecutionMetrics(prev => ({
        ...prev,
        averageSlippage: Math.max(0, prev.averageSlippage + (Math.random() - 0.5) * 0.01),
        efficiency: Math.max(0, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 1)),
        throughput: Math.max(0, prev.throughput + (Math.random() - 0.5) * 0.5),
        latency: Math.max(0, prev.latency + (Math.random() - 0.5) * 5)
      }))

      setLastUpdate(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [isExecuting])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
      case 'DEPLOYED':
        return 'bg-green-500'
      case 'EXECUTING':
      case 'TRAINING':
        return 'bg-blue-500'
      case 'PENDING':
      case 'EVALUATING':
        return 'bg-yellow-500'
      case 'CANCELLED':
        return 'bg-orange-500'
      case 'FAILED':
        return 'bg-red-500'
      case 'OPTIMIZING':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
      case 'DEPLOYED':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'EXECUTING':
      case 'TRAINING':
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
      case 'PENDING':
      case 'EVALUATING':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'CANCELLED':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />
      case 'FAILED':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'OPTIMIZING':
        return <Brain className="w-4 h-4 text-purple-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'PROCEED': return 'text-green-600'
      case 'ADJUST': return 'text-yellow-600'
      case 'DELAY': return 'text-orange-600'
      case 'CANCEL': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Intelligent Execution Agent</h2>
          <p className="text-muted-foreground">Reinforcement learning and market impact modeling</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="w-3 h-3 mr-1" />
            {isExecuting ? 'Executing' : 'Paused'}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExecuting(!isExecuting)}
          >
            {isExecuting ? 'Pause' : 'Resume'}
          </Button>
          <Badge variant="outline">
            Last Update: {lastUpdate.toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* Execution Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Execution Performance
          </CardTitle>
          <CardDescription>
            Real-time execution metrics and performance indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
              <div className="text-lg font-semibold text-green-600">{executionMetrics.completionRate.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Success rate</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Avg Slippage</div>
              <div className="text-lg font-semibold">{executionMetrics.averageSlippage.toFixed(3)}%</div>
              <div className="text-xs text-muted-foreground">Price impact</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Efficiency</div>
              <div className="text-lg font-semibold text-blue-600">{executionMetrics.efficiency.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Execution quality</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Latency</div>
              <div className="text-lg font-semibold">{executionMetrics.latency.toFixed(0)}ms</div>
              <div className="text-xs text-muted-foreground">Response time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Active Orders</TabsTrigger>
          <TabsTrigger value="rlmodels">RL Models</TabsTrigger>
          <TabsTrigger value="impact">Market Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <div className="space-y-4">
            {executionOrders.map((order) => (
              <Card key={order.id} className={order.status === 'FAILED' ? 'border-red-500' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      {order.symbol} - {order.side} {formatNumber(order.quantity)}
                    </span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <Badge variant="outline" className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {order.type} Order | Target: {order.targetPrice ? formatCurrency(order.targetPrice) : 'Market'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Filled</div>
                      <div className="text-lg font-semibold">{formatNumber(order.filledQuantity)}</div>
                      <div className="text-xs text-muted-foreground">of {formatNumber(order.quantity)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Avg Price</div>
                      <div className="text-lg font-semibold">
                        {order.fillPrice ? formatCurrency(order.fillPrice) : '-'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Slippage</div>
                      <div className={`text-lg font-semibold ${
                        order.averageSlippage > 0.1 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {formatPercentage(order.averageSlippage)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Market Impact</div>
                      <div className={`text-lg font-semibold ${
                        order.marketImpact > 0.15 ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {formatPercentage(order.marketImpact)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{((order.filledQuantity / order.quantity) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(order.filledQuantity / order.quantity) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rlmodels">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rlModels.map((model) => (
              <Card key={model.modelId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      {model.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(model.status)}
                      <Badge variant="outline" className={getStatusColor(model.status)}>
                        {model.status}
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Episodes: {formatNumber(model.episodes)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                      <div className="text-lg font-semibold">{model.accuracy.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Reward</div>
                      <div className="text-lg font-semibold">{model.reward.toFixed(3)}</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Convergence</span>
                      <span>{model.convergenceRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={model.convergenceRate} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-muted-foreground">Win Rate</div>
                      <div className="font-semibold">{model.performance.winRate.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Sharpe</div>
                      <div className="font-semibold">{model.performance.sharpeRatio.toFixed(2)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="impact">
          <div className="space-y-4">
            {marketImpactModels.map((model, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Gauge className="w-4 h-4" />
                      {model.asset} Market Impact
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getRecommendationColor(model.recommendation)}>
                        {model.recommendation}
                      </Badge>
                      <Badge variant="outline">
                        {model.confidence.toFixed(0)}% confidence
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    AI-powered market impact prediction
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Impact</div>
                      <div className="text-lg font-semibold">{formatPercentage(model.currentImpact)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Predicted Impact</div>
                      <div className="text-lg font-semibold">{formatPercentage(model.predictedImpact)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Order Size</div>
                      <div className="text-lg font-semibold">{formatPercentage(model.factors.orderSize)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Market Depth</div>
                      <div className="text-lg font-semibold">{formatPercentage(model.factors.marketDepth)}</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Volatility Factor</div>
                      <div className="font-semibold">{formatPercentage(model.factors.volatility)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Time of Day</div>
                      <div className="font-semibold">{formatPercentage(model.factors.timeOfDay)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Liquidity Score</div>
                      <div className="font-semibold">{formatPercentage(model.factors.liquidityScore)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}