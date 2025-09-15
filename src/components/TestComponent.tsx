'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function TestComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Component</CardTitle>
        <CardDescription>This is a test component</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="outline">Test Badge</Badge>
        <p>If you can see this, the UI is working!</p>
      </CardContent>
    </Card>
  )
}