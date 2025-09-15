'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle, 
  Activity,
  Target,
  BarChart3,
  Plus,
  Settings,
  RefreshCw,
  Download,
  Eye,
  Edit,
  Trash2,
  Zap,
  Calendar,
  Percent,
  Filter,
  Search,
  Shield,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  X,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

interface Position {
  id: string
  symbol: string
  underlying: string
  type: 'CALL' | 'PUT'
  strike: number
  expiration: string
  quantity: number
  entryPrice: number
  currentPrice: number
  unrealizedPnL: number
  realizedPnL: number
  status: 'OPEN' | 'CLOSED' | 'EXPIRED' | 'ASSIGNED'
  strategy: string
  portfolio: string
  daysToExpiry: number
  impliedVolatility: number
  delta: number
  gamma: number
  theta: number
  vega: number
  rho: number
  entryDate: Date
  lastUpdate: Date
  marginRequirement: number
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
}

interface PositionAction {
  id: string
  positionId: string
  type: 'HEDGE' | 'CLOSE' | 'ADJUST' | 'ROLL' | 'EXERCISE'
  quantity: number
  price: number
  status: 'PENDING' | 'EXECUTED' | 'FAILED'
  timestamp: Date
  description: string
}

interface PositionRisk {
  positionId: string
  deltaExposure: number
  gammaExposure: number
  vegaExposure: number
  thetaExposure: number
  var_95: number
  var_99: number
  expectedShortfall: number
  stressTestLoss: number
  liquidityRisk: 'LOW' | 'MEDIUM' | 'HIGH'
  concentrationRisk: 'LOW' | 'MEDIUM' | 'HIGH'
  correlationRisk: 'LOW' | 'MEDIUM' | 'HIGH'
}

interface PositionHistory {
  id: string
  positionId: string
  timestamp: Date
  action: string
  quantity: number
  price: number
  pnl: number
  cumulativePnL: number
  status: string
  description: string
}

export default function PositionManagement() {
  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      symbol: 'SPX 240517C5200',
      underlying: 'SPX',
      type: 'CALL',
      strike: 5200,
      expiration: '2024-05-17',
      quantity: 10,
      entryPrice: 12.50,
      currentPrice: 15.20,
      unrealizedPnL: 2700,
      realizedPnL: 0,
      status: 'OPEN',
      strategy: 'Delta-Neutral Volatility',
      portfolio: 'Main Trading Portfolio',
      daysToExpiry: 7,
      impliedVolatility: 18.2,
      delta: 0.28,
      gamma: 0.015,
      theta: -35,
      vega: 980,
      rho: 120,
      entryDate: new Date('2024-04-15'),
      lastUpdate: new Date(),
      marginRequirement: 25000,
      riskLevel: 'MEDIUM'
    },
    {
      id: '2',
      symbol: 'SPX 240517P4800',
      underlying: 'SPX',
      type: 'PUT',
      strike: 4800,
      expiration: '2024-05-17',
      quantity: -15,
      entryPrice: 8.75,
      currentPrice: 6.20,
      unrealizedPnL: 3825,
      realizedPnL: 0,
      status: 'OPEN',
      strategy: 'Delta-Neutral Volatility',
      portfolio: 'Main Trading Portfolio',
      daysToExpiry: 7,
      impliedVolatility: 18.5,
      delta: -0.72,
      gamma: 0.018,
      theta: -55,
      vega: -1650,
      rho: -180,
      entryDate: new Date('2024-04-15'),
      lastUpdate: new Date(),
      marginRequirement: 37500,
      riskLevel: 'MEDIUM'
    },
    {
      id: '3',
      symbol: 'QQQ 240524P440',
      underlying: 'QQQ',
      type: 'PUT',
      strike: 440,
      expiration: '2024-05-24',
      quantity: 25,
      entryPrice: 3.20,
      currentPrice: 4.15,
      unrealizedPnL: 2375,
      realizedPnL: 0,
      status: 'OPEN',
      strategy: 'Skew Arbitrage',
      portfolio: 'Main Trading Portfolio',
      daysToExpiry: 14,
      impliedVolatility: 22.1,
      delta: -0.45,
      gamma: 0.022,
      theta: -28,
      vega: 420,
      rho: -65,
      entryDate: new Date('2024-04-20'),
      lastUpdate: new Date(),
      marginRequirement: 15000,
      riskLevel: 'LOW'
    },
    {
      id: '4',
      symbol: 'SPX 240621C5000',
      underlying: 'SPX',
      type: 'CALL',
      strike: 5000,
      expiration: '2024-06-21',
      quantity: 5,
      entryPrice: 45.20,
      currentPrice: 52.80,
      unrealizedPnL: 3800,
      realizedPnL: 0,
      status: 'OPEN',
      strategy: 'Calendar Spread',
      portfolio: 'Main Trading Portfolio',
      daysToExpiry: 42,
      impliedVolatility: 17.8,
      delta: 0.42,
      gamma: 0.025,
      theta: -52,
      vega: 1450,
      rho: 280,
      entryDate: new Date('2024-04-10'),
      lastUpdate: new Date(),
      marginRequirement: 20000,
      riskLevel: 'LOW'
    }
  ])

  const [positionActions, setPositionActions] = useState<PositionAction[]>([])
  const [positionRisks, setPositionRisks] = useState<PositionRisk[]>([])
  const [positionHistory, setPositionHistory] = useState<PositionHistory[]>([])
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [isRealTime, setIsRealTime] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterStrategy, setFilterStrategy] = useState<string>('all')
  const [filterPortfolio, setFilterPortfolio] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        setPositions(prev => prev.map(position => ({
          ...position,
          currentPrice: position.currentPrice * (1 + (Math.random() - 0.5) * 0.002),
          unrealizedPnL: (position.currentPrice * (1 + (Math.random() - 0.5) * 0.002) - position.entryPrice) * position.quantity * 100,
          lastUpdate: new Date(),
          daysToExpiry: Math.max(0, position.daysToExpiry - 1/24) // Decrease by 1 hour
        })))
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isRealTime])

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

  const formatNumber = (value: number) => {
    return value.toFixed(4)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-green-500'
      case 'CLOSED': return 'bg-gray-500'
      case 'EXPIRED': return 'bg-yellow-500'
      case 'ASSIGNED': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-green-600'
      case 'MEDIUM': return 'text-yellow-600'
      case 'HIGH': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getRiskBgColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'bg-green-100'
      case 'MEDIUM': return 'bg-yellow-100'
      case 'HIGH': return 'bg-red-100'
      default: return 'bg-gray-100'
    }
  }

  const filteredPositions = positions.filter(position => {
    const matchesStatus = filterStatus === 'all' || position.status === filterStatus
    const matchesStrategy = filterStrategy === 'all' || position.strategy === filterStrategy
    const matchesPortfolio = filterPortfolio === 'all' || position.portfolio === filterPortfolio
    const matchesSearch = searchTerm === '' || 
      position.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.underlying.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesStrategy && matchesPortfolio && matchesSearch
  })

  const totalUnrealizedPnL = filteredPositions.reduce((sum, pos) => sum + pos.unrealizedPnL, 0)
  const totalRealizedPnL = filteredPositions.reduce((sum, pos) => sum + pos.realizedPnL, 0)
  const totalMarginRequirement = filteredPositions.reduce((sum, pos) => sum + pos.marginRequirement, 0)
  const totalDeltaExposure = filteredPositions.reduce((sum, pos) => sum + (pos.delta * pos.quantity * 100), 0)

  const executePositionAction = (positionId: string, action: string, quantity: number) => {
    const newAction: PositionAction = {
      id: Date.now().toString(),
      positionId,
      type: action as any,
      quantity,
      price: 0,
      status: 'PENDING',
      timestamp: new Date(),
      description: `${action} ${quantity} contracts`
    }
    
    setPositionActions(prev => [newAction, ...prev])
    
    // Simulate execution
    setTimeout(() => {
      setPositionActions(prev => prev.map(a => 
        a.id === newAction.id ? { ...a, status: 'EXECUTED' } : a
      ))
    }, 2000)
  }

  const closePosition = (positionId: string) => {
    setPositions(prev => prev.map(pos => 
      pos.id === positionId ? { ...pos, status: 'CLOSED' as const, realizedPnL: pos.unrealizedPnL, unrealizedPnL: 0 } : pos
    ))
  }

  const getExpiryAlert = (daysToExpiry: number) => {
    if (daysToExpiry <= 3) return { type: 'error', message: 'Expiring soon!' }
    if (daysToExpiry <= 7) return { type: 'warning', message: 'Near expiry' }
    if (daysToExpiry <= 14) return { type: 'info', message: 'Approaching expiry' }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Position Management Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Position Management</h2>
          <p className="text-muted-foreground">Monitor and manage your trading positions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isRealTime ? "default" : "secondary"}>
            <Activity className="w-3 h-3 mr-1" />
            {isRealTime ? 'Real-Time' : 'Paused'}
          </Badge>
          <Button
            onClick={() => setIsRealTime(!isRealTime)}
            variant={isRealTime ? "destructive" : "default"}
            size="sm"
          >
            {isRealTime ? 'Pause' : 'Resume'}
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Positions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredPositions.length}</div>
            <p className="text-xs text-muted-foreground">
              {filteredPositions.filter(p => p.status === 'OPEN').length} open positions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unrealized P&L</CardTitle>
            {totalUnrealizedPnL >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalUnrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(totalUnrealizedPnL)}
            </div>
            <p className="text-xs text-muted-foreground">
              Current positions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margin Requirement</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalMarginRequirement)}</div>
            <p className="text-xs text-muted-foreground">
              Total margin used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delta Exposure</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalDeltaExposure)}</div>
            <p className="text-xs text-muted-foreground">
              Portfolio delta
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="positions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="actions">Position Actions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Position Filters</CardTitle>
              <CardDescription>Filter positions by status, strategy, and portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search positions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                      <SelectItem value="EXPIRED">Expired</SelectItem>
                      <SelectItem value="ASSIGNED">Assigned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="strategy">Strategy</Label>
                  <Select value={filterStrategy} onValueChange={setFilterStrategy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Strategies</SelectItem>
                      <SelectItem value="Delta-Neutral Volatility">Delta-Neutral Volatility</SelectItem>
                      <SelectItem value="Skew Arbitrage">Skew Arbitrage</SelectItem>
                      <SelectItem value="Calendar Spread">Calendar Spread</SelectItem>
                      <SelectItem value="Dispersion Trading">Dispersion Trading</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio</Label>
                  <Select value={filterPortfolio} onValueChange={setFilterPortfolio}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Portfolios</SelectItem>
                      <SelectItem value="Main Trading Portfolio">Main Trading Portfolio</SelectItem>
                      <SelectItem value="Conservative Portfolio">Conservative Portfolio</SelectItem>
                      <SelectItem value="Aggressive Portfolio">Aggressive Portfolio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" size="sm" className="w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Positions List */}
          <div className="space-y-4">
            {filteredPositions.map((position) => {
              const expiryAlert = getExpiryAlert(position.daysToExpiry)
              return (
                <Card key={position.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            {position.symbol}
                            <Badge variant={position.type === 'CALL' ? 'default' : 'secondary'}>
                              {position.type}
                            </Badge>
                            <Badge className={getStatusColor(position.status)}>
                              {position.status}
                            </Badge>
                            <Badge className={getRiskBgColor(position.risk)}>
                              <span className={getRiskColor(position.risk)}>{position.risk}</span>
                            </Badge>
                          </CardTitle>
                        </div>
                        <CardDescription>
                          {position.underlying} • Strike: ${position.strike} • Expires: {position.expiration} • {position.strategy}
                        </CardDescription>
                        {expiryAlert && (
                          <Alert className={`mt-2 ${expiryAlert.type === 'error' ? 'border-red-200 bg-red-50' : expiryAlert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' : 'border-blue-200 bg-blue-50'}`}>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              {expiryAlert.message} ({position.daysToExpiry} days remaining)
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${position.unrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(position.unrealizedPnL)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {position.quantity > 0 ? 'Long' : 'Short'} {Math.abs(position.quantity)} contracts
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Updated: {position.lastUpdate.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Entry Price</div>
                        <div className="text-lg font-semibold">${position.entryPrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Current Price</div>
                        <div className="text-lg font-semibold">${position.currentPrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">P&L per Contract</div>
                        <div className={`text-lg font-semibold ${position.unrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${((position.currentPrice - position.entryPrice) * (position.quantity > 0 ? 1 : -1)).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Days to Expiry</div>
                        <div className="text-lg font-semibold">{position.daysToExpiry}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Implied Vol</div>
                        <div className="text-lg font-semibold">{formatNumber(position.impliedVolatility * 100)}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Margin Req</div>
                        <div className="text-lg font-semibold">{formatCurrency(position.marginRequirement)}</div>
                      </div>
                    </div>

                    {/* Greeks */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm text-muted-foreground">Delta</div>
                        <div className="font-semibold">{formatNumber(position.delta)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Gamma</div>
                        <div className="font-semibold">{formatNumber(position.gamma)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Theta</div>
                        <div className="font-semibold">{formatNumber(position.theta)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Vega</div>
                        <div className="font-semibold">{formatNumber(position.vega)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Rho</div>
                        <div className="font-semibold">{formatNumber(position.rho)}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executePositionAction(position.id, 'HEDGE', Math.abs(position.quantity))}
                        >
                          Hedge
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executePositionAction(position.id, 'ADJUST', Math.abs(position.quantity))}
                        >
                          Adjust
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => executePositionAction(position.id, 'ROLL', Math.abs(position.quantity))}
                        >
                          Roll
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedPosition(position)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => closePosition(position.id)}
                          disabled={position.status !== 'OPEN'}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Risk Analysis</CardTitle>
              <CardDescription>Comprehensive risk metrics for all positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Greeks Exposure</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Delta</span>
                      <span className="font-semibold">{formatNumber(totalDeltaExposure)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Gamma</span>
                      <span className="font-semibold">{formatNumber(filteredPositions.reduce((sum, pos) => sum + (pos.gamma * pos.quantity * 100), 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Vega</span>
                      <span className="font-semibold">{formatNumber(filteredPositions.reduce((sum, pos) => sum + (pos.vega * pos.quantity), 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Theta</span>
                      <span className="font-semibold">{formatNumber(filteredPositions.reduce((sum, pos) => sum + (pos.theta * pos.quantity), 0))}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Value at Risk</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Daily 95% VaR</span>
                      <span className="font-semibold text-red-600">{formatCurrency(-8500)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Daily 99% VaR</span>
                      <span className="font-semibold text-red-600">{formatCurrency(-12500)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Expected Shortfall</span>
                      <span className="font-semibold text-red-600">{formatCurrency(-9800)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Stress Test Loss</span>
                      <span className="font-semibold text-red-600">{formatCurrency(-25000)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Risk Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Liquidity Risk</span>
                      <Badge className="bg-green-100 text-green-600">LOW</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Concentration Risk</span>
                      <Badge className="bg-yellow-100 text-yellow-600">MEDIUM</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Correlation Risk</span>
                      <Badge className="bg-green-100 text-green-600">LOW</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Margin Utilization</span>
                      <span className="font-semibold text-yellow-600">68.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Position Risk Breakdown</CardTitle>
              <CardDescription>Detailed risk analysis by position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPositions.map((position) => (
                  <div key={position.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{position.symbol}</h3>
                      <Badge className={getRiskBgColor(position.risk)}>
                        <span className={getRiskColor(position.risk)}>{position.risk} RISK</span>
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Delta Exposure</div>
                        <div className="font-semibold">{formatNumber(position.delta * position.quantity * 100)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Gamma Exposure</div>
                        <div className="font-semibold">{formatNumber(position.gamma * position.quantity * 100)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Vega Exposure</div>
                        <div className="font-semibold">{formatNumber(position.vega * position.quantity)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Position VaR</div>
                        <div className="font-semibold text-red-600">{formatCurrency(-position.marginRequirement * 0.1)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Position Actions</CardTitle>
              <CardDescription>Track all position management actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {positionActions.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Recent Actions</h3>
                    <p className="text-gray-500">Position actions will appear here when executed</p>
                  </div>
                ) : (
                  positionActions.map((action) => (
                    <div key={action.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{action.type}</span>
                            <Badge className={
                              action.status === 'EXECUTED' ? 'bg-green-500' :
                              action.status === 'FAILED' ? 'bg-red-500' : 'bg-yellow-500'
                            }>
                              {action.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {action.timestamp.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{action.quantity} contracts</div>
                          <div className="text-xs text-muted-foreground">
                            Position ID: {action.positionId}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Position History</CardTitle>
              <CardDescription>Historical record of all position changes and P&L</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Position History</h3>
                <p className="text-gray-500">Detailed position history and trade logs would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}