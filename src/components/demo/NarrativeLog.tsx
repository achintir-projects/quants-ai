'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Shield, 
  Target, 
  Zap, 
  Clock, 
  Filter,
  Download,
  Eye,
  EyeOff
} from 'lucide-react'
import { MarketEvent, AIDecision } from '@/lib/demo-data'
import { useState, useMemo } from 'react'

interface NarrativeLogProps {
  selectedEvent: MarketEvent | null
  currentTime: Date
  onTimeJump: (time: Date) => void
  showAll?: boolean
  onShowAllChange?: (show: boolean) => void
}

export default function NarrativeLog({
  selectedEvent,
  currentTime,
  onTimeJump,
  showAll = false,
  onShowAllChange
}: NarrativeLogProps) {
  const [filterType, setFilterType] = useState<string>('all')

  const getAIIcon = (type: string) => {
    switch (type) {
      case 'risk_system':
        return <Shield className="w-4 h-4" />
      case 'ai_engine':
        return <Brain className="w-4 h-4" />
      case 'strategy_manager':
        return <Target className="w-4 h-4" />
      case 'execution':
        return <Zap className="w-4 h-4" />
      default:
        return <Brain className="w-4 h-4" />
    }
  }

  const getAIColor = (type: string) => {
    switch (type) {
      case 'risk_system':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'ai_engine':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'strategy_manager':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'execution':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getTimeDifference = (decisionTime: Date) => {
    const diffMs = currentTime.getTime() - decisionTime.getTime()
    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    
    if (diffSeconds < 0) {
      return { text: 'Future', color: 'text-blue-600' }
    } else if (diffSeconds < 60) {
      return { text: `${diffSeconds}s ago`, color: 'text-gray-600' }
    } else if (diffMinutes < 60) {
      return { text: `${diffMinutes}m ago`, color: 'text-gray-600' }
    } else {
      return { text: 'Past', color: 'text-gray-600' }
    }
  }

  const filteredDecisions = useMemo(() => {
    if (!selectedEvent) return []
    
    let decisions = selectedEvent.aiDecisions
    
    if (filterType !== 'all') {
      decisions = decisions.filter(decision => decision.type === filterType)
    }
    
    if (!showAll) {
      // Only show decisions within 15 minutes of current time
      decisions = decisions.filter(decision => {
        const timeDiff = Math.abs(decision.timestamp.getTime() - currentTime.getTime())
        return timeDiff <= 15 * 60 * 1000 // 15 minutes
      })
    }
    
    return decisions.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
  }, [selectedEvent, filterType, showAll, currentTime])

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'risk_system':
        return 'Risk System'
      case 'ai_engine':
        return 'AI Engine'
      case 'strategy_manager':
        return 'Strategy Manager'
      case 'execution':
        return 'Execution'
      default:
        return 'Unknown'
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>AI Decision Log</span>
            </CardTitle>
            <CardDescription>
              Real-time AI decisions and actions during market events
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {onShowAllChange && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onShowAllChange(!showAll)}
                className="text-xs"
              >
                {showAll ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                {showAll ? 'Show Recent' : 'Show All'}
              </Button>
            )}
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Filter Controls */}
        <div className="p-4 border-b space-y-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter by Type:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'risk_system', 'ai_engine', 'strategy_manager', 'execution'].map((type) => (
              <Badge
                key={type}
                variant={filterType === type ? "default" : "outline"}
                className="cursor-pointer text-xs"
                onClick={() => setFilterType(type)}
              >
                {type === 'all' ? 'All' : getTypeLabel(type)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Decision List */}
        <ScrollArea className="h-96">
          <div className="p-4 space-y-4">
            {filteredDecisions.length === 0 ? (
              <div className="text-center py-8">
                <Brain className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No AI decisions found for the current time period</p>
              </div>
            ) : (
              filteredDecisions.map((decision, index) => {
                const timeDiff = getTimeDifference(decision.timestamp)
                const isRecent = Math.abs(decision.timestamp.getTime() - currentTime.getTime()) < 30000 // Within 30 seconds
                
                return (
                  <div
                    key={index}
                    className={`relative p-4 rounded-lg border transition-all ${
                      isRecent 
                        ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 shadow-sm' 
                        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {/* Timeline Indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-l-lg"></div>
                    
                    <div className="flex items-start space-x-3">
                      {/* AI Icon */}
                      <div className={`p-2 rounded-lg ${getAIColor(decision.type)}`}>
                        {getAIIcon(decision.type)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getAIColor(decision.type)}>
                              {getTypeLabel(decision.type)}
                            </Badge>
                            <span className="text-sm font-medium">{decision.action}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onTimeJump(decision.timestamp)}
                              className="text-xs h-6 px-2"
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              Jump
                            </Button>
                          </div>
                        </div>
                        
                        {/* Timestamp */}
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(decision.timestamp)}</span>
                          <span className={timeDiff.color}>({timeDiff.text})</span>
                        </div>
                        
                        {/* Details */}
                        <div className="space-y-1">
                          <div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">Details:</span>
                            <p className="text-sm">{decision.details}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">Impact:</span>
                            <p className="text-sm text-green-700 dark:text-green-300">{decision.impact}</p>
                          </div>
                        </div>
                        
                        {/* Recent indicator */}
                        {isRecent && (
                          <div className="flex items-center space-x-1 mt-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-blue-600 dark:text-blue-400">Recent</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}