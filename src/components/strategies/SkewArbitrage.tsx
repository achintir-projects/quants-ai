'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Target,
  Settings,
  Play,
  Pause,
  BarChart3,
  Zap,
  Activity
} from 'lucide-react'

interface SkewParameters {
  skewThreshold: number
  positionSize: number
  hedgeRatio: number
  maxExposure: number
  minLiquidity: number
  maxSpread: number
  lookbackPeriod: number
  rebalanceFrequency: number
}

interface SkewOpportunity {
  id: string
  underlying: string
  putStrike: number
  callStrike: number
  expiration: string
  currentSkew: number
  historicalSkew: number
  zScore: number
  confidence: number
  status: 'MONITORING' | 'ENTRY' | 'ACTIVE' | 'EXIT'
  unrealizedPnL: number
}

export default function SkewArbitrage() {
  const [parameters, setParameters] = useState<SkewParameters>({
    skewThreshold: 2.0,
    positionSize: 50000,
    hedgeRatio: 0.8,
    maxExposure: 200000,
    minLiquidity: 500,
    maxSpread: 0.03,
    lookbackPeriod: 30,
    rebalanceFrequency: 60
  })

  const [opportunities, setOpportunities] = useState<SkewOpportunity[]>([
    {
      id: '1',
      underlying: 'SPX',
      putStrike: 4800,
      callStrike: 5200,
      expiration: '2024-05-17',
      currentSkew: 8.5,
      historicalSkew: 5.2,
      zScore: 2.8,
      confidence: 85,
      status: 'ENTRY',
      unrealizedPnL: 0
    },
    {
      id: '2',
      underlying: 'QQQ',
      putStrike: 420,
      callStrike: 460,
      expiration: '2024-05-24',
      currentSkew: 6.2,
      historicalSkew: 4.1,
      zScore: 1.9,
      confidence: 72,
      status: 'MONITORING',
      unrealizedPnL: 0
    },
    {
      id: '3',
      underlying: 'IWM',
      putStrike: 195,
      callStrike: 215,
      expiration: '2024-05-31',
      currentSkew: 7.8,
      historicalSkew: 5.5,
      zScore: 2.1,
      confidence: 78,
      status: 'ACTIVE',
      unrealizedPnL: 3200
    }
  ])

  const [performance, setPerformance] = useState({
    totalReturn: 14.2,
    sharpeRatio: 1.85,
    winRate: 68.5,
    totalTrades: 89,
    maxDrawdown: -6.8,
    dailyPnL: 3100,
    monthlyPnL: 18200
  })

  const [isRunning, setIsRunning] = useState(false)

  const updateParameter = (key: keyof SkewParameters, value: any) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'MONITORING': return 'bg-blue-500'
      case 'ENTRY': return 'bg-yellow-500'
      case 'ACTIVE': return 'bg-green-500'
      case 'EXIT': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getZScoreColor = (zScore: number) => {
    if (Math.abs(zScore) >= 2.5) return 'text-red-600'
    if (Math.abs(zScore) >= 2.0) return 'text-orange-600'
    if (Math.abs(zScore) >= 1.5) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="space-y-6">
      {/* Strategy Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Skew Arbitrage Strategy</h2>
          <p className="text-muted-foreground">Exploit mispricings in the volatility smile</p>
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
            <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatPercentage(performance.maxDrawdown)}
            </div>
            <p className="text-xs text-muted-foreground">
              Risk managed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="opportunities" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Skew Opportunities
              </CardTitle>
              <CardDescription>
                Real-time skew arbitrage opportunities and active positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opp) => (
                  <Card key={opp.id} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {opp.underlying} Skew Arbitrage
                            <Badge className={getStatusColor(opp.status)}>
                              {opp.status}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            Put: {opp.putStrike} • Call: {opp.callStrike} • Exp: {opp.expiration}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getZScoreColor(opp.zScore)}`}>
                            Z-Score: {opp.zScore.toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Confidence: {opp.confidence}%
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Current Skew</div>
                          <div className="text-lg font-semibold">{opp.currentSkew.toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Historical Skew</div>
                          <div className="text-lg font-semibold">{opp.historicalSkew.toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Skew Diff</div>
                          <div className="text-lg font-semibold">
                            {(opp.currentSkew - opp.historicalSkew).toFixed(1)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">P&L</div>
                          <div className={`text-lg font-semibold ${opp.unrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(opp.unrealizedPnL)}
                          </div>
                        </div>
                      </div>
                      {opp.status === 'ENTRY' && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-yellow-800">Entry Signal Detected</p>
                              <p className="text-xs text-yellow-600">
                                Skew deviation exceeds threshold - consider entering position
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Analyze
                              </Button>
                              <Button size="sm">
                                Execute
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Strategy Parameters
              </CardTitle>
              <CardDescription>
                Configure the parameters for your skew arbitrage strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="skewThreshold">Skew Threshold (Z-Score)</Label>
                    <div className="mt-2">
                      <Slider
                        value={[parameters.skewThreshold]}
                        onValueChange={(value) => updateParameter('skewThreshold', value[0])}
                        max={5}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>1.0</span>
                        <span className="font-medium">{parameters.skewThreshold.toFixed(1)}</span>
                        <span>5.0</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="positionSize">Position Size</Label>
                    <Input
                      id="positionSize"
                      type="number"
                      value={parameters.positionSize}
                      onChange={(e) => updateParameter('positionSize', Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hedgeRatio">Hedge Ratio</Label>
                    <div className="mt-2">
                      <Slider
                        value={[parameters.hedgeRatio]}
                        onValueChange={(value) => updateParameter('hedgeRatio', value[0])}
                        max={1}
                        min={0.5}
                        step={0.05}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>50%</span>
                        <span className="font-medium">{(parameters.hedgeRatio * 100).toFixed(0)}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="maxExposure">Max Exposure</Label>
                    <Input
                      id="maxExposure"
                      type="number"
                      value={parameters.maxExposure}
                      onChange={(e) => updateParameter('maxExposure', Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
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
                        max={10}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>1%</span>
                        <span className="font-medium">{(parameters.maxSpread * 100).toFixed(1)}%</span>
                        <span>10%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="lookbackPeriod">Lookback Period (days)</Label>
                    <Input
                      id="lookbackPeriod"
                      type="number"
                      value={parameters.lookbackPeriod}
                      onChange={(e) => updateParameter('lookbackPeriod', Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="rebalanceFrequency">Rebalance Frequency (minutes)</Label>
                    <Input
                      id="rebalanceFrequency"
                      type="number"
                      value={parameters.rebalanceFrequency}
                      onChange={(e) => updateParameter('rebalanceFrequency', Number(e.target.value))}
                      className="mt-1"
                    />
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
      </Tabs>
    </div>
  )
}