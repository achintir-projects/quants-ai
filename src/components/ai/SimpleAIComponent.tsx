'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function SimpleAIComponent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI System - Simple Version</CardTitle>
          <CardDescription>This is a simplified version to test if the UI loads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">OODA Loop</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Active</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Self-improving loop system
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Feature Store</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Active</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Unified feature engineering
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}