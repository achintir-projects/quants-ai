'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import DemoModeToggle from '@/components/demo/DemoModeToggle'
import DemoNarrativeUI from '@/components/demo/DemoNarrativeUI'
import NarrativeLog from '@/components/demo/NarrativeLog'
import PortfolioPerformanceCharts from '@/components/demo/PortfolioPerformanceCharts'
import { MarketEvent, demoEvents } from '@/lib/demo-data'
import { Brain, Play, Pause, BarChart3, MessageSquare, Settings } from 'lucide-react'

export default function DemoPage() {
  const [isDemoMode, setIsDemoMode] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<MarketEvent>(demoEvents[0])
  const [currentTime, setCurrentTime] = useState<Date>(demoEvents[0].date)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showAllDecisions, setShowAllDecisions] = useState(false)

  useEffect(() => {
    // Reset current time when event changes
    if (selectedEvent) {
      setCurrentTime(selectedEvent.date)
    }
  }, [selectedEvent])

  const handleEventSelect = (event: MarketEvent) => {
    setSelectedEvent(event)
    setIsPlaying(false)
  }

  const handleTimeChange = (time: Date) => {
    setCurrentTime(time)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTimeJump = (time: Date) => {
    setCurrentTime(time)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="gradient-text">Fed/CPI Market Event</span>
            <br />
            <span className="text-gray-900 dark:text-white">Demo Module</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Showcase Cognitum's AI reacting to high-impact market events with pre-recorded datasets 
            for flawless demonstration narratives
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Badge variant="default" className="bg-blue-500">
              <Brain className="w-4 h-4 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="default" className="bg-green-500">
              <BarChart3 className="w-4 h-4 mr-1" />
              Performance Tracking
            </Badge>
            <Badge variant="default" className="bg-purple-500">
              <MessageSquare className="w-4 h-4 mr-1" />
              Decision Logging
            </Badge>
          </div>
        </div>

        {/* Demo Mode Toggle */}
        <div className="flex justify-center">
          <DemoModeToggle 
            isDemoMode={isDemoMode}
            onDemoModeChange={setIsDemoMode}
          />
        </div>

        {/* Main Content */}
        {isDemoMode && (
          <div className="space-y-6">
            <Tabs defaultValue="narrative" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="narrative" className="flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Narrative</span>
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Performance</span>
                </TabsTrigger>
                <TabsTrigger value="decisions" className="flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>AI Decisions</span>
                </TabsTrigger>
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="narrative" className="space-y-6">
                <DemoNarrativeUI
                  selectedEvent={selectedEvent}
                  onEventSelect={handleEventSelect}
                  currentTime={currentTime}
                  onTimeChange={handleTimeChange}
                  isPlaying={isPlaying}
                  onPlayPause={handlePlayPause}
                />
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <PortfolioPerformanceCharts
                  selectedEvent={selectedEvent}
                  currentTime={currentTime}
                />
              </TabsContent>

              <TabsContent value="decisions" className="space-y-6">
                <NarrativeLog
                  selectedEvent={selectedEvent}
                  currentTime={currentTime}
                  onTimeJump={handleTimeJump}
                  showAll={showAllDecisions}
                  onShowAllChange={setShowAllDecisions}
                />
              </TabsContent>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Event Overview */}
                  <Card className="card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
                    <CardHeader>
                      <CardTitle>Current Event Overview</CardTitle>
                      <CardDescription>Summary of the selected market event</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">{selectedEvent.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{selectedEvent.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">Date</span>
                          <div className="font-medium">{selectedEvent.date.toLocaleDateString()}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Duration</span>
                          <div className="font-medium">{selectedEvent.duration} minutes</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Data Points</span>
                          <div className="font-medium">{selectedEvent.marketData.length}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">AI Decisions</span>
                          <div className="font-medium">{selectedEvent.aiDecisions.length}</div>
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500">Key Moments</span>
                        <div className="space-y-1 mt-2">
                          {selectedEvent.keyMoments.map((moment, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <Badge variant="outline" className="text-xs">
                                {moment.timestamp.toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </Badge>
                              <span>{moment.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Demo Instructions */}
                  <Card className="card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
                    <CardHeader>
                      <CardTitle>How to Use This Demo</CardTitle>
                      <CardDescription>Step-by-step guide for presenting the demo</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                          <div>
                            <h4 className="font-medium">Select an Event</h4>
                            <p className="text-sm text-gray-600">Choose between Fed Rate Announcement or CPI Report Release</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                          <div>
                            <h4 className="font-medium">Use Timeline Controls</h4>
                            <p className="text-sm text-gray-600">Navigate through the event using the slider or play button</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                          <div>
                            <h4 className="font-medium">Monitor AI Decisions</h4>
                            <p className="text-sm text-gray-600">Watch real-time AI decisions and their impact</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                          <div>
                            <h4 className="font-medium">Compare Performance</h4>
                            <p className="text-sm text-gray-600">See how Cognitum AI outperforms static strategies</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Presenter Tips:</h4>
                        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                          <li>• Start with the Narrative tab to set the context</li>
                          <li>• Jump to key moments to highlight AI decisions</li>
                          <li>• Use the Performance tab to show clear ROI</li>
                          <li>• Demonstrate risk management during volatile periods</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Demo Mode Disabled */}
        {!isDemoMode && (
          <Card className="card-hover bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Pause className="w-5 h-5" />
                <span>Demo Mode Disabled</span>
              </CardTitle>
              <CardDescription>
                Enable demo mode to access the Fed/CPI Market Event demonstration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Demo Mode Required
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  This demonstration module requires demo mode to be enabled. 
                  Toggle demo mode above to access the Fed/CPI Market Event demo.
                </p>
                <Button onClick={() => setIsDemoMode(true)}>
                  Enable Demo Mode
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}