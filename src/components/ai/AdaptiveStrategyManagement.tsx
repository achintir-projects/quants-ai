'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Settings, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Zap,
  Target,
  Brain,
  BarChart3,
  Shield,
  Clock
} from 'lucide-react'

interface StrategyParameters {
  id: string
  name: string
  currentValue: number
  optimalRange: [number, number]
  performance: number
  status: 'OPTIMAL' | 'ADJUSTING' | 'DEGRADED'
  lastOptimized: string
}

interface MarketRegime {
  name: string
  confidence: number
  characteristics: string[]
  duration: string
  impact: 'HIGH' | 'MEDIUM' | 'LOW'
}

interface StrategyPerformance {
  strategyId: string
  name: string
  currentReturn: number
  volatility: number
  sharpeRatio: number
  maxDrawdown: number
  winRate: number
  regime: string
  status: 'ACTIVE' | 'MONITORING' | 'ADJUSTING' | 'PAUSED'
}

interface OptimizationMetrics {
  totalStrategies: number
  activeOptimizations: number
  averageImprovement: number
  lastOptimization: string
  regimeChanges: number
  parameterAdjustments: number
}

export default function AdaptiveStrategyManagement() {
  const [strategyParameters, setStrategyParameters] = useState<StrategyParameters[]>([
    {
      id: '1',
      name: 'Volatility Threshold',
      currentValue: 18.5,
      optimalRange: [15, 25],
      performance: 87,
      status: 'OPTIMAL',
      lastOptimized: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Position Size Multiplier',
      currentValue: 1.2,
      optimalRange: [0.8, 1.5],
      performance: 92,
      status: 'OPTIMAL',
      lastOptimized: '2024-01-15T11:15:00Z'
    },
    {
      id: '3',
      name: 'Hedge Ratio',
      currentValue: 0.65,
      optimalRange: [0.5, 0.8],
      performance: 78,
      status: 'ADJUSTING',
      lastOptimized: '2024-01-15T09:45:00Z'
    },
    {
      id: '4',
      name: 'Stop Loss Distance',
      currentValue: 2.8,
      optimalRange: [2.0, 3.5],
      performance: 85,
      status: 'OPTIMAL',
      lastOptimized: '2024-01-15T12:00:00Z'
    }
  ])

  const [marketRegimes, setMarketRegimes] = useState<MarketRegime[]>([
    {
      name: 'Normal Volatility',
      confidence: 85,
      characteristics: ['Moderate volatility', 'Stable correlations', 'Normal liquidity'],
      duration: '3 days',
      impact: 'MEDIUM'
    },
    {
      name: 'High Volatility',
      confidence: 12,
      characteristics: ['Elevated volatility', 'Breaking correlations', 'Reduced liquidity'],
      duration: '0 days',
      impact: 'HIGH'
    },
    {
      name: 'Low Volatility',
      confidence: 3,
      characteristics: ['Low volatility', 'Strong correlations', 'High liquidity'],
      duration: '0 days',
      impact: 'LOW'
    }
  ])

  const [strategyPerformance, setStrategyPerformance] = useState<StrategyPerformance[]>([
    {
      strategyId: '1',
      name: 'Volatility Arbitrage',
      currentReturn: 12.5,
      volatility: 8.2,
      sharpeRatio: 1.52,
      maxDrawdown: -3.2,
      winRate: 68.5,
      regime: 'Normal Volatility',
      status: 'ACTIVE'
    },
    {
      strategyId: '2',
      name: 'Calendar Spread',
      currentReturn: 8.7,
      volatility: 5.8,
      sharpeRatio: 1.50,
      maxDrawdown: -2.1,
      winRate: 72.3,
      regime: 'Normal Volatility',
      status: 'ACTIVE'
    },
    {
      strategyId: '3',
      name: 'Skew Arbitrage',
      currentReturn: 15.2,
      volatility: 12.3,
      sharpeRatio: 1.24,
      maxDrawdown: -5.8,
      winRate: 61.2,
      regime: 'Normal Volatility',
      status: 'ADJUSTING'
    },
    {
      strategyId: '4',
      name: 'Delta Hedging',
      currentReturn: 6.8,
      volatility: 3.2,
      sharpeRatio: 2.13,
      maxDrawdown: -1.2,
      winRate: 85.7,
      regime: 'Normal Volatility',
      status: 'ACTIVE'
    }
  ])

  const [optimizationMetrics, setOptimizationMetrics] = useState<OptimizationMetrics>({
    totalStrategies: 4,
    activeOptimizations: 1,
    averageImprovement: 12.5,
    lastOptimization: '2024-01-15T12:00:00Z',
    regimeChanges: 2,
    parameterAdjustments: 156
  })

  const [isOptimizing, setIsOptimizing] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (!isOptimizing) return

    const interval = setInterval(() => {
      // Simulate real-time parameter adjustments
      setStrategyParameters(prev => prev.map(param => ({
        ...param,
        currentValue: param.currentValue + (Math.random() - 0.5) * 0.1,
        performance: Math.max(0, Math.min(100, param.performance + (Math.random() - 0.5) * 2))
      })))

      // Update strategy performance
      setStrategyPerformance(prev => prev.map(strategy => ({
        ...strategy,
        currentReturn: strategy.currentReturn + (Math.random() - 0.5) * 0.2,
        volatility: Math.max(0, strategy.volatility + (Math.random() - 0.5) * 0.1),
        sharpeRatio: Math.max(0, strategy.sharpeRatio + (Math.random() - 0.5) * 0.05)
      })))

      // Update market regime confidence
      setMarketRegimes(prev => prev.map(regime => ({
        ...regime,
        confidence: Math.max(0, Math.min(100, regime.confidence + (Math.random() - 0.5) * 2))
      })))

      setLastUpdate(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [isOptimizing])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPTIMAL':
      case 'ACTIVE':
        return 'bg-green-500'
      case 'ADJUSTING':
        return 'bg-yellow-500'
      case 'DEGRADED':
      case 'MONITORING':
        return 'bg-orange-500'
      case 'PAUSED':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPTIMAL':
      case 'ACTIVE':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'ADJUSTING':
        return <RefreshCw className="w-4 h-4 text-yellow-600 animate-spin" />
      case 'DEGRADED':
      case 'MONITORING':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />
      case 'PAUSED':
        return <Clock className="w-4 h-4 text-gray-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'HIGH': return 'text-red-600'
      case 'MEDIUM': return 'text-yellow-600'
      case 'LOW': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Adaptive Strategy Management</h2>
          <p className="text-muted-foreground">Dynamic parameter optimization and market regime detection</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="w-3 h-3 mr-1" />
            {isOptimizing ? 'Optimizing' : 'Paused'}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOptimizing(!isOptimizing)}
          >
            {isOptimizing ? 'Pause' : 'Resume'}
          </Button>
          <Badge variant="outline">
            Last Update: {lastUpdate.toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* Optimization Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Optimization Overview
          </CardTitle>
          <CardDescription>
            Real-time strategy optimization metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Total Strategies</div>
              <div className="text-lg font-semibold">{optimizationMetrics.totalStrategies}</div>
              <div className="text-xs text-muted-foreground">Under management</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Active Optimizations</div>
              <div className="text-lg font-semibold text-yellow-600">{optimizationMetrics.activeOptimizations}</div>
              <div className="text-xs text-muted-foreground">Currently adjusting</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Avg Improvement</div>
              <div className="text-lg font-semibold text-green-600">{formatPercentage(optimizationMetrics.averageImprovement)}</div>
              <div className="text-xs text-muted-foreground">Performance gain</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Parameter Adjustments</div>
              <div className="text-lg font-semibold">{optimizationMetrics.parameterAdjustments}</div>
              <div className="text-xs text-muted-foreground">Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="parameters" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="parameters">Strategy Parameters</TabsTrigger>
          <TabsTrigger value="regimes">Market Regimes</TabsTrigger>
          <TabsTrigger value="performance">Strategy Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="parameters">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategyParameters.map((param) => (
              <Card key={param.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      {param.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(param.status)}
                      <Badge variant="outline" className={getStatusColor(param.status)}>
                        {param.status}
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Optimal range: {param.optimalRange[0]} - {param.optimalRange[1]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Current Value</span>
                      <span className="font-semibold">{param.currentValue.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          param.currentValue >= param.optimalRange[0] && 
                          param.currentValue <= param.optimalRange[1] 
                            ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ 
                          width: `${((param.currentValue - param.optimalRange[0]) / 
                            (param.optimalRange[1] - param.optimalRange[0])) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Performance</span>
                      <span>{param.performance}%</span>
                    </div>
                    <Progress value={param.performance} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last optimized: {new Date(param.lastOptimized).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regimes">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketRegimes.map((regime, index) => (
              <Card key={index} className={regime.confidence > 50 ? 'border-green-500' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      {regime.name}
                    </span>
                    <Badge variant="outline" className={getImpactColor(regime.impact)}>
                      {regime.impact} IMPACT
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Confidence: {regime.confidence.toFixed(1)}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Confidence</span>
                      <span>{regime.confidence.toFixed(1)}%</span>
                    </div>
                    <Progress value={regime.confidence} className="h-2" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">Characteristics:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {regime.characteristics.map((char, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-current rounded-full" />
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Duration: {regime.duration}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-4">
            {strategyPerformance.map((strategy) => (
              <Card key={strategy.strategyId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      {strategy.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(strategy.status)}
                      <Badge variant="outline" className={getStatusColor(strategy.status)}>
                        {strategy.status}
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Current regime: {strategy.regime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Return</div>
                      <div className={`text-lg font-semibold ${strategy.currentReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(strategy.currentReturn)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Volatility</div>
                      <div className="text-lg font-semibold">{strategy.volatility.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                      <div className="text-lg font-semibold">{strategy.sharpeRatio.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Max Drawdown</div>
                      <div className="text-lg font-semibold text-red-600">{formatPercentage(strategy.maxDrawdown)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Win Rate</div>
                      <div className="text-lg font-semibold">{strategy.winRate.toFixed(1)}%</div>
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