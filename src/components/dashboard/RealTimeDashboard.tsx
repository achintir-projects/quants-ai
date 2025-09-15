'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle,
  Target,
  BarChart3,
  Wifi,
  WifiOff,
  RefreshCw,
  Bell,
  BellOff,
  Zap,
  Clock,
  Signal,
  Shield,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'
import { 
  useRealTimeMarketData, 
  useRealTimePositions, 
  useRealTimeRiskAlerts, 
  useRealTimeStrategySignals 
} from '@/hooks/useWebSocket'

interface RealTimeMetrics {
  connectedClients: number
  messagesPerSecond: number
  uptime: string
  lastUpdate: Date
  systemLoad: number
  memoryUsage: number
}

export default function RealTimeDashboard() {
  const [selectedPortfolio, setSelectedPortfolio] = useState('main_portfolio')
  const [selectedStrategy, setSelectedStrategy] = useState('delta_neutral_volatility')
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [signalsEnabled, setSignalsEnabled] = useState(true)
  
  // Real-time data hooks
  const { marketData, isConnected: marketConnected, error: marketError } = useRealTimeMarketData(['SPX', 'QQQ', 'IWM', 'VIX'])
  const { positionUpdates, isConnected: positionsConnected, error: positionsError } = useRealTimePositions(selectedPortfolio)
  const { alerts, isConnected: alertsConnected, clearAlerts } = useRealTimeRiskAlerts()
  const { signals, isConnected: signalsConnected, clearSignals } = useRealTimeStrategySignals(selectedStrategy)

  const [systemMetrics, setSystemMetrics] = useState<RealTimeMetrics>({
    connectedClients: 0,
    messagesPerSecond: 0,
    uptime: '00:00:00',
    lastUpdate: new Date(),
    systemLoad: 0,
    memoryUsage: 0
  })

  useEffect(() => {
    // Simulate system metrics updates
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        connectedClients: Math.floor(Math.random() * 50) + 10,
        messagesPerSecond: Math.floor(Math.random() * 100) + 20,
        uptime: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString().substr(11, 8),
        systemLoad: Math.random() * 100,
        memoryUsage: Math.random() * 100,
        lastUpdate: new Date()
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const getConnectionStatus = (isConnected: boolean, error: string | null) => {
    if (error) return { status: 'error', color: 'text-red-600', icon: WifiOff, text: 'Error' }
    if (isConnected) return { status: 'connected', color: 'text-green-600', icon: Wifi, text: 'Connected' }
    return { status: 'disconnected', color: 'text-gray-600', icon: WifiOff, text: 'Disconnected' }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'border-red-500 bg-red-50'
      case 'HIGH': return 'border-orange-500 bg-orange-50'
      case 'MEDIUM': return 'border-yellow-500 bg-yellow-50'
      case 'LOW': return 'border-blue-500 bg-blue-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const getSignalColor = (type: string) => {
    switch (type) {
      case 'BUY': return 'border-green-500 bg-green-50'
      case 'SELL': return 'border-red-500 bg-red-50'
      case 'HEDGE': return 'border-yellow-500 bg-yellow-50'
      case 'CLOSE': return 'border-gray-500 bg-gray-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const marketStatus = getConnectionStatus(marketConnected, marketError)
  const positionsStatus = getConnectionStatus(positionsConnected, positionsError)
  const alertsStatus = getConnectionStatus(alertsConnected, null)
  const signalsStatus = getConnectionStatus(signalsConnected, null)

  return (
    <div className="space-y-6">
      {/* Real-Time Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Real-Time Dashboard</h2>
          <p className="text-muted-foreground">Live market data and trading signals</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={marketConnected ? "default" : "secondary"}>
            <Activity className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Signal className="h-5 w-5" />
            Connection Status
          </CardTitle>
          <CardDescription>Real-time data stream connections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <marketStatus.icon className={`h-4 w-4 ${marketStatus.color}`} />
                <span className="font-medium">Market Data</span>
              </div>
              <Badge className={marketStatus.color === 'text-green-600' ? 'bg-green-500' : marketStatus.color === 'text-red-600' ? 'bg-red-500' : 'bg-gray-500'}>
                {marketStatus.text}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <positionsStatus.icon className={`h-4 w-4 ${positionsStatus.color}`} />
                <span className="font-medium">Position Updates</span>
              </div>
              <Badge className={positionsStatus.color === 'text-green-600' ? 'bg-green-500' : positionsStatus.color === 'text-red-600' ? 'bg-red-500' : 'bg-gray-500'}>
                {positionsStatus.text}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <alertsStatus.icon className={`h-4 w-4 ${alertsStatus.color}`} />
                <span className="font-medium">Risk Alerts</span>
              </div>
              <Badge className={alertsStatus.color === 'text-green-600' ? 'bg-green-500' : alertsStatus.color === 'text-red-600' ? 'bg-red-500' : 'bg-gray-500'}>
                {alertsStatus.text}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <signalsStatus.icon className={`h-4 w-4 ${signalsStatus.color}`} />
                <span className="font-medium">Strategy Signals</span>
              </div>
              <Badge className={signalsStatus.color === 'text-green-600' ? 'bg-green-500' : signalsStatus.color === 'text-red-600' ? 'bg-red-500' : 'bg-gray-500'}>
                {signalsStatus.text}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            System Metrics
          </CardTitle>
          <CardDescription>Real-time system performance and usage statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Connection Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Connected Clients</span>
                  <span className="font-semibold">{formatNumber(systemMetrics.connectedClients)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Messages/Second</span>
                  <span className="font-semibold">{formatNumber(systemMetrics.messagesPerSecond)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="font-semibold">{systemMetrics.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Update</span>
                  <span className="font-semibold">{systemMetrics.lastUpdate.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">System Resources</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">System Load</span>
                    <span className="text-sm font-semibold">{systemMetrics.systemLoad.toFixed(1)}%</span>
                  </div>
                  <Progress value={systemMetrics.systemLoad} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Memory Usage</span>
                    <span className="text-sm font-semibold">{systemMetrics.memoryUsage.toFixed(1)}%</span>
                  </div>
                  <Progress value={systemMetrics.memoryUsage} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Data Streams</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Market Data Stream</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${marketConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-xs">{marketConnected ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Position Updates</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${positionsConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-xs">{positionsConnected ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Alerts</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${alertsConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-xs">{alertsConnected ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Strategy Signals</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${signalsConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-xs">{signalsConnected ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="market" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="market">Market Data</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
          <TabsTrigger value="signals">Strategy Signals</TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Real-Time Market Data
              </CardTitle>
              <CardDescription>Live market prices and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(marketData).map(([symbol, data]) => (
                  <Card key={symbol} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{symbol}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold">{formatCurrency(data.price)}</div>
                        <div className={`flex items-center gap-1 ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {data.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          <span className="font-semibold">{formatCurrency(data.change)}</span>
                          <span>({formatPercentage(data.changePercent)})</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Vol: {formatNumber(data.volume)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Updated: {new Date(data.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Real-Time Position Updates
              </CardTitle>
              <CardDescription>Live position P&L and Greeks updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium">Portfolio</label>
                  <Select value={selectedPortfolio} onValueChange={setSelectedPortfolio}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main_portfolio">Main Portfolio</SelectItem>
                      <SelectItem value="conservative_portfolio">Conservative Portfolio</SelectItem>
                      <SelectItem value="aggressive_portfolio">Aggressive Portfolio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {positionUpdates.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Position Updates</h3>
                    <p className="text-gray-500">Position updates will appear here when available</p>
                  </div>
                ) : (
                  positionUpdates.map((update) => (
                    <div key={update.positionId} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{update.symbol}</h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date(update.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Current Price</div>
                          <div className="font-semibold">{formatCurrency(update.currentPrice)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Unrealized P&L</div>
                          <div className={`font-semibold ${update.unrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(update.unrealizedPnL)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Delta</div>
                          <div className="font-semibold">{update.delta.toFixed(4)}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Real-Time Risk Alerts
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant={alertsEnabled ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setAlertsEnabled(!alertsEnabled)}
                  >
                    {alertsEnabled ? <Bell className="w-4 h-4 mr-2" /> : <BellOff className="w-4 h-4 mr-2" />}
                    {alertsEnabled ? 'Enabled' : 'Disabled'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearAlerts}>
                    Clear All
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Live risk monitoring and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
                    <p className="text-gray-500">Risk alerts will appear here when triggered</p>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <Alert key={alert.id} className={getAlertColor(alert.severity)}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{alert.type.replace(/_/g, ' ')}</div>
                            <div className="text-sm">{alert.message}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(alert.timestamp).toLocaleString()}
                            </div>
                          </div>
                          <Badge variant={alert.severity === 'CRITICAL' ? 'destructive' : alert.severity === 'HIGH' ? 'destructive' : 'secondary'}>
                            {alert.severity}
                          </Badge>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Real-Time Strategy Signals
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <label className="text-sm font-medium">Strategy</label>
                    <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                      <SelectTrigger className="w-48 ml-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delta_neutral_volatility">Delta Neutral Volatility</SelectItem>
                        <SelectItem value="skew_arbitrage">Skew Arbitrage</SelectItem>
                        <SelectItem value="calendar_spread">Calendar Spread</SelectItem>
                        <SelectItem value="dispersion_trading">Dispersion Trading</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    variant={signalsEnabled ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSignalsEnabled(!signalsEnabled)}
                  >
                    {signalsEnabled ? 'Enabled' : 'Disabled'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearSignals}>
                    Clear All
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Live trading signals from your strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {signals.length === 0 ? (
                  <div className="text-center py-8">
                    <Signal className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Strategy Signals</h3>
                    <p className="text-gray-500">Trading signals will appear here when generated</p>
                  </div>
                ) : (
                  signals.map((signal) => (
                    <div key={`${signal.strategyId}-${signal.timestamp.getTime()}`} className={`p-4 border rounded-lg ${getSignalColor(signal.type)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{signal.type} Signal</h3>
                        <span className="text-xs text-muted-foreground">
                          {new Date(signal.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Symbol</div>
                          <div className="font-semibold">{signal.symbol}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Strength</div>
                          <div className="font-semibold">{(signal.strength * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Confidence</div>
                          <div className="font-semibold">{(signal.confidence * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Strategy</div>
                          <div className="font-semibold">{signal.strategyId}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}