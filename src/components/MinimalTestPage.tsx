'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function MinimalTestPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Minimal Test Page</h1>
            <p className="text-muted-foreground">Testing basic UI components</p>
          </div>
          <Badge variant="outline">Test</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
            <CardDescription>This is a test card to verify UI components work</CardDescription>
          </CardHeader>
          <CardContent>
            <p>If you can see this, the basic UI components are working!</p>
            <Badge variant="outline" className="mt-2">Test Badge</Badge>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p>First card content</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Second card content</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}