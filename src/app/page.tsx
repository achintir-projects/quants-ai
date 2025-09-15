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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/20">
            <div className="status-indicator status-active"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">SYSTEM LIVE</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="gradient-text">AI-Powered</span>
            <br />
            <span className="text-gray-900 dark:text-white">Quantum Brain</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Self-Improving Adaptive Trading Platform with Advanced Machine Learning
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Badge variant="outline" className="gradient-bg text-white border-none px-4 py-2 text-sm font-medium hover-scale">
              <Activity className="w-4 h-4 mr-1" />
              Live Trading
            </Badge>
            <Badge variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none px-4 py-2 text-sm font-medium hover-scale">
              <Brain className="w-4 h-4 mr-1" />
              AI Active
            </Badge>
            <Badge variant="outline" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 px-4 py-2 text-sm font-medium hover-scale">
              <Clock className="w-4 h-4 mr-1" />
              {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* Enhanced Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Portfolio Value</CardTitle>
              <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold gradient-text">{formatCurrency(portfolioMetrics.totalValue)}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatCurrency(portfolioMetrics.cash)} cash available
              </p>
              <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Daily P&L</CardTitle>
              <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg">
                {portfolioMetrics.dailyPnL >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-white" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-white" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${portfolioMetrics.dailyPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(portfolioMetrics.dailyPnL)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatPercentage(portfolioMetrics.dailyReturn)} today
              </p>
              <div className="mt-2 flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${portfolioMetrics.dailyPnL >= 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {portfolioMetrics.dailyPnL >= 0 ? 'Positive' : 'Negative'} momentum
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Return</CardTitle>
              <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatPercentage(portfolioMetrics.totalReturn)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sharpe: {portfolioMetrics.sharpeRatio.toFixed(2)}
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">78%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Risk Metrics</CardTitle>
              <div className="p-2 bg-gradient-to-r from-red-400 to-orange-500 rounded-lg">
                <Shield className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatPercentage(portfolioMetrics.maxDrawdown)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Max Drawdown
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="status-indicator status-warning"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Risk monitoring</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Risk Alert */}
        <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/30">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            Portfolio margin utilization at {((portfolioMetrics.margin / portfolioMetrics.totalValue) * 100).toFixed(1)}%. 
            Current margin: {formatCurrency(portfolioMetrics.margin)}
          </AlertDescription>
        </Alert>

        {/* Enhanced Main Content Tabs */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6">
          <Tabs defaultValue="ai" className="space-y-4">
            <TabsList className="grid w-full grid-cols-7 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
              <TabsTrigger value="strategies" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <Target className="w-4 h-4 mr-2" />
                Strategies
              </TabsTrigger>
              <TabsTrigger value="positions" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <BarChart3 className="w-4 h-4 mr-2" />
                Positions
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <TrendingUp className="w-4 h-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="backtesting" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <Activity className="w-4 h-4 mr-2" />
                Backtesting
              </TabsTrigger>
              <TabsTrigger value="market" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <Zap className="w-4 h-4 mr-2" />
                Market
              </TabsTrigger>
              <TabsTrigger value="risk" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <Shield className="w-4 h-4 mr-2" />
                Risk
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200">
                <Brain className="w-4 h-4 mr-2" />
                AI System
              </TabsTrigger>
            </TabsList>

          <TabsContent value="ai" className="space-y-4">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold gradient-text">AI-Powered Quantum Brain</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Self-Improving Adaptive Trading Platform</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      System Status
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                        <div className="text-sm text-gray-600 dark:text-gray-300">OODA Loop</div>
                        <div className="text-lg font-semibold text-green-600 flex items-center gap-1">
                          <div className="status-indicator status-active"></div>
                          Active
                        </div>
                      </div>
                      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                        <div className="text-sm text-gray-600 dark:text-gray-300">Feature Store</div>
                        <div className="text-lg font-semibold text-green-600 flex items-center gap-1">
                          <div className="status-indicator status-active"></div>
                          Online
                        </div>
                      </div>
                      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                        <div className="text-sm text-gray-600 dark:text-gray-300">Strategy Discovery</div>
                        <div className="text-lg font-semibold text-yellow-600 flex items-center gap-1">
                          <div className="status-indicator status-warning"></div>
                          Evolving
                        </div>
                      </div>
                      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                        <div className="text-sm text-gray-600 dark:text-gray-300">Risk Management</div>
                        <div className="text-lg font-semibold text-green-600 flex items-center gap-1">
                          <div className="status-indicator status-active"></div>
                          Active
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Performance Metrics
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                        <div className="text-sm text-gray-600 dark:text-gray-300">AI Confidence</div>
                        <div className="text-lg font-semibold text-blue-600">92.4%</div>
                      </div>
                      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                        <div className="text-sm text-gray-600 dark:text-gray-300">Signal Strength</div>
                        <div className="text-lg font-semibold text-green-600">78.9%</div>
                      </div>
                      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                        <div className="text-sm text-gray-600 dark:text-gray-300">Market Regime</div>
                        <div className="text-lg font-semibold">Normal</div>
                      </div>
                      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                        <div className="text-sm text-gray-600 dark:text-gray-300">Anomaly Score</div>
                        <div className="text-lg font-semibold text-yellow-600">5.2%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 p-6">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-8 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="ooda" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    OODA Loop
                  </TabsTrigger>
                  <TabsTrigger value="features" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Features
                  </TabsTrigger>
                  <TabsTrigger value="data" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Data
                  </TabsTrigger>
                  <TabsTrigger value="discovery" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Discovery
                  </TabsTrigger>
                  <TabsTrigger value="adaptive" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Adaptive
                  </TabsTrigger>
                  <TabsTrigger value="risk" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Risk
                  </TabsTrigger>
                  <TabsTrigger value="execution" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Execution
                  </TabsTrigger>
                  <TabsTrigger value="monitoring" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md transition-all duration-200 text-xs">
                    Monitor
                  </TabsTrigger>
                </TabsList>
              
              <TabsContent value="overview">
                <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-800/50 border border-slate-200 dark:border-slate-700/30">
                  <CardHeader>
                    <CardTitle className="gradient-text">AI System Overview</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">Comprehensive view of all AI modules and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Core AI Modules
                        </h4>
                        <div className="space-y-3">
                          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-300">OODA Loop System</span>
                              <span className="font-semibold text-purple-600">91%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full progress-animated" style={{ width: '91%' }}></div>
                            </div>
                          </div>
                          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-300">Feature Store</span>
                              <span className="font-semibold text-blue-600">88%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full progress-animated" style={{ width: '88%' }}></div>
                            </div>
                          </div>
                          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-300">Strategy Discovery</span>
                              <span className="font-semibold text-green-600">85%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full progress-animated" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-300">Adaptive Strategy Mgmt</span>
                              <span className="font-semibold text-orange-600">93%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full progress-animated" style={{ width: '93%' }}></div>
                            </div>
                          </div>
                          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-300">Predictive Risk Manager</span>
                              <span className="font-semibold text-red-600">89%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-red-400 to-pink-500 rounded-full progress-animated" style={{ width: '89%' }}></div>
                            </div>
                          </div>
                          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-300">Intelligent Execution Agent</span>
                              <span className="font-semibold text-indigo-600">87%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full progress-animated" style={{ width: '87%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          Alternative Data Sources
                        </h4>
                        <div className="space-y-3">
                          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-300">News Sentiment</span>
                              <span className="font-semibold text-cyan-600">82%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full progress-animated" style={{ width: '82%' }}></div>
                            </div>
                          </div>
                          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-300">Options Flow</span>
                              <span className="font-semibold text-emerald-600">89%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full progress-animated" style={{ width: '89%' }}></div>
                            </div>
                          </div>
                          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-300">Social Media</span>
                              <span className="font-semibold text-yellow-600">76%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full progress-animated" style={{ width: '76%' }}></div>
                            </div>
                          </div>
                          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-300">Market Data</span>
                              <span className="font-semibold text-green-600">95%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full progress-animated" style={{ width: '95%' }}></div>
                            </div>
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