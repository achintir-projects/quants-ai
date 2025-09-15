'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp,
  Activity,
  Target,
  BarChart3,
  Zap,
  Settings,
  Eye,
  Pause,
  Play,
  RefreshCw
} from 'lucide-react'

interface RiskMetrics {
  portfolioVaR: number
  portfolioCVaR: number
  beta: number
  correlation: number
  concentrationRisk: number
  liquidityRisk: number
  counterpartyRisk: number
  operationalRisk: number
}

interface PositionRisk {
  id: string
  symbol: string
  delta: number
  gamma: number
  vega: number
  theta: number
  var: number
  maxLoss: number
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
}

interface RiskLimit {
  id: string
  name: string
  currentValue: number
  limit: number
  percentage: number
  status: 'NORMAL' | 'WARNING' | 'BREACHED'
  action: 'MONITOR' | 'REDUCE' | 'STOP'
}

interface StressTest {
  id: string
  scenario: string
  portfolioImpact: number
  probability: number
  maxDrawdown: number
  recoveryTime: number
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME'
}

export default function RiskManagement() {
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics>({
    portfolioVaR: 45000,
    portfolioCVaR: 68000,
    beta: 0.85,
    correlation: 0.32,
    concentrationRisk: 0.15,
    liquidityRisk: 0.08,
    counterpartyRisk: 0.05,
    operationalRisk: 0.03
  })

  const [positionRisks, setPositionRisks] = useState<PositionRisk[]>([
    {
      id: '1',
      symbol: 'SPX 240517C5200',
      delta: 0.65,
      gamma: 0.02,
      vega: 1250,
      theta: -45,
      var: 8500,
      maxLoss: 15000,
      riskLevel: 'MEDIUM'
    },
    {
      id: '2',
      symbol: 'SPX 240517P4800',
      delta: -0.42,
      gamma: 0.018,
      vega: -980,
      theta: -38,
      var: 6200,
      maxLoss: 12000,
      riskLevel: 'LOW'
    },
    {
      id: '3',
      symbol: 'QQQ 240524P440',
      delta: -0.58,
      gamma: 0.025,
      vega: -1450,
      theta: -52,
      var: 9800,
      maxLoss: 18500,
      riskLevel: 'HIGH'
    }
  ])

  const [riskLimits, setRiskLimits] = useState<RiskLimit[]>([
    {
      id: '1',
      name: 'Portfolio VaR',
      currentValue: 45000,
      limit: 50000,
      percentage: 90,
      status: 'WARNING',
      action: 'MONITOR'
    },
    {
      id: '2',
      name: 'Position Concentration',
      currentValue: 28,
      limit: 30,
      percentage: 93,
      status: 'WARNING',
      action: 'MONITOR'
    },
    {
      id: '3',
      name: 'Margin Utilization',
      currentValue: 85,
      limit: 80,
      percentage: 106,
      status: 'BREACHED',
      action: 'REDUCE'
    },
    {
      id: '4',
      name: 'Daily Loss Limit',
      currentValue: 3.2,
      limit: 5.0,
      percentage: 64,
      status: 'NORMAL',
      action: 'MONITOR'
    }
  ])

  const [stressTests, setStressTests] = useState<StressTest[]>([
    {
      id: '1',
      scenario: 'Market Crash -20%',
      portfolioImpact: -180000,
      probability: 0.05,
      maxDrawdown: -25,
      recoveryTime: 45,
      severity: 'EXTREME'
    },
    {
      id: '2',
      scenario: 'Volatility Spike +100%',
      portfolioImpact: -95000,
      probability: 0.15,
      maxDrawdown: -15,
      recoveryTime: 30,
      severity: 'HIGH'
    },
    {
      id: '3',
      scenario: 'Interest Rate Shock +2%',
      portfolioImpact: -45000,
      probability: 0.25,
      maxDrawdown: -8,
      recoveryTime: 15,
      severity: 'MEDIUM'
    },
    {
      id: '4',
      scenario: 'Liquidity Crisis',
      portfolioImpact: -75000,
      probability: 0.10,
      maxDrawdown: -12,
      recoveryTime: 25,
      severity: 'HIGH'
    }
  ])

  const [circuitBreakers, setCircuitBreakers] = useState([
    {
      id: '1',
      name: 'Portfolio Drawdown',
      threshold: 15,
      currentValue: 8.2,
      status: 'ACTIVE',
      triggered: false
    },
    {
      id: '2',
      name: 'Daily Loss Limit',
      threshold: 5,
      currentValue: 1.25,
      status: 'ACTIVE',
      triggered: false
    },
    {
      id: '3',
      name: 'Volatility Spike',
      threshold: 50,
      currentValue: 22,
      status: 'ACTIVE',
      triggered: false
    },
    {
      id: '4',
      name: 'Margin Call',
      threshold: 90,
      currentValue: 85,
      status: 'ACTIVE',
      triggered: false
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

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'bg-green-500'
      case 'MEDIUM': return 'bg-yellow-500'
      case 'HIGH': return 'bg-orange-500'
      case 'CRITICAL': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NORMAL': return 'bg-green-500'
      case 'WARNING': return 'bg-yellow-500'
      case 'BREACHED': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW': return 'text-green-600'
      case 'MEDIUM': return 'text-yellow-600'
      case 'HIGH': return 'text-orange-600'
      case 'EXTREME': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Risk Management Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Risk Management</h2>
          <p className="text-muted-foreground">Comprehensive portfolio risk monitoring and controls</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            <Shield className="w-3 h-3 mr-1" />
            Risk Managed
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio VaR</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(riskMetrics.portfolioVaR)}
            </div>
            <p className="text-xs text-muted-foreground">
              95% confidence, 1-day
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio CVaR</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(riskMetrics.portfolioCVaR)}
            </div>
            <p className="text-xs text-muted-foreground">
              Expected shortfall
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beta</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskMetrics.beta.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Market correlation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concentration Risk</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formatPercentage(riskMetrics.concentrationRisk)}
            </div>
            <p className="text-xs text-muted-foreground">
              Largest position
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alerts */}
      {riskLimits.some(limit => limit.status === 'BREACHED') && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Risk Limit Breached!</strong> One or more risk limits have been exceeded. 
            Immediate action required: {riskLimits.find(limit => limit.status === 'BREACHED')?.action}
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="positions">Position Risk</TabsTrigger>
          <TabsTrigger value="limits">Risk Limits</TabsTrigger>
          <TabsTrigger value="stress">Stress Tests</TabsTrigger>
          <TabsTrigger value="circuit">Circuit Breakers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Risk Metrics Overview
                </CardTitle>
                <CardDescription>
                  Key portfolio risk indicators and metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Liquidity Risk</span>
                      <span className="text-sm font-medium">{formatPercentage(riskMetrics.liquidityRisk)}</span>
                    </div>
                    <Progress value={riskMetrics.liquidityRisk * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Counterparty Risk</span>
                      <span className="text-sm font-medium">{formatPercentage(riskMetrics.counterpartyRisk)}</span>
                    </div>
                    <Progress value={riskMetrics.counterpartyRisk * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Operational Risk</span>
                      <span className="text-sm font-medium">{formatPercentage(riskMetrics.operationalRisk)}</span>
                    </div>
                    <Progress value={riskMetrics.operationalRisk * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Correlation</span>
                      <span className="text-sm font-medium">{riskMetrics.correlation.toFixed(2)}</span>
                    </div>
                    <Progress value={riskMetrics.correlation * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Risk Limits Status
                </CardTitle>
                <CardDescription>
                  Current status of all risk limits and controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskLimits.map((limit) => (
                    <div key={limit.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(limit.status)}>
                          {limit.status}
                        </Badge>
                        <div>
                          <div className="font-medium">{limit.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatCurrency(limit.currentValue)} / {formatCurrency(limit.limit)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${limit.percentage >= 100 ? 'text-red-600' : limit.percentage >= 90 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {limit.percentage.toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Action: {limit.action}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="positions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Position Risk Analysis
              </CardTitle>
              <CardDescription>
                Detailed risk metrics for each position
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {positionRisks.map((position) => (
                  <Card key={position.id} className="border-l-4 border-l-orange-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {position.symbol}
                            <Badge className={getRiskColor(position.riskLevel)}>
                              {position.riskLevel} RISK
                            </Badge>
                          </CardTitle>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-red-600">
                            {formatCurrency(position.var)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            VaR (1-day, 95%)
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Delta</div>
                          <div className="text-lg font-semibold">{position.delta.toFixed(3)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Gamma</div>
                          <div className="text-lg font-semibold">{position.gamma.toFixed(3)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Vega</div>
                          <div className="text-lg font-semibold">{position.vega.toFixed(0)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Theta</div>
                          <div className="text-lg font-semibold">{position.theta.toFixed(0)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Max Loss</div>
                          <div className="text-lg font-semibold text-red-600">
                            {formatCurrency(position.maxLoss)}
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

        <TabsContent value="limits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Risk Limits Configuration
              </CardTitle>
              <CardDescription>
                Configure and monitor risk limits for the portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="maxPortfolioVaR">Max Portfolio VaR</Label>
                      <Input
                        id="maxPortfolioVaR"
                        type="number"
                        defaultValue="50000"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxPositionSize">Max Position Size (%)</Label>
                      <div className="mt-2">
                        <Slider
                          defaultValue={[30]}
                          max={50}
                          min={10}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>10%</span>
                          <span>30%</span>
                          <span>50%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="maxLeverage">Max Leverage</Label>
                      <div className="mt-2">
                        <Slider
                          defaultValue={[3]}
                          max={10}
                          min={1}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>1x</span>
                          <span>3x</span>
                          <span>10x</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dailyLossLimit">Daily Loss Limit (%)</Label>
                      <div className="mt-2">
                        <Slider
                          defaultValue={[5]}
                          max={20}
                          min={1}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>1%</span>
                          <span>5%</span>
                          <span>20%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="maxDrawdown">Max Drawdown (%)</Label>
                      <div className="mt-2">
                        <Slider
                          defaultValue={[15]}
                          max={50}
                          min={5}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>5%</span>
                          <span>15%</span>
                          <span>50%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="marginCallLevel">Margin Call Level (%)</Label>
                      <div className="mt-2">
                        <Slider
                          defaultValue={[90]}
                          max={100}
                          min={50}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>50%</span>
                          <span>90%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save Limits</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Stress Testing Scenarios
              </CardTitle>
              <CardDescription>
                Portfolio impact analysis under various stress scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stressTests.map((test) => (
                  <Card key={test.id} className="border-l-4 border-l-red-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {test.scenario}
                            <Badge className={getSeverityColor(test.severity).replace('text-', 'bg-')}>
                              {test.severity}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            Probability: {(test.probability * 100).toFixed(1)}%
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-red-600">
                            {formatCurrency(test.portfolioImpact)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Portfolio Impact
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Max Drawdown</div>
                          <div className="text-lg font-semibold text-red-600">
                            {formatPercentage(test.maxDrawdown)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Recovery Time</div>
                          <div className="text-lg font-semibold">
                            {test.recoveryTime} days
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Actions</div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Analyze
                            </Button>
                            <Button size="sm" variant="outline">
                              Mitigate
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

        <TabsContent value="circuit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pause className="h-5 w-5" />
                Circuit Breakers
              </CardTitle>
              <CardDescription>
                Automatic trading halt mechanisms and controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {circuitBreakers.map((breaker) => (
                  <div key={breaker.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{breaker.name}</h3>
                        <Badge variant={breaker.triggered ? "destructive" : "default"}>
                          {breaker.triggered ? "TRIGGERED" : "ACTIVE"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Threshold: {breaker.threshold}% | Current: {breaker.currentValue}%
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {((breaker.currentValue / breaker.threshold) * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          of threshold
                        </div>
                      </div>
                      <Progress 
                        value={(breaker.currentValue / breaker.threshold) * 100} 
                        className="w-24 h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}