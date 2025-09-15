'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Database, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Activity,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Zap,
  Target,
  Brain,
  Eye,
  Filter,
  Globe,
  MessageSquare,
  DollarSign
} from 'lucide-react'

interface FeatureStoreMetrics {
  volatilityDerivatives: {
    impliedVsRealizedSpread: number
    volatilityTermStructure: number
    volatilitySkew: number
    volatilityOfVolatility: number
    correlationMetrics: number
    status: 'ACTIVE' | 'PROCESSING' | 'ERROR'
  }
  orderBookImbalance: {
    priceSensitiveImbalance: number
    orderFlowToxicity: number
    liquidityConsumption: number
    marketMakerInventory: number
    hiddenLiquidity: number
    status: 'ACTIVE' | 'PROCESSING' | 'ERROR'
  }
  liquidityIndicators: {
    bidAskSpread: number
    marketDepth: number
    priceImpact: number
    rollMeasures: number
    amihudIlliquidity: number
    status: 'ACTIVE' | 'PROCESSING' | 'ERROR'
  }
  alternativeData: {
    newsSentiment: number
    optionsFlow: number
    socialMedia: number
    fundingStress: number
    counterpartyRisk: number
    status: 'ACTIVE' | 'PROCESSING' | 'ERROR'
  }
  system: {
    totalFeatures: number
    activeFeatures: number
    processingLatency: number
    dataQuality: number
    updateFrequency: number
  }
}

interface RealTimeFeatures {
  timestamp: string
  volatilityRegime: 'LOW' | 'NORMAL' | 'HIGH' | 'EXTREME'
  liquidityScore: number
  marketStress: number
  signalStrength: number
  featureConfidence: number
  anomalyDetection: number
}

export default function UnifiedFeatureStore() {
  const [metrics, setMetrics] = useState<FeatureStoreMetrics>({
    volatilityDerivatives: {
      impliedVsRealizedSpread: 92.5,
      volatilityTermStructure: 88.3,
      volatilitySkew: 85.7,
      volatilityOfVolatility: 90.2,
      correlationMetrics: 87.9,
      status: 'ACTIVE'
    },
    orderBookImbalance: {
      priceSensitiveImbalance: 89.4,
      orderFlowToxicity: 91.2,
      liquidityConsumption: 86.8,
      marketMakerInventory: 88.5,
      hiddenLiquidity: 84.3,
      status: 'ACTIVE'
    },
    liquidityIndicators: {
      bidAskSpread: 93.1,
      marketDepth: 87.6,
      priceImpact: 89.9,
      rollMeasures: 85.2,
      amihudIlliquidity: 90.7,
      status: 'ACTIVE'
    },
    alternativeData: {
      newsSentiment: 82.4,
      optionsFlow: 88.9,
      socialMedia: 79.6,
      fundingStress: 91.3,
      counterpartyRisk: 86.7,
      status: 'ACTIVE'
    },
    system: {
      totalFeatures: 1247,
      activeFeatures: 1189,
      processingLatency: 12.5,
      dataQuality: 95.2,
      updateFrequency: 1000
    }
  })

  const [realTimeFeatures, setRealTimeFeatures] = useState<RealTimeFeatures>({
    timestamp: new Date().toISOString(),
    volatilityRegime: 'NORMAL',
    liquidityScore: 85.2,
    marketStress: 23.7,
    signalStrength: 78.9,
    featureConfidence: 91.4,
    anomalyDetection: 5.2
  })

  const [isRunning, setIsRunning] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      // Simulate real-time feature updates
      setRealTimeFeatures(prev => ({
        ...prev,
        timestamp: new Date().toISOString(),
        liquidityScore: Math.max(0, Math.min(100, prev.liquidityScore + (Math.random() - 0.5) * 3)),
        marketStress: Math.max(0, Math.min(100, prev.marketStress + (Math.random() - 0.5) * 5)),
        signalStrength: Math.max(0, Math.min(100, prev.signalStrength + (Math.random() - 0.5) * 4)),
        featureConfidence: Math.max(0, Math.min(100, prev.featureConfidence + (Math.random() - 0.5) * 2)),
        anomalyDetection: Math.max(0, Math.min(100, prev.anomalyDetection + (Math.random() - 0.5) * 1))
      }))

      setLastUpdate(new Date())
    }, 1500)

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

  const getVolatilityRegimeColor = (regime: string) => {
    switch (regime) {
      case 'LOW': return 'text-green-600'
      case 'NORMAL': return 'text-blue-600'
      case 'HIGH': return 'text-yellow-600'
      case 'EXTREME': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Unified Feature Store</h2>
          <p className="text-muted-foreground">AI-Powered Feature Engineering Pipeline</p>
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

      {/* Real-time Feature Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Real-time Feature Intelligence
          </CardTitle>
          <CardDescription>
            Live feature extraction and market intelligence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Volatility Regime</div>
              <div className={`text-lg font-semibold ${getVolatilityRegimeColor(realTimeFeatures.volatilityRegime)}`}>
                {realTimeFeatures.volatilityRegime}
              </div>
              <div className="text-xs text-muted-foreground">Market State</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Liquidity Score</div>
              <div className="text-lg font-semibold">{realTimeFeatures.liquidityScore.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Market Depth</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Signal Strength</div>
              <div className="text-lg font-semibold text-green-600">{realTimeFeatures.signalStrength.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">AI Confidence</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Anomaly Detection</div>
              <div className="text-lg font-semibold">{realTimeFeatures.anomalyDetection.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Risk Level</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Categories */}
      <Tabs defaultValue="volatility" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="volatility">Volatility Derivatives</TabsTrigger>
          <TabsTrigger value="orderbook">Order Book Imbalance</TabsTrigger>
          <TabsTrigger value="liquidity">Liquidity Indicators</TabsTrigger>
          <TabsTrigger value="alternative">Alternative Data</TabsTrigger>
        </TabsList>

        <TabsContent value="volatility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Volatility Derivatives Features
              </CardTitle>
              <div className="flex items-center gap-2">
                {getStatusIcon(metrics.volatilityDerivatives.status)}
                <Badge variant="outline" className={getStatusColor(metrics.volatilityDerivatives.status)}>
                  {metrics.volatilityDerivatives.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Implied vs Realized Spread</span>
                  <span>{formatPercentage(metrics.volatilityDerivatives.impliedVsRealizedSpread)}</span>
                </div>
                <Progress value={metrics.volatilityDerivatives.impliedVsRealizedSpread} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Volatility Term Structure</span>
                  <span>{formatPercentage(metrics.volatilityDerivatives.volatilityTermStructure)}</span>
                </div>
                <Progress value={metrics.volatilityDerivatives.volatilityTermStructure} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Volatility Skew Dynamics</span>
                  <span>{formatPercentage(metrics.volatilityDerivatives.volatilitySkew)}</span>
                </div>
                <Progress value={metrics.volatilityDerivatives.volatilitySkew} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Volatility of Volatility</span>
                  <span>{formatPercentage(metrics.volatilityDerivatives.volatilityOfVolatility)}</span>
                </div>
                <Progress value={metrics.volatilityDerivatives.volatilityOfVolatility} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Correlation Metrics</span>
                  <span>{formatPercentage(metrics.volatilityDerivatives.correlationMetrics)}</span>
                </div>
                <Progress value={metrics.volatilityDerivatives.correlationMetrics} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orderbook" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Order Book Imbalance Metrics
              </CardTitle>
              <div className="flex items-center gap-2">
                {getStatusIcon(metrics.orderBookImbalance.status)}
                <Badge variant="outline" className={getStatusColor(metrics.orderBookImbalance.status)}>
                  {metrics.orderBookImbalance.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Price-Sensitive Imbalance</span>
                  <span>{formatPercentage(metrics.orderBookImbalance.priceSensitiveImbalance)}</span>
                </div>
                <Progress value={metrics.orderBookImbalance.priceSensitiveImbalance} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Order Flow Toxicity (VPIN)</span>
                  <span>{formatPercentage(metrics.orderBookImbalance.orderFlowToxicity)}</span>
                </div>
                <Progress value={metrics.orderBookImbalance.orderFlowToxicity} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Liquidity Consumption Rates</span>
                  <span>{formatPercentage(metrics.orderBookImbalance.liquidityConsumption)}</span>
                </div>
                <Progress value={metrics.orderBookImbalance.liquidityConsumption} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Market Maker Inventory</span>
                  <span>{formatPercentage(metrics.orderBookImbalance.marketMakerInventory)}</span>
                </div>
                <Progress value={metrics.orderBookImbalance.marketMakerInventory} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Hidden Liquidity Estimators</span>
                  <span>{formatPercentage(metrics.orderBookImbalance.hiddenLiquidity)}</span>
                </div>
                <Progress value={metrics.orderBookImbalance.hiddenLiquidity} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="liquidity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Liquidity Indicators
              </CardTitle>
              <div className="flex items-center gap-2">
                {getStatusIcon(metrics.liquidityIndicators.status)}
                <Badge variant="outline" className={getStatusColor(metrics.liquidityIndicators.status)}>
                  {metrics.liquidityIndicators.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Effective Bid-Ask Spreads</span>
                  <span>{formatPercentage(metrics.liquidityIndicators.bidAskSpread)}</span>
                </div>
                <Progress value={metrics.liquidityIndicators.bidAskSpread} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Market Depth at Multiple Levels</span>
                  <span>{formatPercentage(metrics.liquidityIndicators.marketDepth)}</span>
                </div>
                <Progress value={metrics.liquidityIndicators.marketDepth} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Price Impact of Trades</span>
                  <span>{formatPercentage(metrics.liquidityIndicators.priceImpact)}</span>
                </div>
                <Progress value={metrics.liquidityIndicators.priceImpact} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Roll Measures</span>
                  <span>{formatPercentage(metrics.liquidityIndicators.rollMeasures)}</span>
                </div>
                <Progress value={metrics.liquidityIndicators.rollMeasures} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Amihud Illiquidity Ratio</span>
                  <span>{formatPercentage(metrics.liquidityIndicators.amihudIlliquidity)}</span>
                </div>
                <Progress value={metrics.liquidityIndicators.amihudIlliquidity} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alternative" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Alternative Data Integration
              </CardTitle>
              <div className="flex items-center gap-2">
                {getStatusIcon(metrics.alternativeData.status)}
                <Badge variant="outline" className={getStatusColor(metrics.alternativeData.status)}>
                  {metrics.alternativeData.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span>News Sentiment (NLP)</span>
                  <span>{formatPercentage(metrics.alternativeData.newsSentiment)}</span>
                </div>
                <Progress value={metrics.alternativeData.newsSentiment} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Options Flow Analysis</span>
                  <span>{formatPercentage(metrics.alternativeData.optionsFlow)}</span>
                </div>
                <Progress value={metrics.alternativeData.optionsFlow} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Social Media Sentiment</span>
                  <span>{formatPercentage(metrics.alternativeData.socialMedia)}</span>
                </div>
                <Progress value={metrics.alternativeData.socialMedia} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Funding Stress Indicators</span>
                  <span>{formatPercentage(metrics.alternativeData.fundingStress)}</span>
                </div>
                <Progress value={metrics.alternativeData.fundingStress} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Counterparty Risk Metrics</span>
                  <span>{formatPercentage(metrics.alternativeData.counterpartyRisk)}</span>
                </div>
                <Progress value={metrics.alternativeData.counterpartyRisk} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Feature Store System Overview
          </CardTitle>
          <CardDescription>
            System performance and feature management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Feature Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Total Features</div>
                  <div className="text-lg font-semibold">{metrics.system.totalFeatures.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Active Features</div>
                  <div className="text-lg font-semibold text-green-600">{metrics.system.activeFeatures.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Processing Latency</div>
                  <div className="text-lg font-semibold">{metrics.system.processingLatency}ms</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Data Quality</div>
                  <div className="text-lg font-semibold text-green-600">{formatPercentage(metrics.system.dataQuality)}</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">System Performance</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Update Frequency</div>
                  <div className="text-lg font-semibold">{metrics.system.updateFrequency}ms</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Feature Coverage</div>
                  <div className="text-lg font-semibold text-blue-600">
                    {formatPercentage((metrics.system.activeFeatures / metrics.system.totalFeatures) * 100)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anomaly Alert */}
      {realTimeFeatures.anomalyDetection > 10 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            High anomaly detection level ({realTimeFeatures.anomalyDetection.toFixed(1)}%). 
            Feature store is monitoring unusual patterns in market data.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}