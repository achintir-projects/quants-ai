'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  MessageSquare, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Activity,
  Globe,
  Newspaper,
  BarChart3,
  Zap,
  Target,
  Brain,
  Eye,
  Filter,
  DollarSign,
  Hash,
  Mic,
  Calendar,
  TrendingDown
} from 'lucide-react'

interface AlternativeDataMetrics {
  newsSentiment: {
    finbertAccuracy: number
    entityRecognition: number
    eventExtraction: number
    topicModeling: number
    sourceCredibility: number
    sentimentAccuracy: number
    status: 'ACTIVE' | 'PROCESSING' | 'ERROR'
  }
  optionsFlow: {
    sweepDetection: number
    unusualVolume: number
    darkPoolMonitoring: number
    blockTradeAnalysis: number
    flowToxicity: number
    status: 'ACTIVE' | 'PROCESSING' | 'ERROR'
  }
  socialMedia: {
    socialListening: number
    influencerTracking: number
    viralityMetrics: number
    networkAnalysis: number
    sentimentDivergence: number
    status: 'ACTIVE' | 'PROCESSING' | 'ERROR'
  }
  system: {
    totalSources: number
    activeSources: number
    processingLatency: number
    dataQuality: number
    updateFrequency: number
  }
}

interface RealTimeSentiment {
  timestamp: string
  overallSentiment: number
  newsSentiment: number
  optionsSentiment: number
  socialSentiment: number
  sentimentTrend: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
  anomalyScore: number
  signalStrength: number
}

interface NewsItem {
  id: string
  headline: string
  source: string
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'
  confidence: number
  timestamp: string
  assets: string[]
}

interface OptionsFlow {
  id: string
  symbol: string
  type: 'CALL' | 'PUT'
  strike: number
  expiration: string
  size: number
  premium: number
  flowType: 'UNUSUAL' | 'BLOCK' | 'SWEEP' | 'DARK_POOL'
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
  timestamp: string
}

interface SocialPost {
  id: string
  platform: string
  author: string
  content: string
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'
  influence: number
  engagement: number
  timestamp: string
  assets: string[]
}

export default function AlternativeDataIntegration() {
  const [metrics, setMetrics] = useState<AlternativeDataMetrics>({
    newsSentiment: {
      finbertAccuracy: 94.2,
      entityRecognition: 87.5,
      eventExtraction: 82.3,
      topicModeling: 79.8,
      sourceCredibility: 91.4,
      sentimentAccuracy: 88.7,
      status: 'ACTIVE'
    },
    optionsFlow: {
      sweepDetection: 89.7,
      unusualVolume: 92.3,
      darkPoolMonitoring: 85.1,
      blockTradeAnalysis: 88.9,
      flowToxicity: 86.4,
      status: 'ACTIVE'
    },
    socialMedia: {
      socialListening: 84.6,
      influencerTracking: 78.9,
      viralityMetrics: 81.2,
      networkAnalysis: 76.5,
      sentimentDivergence: 83.8,
      status: 'ACTIVE'
    },
    system: {
      totalSources: 347,
      activeSources: 329,
      processingLatency: 8.7,
      dataQuality: 92.1,
      updateFrequency: 500
    }
  })

  const [realTimeSentiment, setRealTimeSentiment] = useState<RealTimeSentiment>({
    timestamp: new Date().toISOString(),
    overallSentiment: 65.4,
    newsSentiment: 58.2,
    optionsSentiment: 72.8,
    socialSentiment: 61.9,
    sentimentTrend: 'BULLISH',
    anomalyScore: 3.2,
    signalStrength: 78.5
  })

  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      id: '1',
      headline: 'Fed Signals Potential Rate Cut in Coming Months',
      source: 'Bloomberg',
      sentiment: 'POSITIVE',
      confidence: 0.92,
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      assets: ['SPX', 'QQQ', 'IWM']
    },
    {
      id: '2',
      headline: 'Tech Earnings Beat Expectations, AI Sector Leads',
      source: 'Reuters',
      sentiment: 'POSITIVE',
      confidence: 0.88,
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      assets: ['QQQ', 'XLK', 'NVDA']
    },
    {
      id: '3',
      headline: 'Geopolitical Tensions Rise in Key Oil Region',
      source: 'Financial Times',
      sentiment: 'NEGATIVE',
      confidence: 0.85,
      timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
      assets: ['USO', 'XLE', 'XOP']
    }
  ])

  const [optionsFlow, setOptionsFlow] = useState<OptionsFlow[]>([
    {
      id: '1',
      symbol: 'SPY',
      type: 'CALL',
      strike: 520,
      expiration: '2024-05-17',
      size: 2500,
      premium: 1250000,
      flowType: 'UNUSUAL',
      sentiment: 'BULLISH',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      symbol: 'QQQ',
      type: 'PUT',
      strike: 440,
      expiration: '2024-05-24',
      size: 1800,
      premium: 720000,
      flowType: 'BLOCK',
      sentiment: 'BEARISH',
      timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      symbol: 'TSLA',
      type: 'CALL',
      strike: 180,
      expiration: '2024-06-21',
      size: 3200,
      premium: 2560000,
      flowType: 'SWEEP',
      sentiment: 'BULLISH',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    }
  ])

  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([
    {
      id: '1',
      platform: 'Twitter',
      author: '@CryptoWhale',
      content: 'Major accumulation detected in BTC options. Bullish signals across the board.',
      sentiment: 'POSITIVE',
      influence: 0.92,
      engagement: 15420,
      timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
      assets: ['BTC', 'ETH']
    },
    {
      id: '2',
      platform: 'Reddit',
      author: 'OptionsTrader',
      content: 'Unusual put activity in tech stocks. Might be hedging ahead of earnings.',
      sentiment: 'NEGATIVE',
      influence: 0.76,
      engagement: 8934,
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      assets: ['QQQ', 'XLK']
    },
    {
      id: '3',
      platform: 'Discord',
      author: 'MarketAnalyst',
      content: 'Fed pivot coming soon. Rate cuts expected by Q3. Risk assets to benefit.',
      sentiment: 'POSITIVE',
      influence: 0.88,
      engagement: 12450,
      timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      assets: ['SPX', 'QQQ', 'IWM']
    }
  ])

  const [isRunning, setIsRunning] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      // Simulate real-time sentiment updates
      setRealTimeSentiment(prev => ({
        ...prev,
        timestamp: new Date().toISOString(),
        overallSentiment: Math.max(0, Math.min(100, prev.overallSentiment + (Math.random() - 0.5) * 5)),
        newsSentiment: Math.max(0, Math.min(100, prev.newsSentiment + (Math.random() - 0.5) * 4)),
        optionsSentiment: Math.max(0, Math.min(100, prev.optionsSentiment + (Math.random() - 0.5) * 6)),
        socialSentiment: Math.max(0, Math.min(100, prev.socialSentiment + (Math.random() - 0.5) * 5)),
        anomalyScore: Math.max(0, Math.min(100, prev.anomalyScore + (Math.random() - 0.5) * 1)),
        signalStrength: Math.max(0, Math.min(100, prev.signalStrength + (Math.random() - 0.5) * 3))
      }))

      setLastUpdate(new Date())
    }, 2000)

    return () => clearInterval(interval)
  }, [isRunning])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500'
      case 'PROCESSING': return 'bg-yellow-500'
      case 'ERROR': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'PROCESSING': return <RefreshCw className="w-4 h-4 text-yellow-600 animate-spin" />
      case 'ERROR': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE': case 'BULLISH': return 'text-green-600'
      case 'NEGATIVE': case 'BEARISH': return 'text-red-600'
      case 'NEUTRAL': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'POSITIVE': case 'BULLISH': return <TrendingUp className="w-4 h-4" />
      case 'NEGATIVE': case 'BEARISH': return <TrendingDown className="w-4 h-4" />
      case 'NEUTRAL': return <BarChart3 className="w-4 h-4" />
      default: return <BarChart3 className="w-4 h-4" />
    }
  }

  const getFlowTypeColor = (flowType: string) => {
    switch (flowType) {
      case 'UNUSUAL': return 'bg-orange-500'
      case 'BLOCK': return 'bg-blue-500'
      case 'SWEEP': return 'bg-purple-500'
      case 'DARK_POOL': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
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
    return `${value.toFixed(1)}%`
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000)
    
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Alternative Data Integration</h2>
          <p className="text-muted-foreground">Real-time News, Options Flow & Social Media Intelligence</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="w-3 h-3 mr-1" />
            {isRunning ? 'Active' : 'Paused'}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Pause' : 'Resume'}
          </Button>
          <Badge variant="outline">
            Last Update: {lastUpdate.toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* Real-time Sentiment Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Real-time Market Sentiment
          </CardTitle>
          <CardDescription>
            Aggregated sentiment from all alternative data sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Overall Sentiment</div>
              <div className={`text-lg font-semibold ${getSentimentColor(realTimeSentiment.sentimentTrend)}`}>
                {realTimeSentiment.overallSentiment.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                {getSentimentIcon(realTimeSentiment.sentimentTrend)}
                {realTimeSentiment.sentimentTrend}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">News Sentiment</div>
              <div className="text-lg font-semibold">{realTimeSentiment.newsSentiment.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Media Coverage</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Options Sentiment</div>
              <div className="text-lg font-semibold">{realTimeSentiment.optionsSentiment.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Flow Analysis</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Social Sentiment</div>
              <div className="text-lg font-semibold">{realTimeSentiment.socialSentiment.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Social Media</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Source Categories */}
      <Tabs defaultValue="news" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="news">News Sentiment</TabsTrigger>
          <TabsTrigger value="options">Options Flow</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <TabsContent value="news" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="w-4 h-4" />
                News Sentiment Analysis
              </CardTitle>
              <div className="flex items-center gap-2">
                {getStatusIcon(metrics.newsSentiment.status)}
                <Badge variant="outline" className={getStatusColor(metrics.newsSentiment.status)}>
                  {metrics.newsSentiment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>FinBERT Accuracy</span>
                    <span>{formatPercentage(metrics.newsSentiment.finbertAccuracy)}</span>
                  </div>
                  <Progress value={metrics.newsSentiment.finbertAccuracy} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Entity Recognition</span>
                    <span>{formatPercentage(metrics.newsSentiment.entityRecognition)}</span>
                  </div>
                  <Progress value={metrics.newsSentiment.entityRecognition} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Event Extraction</span>
                    <span>{formatPercentage(metrics.newsSentiment.eventExtraction)}</span>
                  </div>
                  <Progress value={metrics.newsSentiment.eventExtraction} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Topic Modeling</span>
                    <span>{formatPercentage(metrics.newsSentiment.topicModeling)}</span>
                  </div>
                  <Progress value={metrics.newsSentiment.topicModeling} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Source Credibility</span>
                    <span>{formatPercentage(metrics.newsSentiment.sourceCredibility)}</span>
                  </div>
                  <Progress value={metrics.newsSentiment.sourceCredibility} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Sentiment Accuracy</span>
                    <span>{formatPercentage(metrics.newsSentiment.sentimentAccuracy)}</span>
                  </div>
                  <Progress value={metrics.newsSentiment.sentimentAccuracy} className="h-2" />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Recent News Analysis</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {newsItems.map((item) => (
                    <div key={item.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getSentimentIcon(item.sentiment)}
                            <span className={`text-sm font-medium ${getSentimentColor(item.sentiment)}`}>
                              {item.sentiment}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {formatPercentage(item.confidence * 100)}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium mb-1">{item.headline}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{item.source}</span>
                            <span>•</span>
                            <span>{formatTimeAgo(item.timestamp)}</span>
                            <span>•</span>
                            <span>{item.assets.join(', ')}</span>
                          </div>
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
                <BarChart3 className="w-4 h-4" />
                Options Flow Analysis
              </CardTitle>
              <div className="flex items-center gap-2">
                {getStatusIcon(metrics.optionsFlow.status)}
                <Badge variant="outline" className={getStatusColor(metrics.optionsFlow.status)}>
                  {metrics.optionsFlow.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Sweep Detection</span>
                    <span>{formatPercentage(metrics.optionsFlow.sweepDetection)}</span>
                  </div>
                  <Progress value={metrics.optionsFlow.sweepDetection} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Unusual Volume</span>
                    <span>{formatPercentage(metrics.optionsFlow.unusualVolume)}</span>
                  </div>
                  <Progress value={metrics.optionsFlow.unusualVolume} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Dark Pool Monitoring</span>
                    <span>{formatPercentage(metrics.optionsFlow.darkPoolMonitoring)}</span>
                  </div>
                  <Progress value={metrics.optionsFlow.darkPoolMonitoring} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Block Trade Analysis</span>
                    <span>{formatPercentage(metrics.optionsFlow.blockTradeAnalysis)}</span>
                  </div>
                  <Progress value={metrics.optionsFlow.blockTradeAnalysis} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Flow Toxicity</span>
                    <span>{formatPercentage(metrics.optionsFlow.flowToxicity)}</span>
                  </div>
                  <Progress value={metrics.optionsFlow.flowToxicity} className="h-2" />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Recent Options Flow</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {optionsFlow.map((flow) => (
                    <div key={flow.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className={getFlowTypeColor(flow.flowType)}>
                              {flow.flowType}
                            </Badge>
                            {getSentimentIcon(flow.sentiment)}
                            <span className={`text-sm font-medium ${getSentimentColor(flow.sentiment)}`}>
                              {flow.sentiment}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {flow.type}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium mb-1">
                            {flow.symbol} {flow.type} ${flow.strike} ({flow.expiration})
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Size: {flow.size.toLocaleString()}</span>
                            <span>•</span>
                            <span>Premium: {formatCurrency(flow.premium)}</span>
                            <span>•</span>
                            <span>{formatTimeAgo(flow.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Social Media Intelligence
              </CardTitle>
              <div className="flex items-center gap-2">
                {getStatusIcon(metrics.socialMedia.status)}
                <Badge variant="outline" className={getStatusColor(metrics.socialMedia.status)}>
                  {metrics.socialMedia.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Social Listening</span>
                    <span>{formatPercentage(metrics.socialMedia.socialListening)}</span>
                  </div>
                  <Progress value={metrics.socialMedia.socialListening} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Influencer Tracking</span>
                    <span>{formatPercentage(metrics.socialMedia.influencerTracking)}</span>
                  </div>
                  <Progress value={metrics.socialMedia.influencerTracking} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Virality Metrics</span>
                    <span>{formatPercentage(metrics.socialMedia.viralityMetrics)}</span>
                  </div>
                  <Progress value={metrics.socialMedia.viralityMetrics} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Network Analysis</span>
                    <span>{formatPercentage(metrics.socialMedia.networkAnalysis)}</span>
                  </div>
                  <Progress value={metrics.socialMedia.networkAnalysis} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Sentiment Divergence</span>
                    <span>{formatPercentage(metrics.socialMedia.sentimentDivergence)}</span>
                  </div>
                  <Progress value={metrics.socialMedia.sentimentDivergence} className="h-2" />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Recent Social Posts</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {socialPosts.map((post) => (
                    <div key={post.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {post.platform}
                            </Badge>
                            {getSentimentIcon(post.sentiment)}
                            <span className={`text-sm font-medium ${getSentimentColor(post.sentiment)}`}>
                              {post.sentiment}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              Influence: {formatPercentage(post.influence * 100)}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium mb-1">@{post.author}</p>
                          <p className="text-sm text-muted-foreground mb-1">{post.content}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Engagement: {post.engagement.toLocaleString()}</span>
                            <span>•</span>
                            <span>{formatTimeAgo(post.timestamp)}</span>
                            <span>•</span>
                            <span>{post.assets.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Alternative Data System Overview
          </CardTitle>
          <CardDescription>
            System performance and data source management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Data Source Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Total Sources</div>
                  <div className="text-lg font-semibold">{metrics.system.totalSources.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Active Sources</div>
                  <div className="text-lg font-semibold text-green-600">{metrics.system.activeSources.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Processing Latency</div>
                  <div className="text-lg font-semibold">{metrics.system.processingLatency}ms</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Data Quality</div>
                  <div className="text-lg font-semibold text-green-600">{formatPercentage(metrics.system.dataQuality)}</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">System Performance</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Update Frequency</div>
                  <div className="text-lg font-semibold">{metrics.system.updateFrequency}ms</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Source Coverage</div>
                  <div className="text-lg font-semibold text-blue-600">
                    {formatPercentage((metrics.system.activeSources / metrics.system.totalSources) * 100)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anomaly Alert */}
      {realTimeSentiment.anomalyScore > 8 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            High sentiment anomaly detected ({realTimeSentiment.anomalyScore.toFixed(1)}%). 
            Unusual divergence between news, options flow, and social media sentiment detected.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}