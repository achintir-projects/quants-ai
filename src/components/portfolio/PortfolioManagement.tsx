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
  PieChart, 
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
  Upload,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'

interface Portfolio {
  id: string
  name: string
  description: string
  totalValue: number
  cash: number
  margin: number
  dailyPnL: number
  totalReturn: number
  status: 'ACTIVE' | 'PAUSED' | 'CLOSED'
  createdAt: Date
  strategies: string[]
  riskLevel: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE'
}

interface Allocation {
  strategy: string
  percentage: number
  value: number
  dailyPnL: number
  color: string
}

interface PerformanceMetric {
  date: string
  value: number
  return: number
  drawdown: number
}

interface CashFlow {
  id: string
  date: Date
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'FEE' | 'INTEREST'
  amount: number
  description: string
  status: 'COMPLETED' | 'PENDING' | 'FAILED'
}

export default function PortfolioManagement() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([
    {
      id: '1',
      name: 'Main Trading Portfolio',
      description: 'Primary quantitative trading portfolio',
      totalValue: 1000000,
      cash: 150000,
      margin: 850000,
      dailyPnL: 12500,
      totalReturn: 15.8,
      status: 'ACTIVE',
      createdAt: new Date('2024-01-01'),
      strategies: ['Delta-Neutral Volatility', 'Skew Arbitrage', 'Calendar Spread'],
      riskLevel: 'MODERATE'
    },
    {
      id: '2',
      name: 'Conservative Portfolio',
      description: 'Low-risk strategies only',
      totalValue: 500000,
      cash: 200000,
      margin: 300000,
      dailyPnL: 3200,
      totalReturn: 8.2,
      status: 'ACTIVE',
      createdAt: new Date('2024-02-15'),
      strategies: ['Calendar Spread'],
      riskLevel: 'CONSERVATIVE'
    },
    {
      id: '3',
      name: 'Aggressive Portfolio',
      description: 'High-frequency trading strategies',
      totalValue: 750000,
      cash: 50000,
      margin: 700000,
      dailyPnL: 8900,
      totalReturn: 22.4,
      status: 'PAUSED',
      createdAt: new Date('2024-03-01'),
      strategies: ['Delta-Neutral Volatility', 'Skew Arbitrage'],
      riskLevel: 'AGGRESSIVE'
    }
  ])

  const [allocations, setAllocations] = useState<Allocation[]>([
    { strategy: 'Delta-Neutral Volatility', percentage: 35, value: 350000, dailyPnL: 5200, color: '#3B82F6' },
    { strategy: 'Skew Arbitrage', percentage: 25, value: 250000, dailyPnL: 3100, color: '#10B981' },
    { strategy: 'Calendar Spread', percentage: 20, value: 200000, dailyPnL: -800, color: '#F59E0B' },
    { strategy: 'Dispersion Trading', percentage: 20, value: 200000, dailyPnL: 5000, color: '#EF4444' }
  ])

  const [performance, setPerformance] = useState<PerformanceMetric[]>([
    { date: '2024-01-01', value: 1000000, return: 0, drawdown: 0 },
    { date: '2024-01-31', value: 1025000, return: 2.5, drawdown: -1.2 },
    { date: '2024-02-29', value: 1080000, return: 8.0, drawdown: -3.5 },
    { date: '2024-03-31', value: 1120000, return: 12.0, drawdown: -5.8 },
    { date: '2024-04-30', value: 1158000, return: 15.8, drawdown: -8.2 }
  ])

  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    {
      id: '1',
      date: new Date('2024-01-01'),
      type: 'DEPOSIT',
      amount: 1000000,
      description: 'Initial portfolio funding',
      status: 'COMPLETED'
    },
    {
      id: '2',
      date: new Date('2024-02-15'),
      type: 'WITHDRAWAL',
      amount: 50000,
      description: 'Monthly profit distribution',
      status: 'COMPLETED'
    },
    {
      id: '3',
      date: new Date('2024-03-01'),
      type: 'DEPOSIT',
      amount: 250000,
      description: 'Additional capital allocation',
      status: 'COMPLETED'
    },
    {
      id: '4',
      date: new Date('2024-04-15'),
      type: 'FEE',
      amount: -2500,
      description: 'Platform subscription fee',
      status: 'COMPLETED'
    }
  ])

  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>(portfolios[0])
  const [isCreating, setIsCreating] = useState(false)

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
      case 'ACTIVE': return 'bg-green-500'
      case 'PAUSED': return 'bg-yellow-500'
      case 'CLOSED': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'CONSERVATIVE': return 'bg-blue-500'
      case 'MODERATE': return 'bg-yellow-500'
      case 'AGGRESSIVE': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getCashFlowColor = (type: string) => {
    switch (type) {
      case 'DEPOSIT': return 'text-green-600'
      case 'WITHDRAWAL': return 'text-red-600'
      case 'FEE': return 'text-orange-600'
      case 'INTEREST': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Management Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Portfolio Management</h2>
          <p className="text-muted-foreground">Manage your trading portfolios and allocations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Portfolio
          </Button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(selectedPortfolio.totalValue)}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(selectedPortfolio.cash)} cash available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily P&L</CardTitle>
            {selectedPortfolio.dailyPnL >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${selectedPortfolio.dailyPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(selectedPortfolio.dailyPnL)}
            </div>
            <p className="text-xs text-muted-foreground">
              Today's performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Return</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatPercentage(selectedPortfolio.totalReturn)}
            </div>
            <p className="text-xs text-muted-foreground">
              Since inception
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margin Utilization</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {((selectedPortfolio.margin / selectedPortfolio.totalValue) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(selectedPortfolio.margin)} margin
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {/* Portfolio Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Portfolio Selection
                </CardTitle>
                <CardDescription>
                  Select and manage your trading portfolios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {portfolios.map((portfolio) => (
                    <div 
                      key={portfolio.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPortfolio.id === portfolio.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedPortfolio(portfolio)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{portfolio.name}</h3>
                            <Badge className={getStatusColor(portfolio.status)}>
                              {portfolio.status}
                            </Badge>
                            <Badge className={getRiskColor(portfolio.riskLevel)}>
                              {portfolio.riskLevel}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{portfolio.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Created: {portfolio.createdAt.toLocaleDateString()}</span>
                            <span>Strategies: {portfolio.strategies.length}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{formatCurrency(portfolio.totalValue)}</div>
                          <div className={`text-sm ${portfolio.dailyPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(portfolio.dailyPnL)} today
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatPercentage(portfolio.totalReturn)} total
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Portfolio Summary
                </CardTitle>
                <CardDescription>
                  Detailed overview of selected portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Portfolio Value</div>
                      <div className="text-2xl font-bold">{formatCurrency(selectedPortfolio.totalValue)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Cash Balance</div>
                      <div className="text-lg font-semibold">{formatCurrency(selectedPortfolio.cash)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Margin Used</div>
                      <div className="text-lg font-semibold">{formatCurrency(selectedPortfolio.margin)}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Daily P&L</div>
                      <div className={`text-2xl font-bold ${selectedPortfolio.dailyPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(selectedPortfolio.dailyPnL)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Return</div>
                      <div className="text-lg font-semibold text-green-600">
                        {formatPercentage(selectedPortfolio.totalReturn)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Risk Level</div>
                      <Badge className={getRiskColor(selectedPortfolio.riskLevel)}>
                        {selectedPortfolio.riskLevel}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Active Strategies</div>
                      <div className="text-lg font-semibold">{selectedPortfolio.strategies.length}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Status</div>
                      <Badge className={getStatusColor(selectedPortfolio.status)}>
                        {selectedPortfolio.status}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Created</div>
                      <div className="text-sm">{selectedPortfolio.createdAt.toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Strategy Allocation
              </CardTitle>
              <CardDescription>
                Manage capital allocation across different strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  {allocations.map((allocation) => (
                    <div key={allocation.strategy} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: allocation.color }}
                        />
                        <div>
                          <div className="font-medium">{allocation.strategy}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatCurrency(allocation.value)} allocated
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{allocation.percentage}%</div>
                        <div className={`text-sm ${allocation.dailyPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(allocation.dailyPnL)} today
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium">Total Allocation</div>
                  <div className="text-lg font-bold">
                    {allocations.reduce((sum, a) => sum + a.percentage, 0)}%
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Rebalance
                  </Button>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Strategy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Analytics
              </CardTitle>
              <CardDescription>
                Detailed performance metrics and historical data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Best Month</div>
                    <div className="text-lg font-bold text-green-600">+8.2%</div>
                    <div className="text-xs text-muted-foreground">February 2024</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Worst Month</div>
                    <div className="text-lg font-bold text-red-600">-2.1%</div>
                    <div className="text-xs text-muted-foreground">March 2024</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg Monthly Return</div>
                    <div className="text-lg font-bold">+3.2%</div>
                    <div className="text-xs text-muted-foreground">Last 6 months</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Win Rate</div>
                    <div className="text-lg font-bold">68.5%</div>
                    <div className="text-xs text-muted-foreground">Monthly basis</div>
                  </div>
                </div>

                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Performance charts and detailed analytics coming soon...</p>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button>
                    <Eye className="w-4 h-4 mr-2" />
                    Detailed View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cash Flow Management
              </CardTitle>
              <CardDescription>
                Track deposits, withdrawals, and fees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Total Deposits</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(cashFlows.filter(cf => cf.type === 'DEPOSIT').reduce((sum, cf) => sum + cf.amount, 0))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Total Withdrawals</div>
                  <div className="text-lg font-bold text-red-600">
                    {formatCurrency(Math.abs(cashFlows.filter(cf => cf.type === 'WITHDRAWAL').reduce((sum, cf) => sum + cf.amount, 0)))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Net Cash Flow</div>
                  <div className="text-lg font-bold">
                    {formatCurrency(cashFlows.reduce((sum, cf) => sum + cf.amount, 0))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Recent Transactions</h3>
                  <div className="space-y-3">
                    {cashFlows.map((flow) => (
                      <div key={flow.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            flow.status === 'COMPLETED' ? 'bg-green-500' : 
                            flow.status === 'PENDING' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <div>
                            <div className="font-medium">{flow.description}</div>
                            <div className="text-sm text-muted-foreground">
                              {flow.date.toLocaleDateString()} • {flow.type}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-semibold ${getCashFlowColor(flow.type)}`}>
                            {flow.type === 'DEPOSIT' ? '+' : ''}{formatCurrency(flow.amount)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {flow.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Deposit
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Withdraw
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Portfolio Settings
              </CardTitle>
              <CardDescription>
                Configure portfolio parameters and risk settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="portfolioName">Portfolio Name</Label>
                      <Input
                        id="portfolioName"
                        defaultValue={selectedPortfolio.name}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="portfolioDescription">Description</Label>
                      <Input
                        id="portfolioDescription"
                        defaultValue={selectedPortfolio.description}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="riskLevel">Risk Level</Label>
                      <div className="mt-2">
                        <select 
                          id="riskLevel" 
                          defaultValue={selectedPortfolio.riskLevel}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="CONSERVATIVE">Conservative</option>
                          <option value="MODERATE">Moderate</option>
                          <option value="AGGRESSIVE">Aggressive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
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
                    <div>
                      <Label htmlFor="maxDrawdown">Max Drawdown Limit (%)</Label>
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
                      <Label htmlFor="rebalanceFreq">Rebalance Frequency</Label>
                      <div className="mt-2">
                        <select 
                          id="rebalanceFreq" 
                          defaultValue="30"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="7">Weekly</option>
                          <option value="30">Monthly</option>
                          <option value="90">Quarterly</option>
                          <option value="365">Yearly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Portfolio Status</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedPortfolio.status === 'ACTIVE' ? 'Trading is active' : 
                       selectedPortfolio.status === 'PAUSED' ? 'Trading is paused' : 'Portfolio is closed'}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={selectedPortfolio.status === 'ACTIVE' ? 'destructive' : 'default'}
                      size="sm"
                    >
                      {selectedPortfolio.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}