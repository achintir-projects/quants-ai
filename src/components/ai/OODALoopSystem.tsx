'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Eye, 
  Brain, 
  Target, 
  Zap, 
  Activity,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface OODALoopMetrics {
  observe: {
    marketDataFeeds: number
    alternativeDataSources: number
    systemPerformanceMetrics: number
    marketRegimeIndicators: number
    status: 'ACTIVE' | 'PROCESSING' | 'ERROR'
  }
  orient: {
    featureExtraction: number
    marketRegimeIdentification: number
    strategyPerformanceAnalysis: number
    riskAssessment: number
    status: 'ACTIVE' | 'PROCESSING' | 'ERROR'
  }
  decide: {
    strategySelection: number
    positionSizing: number
    riskManagement: number
    executionOptimization: number
    status: 'ACTIVE' | 'PROCESSING' | 'ERROR'
  }
  act: {
    orderGeneration: number
    dynamicHedging: number
    riskManagement: number
    performanceMonitoring: number
    status: 'ACTIVE' | 'PROCESSING' | 'ERROR'
  }
  feedback: {
    tradesProcessed: number
    performanceMetricsUpdated: number
    modelRefinements: number
    strategyImprovements: number
    status: 'ACTIVE' | 'PROCESSING' | 'ERROR'
  }
  overall: {
    cycleTime: number
    efficiency: number
    accuracy: number
    improvementRate: number
  }
}

interface RealTimeMetrics {
  timestamp: string
  marketVolatility: number
  liquidityScore: number
  correlationBreakdown: number
  tailRisk: number
  aiConfidence: number
  activeStrategies: number
  totalPositions: number
  portfolioValue: number
}

export default function OODALoopSystem() {
  const [metrics, setMetrics] = useState<OODALoopMetrics>({
    observe: {
      marketDataFeeds: 95,
      alternativeDataSources: 87,
      systemPerformanceMetrics: 92,
      marketRegimeIndicators: 89,
      status: 'ACTIVE'
    },
    orient: {
      featureExtraction: 91,
      marketRegimeIdentification: 85,
      strategyPerformanceAnalysis: 88,
      riskAssessment: 93,
      status: 'ACTIVE'
    },
    decide: {
      strategySelection: 89,
      positionSizing: 92,
      riskManagement: 94,
      executionOptimization: 87,
      status: 'ACTIVE'
    },
    act: {
      orderGeneration: 93,
      dynamicHedging: 90,
      riskManagement: 95,
      performanceMonitoring: 91,
      status: 'ACTIVE'
    },
    feedback: {
      tradesProcessed: 1567,
      performanceMetricsUpdated: 89,
      modelRefinements: 23,
      strategyImprovements: 12,
      status: 'ACTIVE'
    },
    overall: {
      cycleTime: 0.8,
      efficiency: 91.2,
      accuracy: 87.5,
      improvementRate: 2.3
    }
  })

  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics>({
    timestamp: new Date().toISOString(),
    marketVolatility: 18.5,
    liquidityScore: 85.2,
    correlationBreakdown: 12.3,
    tailRisk: 8.7,
    aiConfidence: 92.4,
    activeStrategies: 4,
    totalPositions: 12,
    portfolioValue: 1012500
  })

  const [isRunning, setIsRunning] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      // Simulate real-time updates
      setRealTimeMetrics(prev => ({
        ...prev,
        timestamp: new Date().toISOString(),
        marketVolatility: prev.marketVolatility + (Math.random() - 0.5) * 2,
        liquidityScore: Math.max(0, Math.min(100, prev.liquidityScore + (Math.random() - 0.5) * 5)),
        correlationBreakdown: Math.max(0, Math.min(100, prev.correlationBreakdown + (Math.random() - 0.5) * 3)),
        tailRisk: Math.max(0, Math.min(100, prev.tailRisk + (Math.random() - 0.5) * 2)),
        aiConfidence: Math.max(0, Math.min(100, prev.aiConfidence + (Math.random() - 0.5) * 1)),
        portfolioValue: prev.portfolioValue + (Math.random() - 0.5) * 10000
      }))

      setLastUpdate(new Date())
    }, 2000)

    return () => clearInterval(interval)
  }, [isRunning])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500'
      case 'PROCESSING': return 'bg-yellow-500'
      case 'ERROR': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'PROCESSING': return <RefreshCw className="w-4 h-4 text-yellow-600 animate-spin" />
      case 'ERROR': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
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
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI-Powered Quantum Brain</h2>
          <p className="text-muted-foreground">Self-Improving OODA Loop System</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="w-3 h-3 mr-1" />
            {isRunning ? 'Active' : 'Paused'}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Pause' : 'Resume'}
          </Button>
          <Badge variant="outline">
            Last Update: {lastUpdate.toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* Real-time Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Real-time Market Intelligence
          </CardTitle>
          <CardDescription>
            Live market conditions and AI system performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Market Volatility</div>
              <div className="text-lg font-semibold">{realTimeMetrics.marketVolatility.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">VIX</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Liquidity Score</div>
              <div className="text-lg font-semibold">{realTimeMetrics.liquidityScore.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Market Depth</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">AI Confidence</div>
              <div className="text-lg font-semibold text-green-600">{realTimeMetrics.aiConfidence.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">System Accuracy</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Portfolio Value</div>
              <div className="text-lg font-semibold">{formatCurrency(realTimeMetrics.portfolioValue)}</div>
              <div className="text-xs text-muted-foreground">Total Assets</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* OODA Loop Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Observe */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Observe
            </CardTitle>
            <div className="flex items-center gap-2">
              {getStatusIcon(metrics.observe.status)}
              <Badge variant="outline" className={getStatusColor(metrics.observe.status)}>
                {metrics.observe.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span>Market Data Feeds</span>
                <span>{metrics.observe.marketDataFeeds}%</span>
              </div>
              <Progress value={metrics.observe.marketDataFeeds} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Alternative Data</span>
                <span>{metrics.observe.alternativeDataSources}%</span>
              </div>
              <Progress value={metrics.observe.alternativeDataSources} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Performance Metrics</span>
                <span>{metrics.observe.systemPerformanceMetrics}%</span>
              </div>
              <Progress value={metrics.observe.systemPerformanceMetrics} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Regime Indicators</span>
                <span>{metrics.observe.marketRegimeIndicators}%</span>
              </div>
              <Progress value={metrics.observe.marketRegimeIndicators} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Orient */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Orient
            </CardTitle>
            <div className="flex items-center gap-2">
              {getStatusIcon(metrics.orient.status)}
              <Badge variant="outline" className={getStatusColor(metrics.orient.status)}>
                {metrics.orient.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span>Feature Extraction</span>
                <span>{metrics.orient.featureExtraction}%</span>
              </div>
              <Progress value={metrics.orient.featureExtraction} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Market Regime ID</span>
                <span>{metrics.orient.marketRegimeIdentification}%</span>
              </div>
              <Progress value={metrics.orient.marketRegimeIdentification} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Strategy Analysis</span>
                <span>{metrics.orient.strategyPerformanceAnalysis}%</span>
              </div>
              <Progress value={metrics.orient.strategyPerformanceAnalysis} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Risk Assessment</span>
                <span>{metrics.orient.riskAssessment}%</span>
              </div>
              <Progress value={metrics.orient.riskAssessment} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Decide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Decide
            </CardTitle>
            <div className="flex items-center gap-2">
              {getStatusIcon(metrics.decide.status)}
              <Badge variant="outline" className={getStatusColor(metrics.decide.status)}>
                {metrics.decide.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span>Strategy Selection</span>
                <span>{metrics.decide.strategySelection}%</span>
              </div>
              <Progress value={metrics.decide.strategySelection} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Position Sizing</span>
                <span>{metrics.decide.positionSizing}%</span>
              </div>
              <Progress value={metrics.decide.positionSizing} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Risk Management</span>
                <span>{metrics.decide.riskManagement}%</span>
              </div>
              <Progress value={metrics.decide.riskManagement} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Execution Opt</span>
                <span>{metrics.decide.executionOptimization}%</span>
              </div>
              <Progress value={metrics.decide.executionOptimization} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Act */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Act
            </CardTitle>
            <div className="flex items-center gap-2">
              {getStatusIcon(metrics.act.status)}
              <Badge variant="outline" className={getStatusColor(metrics.act.status)}>
                {metrics.act.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span>Order Generation</span>
                <span>{metrics.act.orderGeneration}%</span>
              </div>
              <Progress value={metrics.act.orderGeneration} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Dynamic Hedging</span>
                <span>{metrics.act.dynamicHedging}%</span>
              </div>
              <Progress value={metrics.act.dynamicHedging} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Risk Management</span>
                <span>{metrics.act.riskManagement}%</span>
              </div>
              <Progress value={metrics.act.riskManagement} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Performance Monitor</span>
                <span>{metrics.act.performanceMonitoring}%</span>
              </div>
              <Progress value={metrics.act.performanceMonitoring} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Loop */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Feedback Loop & System Performance
          </CardTitle>
          <CardDescription>
            Continuous improvement through data-driven feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Feedback Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Trades Processed</div>
                  <div className="text-lg font-semibold">{metrics.feedback.tradesProcessed.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Metrics Updated</div>
                  <div className="text-lg font-semibold">{metrics.feedback.performanceMetricsUpdated}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Model Refinements</div>
                  <div className="text-lg font-semibold">{metrics.feedback.modelRefinements}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Strategy Improvements</div>
                  <div className="text-lg font-semibold">{metrics.feedback.strategyImprovements}</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Overall Performance</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Cycle Time</div>
                  <div className="text-lg font-semibold">{metrics.overall.cycleTime}s</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Efficiency</div>
                  <div className="text-lg font-semibold text-green-600">{formatPercentage(metrics.overall.efficiency)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                  <div className="text-lg font-semibold text-green-600">{formatPercentage(metrics.overall.accuracy)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Improvement Rate</div>
                  <div className="text-lg font-semibold text-blue-600">{metrics.overall.improvementRate}%/day</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Alerts */}
      {realTimeMetrics.tailRisk > 15 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            High tail risk detected ({realTimeMetrics.tailRisk.toFixed(1)}%). 
            AI system is adjusting position sizing and hedging strategies accordingly.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}