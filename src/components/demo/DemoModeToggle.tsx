'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, Zap } from 'lucide-react'

interface DemoModeToggleProps {
  isDemoMode: boolean
  onDemoModeChange: (enabled: boolean) => void
}

export default function DemoModeToggle({ isDemoMode, onDemoModeChange }: DemoModeToggleProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Demo Mode</CardTitle>
        <div className="flex items-center space-x-2">
          {isDemoMode ? (
            <Badge variant="default" className="bg-green-500">
              <Zap className="w-3 h-3 mr-1" />
              Active
            </Badge>
          ) : (
            <Badge variant="secondary">
              <Pause className="w-3 h-3 mr-1" />
              Disabled
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="demo-mode"
            checked={isDemoMode}
            onCheckedChange={onDemoModeChange}
          />
          <Label htmlFor="demo-mode" className="text-sm font-medium">
            Enable Demo Mode
          </Label>
        </div>
        <CardDescription className="text-xs">
          {isDemoMode 
            ? "Demo mode is active. Using pre-recorded market events for demonstration."
            : "Demo mode is disabled. Using live market data."
          }
        </CardDescription>
        {isDemoMode && (
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 mb-2">
              <Play className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Available Demo Events:
              </span>
            </div>
            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Fed Interest Rate Announcement (March 20, 2024)</li>
              <li>• CPI Report Release (April 10, 2024)</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}