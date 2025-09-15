'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, Pause, SkipBack, SkipForward, Clock, Calendar, TrendingUp, AlertTriangle } from 'lucide-react'
import { MarketEvent, demoEvents } from '@/lib/demo-data'

interface DemoNarrativeUIProps {
  selectedEvent: MarketEvent | null
  onEventSelect: (event: MarketEvent) => void
  currentTime: Date
  onTimeChange: (time: Date) => void
  isPlaying: boolean
  onPlayPause: () => void
}

export default function DemoNarrativeUI({
  selectedEvent,
  onEventSelect,
  currentTime,
  onTimeChange,
  isPlaying,
  onPlayPause
}: DemoNarrativeUIProps) {
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && selectedEvent) {
      interval = setInterval(() => {
        const newTime = new Date(currentTime.getTime() + 1000 * playbackSpeed)
        const eventEndTime = new Date(selectedEvent.date.getTime() + selectedEvent.duration * 60000)
        
        if (newTime >= eventEndTime) {
          onPlayPause() // Stop at the end
        } else {
          onTimeChange(newTime)
        }
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTime, selectedEvent, playbackSpeed, onTimeChange, onPlayPause])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getEventProgress = () => {
    if (!selectedEvent) return 0
    const eventStartTime = selectedEvent.date.getTime()
    const eventEndTime = eventStartTime + selectedEvent.duration * 60000
    const currentTimeMs = currentTime.getTime()
    
    if (currentTimeMs <= eventStartTime) return 0
    if (currentTimeMs >= eventEndTime) return 100
    
    return ((currentTimeMs - eventStartTime) / (eventEndTime - eventStartTime)) * 100
  }

  const handleSliderChange = (value: number[]) => {
    if (!selectedEvent) return
    const progress = value[0] / 100
    const eventStartTime = selectedEvent.date.getTime()
    const eventEndTime = eventStartTime + selectedEvent.duration * 60000
    const newTime = new Date(eventStartTime + (eventEndTime - eventStartTime) * progress)
    onTimeChange(newTime)
  }

  const jumpToKeyMoment = (momentIndex: number) => {
    if (!selectedEvent) return
    const moment = selectedEvent.keyMoments[momentIndex]
    onTimeChange(moment.timestamp)
  }

  const getStormAlertColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCurrentRiskState = () => {
    if (!selectedEvent) return null
    return selectedEvent.riskManagerStates.find(state => 
      Math.abs(state.timestamp.getTime() - currentTime.getTime()) < 30000 // Within 30 seconds
    )
  }

  const getCurrentAlternativeData = () => {
    if (!selectedEvent) return null
    return selectedEvent.alternativeDataFeeds.find(feed => 
      Math.abs(feed.timestamp.getTime() - currentTime.getTime()) < 30000 // Within 30 seconds
    )
  }

  const currentRiskState = getCurrentRiskState()
  const currentAlternativeData = getCurrentAlternativeData()

  return (
    <div className="space-y-6">
      {/* Event Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Market Event Selection</span>
          </CardTitle>
          <CardDescription>
            Choose a market event to demonstrate AI performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoEvents.map((event) => (
              <Card 
                key={event.id}
                className={`cursor-pointer transition-all ${
                  selectedEvent?.id === event.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => onEventSelect(event)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{event.name}</h3>
                    {selectedEvent?.id === event.id && (
                      <Badge variant="default" className="bg-blue-500">
                        Selected
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{event.date.toLocaleDateString()}</span>
                    <span>{event.duration} minutes</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline Controls */}
      {selectedEvent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Timeline Control</span>
            </CardTitle>
            <CardDescription>
              Navigate through the event timeline to see AI decisions and market impact
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Time Display */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-sm">
                  {formatTime(currentTime)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">
                  {selectedEvent.date.toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Timeline Slider */}
            <div className="space-y-2">
              <Slider
                value={[getEventProgress()]}
                onValueChange={handleSliderChange}
                max={100}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Start</span>
                <span>End</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTimeChange(selectedEvent.date)}
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button
                onClick={onPlayPause}
                size="sm"
                className="w-12 h-12 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const endTime = new Date(selectedEvent.date.getTime() + selectedEvent.duration * 60000)
                  onTimeChange(endTime)
                }}
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Playback Speed */}
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xs text-gray-500">Speed:</span>
              <div className="flex space-x-1">
                {[0.5, 1, 2, 4].map((speed) => (
                  <Button
                    key={speed}
                    variant={playbackSpeed === speed ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPlaybackSpeed(speed)}
                    className="text-xs px-2 py-1 h-6"
                  >
                    {speed}x
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Moments */}
      {selectedEvent && (
        <Card>
          <CardHeader>
            <CardTitle>Key Moments</CardTitle>
            <CardDescription>
              Jump to important moments during the event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedEvent.keyMoments.map((moment, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-3 text-left justify-start"
                  onClick={() => jumpToKeyMoment(index)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {formatTime(moment.timestamp)}
                      </Badge>
                      <span className="font-medium text-sm">{moment.label}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {moment.description}
                    </p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Real-time State Panels */}
      {selectedEvent && (
        <Tabs defaultValue="risk" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="risk">Risk Manager</TabsTrigger>
            <TabsTrigger value="data">Alternative Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="risk">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Predictive Risk Manager</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentRiskState ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Storm Alert Level:</span>
                      <Badge className={getStormAlertColor(currentRiskState.stormAlertLevel)}>
                        {currentRiskState.stormAlertLevel.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-gray-500">Volatility Regime</span>
                        <div className="text-lg font-semibold">
                          {(currentRiskState.volatilityRegimeProbability * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Market Stress</span>
                        <div className="text-lg font-semibold">
                          {currentRiskState.marketStressScore.toFixed(1)}/10
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-xs text-gray-500">VaR</span>
                        <div>{currentRiskState.riskMetrics.var.toFixed(2)}%</div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Expected Shortfall</span>
                        <div>{currentRiskState.riskMetrics.expectedShortfall.toFixed(2)}%</div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Beta</span>
                        <div>{currentRiskState.riskMetrics.beta.toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Correlation</span>
                        <div>{currentRiskState.riskMetrics.correlation.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No risk data available for current time</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Alternative Data Feed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentAlternativeData ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Sentiment Trend:</span>
                      <Badge variant={
                        currentAlternativeData.sentimentTrend === 'bullish' ? 'default' :
                        currentAlternativeData.sentimentTrend === 'bearish' ? 'destructive' : 'secondary'
                      }>
                        {currentAlternativeData.sentimentTrend.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-gray-500">Social Volume</span>
                        <div className="text-lg font-semibold">
                          {currentAlternativeData.socialVolume.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">News Flow</span>
                        <div className="text-lg font-semibold">
                          {currentAlternativeData.newsFlow}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-xs text-gray-500">Unusual Activity:</span>
                      <Badge variant={currentAlternativeData.unusualActivity ? 'destructive' : 'secondary'}>
                        {currentAlternativeData.unusualActivity ? 'Detected' : 'Normal'}
                      </Badge>
                    </div>
                    
                    <div>
                      <span className="text-xs text-gray-500 mb-2 block">Signals:</span>
                      <div className="space-y-1">
                        {currentAlternativeData.signals.map((signal, index) => (
                          <div key={index} className="text-sm bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                            {signal}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No alternative data available for current time</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}