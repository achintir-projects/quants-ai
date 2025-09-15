'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Percent, Target, Shield } from 'lucide-react'
import { MarketEvent, PortfolioPerformancePoint } from '@/lib/demo-data'
import { useMemo } from 'react'

interface PortfolioPerformanceChartsProps {
  selectedEvent: MarketEvent | null
  currentTime: Date
}

export default function PortfolioPerformanceCharts({
  selectedEvent,
  currentTime
}: PortfolioPerformanceChartsProps) {
  
  const chartData = useMemo(() => {
    if (!selectedEvent) return []
    
    return selectedEvent.portfolioPerformance.map(point => ({
      time: point.timestamp.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      timestamp: point.timestamp.getTime(),
      staticStrategy: point.staticStrategyValue,
      cognitumAI: point.cognitumAIValue,
      staticReturn: point.staticStrategyReturn,
      cognitumReturn: point.cognitumAIReturn,
      difference: point.cognitumAIValue - point.staticStrategyValue,
      returnDifference: point.cognitumAIReturn - point.staticStrategyReturn
    }))
  }, [selectedEvent])

  const getCurrentPerformance = useMemo(() => {
    if (!selectedEvent || chartData.length === 0) return null
    
    const currentPoint = chartData[chartData.length - 1]
    const startPoint = chartData[0]
    
    return {
      staticStrategy: currentPoint.staticStrategy,
      cognitumAI: currentPoint.cognitumAI,
      staticReturn: currentPoint.staticReturn,
      cognitumReturn: currentPoint.cognitumReturn,
      difference: currentPoint.difference,
      returnDifference: currentPoint.returnDifference,
      outperformance: ((currentPoint.cognitumAI - currentPoint.staticStrategy) / currentPoint.staticStrategy) * 100
    }
  }, [chartData])

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.dataKey.includes('Return') ? formatPercentage(entry.value) : formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (!selectedEvent || chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>Select a market event to view performance comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <p>No performance data available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Static Strategy</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(getCurrentPerformance?.staticStrategy || 0)}
            </div>
            <p className="text-xs text-gray-500">
              {formatPercentage(getCurrentPerformance?.staticReturn || 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cognitum AI</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(getCurrentPerformance?.cognitumAI || 0)}
            </div>
            <p className="text-xs text-blue-500">
              {formatPercentage(getCurrentPerformance?.cognitumReturn || 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Alpha</CardTitle>
            {getCurrentPerformance?.difference && getCurrentPerformance.difference > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              (getCurrentPerformance?.difference || 0) > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(Math.abs(getCurrentPerformance?.difference || 0))}
            </div>
            <p className="text-xs text-gray-500">
              Absolute difference
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outperformance</CardTitle>
            <Percent className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              (getCurrentPerformance?.outperformance || 0) > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatPercentage(getCurrentPerformance?.outperformance || 0)}
            </div>
            <p className="text-xs text-gray-500">
              Relative performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Portfolio Performance Comparison</span>
          </CardTitle>
          <CardDescription>
            Side-by-side comparison of static strategy vs Cognitum AI performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="value" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="value">Portfolio Value</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="difference">Performance Gap</TabsTrigger>
            </TabsList>
            
            <TabsContent value="value" className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="staticStrategy" 
                      stroke="#6B7280" 
                      strokeWidth={2}
                      name="Static Strategy"
                      dot={{ r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cognitumAI" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      name="Cognitum AI"
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="returns" className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="staticReturn" 
                      stroke="#6B7280" 
                      fill="#6B7280" 
                      fillOpacity={0.3}
                      name="Static Strategy Return"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="cognitumReturn" 
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.3}
                      name="Cognitum AI Return"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="difference" className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar 
                      dataKey="difference" 
                      fill={getCurrentPerformance?.difference && getCurrentPerformance.difference > 0 ? '#10B981' : '#EF4444'}
                      name="AI Alpha (Cognitum - Static)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Performance Analysis</span>
          </CardTitle>
          <CardDescription>
            Key metrics comparing AI performance against static strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                  Max Drawdown
                </Badge>
              </div>
              <div className="text-sm">
                <div className="text-gray-600">Static: <span className="font-medium text-red-600">-1.50%</span></div>
                <div className="text-gray-600">Cognitum: <span className="font-medium text-green-600">-0.25%</span></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                  Volatility
                </Badge>
              </div>
              <div className="text-sm">
                <div className="text-gray-600">Static: <span className="font-medium">12.5%</span></div>
                <div className="text-gray-600">Cognitum: <span className="font-medium">8.2%</span></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                  Sharpe Ratio
                </Badge>
              </div>
              <div className="text-sm">
                <div className="text-gray-600">Static: <span className="font-medium">1.2</span></div>
                <div className="text-gray-600">Cognitum: <span className="font-medium">2.8</span></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-orange-50 text-orange-800 border-orange-200">
                  Win Rate
                </Badge>
              </div>
              <div className="text-sm">
                <div className="text-gray-600">Static: <span className="font-medium">55%</span></div>
                <div className="text-gray-600">Cognitum: <span className="font-medium">78%</span></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}