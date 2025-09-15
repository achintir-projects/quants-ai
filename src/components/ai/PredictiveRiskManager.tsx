'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Shield, 
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
  Eye,
  Gauge,
  TriangleAlert,
  CircleAlert
} from 'lucide-react'

interface CorrelationBreakdown {
  assetPair: string
  currentCorrelation: number
  historicalAverage: number
  breakdownSeverity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  probability: number
  impact: 'MINOR' | 'MODERATE' | 'SEVERE' | 'EXTREME'
  lastDetected: string
}

interface LiquidityCrisis {
  market: string
  liquidityScore: number
  trend: 'IMPROVING' | 'STABLE' | 'DETERIORATING' | 'CRITICAL'
  bidAskSpread: number
  marketDepth: number
  volumeProfile: number
  predictedTimeline: string
  confidence: number
}

interface TailRisk {
  riskType: string
  currentLevel: number
  threshold: number
  probability: number
  expectedLoss: number
  timeHorizon: string
  mitigationStrategy: string
  status: 'MONITORING' | 'WARNING' | 'ALERT' | 'CRITICAL'
}

interface RiskMetrics {
  var95: number
  var99: number
  expectedShortfall: number
  beta: number
  correlation: number
  liquidityScore: number
  concentrationRisk: number
  systemicRisk: number
}

export default function PredictiveRiskManager() {
  const [correlationBreakdowns, setCorrelationBreakdowns] = useState<CorrelationBreakdown[]>([
    {
      assetPair: 'SPY - QQQ',
      currentCorrelation: 0.45,
      historicalAverage: 0.85,
      breakdownSeverity: 'HIGH',
      probability: 78,
      impact: 'SEVERE',
      lastDetected: '2024-01-15T14:30:00Z'
    },
    {
      assetPair: 'TLT - GLD',
      currentCorrelation: -0.15,
      historicalAverage: 0.25,
      breakdownSeverity: 'MEDIUM',
      probability: 65,
      impact: 'MODERATE',
      lastDetected: '2024-01-15T13:45:00Z'
    },
    {
      assetPair: 'EURUSD - GBPUSD',
      currentCorrelation: 0.35,
      historicalAverage: 0.75,
      breakdownSeverity: 'HIGH',
      probability: 82,
      impact: 'SEVERE',
      lastDetected: '2024-01-15T15:00:00Z'
    }
  ])

  const [liquidityCrises, setLiquidityCrises] = useState<LiquidityCrisis[]>([
    {
      market: 'S&P 500 Options',
      liquidityScore: 42,
      trend: 'DETERIORATING',
      bidAskSpread: 0.8,
      marketDepth: 65,
      volumeProfile: 38,
      predictedTimeline: '2-4 hours',
      confidence: 85
    },
    {
      market: 'Treasury Futures',
      liquidityScore: 68,
      trend: 'STABLE',
      bidAskSpread: 0.3,
      marketDepth: 82,
      volumeProfile: 71,
      predictedTimeline: 'Stable',
      confidence: 72
    },
    {
      market: 'Corporate Bonds',
      liquidityScore: 35,
      trend: 'CRITICAL',
      bidAskSpread: 1.2,
      marketDepth: 45,
      volumeProfile: 28,
      predictedTimeline: '1-2 hours',
      confidence: 91
    }
  ])

  const [tailRisks, setTailRisks] = useState<TailRisk[]>([
    {
      riskType: 'Black Swan Event',
      currentLevel: 8.5,
      threshold: 7.0,
      probability: 15,
      expectedLoss: -250000,
      timeHorizon: '3 months',
      mitigationStrategy: 'Reduce exposure, increase hedging',
      status: 'WARNING'
    },
    {
      riskType: 'Market Crash',
      currentLevel: 6.2,
      threshold: 8.0,
      probability: 8,
      expectedLoss: -180000,
      timeHorizon: '6 months',
      mitigationStrategy: 'Defensive positioning',
      status: 'MONITORING'
    },
    {
      riskType: 'Liquidity Crisis',
      currentLevel: 7.8,
      threshold: 6.5,
      probability: 22,
      expectedLoss: -120000,
      timeHorizon: '1 month',
      mitigationStrategy: 'Diversify funding sources',
      status: 'ALERT'
    }
  ])

  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics>({
    var95: 45000,
    var99: 78000,
    expectedShortfall: 95000,
    beta: 1.15,
    correlation: 0.68,
    liquidityScore: 52,
    concentrationRisk: 18,
    systemicRisk: 35
  })

  const [isMonitoring, setIsMonitoring] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      // Simulate real-time risk updates
      setCorrelationBreakdowns(prev => prev.map(breakdown => ({
        ...breakdown,
        currentCorrelation: Math.max(-1, Math.min(1, breakdown.currentCorrelation + (Math.random() - 0.5) * 0.05)),
        probability: Math.max(0, Math.min(100, breakdown.probability + (Math.random() - 0.5) * 3))
      })))

      setLiquidityCrises(prev => prev.map(crisis => ({
        ...crisis,
        liquidityScore: Math.max(0, Math.min(100, crisis.liquidityScore + (Math.random() - 0.5) * 2)),
        bidAskSpread: Math.max(0, crisis.bidAskSpread + (Math.random() - 0.5) * 0.1),
        confidence: Math.max(0, Math.min(100, crisis.confidence + (Math.random() - 0.5) * 2))
      })))

      setTailRisks(prev => prev.map(risk => ({
        ...risk,
        currentLevel: Math.max(0, risk.currentLevel + (Math.random() - 0.5) * 0.2),
        probability: Math.max(0, Math.min(100, risk.probability + (Math.random() - 0.5) * 1))
      })))

      setRiskMetrics(prev => ({
        ...prev,
        var95: Math.max(0, prev.var95 + (Math.random() - 0.5) * 2000),
        var99: Math.max(0, prev.var99 + (Math.random() - 0.5) * 3000),
        liquidityScore: Math.max(0, Math.min(100, prev.liquidityScore + (Math.random() - 0.5) * 3))
      }))

      setLastUpdate(new Date())
    }, 4000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW': return 'bg-green-500'
      case 'MEDIUM': return 'bg-yellow-500'
      case 'HIGH': return 'bg-orange-500'
      case 'CRITICAL': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'MINOR': return 'text-green-600'
      case 'MODERATE': return 'text-yellow-600'
      case 'SEVERE': return 'text-orange-600'
      case 'EXTREME': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'MONITORING': return 'bg-blue-500'
      case 'WARNING': return 'bg-yellow-500'
      case 'ALERT': return 'bg-orange-500'
      case 'CRITICAL': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'MONITORING': return <Eye className="w-4 h-4 text-blue-600" />
      case 'WARNING': return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'ALERT': return <TriangleAlert className="w-4 h-4 text-orange-600" />
      case 'CRITICAL': return <CircleAlert className="w-4 h-4 text-red-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'IMPROVING': return 'text-green-600'
      case 'STABLE': return 'text-blue-600'
      case 'DETERIORATING': return 'text-yellow-600'
      case 'CRITICAL': return 'text-red-600'
      default: return 'text-gray-600'
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
          <h2 className="text-2xl font-bold tracking-tight">Predictive Risk Manager</h2>
          <p className="text-muted-foreground">Correlation breakdown, liquidity crisis, and tail risk prediction</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="w-3 h-3 mr-1" />
            {isMonitoring ? 'Monitoring' : 'Paused'}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMonitoring(!isMonitoring)}
          >
            {isMonitoring ? 'Pause' : 'Resume'}
          </Button>
          <Badge variant="outline">
            Last Update: {lastUpdate.toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* Risk Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            Risk Overview
          </CardTitle>
          <CardDescription>
            Current portfolio risk metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">VaR (95%)</div>
              <div className="text-lg font-semibold">{formatCurrency(riskMetrics.var95)}</div>
              <div className="text-xs text-muted-foreground">Daily</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">VaR (99%)</div>
              <div className="text-lg font-semibold text-orange-600">{formatCurrency(riskMetrics.var99)}</div>
              <div className="text-xs text-muted-foreground">Daily</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Expected Shortfall</div>
              <div className="text-lg font-semibold text-red-600">{formatCurrency(riskMetrics.expectedShortfall)}</div>
              <div className="text-xs text-muted-foreground">Beyond VaR</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Liquidity Score</div>
              <div className="text-lg font-semibold">{riskMetrics.liquidityScore.toFixed(0)}%</div>
              <div className="text-xs text-muted-foreground">Market depth</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="correlations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="correlations">Correlation Breakdown</TabsTrigger>
          <TabsTrigger value="liquidity">Liquidity Crisis</TabsTrigger>
          <TabsTrigger value="tailrisk">Tail Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="correlations">
          <div className="space-y-4">
            {correlationBreakdowns.map((breakdown, index) => (
              <Card key={index} className={breakdown.breakdownSeverity === 'CRITICAL' ? 'border-red-500' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      {breakdown.assetPair}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getSeverityColor(breakdown.breakdownSeverity)}>
                        {breakdown.breakdownSeverity}
                      </Badge>
                      <Badge variant="outline" className={getImpactColor(breakdown.impact)}>
                        {breakdown.impact}
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Probability: {breakdown.probability.toFixed(1)}%
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Correlation</div>
                      <div className="text-lg font-semibold">{breakdown.currentCorrelation.toFixed(3)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Historical Average</div>
                      <div className="text-lg font-semibold">{breakdown.historicalAverage.toFixed(3)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Deviation</div>
                      <div className={`text-lg font-semibold ${
                        Math.abs(breakdown.currentCorrelation - breakdown.historicalAverage) > 0.3 
                          ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {Math.abs(breakdown.currentCorrelation - breakdown.historicalAverage).toFixed(3)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Last detected: {new Date(breakdown.lastDetected).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liquidity">
          <div className="space-y-4">
            {liquidityCrises.map((crisis, index) => (
              <Card key={index} className={crisis.trend === 'CRITICAL' ? 'border-red-500' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      {crisis.market}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getTrendColor(crisis.trend)}>
                        {crisis.trend}
                      </Badge>
                      <Badge variant="outline">
                        {crisis.confidence.toFixed(0)}% confidence
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Predicted timeline: {crisis.predictedTimeline}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Liquidity Score</div>
                      <div className={`text-lg font-semibold ${
                        crisis.liquidityScore > 70 ? 'text-green-600' :
                        crisis.liquidityScore > 40 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {crisis.liquidityScore.toFixed(0)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Bid-Ask Spread</div>
                      <div className="text-lg font-semibold">{crisis.bidAskSpread.toFixed(2)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Market Depth</div>
                      <div className="text-lg font-semibold">{crisis.marketDepth.toFixed(0)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Volume Profile</div>
                      <div className="text-lg font-semibold">{crisis.volumeProfile.toFixed(0)}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tailrisk">
          <div className="space-y-4">
            {tailRisks.map((risk, index) => (
              <Card key={index} className={risk.status === 'CRITICAL' ? 'border-red-500' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {risk.riskType}
                    </span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(risk.status)}
                      <Badge variant="outline" className={getStatusColor(risk.status)}>
                        {risk.status}
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Time horizon: {risk.timeHorizon}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Level</div>
                      <div className={`text-lg font-semibold ${
                        risk.currentLevel > risk.threshold ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {risk.currentLevel.toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Threshold</div>
                      <div className="text-lg font-semibold">{risk.threshold.toFixed(1)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Probability</div>
                      <div className="text-lg font-semibold">{risk.probability.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Expected Loss</div>
                      <div className="text-lg font-semibold text-red-600">{formatCurrency(risk.expectedLoss)}</div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium mb-1">Mitigation Strategy:</div>
                    <div className="text-sm text-muted-foreground">{risk.mitigationStrategy}</div>
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