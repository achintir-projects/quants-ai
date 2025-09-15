'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target,
  BarChart3,
  RefreshCw,
  Search,
  Filter,
  Download,
  Eye,
  Zap,
  Clock,
  DollarSign,
  Percent
} from 'lucide-react'

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  lastUpdate: Date
}

interface OptionChain {
  symbol: string
  strikes: StrikeData[]
  expirations: string[]
  currentExpiration: string
}

interface StrikeData {
  strike: number
  calls: OptionData
  puts: OptionData
}

interface OptionData {
  bid: number
  ask: number
  last: number
  volume: number
  openInterest: number
  impliedVol: number
  delta: number
  gamma: number
  theta: number
  vega: number
}

interface VolatilitySurface {
  symbol: string
  surface: { strike: number; expiration: string; impliedVol: number }[]
  currentIV: number
  ivRank: number
  ivPercentile: number
}

interface MarketNews {
  id: string
  title: string
  summary: string
  source: string
  timestamp: Date
  impact: 'LOW' | 'MEDIUM' | 'HIGH'
  symbols: string[]
}

export default function MarketData() {
  const [marketData, setMarketData] = useState<MarketData[]>([
    {
      symbol: 'SPX',
      name: 'S&P 500 Index',
      price: 5123.45,
      change: 15.23,
      changePercent: 0.30,
      volume: 1250000,
      marketCap: 45000000000,
      lastUpdate: new Date()
    },
    {
      symbol: 'QQQ',
      name: 'NASDAQ-100 ETF',
      price: 445.67,
      change: -2.34,
      changePercent: -0.52,
      volume: 850000,
      marketCap: 215000000000,
      lastUpdate: new Date()
    },
    {
      symbol: 'IWM',
      name: 'Russell 2000 ETF',
      price: 205.89,
      change: 3.45,
      changePercent: 1.70,
      volume: 320000,
      marketCap: 45000000000,
      lastUpdate: new Date()
    },
    {
      symbol: 'VIX',
      name: 'Volatility Index',
      price: 18.45,
      change: -0.85,
      changePercent: -4.40,
      volume: 180000,
      marketCap: 0,
      lastUpdate: new Date()
    }
  ])

  const [optionChain, setOptionChain] = useState<OptionChain>({
    symbol: 'SPX',
    strikes: [
      {
        strike: 5000,
        calls: {
          bid: 125.50,
          ask: 127.20,
          last: 126.35,
          volume: 1250,
          openInterest: 8500,
          impliedVol: 16.8,
          delta: 0.65,
          gamma: 0.02,
          theta: -45,
          vega: 1250
        },
        puts: {
          bid: 8.75,
          ask: 9.20,
          last: 8.95,
          volume: 2100,
          openInterest: 12000,
          impliedVol: 17.2,
          delta: -0.35,
          gamma: 0.018,
          theta: -38,
          vega: -980
        }
      },
      {
        strike: 5100,
        calls: {
          bid: 45.20,
          ask: 46.80,
          last: 46.00,
          volume: 1850,
          openInterest: 6200,
          impliedVol: 17.5,
          delta: 0.42,
          gamma: 0.025,
          theta: -52,
          vega: 1450
        },
        puts: {
          bid: 28.90,
          ask: 29.50,
          last: 29.20,
          volume: 1650,
          openInterest: 8900,
          impliedVol: 17.8,
          delta: -0.58,
          gamma: 0.022,
          theta: -48,
          vega: -1320
        }
      },
      {
        strike: 5200,
        calls: {
          bid: 12.50,
          ask: 13.20,
          last: 12.85,
          volume: 3200,
          openInterest: 15000,
          impliedVol: 18.2,
          delta: 0.28,
          gamma: 0.015,
          theta: -35,
          vega: 980
        },
        puts: {
          bid: 85.60,
          ask: 86.90,
          last: 86.25,
          volume: 980,
          openInterest: 4500,
          impliedVol: 18.5,
          delta: -0.72,
          gamma: 0.018,
          theta: -55,
          vega: -1650
        }
      }
    ],
    expirations: ['2024-05-17', '2024-05-24', '2024-05-31', '2024-06-21'],
    currentExpiration: '2024-05-17'
  })

  const [volatilitySurface, setVolatilitySurface] = useState<VolatilitySurface>({
    symbol: 'SPX',
    surface: [
      { strike: 4800, expiration: '2024-05-17', impliedVol: 19.2 },
      { strike: 4900, expiration: '2024-05-17', impliedVol: 18.5 },
      { strike: 5000, expiration: '2024-05-17', impliedVol: 17.8 },
      { strike: 5100, expiration: '2024-05-17', impliedVol: 17.2 },
      { strike: 5200, expiration: '2024-05-17', impliedVol: 16.8 },
      { strike: 4800, expiration: '2024-06-21', impliedVol: 18.8 },
      { strike: 4900, expiration: '2024-06-21', impliedVol: 18.2 },
      { strike: 5000, expiration: '2024-06-21', impliedVol: 17.6 },
      { strike: 5100, expiration: '2024-06-21', impliedVol: 17.1 },
      { strike: 5200, expiration: '2024-06-21', impliedVol: 16.7 }
    ],
    currentIV: 17.5,
    ivRank: 65,
    ivPercentile: 72
  })

  const [marketNews, setMarketNews] = useState<MarketNews[]>([
    {
      id: '1',
      title: 'Fed Signals Potential Rate Cuts in Coming Months',
      summary: 'Federal Reserve officials indicated that inflation progress may allow for interest rate cuts later this year, boosting market sentiment.',
      source: 'Bloomberg',
      timestamp: new Date(),
      impact: 'HIGH',
      symbols: ['SPX', 'QQQ', 'IWM']
    },
    {
      id: '2',
      title: 'Tech Earnings Beat Expectations, Drive Market Higher',
      summary: 'Major technology companies reported better-than-expected earnings, leading to broad market gains and increased investor confidence.',
      source: 'Reuters',
      timestamp: new Date(Date.now() - 3600000),
      impact: 'MEDIUM',
      symbols: ['QQQ', 'SPX']
    },
    {
      id: '3',
      title: 'Oil Prices Surge on Supply Concerns',
      summary: 'Crude oil prices jumped 3% as geopolitical tensions raise concerns about global supply chains and energy availability.',
      source: 'WSJ',
      timestamp: new Date(Date.now() - 7200000),
      impact: 'MEDIUM',
      symbols: ['SPX', 'IWM']
    }
  ])

  const [isRealTime, setIsRealTime] = useState(true)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatNumber = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'HIGH': return 'bg-red-500'
      case 'MEDIUM': return 'bg-yellow-500'
      case 'LOW': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        // Simulate real-time data updates
        setMarketData(prev => prev.map(item => ({
          ...item,
          price: item.price * (1 + (Math.random() - 0.5) * 0.001),
          change: item.change + (Math.random() - 0.5) * 0.5,
          changePercent: item.changePercent + (Math.random() - 0.5) * 0.1,
          lastUpdate: new Date()
        })))
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isRealTime])

  return (
    <div className="space-y-6">
      {/* Market Data Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Market Data</h2>
          <p className="text-muted-foreground">Real-time market data and analytics</p>
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
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">S&P 500</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(marketData[0].price)}</div>
            <p className={`text-xs ${marketData[0].change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(marketData[0].change)} ({formatPercentage(marketData[0].changePercent)})
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NASDAQ-100</CardTitle>
            {marketData[1].change >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(marketData[1].price)}</div>
            <p className={`text-xs ${marketData[1].change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(marketData[1].change)} ({formatPercentage(marketData[1].changePercent)})
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Russell 2000</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(marketData[2].price)}</div>
            <p className={`text-xs ${marketData[2].change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(marketData[2].change)} ({formatPercentage(marketData[2].changePercent)})
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIX Index</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(marketData[3].price)}</div>
            <p className={`text-xs ${marketData[3].change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(marketData[3].change)} ({formatPercentage(marketData[3].changePercent)})
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="options">Options Chain</TabsTrigger>
          <TabsTrigger value="volatility">Volatility Surface</TabsTrigger>
          <TabsTrigger value="news">Market News</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Market Overview
              </CardTitle>
              <CardDescription>
                Real-time market data for major indices and ETFs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input placeholder="Search symbols..." className="w-full" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="grid gap-4">
                  {marketData.map((data) => (
                    <div key={data.symbol} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="font-bold text-blue-600">{data.symbol}</span>
                        </div>
                        <div>
                          <div className="font-medium">{data.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Vol: {formatNumber(data.volume)} • MCap: {formatNumber(data.marketCap)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatCurrency(data.price)}</div>
                        <div className={`text-sm ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(data.change)} ({formatPercentage(data.changePercent)})
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Updated: {data.lastUpdate.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="options" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Options Chain
              </CardTitle>
              <CardDescription>
                Real-time options chain data for {optionChain.symbol}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-sm font-medium">Expiration</label>
                    <select 
                      value={optionChain.currentExpiration}
                      onChange={(e) => setOptionChain(prev => ({ ...prev, currentExpiration: e.target.value }))}
                      className="ml-2 p-2 border border-gray-300 rounded-md"
                    >
                      {optionChain.expirations.map(exp => (
                        <option key={exp} value={exp}>{exp}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Underlying:</span>
                    <span className="font-medium">{optionChain.symbol}</span>
                    <span className="text-lg font-bold">{formatCurrency(5123.45)}</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Strike</th>
                        <th className="text-left p-2">Call Bid</th>
                        <th className="text-left p-2">Call Ask</th>
                        <th className="text-left p-2">Call Last</th>
                        <th className="text-left p-2">Call Vol</th>
                        <th className="text-left p-2">Put Bid</th>
                        <th className="text-left p-2">Put Ask</th>
                        <th className="text-left p-2">Put Last</th>
                        <th className="text-left p-2">Put Vol</th>
                      </tr>
                    </thead>
                    <tbody>
                      {optionChain.strikes.map((strike, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{formatCurrency(strike.strike)}</td>
                          <td className="p-2">{formatCurrency(strike.calls.bid)}</td>
                          <td className="p-2">{formatCurrency(strike.calls.ask)}</td>
                          <td className="p-2">{formatCurrency(strike.calls.last)}</td>
                          <td className="p-2">{strike.calls.impliedVol.toFixed(1)}%</td>
                          <td className="p-2">{formatCurrency(strike.puts.bid)}</td>
                          <td className="p-2">{formatCurrency(strike.puts.ask)}</td>
                          <td className="p-2">{formatCurrency(strike.puts.last)}</td>
                          <td className="p-2">{strike.puts.impliedVol.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Detailed View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volatility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Volatility Surface
              </CardTitle>
              <CardDescription>
                Implied volatility surface analysis for {volatilitySurface.symbol}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Current IV</div>
                    <div className="text-2xl font-bold">{volatilitySurface.currentIV.toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">IV Rank</div>
                    <div className="text-2xl font-bold">{volatilitySurface.ivRank}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">IV Percentile</div>
                    <div className="text-2xl font-bold">{volatilitySurface.ivPercentile}%</div>
                  </div>
                </div>

                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">3D volatility surface visualization coming soon...</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Strike</th>
                        <th className="text-left p-2">Expiration</th>
                        <th className="text-left p-2">Implied Vol</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volatilitySurface.surface.map((point, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2">{formatCurrency(point.strike)}</td>
                          <td className="p-2">{point.expiration}</td>
                          <td className="p-2">{point.impliedVol.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Market News
              </CardTitle>
              <CardDescription>
                Latest market news and analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketNews.map((news) => (
                  <div key={news.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{news.title}</h3>
                          <Badge className={getImpactColor(news.impact)}>
                            {news.impact} IMPACT
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{news.summary}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Source: {news.source}</span>
                          <span>•</span>
                          <span>{news.timestamp.toLocaleString()}</span>
                          <span>•</span>
                          <span>Affects: {news.symbols.join(', ')}</span>
                        </div>
                      </div>
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