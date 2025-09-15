'use client'

import { useState, useEffect } from 'react'
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
  Brain,
  Play
} from 'lucide-react'
import Link from 'next/link'

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

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-blue-600">AI-Powered</span>
            <br />
            <span className="text-gray-900 dark:text-white">Quantum Brain</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Self-Improving Adaptive Trading Platform with Advanced Machine Learning
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <div className="px-4 py-2 bg-blue-500 text-white rounded-full">
              <Activity className="w-4 h-4 mr-1 inline" />
              Live Trading
            </div>
            <div className="px-4 py-2 bg-purple-500 text-white rounded-full">
              <Brain className="w-4 h-4 mr-1 inline" />
              AI Active
            </div>
            <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <Clock className="w-4 h-4 mr-1 inline" />
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Demo Module Alert */}
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
          <Play className="h-4 w-4" />
          <AlertDescription>
            <strong>New Feature:</strong> Try our Fed/CPI Market Event Demo Module! 
            <Link href="/demo" className="text-blue-600 hover:text-blue-800 underline ml-1">
              Launch Demo →
            </Link>
          </AlertDescription>
        </Alert>

        {/* Enhanced Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Portfolio Value</CardTitle>
              <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(portfolioMetrics.totalValue)}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatCurrency(portfolioMetrics.cash)} cash available
              </p>
              <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
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

          <Card className="hover:shadow-lg transition-shadow">
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

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Risk Metrics</CardTitle>
              <div className="p-2 bg-gradient-to-r from-red-400 to-orange-500 rounded-lg">
                <Shield className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {Math.abs(portfolioMetrics.maxDrawdown)}%
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Max Drawdown
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-400 to-orange-500 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Low Risk</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span>AI Dashboard</span>
              </CardTitle>
              <CardDescription>
                Monitor AI performance and decision-making
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/demo">
                  <Play className="w-4 h-4 mr-2" />
                  Launch Demo
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>Strategy Management</span>
              </CardTitle>
              <CardDescription>
                Configure and optimize trading strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Manage Strategies
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <span>Risk Management</span>
              </CardTitle>
              <CardDescription>
                Monitor and control portfolio risk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Risk Controls
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest AI decisions and market events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">AI executed volatility hedge</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
                <Badge variant="outline">Risk Management</Badge>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Strategy optimization completed</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
                <Badge variant="outline">AI Engine</Badge>
              </div>
              
              <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Market regime change detected</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
                <Badge variant="outline">Market Analysis</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}