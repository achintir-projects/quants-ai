'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle, 
  Activity,
  Target,
  Shield,
  BarChart3,
  Clock,
  Zap,
  Brain
} from 'lucide-react'
import OODALoopSystem from '@/components/ai/OODALoopSystem'
import UnifiedFeatureStore from '@/components/ai/UnifiedFeatureStore'
import AlternativeDataIntegration from '@/components/ai/AlternativeDataIntegration'
import StrategyDiscoveryEngine from '@/components/ai/StrategyDiscoveryEngine'
import AdaptiveStrategyManagement from '@/components/ai/AdaptiveStrategyManagement'
import PredictiveRiskManager from '@/components/ai/PredictiveRiskManager'
import IntelligentExecutionAgent from '@/components/ai/IntelligentExecutionAgent'
import AIMonitoringDashboard from '@/components/ai/AIMonitoringDashboard'

interface PortfolioMetrics {
  totalValue: number
  dailyPnL: number
  dailyReturn: number
  totalReturn: number
  sharpeRatio: number
  maxDrawdown: number
  winRate: number
  cash: number
  margin: number
}

export default function TradingDashboard() {
  const [portfolioMetrics, setPortfolioMetrics] = useState<PortfolioMetrics>({
    totalValue: 1000000,
    dailyPnL: 12500,
    dailyReturn: 1.25,
    totalReturn: 15.8,
    sharpeRatio: 2.1,
    maxDrawdown: -8.2,
    winRate: 62.5,
    cash: 150000,
    margin: 850000
  })

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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI-Powered Quantum Brain</h1>
            <p className="text-muted-foreground">Self-Improving Adaptive Trading Platform</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Activity className="w-3 h-3 mr-1" />
              Live Trading
            </Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              <Brain className="w-3 h-3 mr-1" />
              AI Active
            </Badge>
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(portfolioMetrics.totalValue)}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(portfolioMetrics.cash)} cash available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily P&L</CardTitle>
              {portfolioMetrics.dailyPnL >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${portfolioMetrics.dailyPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(portfolioMetrics.dailyPnL)}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatPercentage(portfolioMetrics.dailyReturn)} today
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
                {formatPercentage(portfolioMetrics.totalReturn)}
              </div>
              <p className="text-xs text-muted-foreground">
                Sharpe: {portfolioMetrics.sharpeRatio.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Metrics</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatPercentage(portfolioMetrics.maxDrawdown)}
              </div>
              <p className="text-xs text-muted-foreground">
                Max Drawdown
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Risk Alert */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Portfolio margin utilization at {((portfolioMetrics.margin / portfolioMetrics.totalValue) * 100).toFixed(1)}%. 
            Current margin: {formatCurrency(portfolioMetrics.margin)}
          </AlertDescription>
        </Alert>

        {/* Main Content Tabs */}
        <Tabs defaultValue="ai" className="space-y-4">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="backtesting">Backtesting</TabsTrigger>
            <TabsTrigger value="market">Market Data</TabsTrigger>
            <TabsTrigger value="risk">Risk Management</TabsTrigger>
            <TabsTrigger value="ai">AI System</TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI-Powered Quantum Brain
                </CardTitle>
                <CardDescription>
                  Self-Improving Adaptive Trading Platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">System Status</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">OODA Loop</div>
                        <div className="text-lg font-semibold text-green-600">Active</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Feature Store</div>
                        <div className="text-lg font-semibold text-green-600">Online</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Strategy Discovery</div>
                        <div className="text-lg font-semibold text-yellow-600">Evolving</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Risk Management</div>
                        <div className="text-lg font-semibold text-green-600">Active</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">AI Confidence</div>
                        <div className="text-lg font-semibold text-blue-600">92.4%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Signal Strength</div>
                        <div className="text-lg font-semibold text-green-600">78.9%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Market Regime</div>
                        <div className="text-lg font-semibold">Normal</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Anomaly Score</div>
                        <div className="text-lg font-semibold text-yellow-600">5.2%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="ooda">OODA Loop</TabsTrigger>
                <TabsTrigger value="features">Feature Store</TabsTrigger>
                <TabsTrigger value="data">Alternative Data</TabsTrigger>
                <TabsTrigger value="discovery">Strategy Discovery</TabsTrigger>
                <TabsTrigger value="adaptive">Adaptive Mgmt</TabsTrigger>
                <TabsTrigger value="risk">Predictive Risk</TabsTrigger>
                <TabsTrigger value="execution">Execution Agent</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>AI System Overview</CardTitle>
                    <CardDescription>Comprehensive view of all AI modules and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Core AI Modules</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>OODA Loop System</span>
                              <span>91%</span>
                            </div>
                            <Progress value={91} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Feature Store</span>
                              <span>88%</span>
                            </div>
                            <Progress value={88} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Strategy Discovery</span>
                              <span>85%</span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Adaptive Strategy Mgmt</span>
                              <span>93%</span>
                            </div>
                            <Progress value={93} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Predictive Risk Manager</span>
                              <span>89%</span>
                            </div>
                            <Progress value={89} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Intelligent Execution Agent</span>
                              <span>87%</span>
                            </div>
                            <Progress value={87} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold">Alternative Data Sources</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>News Sentiment</span>
                              <span>82%</span>
                            </div>
                            <Progress value={82} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Options Flow</span>
                              <span>89%</span>
                            </div>
                            <Progress value={89} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Social Media</span>
                              <span>76%</span>
                            </div>
                            <Progress value={76} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Market Data</span>
                              <span>95%</span>
                            </div>
                            <Progress value={95} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="ooda">
                <OODALoopSystem />
              </TabsContent>
              
              <TabsContent value="features">
                <UnifiedFeatureStore />
              </TabsContent>
              
              <TabsContent value="data">
                <AlternativeDataIntegration />
              </TabsContent>
              
              <TabsContent value="discovery">
                <StrategyDiscoveryEngine />
              </TabsContent>
              
              <TabsContent value="adaptive">
                <AdaptiveStrategyManagement />
              </TabsContent>
              
              <TabsContent value="risk">
                <PredictiveRiskManager />
              </TabsContent>
              
              <TabsContent value="execution">
                <IntelligentExecutionAgent />
              </TabsContent>
              
              <TabsContent value="monitoring">
                <AIMonitoringDashboard />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="strategies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trading Strategies</CardTitle>
                <CardDescription>Advanced options trading strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Strategies module will be loaded here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="positions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Positions Management</CardTitle>
                <CardDescription>Current trading positions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Positions module will be loaded here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Portfolio performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Performance module will be loaded here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backtesting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Backtesting Engine</CardTitle>
                <CardDescription>Strategy backtesting and validation</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Backtesting module will be loaded here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Data</CardTitle>
                <CardDescription>Real-time market data feeds</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Market data module will be loaded here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Management</CardTitle>
                <CardDescription>Risk monitoring and management</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Risk management module will be loaded here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}