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
  Calendar,
  Clock
} from 'lucide-react'

interface CalendarParameters {
  termStructureThreshold: number
  minDaysToExpiration: number
  maxDaysToExpiration: number
  positionSize: number
  maxPositions: number
  minLiquidity: number
  maxSpread: number
  volatilityFilter: number
  rollFrequency: number
}

interface CalendarOpportunity {
  id: string
  underlying: string
  nearTermExpiration: string
  farTermExpiration: string
  strike: number
  nearTermIV: number
  farTermIV: number
  ivRatio: number
  historicalRatio: number
  zScore: number
  confidence: number
  status: 'MONITORING' | 'ENTRY' | 'ACTIVE' | 'EXIT'
  unrealizedPnL: number
  daysToExpiration: number
}

export default function CalendarSpread() {
  const [parameters, setParameters] = useState<CalendarParameters>({
    termStructureThreshold: 1.5,
    minDaysToExpiration: 7,
    maxDaysToExpiration: 45,
    positionSize: 25000,
    maxPositions: 10,
    minLiquidity: 300,
    maxSpread: 0.04,
    volatilityFilter: 0.15,
    rollFrequency: 7
  })

  const [opportunities, setOpportunities] = useState<CalendarOpportunity[]>([
    {
      id: '1',
      underlying: 'SPX',
      nearTermExpiration: '2024-05-17',
      farTermExpiration: '2024-06-21',
      strike: 5100,
      nearTermIV: 16.8,
      farTermIV: 18.2,
      ivRatio: 1.083,
      historicalRatio: 1.025,
      zScore: 2.1,
      confidence: 78,
      status: 'ENTRY',
      unrealizedPnL: 0,
      daysToExpiration: 14
    },
    {
      id: '2',
      underlying: 'QQQ',
      nearTermExpiration: '2024-05-24',
      farTermExpiration: '2024-07-19',
      strike: 440,
      nearTermIV: 19.5,
      farTermIV: 21.8,
      ivRatio: 1.118,
      historicalRatio: 1.065,
      zScore: 1.8,
      confidence: 65,
      status: 'MONITORING',
      unrealizedPnL: 0,
      daysToExpiration: 21
    },
    {
      id: '3',
      underlying: 'IWM',
      nearTermExpiration: '2024-05-31',
      farTermExpiration: '2024-06-28',
      strike: 205,
      nearTermIV: 22.1,
      farTermIV: 23.9,
      ivRatio: 1.081,
      historicalRatio: 1.045,
      zScore: 1.6,
      confidence: 62,
      status: 'ACTIVE',
      unrealizedPnL: 1800,
      daysToExpiration: 28
    }
  ])

  const [performance, setPerformance] = useState({
    totalReturn: 12.8,
    sharpeRatio: 1.72,
    winRate: 71.2,
    totalTrades: 67,
    maxDrawdown: -5.4,
    dailyPnL: -800,
    monthlyPnL: 15600
  })

  const [isRunning, setIsRunning] = useState(false)

  const updateParameter = (key: keyof CalendarParameters, value: any) => {
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
          <h2 className="text-2xl font-bold tracking-tight">Calendar Spread Strategy</h2>
          <p className="text-muted-foreground">Exploit term structure anomalies in volatility</p>
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
              Time decay focused
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
                <Calendar className="h-5 w-5" />
                Calendar Spread Opportunities
              </CardTitle>
              <CardDescription>
                Term structure anomalies and active calendar spread positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opp) => (
                  <Card key={opp.id} className="border-l-4 border-l-teal-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {opp.underlying} Calendar Spread
                            <Badge className={getStatusColor(opp.status)}>
                              {opp.status}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Near: {opp.nearTermExpiration} • Far: {opp.farTermExpiration} • Strike: {opp.strike}
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
                          <div className="text-sm text-muted-foreground">IV Ratio</div>
                          <div className="text-lg font-semibold">{opp.ivRatio.toFixed(3)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Historical Ratio</div>
                          <div className="text-lg font-semibold">{opp.historicalRatio.toFixed(3)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Ratio Diff</div>
                          <div className="text-lg font-semibold">
                            {(opp.ivRatio - opp.historicalRatio).toFixed(3)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Days to Exp</div>
                          <div className="text-lg font-semibold">{opp.daysToExpiration}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Near IV</div>
                          <div className="text-lg font-semibold">{opp.nearTermIV.toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Far IV</div>
                          <div className="text-lg font-semibold">{opp.farTermIV.toFixed(1)}%</div>
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
                              <p className="text-sm font-medium text-yellow-800">Term Structure Opportunity</p>
                              <p className="text-xs text-yellow-600">
                                IV ratio exceeds historical range - consider calendar spread position
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
                Configure the parameters for your calendar spread strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="termStructureThreshold">Term Structure Threshold (Z-Score)</Label>
                    <div className="mt-2">
                      <Slider
                        value={[parameters.termStructureThreshold]}
                        onValueChange={(value) => updateParameter('termStructureThreshold', value[0])}
                        max={3}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>1.0</span>
                        <span className="font-medium">{parameters.termStructureThreshold.toFixed(1)}</span>
                        <span>3.0</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="minDaysToExpiration">Min Days to Expiration</Label>
                    <Input
                      id="minDaysToExpiration"
                      type="number"
                      value={parameters.minDaysToExpiration}
                      onChange={(e) => updateParameter('minDaysToExpiration', Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxDaysToExpiration">Max Days to Expiration</Label>
                    <Input
                      id="maxDaysToExpiration"
                      type="number"
                      value={parameters.maxDaysToExpiration}
                      onChange={(e) => updateParameter('maxDaysToExpiration', Number(e.target.value))}
                      className="mt-1"
                    />
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
                    <Label htmlFor="maxPositions">Max Positions</Label>
                    <Input
                      id="maxPositions"
                      type="number"
                      value={parameters.maxPositions}
                      onChange={(e) => updateParameter('maxPositions', Number(e.target.value))}
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
                    <Label htmlFor="volatilityFilter">Volatility Filter</Label>
                    <div className="mt-2">
                      <Slider
                        value={[parameters.volatilityFilter * 100]}
                        onValueChange={(value) => updateParameter('volatilityFilter', value[0] / 100)}
                        max={50}
                        min={10}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>10%</span>
                        <span className="font-medium">{(parameters.volatilityFilter * 100).toFixed(0)}%</span>
                        <span>50%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="rollFrequency">Roll Frequency (days)</Label>
                    <Input
                      id="rollFrequency"
                      type="number"
                      value={parameters.rollFrequency}
                      onChange={(e) => updateParameter('rollFrequency', Number(e.target.value))}
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