'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Zap,
  Target,
  Brain,
  BarChart3,
  Monitor,
  Server,
  Database,
  Network,
  Cpu,
  HardDrive,
  MemoryStick,
  Gauge,
  Clock,
  Shield,
  Wifi,
  Power
} from 'lucide-react'

interface SystemHealth {
  overall: 'excellent' | 'good' | 'warning' | 'critical'
  uptime: number
  lastMaintenance: string
  nextMaintenance: string
  activeAlerts: number
  systemLoad: number
  memoryUsage: number
  diskUsage: number
  networkLatency: number
}

interface ModelPerformance {
  modelId: string
  name: string
  type: string
  status: 'active' | 'training' | 'idle' | 'error'
  accuracy: number
  performance: {
    winRate: number
    sharpeRatio: number
    maxDrawdown: number
    totalTrades: number
    profitFactor: number
  }
  resourceUsage: {
    cpu: number
    memory: number
    gpu: number
    disk: number
  }
  lastUpdate: string
  health: 'excellent' | 'good' | 'warning' | 'critical'
}

interface RealTimeMetrics {
  timestamp: string
  totalRequests: number
  activeConnections: number
  responseTime: number
  errorRate: number
  throughput: number
  queueLength: number
  cacheHitRate: number
  databaseConnections: number
}

interface Alert {
  id: string
  type: 'info' | 'warning' | 'error' | 'critical'
  message: string
  component: string
  timestamp: string
  resolved: boolean
  severity: 'low' | 'medium' | 'high' | 'critical'
}

export default function AIMonitoringDashboard() {
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    overall: 'good',
    uptime: 259200, // 3 days in seconds
    lastMaintenance: '2024-01-12T10:00:00Z',
    nextMaintenance: '2024-01-19T10:00:00Z',
    activeAlerts: 3,
    systemLoad: 65,
    memoryUsage: 72,
    diskUsage: 68,
    networkLatency: 15
  })

  const [modelPerformance, setModelPerformance] = useState<ModelPerformance[]>([
    {
      modelId: '1',
      name: 'OODA Loop System',
      type: 'ooda_loop',
      status: 'active',
      accuracy: 94.2,
      performance: {
        winRate: 87.3,
        sharpeRatio: 2.15,
        maxDrawdown: -2.8,
        totalTrades: 1256,
        profitFactor: 1.45
      },
      resourceUsage: {
        cpu: 35,
        memory: 42,
        gpu: 25,
        disk: 15
      },
      lastUpdate: '2024-01-15T14:30:00Z',
      health: 'excellent'
    },
    {
      modelId: '2',
      name: 'Strategy Discovery Engine',
      type: 'strategy_discovery',
      status: 'training',
      accuracy: 89.7,
      performance: {
        winRate: 82.1,
        sharpeRatio: 1.92,
        maxDrawdown: -3.5,
        totalTrades: 892,
        profitFactor: 1.38
      },
      resourceUsage: {
        cpu: 68,
        memory: 75,
        gpu: 45,
        disk: 28
      },
      lastUpdate: '2024-01-15T14:25:00Z',
      health: 'good'
    },
    {
      modelId: '3',
      name: 'Predictive Risk Manager',
      type: 'risk_management',
      status: 'active',
      accuracy: 91.5,
      performance: {
        winRate: 85.6,
        sharpeRatio: 2.05,
        maxDrawdown: -3.1,
        totalTrades: 1103,
        profitFactor: 1.42
      },
      resourceUsage: {
        cpu: 42,
        memory: 38,
        gpu: 20,
        disk: 18
      },
      lastUpdate: '2024-01-15T14:28:00Z',
      health: 'good'
    },
    {
      modelId: '4',
      name: 'Intelligent Execution Agent',
      type: 'execution_agent',
      status: 'active',
      accuracy: 88.9,
      performance: {
        winRate: 79.8,
        sharpeRatio: 1.87,
        maxDrawdown: -4.2,
        totalTrades: 2156,
        profitFactor: 1.35
      },
      resourceUsage: {
        cpu: 55,
        memory: 48,
        gpu: 35,
        disk: 22
      },
      lastUpdate: '2024-01-15T14:32:00Z',
      health: 'good'
    }
  ])

  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics>({
    timestamp: new Date().toISOString(),
    totalRequests: 15420,
    activeConnections: 127,
    responseTime: 45,
    errorRate: 0.8,
    throughput: 89.5,
    queueLength: 12,
    cacheHitRate: 94.2,
    databaseConnections: 18
  })

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'High memory usage detected in Strategy Discovery Engine',
      component: 'Strategy Discovery Engine',
      timestamp: '2024-01-15T14:25:00Z',
      resolved: false,
      severity: 'medium'
    },
    {
      id: '2',
      type: 'info',
      message: 'Scheduled maintenance in 4 days',
      component: 'System',
      timestamp: '2024-01-15T14:20:00Z',
      resolved: false,
      severity: 'low'
    },
    {
      id: '3',
      type: 'error',
      message: 'Network latency increased beyond threshold',
      component: 'Network',
      timestamp: '2024-01-15T14:15:00Z',
      resolved: false,
      severity: 'high'
    }
  ])

  const [isMonitoring, setIsMonitoring] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      // Update real-time metrics
      setRealTimeMetrics(prev => ({
        ...prev,
        timestamp: new Date().toISOString(),
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 10),
        activeConnections: Math.max(50, prev.activeConnections + Math.floor((Math.random() - 0.5) * 5)),
        responseTime: Math.max(10, prev.responseTime + Math.floor((Math.random() - 0.5) * 10)),
        errorRate: Math.max(0, Math.min(5, prev.errorRate + (Math.random() - 0.5) * 0.2)),
        throughput: Math.max(50, prev.throughput + (Math.random() - 0.5) * 5),
        queueLength: Math.max(0, prev.queueLength + Math.floor((Math.random() - 0.5) * 3)),
        cacheHitRate: Math.max(80, Math.min(99, prev.cacheHitRate + (Math.random() - 0.5) * 1)),
        databaseConnections: Math.max(10, prev.databaseConnections + Math.floor((Math.random() - 0.5) * 2))
      }))

      // Update system health
      setSystemHealth(prev => ({
        ...prev,
        systemLoad: Math.max(0, Math.min(100, prev.systemLoad + (Math.random() - 0.5) * 5)),
        memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 3)),
        diskUsage: Math.max(0, Math.min(100, prev.diskUsage + (Math.random() - 0.5) * 1)),
        networkLatency: Math.max(0, prev.networkLatency + (Math.random() - 0.5) * 3)
      }))

      // Update model performance
      setModelPerformance(prev => prev.map(model => ({
        ...model,
        accuracy: Math.max(0, Math.min(100, model.accuracy + (Math.random() - 0.5) * 0.5)),
        performance: {
          ...model.performance,
          winRate: Math.max(0, Math.min(100, model.performance.winRate + (Math.random() - 0.5) * 1)),
          sharpeRatio: Math.max(0, model.performance.sharpeRatio + (Math.random() - 0.5) * 0.05),
          totalTrades: model.performance.totalTrades + Math.floor(Math.random() * 3)
        },
        resourceUsage: {
          ...model.resourceUsage,
          cpu: Math.max(0, Math.min(100, model.resourceUsage.cpu + (Math.random() - 0.5) * 3)),
          memory: Math.max(0, Math.min(100, model.resourceUsage.memory + (Math.random() - 0.5) * 2))
        }
      })))

      setLastUpdate(new Date())
    }, 2000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600'
      case 'good': return 'text-blue-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'training': return 'bg-blue-500'
      case 'idle': return 'bg-gray-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'training': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
      case 'idle': return <Clock className="w-4 h-4 text-gray-600" />
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-500'
      case 'warning': return 'bg-yellow-500'
      case 'error': return 'bg-orange-500'
      case 'critical': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}d ${hours}h ${minutes}m`
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI System Monitoring Dashboard</h2>
          <p className="text-muted-foreground">Real-time performance analytics and system health monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="w-3 h-3 mr-1" />
            {isMonitoring ? 'Monitoring' : 'Paused'}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMonitoring(!isMonitoring)}
          >
            {isMonitoring ? 'Pause' : 'Resume'}
          </Button>
          <Badge variant="outline">
            Last Update: {lastUpdate.toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* System Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            System Health Overview
          </CardTitle>
          <CardDescription>
            Overall system status and key metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Overall Health</div>
              <div className={`text-lg font-semibold ${getHealthColor(systemHealth.overall)}`}>
                {systemHealth.overall.charAt(0).toUpperCase() + systemHealth.overall.slice(1)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Uptime</div>
              <div className="text-lg font-semibold">{formatUptime(systemHealth.uptime)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Active Alerts</div>
              <div className="text-lg font-semibold text-orange-600">{systemHealth.activeAlerts}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">System Load</div>
              <div className="text-lg font-semibold">{systemHealth.systemLoad.toFixed(1)}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="realtime" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="realtime">Real-time Metrics</TabsTrigger>
          <TabsTrigger value="models">Model Performance</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Events</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(realTimeMetrics.totalRequests)}</div>
                <div className="text-sm text-muted-foreground">Total requests</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{realTimeMetrics.activeConnections}</div>
                <div className="text-sm text-muted-foreground">Active connections</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{realTimeMetrics.responseTime}ms</div>
                <div className="text-sm text-muted-foreground">Average response</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Throughput
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{realTimeMetrics.throughput.toFixed(1)}/s</div>
                <div className="text-sm text-muted-foreground">Requests per second</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Error Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${realTimeMetrics.errorRate > 1 ? 'text-red-600' : 'text-green-600'}`}>
                  {realTimeMetrics.errorRate.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Error percentage</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Queue Length
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{realTimeMetrics.queueLength}</div>
                <div className="text-sm text-muted-foreground">Items in queue</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MemoryStick className="w-4 h-4" />
                  Cache Hit Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{realTimeMetrics.cacheHitRate.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Cache efficiency</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  DB Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{realTimeMetrics.databaseConnections}</div>
                <div className="text-sm text-muted-foreground">Active connections</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models">
          <div className="space-y-4">
            {modelPerformance.map((model) => (
              <Card key={model.modelId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      {model.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(model.status)}
                      <Badge variant="outline" className={getStatusColor(model.status)}>
                        {model.status}
                      </Badge>
                      <Badge variant="outline" className={getHealthColor(model.health)}>
                        {model.health}
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Type: {model.type} | Accuracy: {model.accuracy.toFixed(1)}%
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Win Rate</div>
                      <div className="text-lg font-semibold">{model.performance.winRate.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                      <div className="text-lg font-semibold">{model.performance.sharpeRatio.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Max Drawdown</div>
                      <div className="text-lg font-semibold text-red-600">{model.performance.maxDrawdown.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Trades</div>
                      <div className="text-lg font-semibold">{formatNumber(model.performance.totalTrades)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Profit Factor</div>
                      <div className="text-lg font-semibold">{model.performance.profitFactor.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">CPU</div>
                      <div className="font-semibold">{model.resourceUsage.cpu.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Memory</div>
                      <div className="font-semibold">{model.resourceUsage.memory.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">GPU</div>
                      <div className="font-semibold">{model.resourceUsage.gpu.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Disk</div>
                      <div className="font-semibold">{model.resourceUsage.disk.toFixed(1)}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  System Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>System Load</span>
                    <span>{systemHealth.systemLoad.toFixed(1)}%</span>
                  </div>
                  <Progress value={systemHealth.systemLoad} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Memory Usage</span>
                    <span>{systemHealth.memoryUsage.toFixed(1)}%</span>
                  </div>
                  <Progress value={systemHealth.memoryUsage} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Disk Usage</span>
                    <span>{systemHealth.diskUsage.toFixed(1)}%</span>
                  </div>
                  <Progress value={systemHealth.diskUsage} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Network Latency</span>
                    <span>{systemHealth.networkLatency.toFixed(1)}ms</span>
                  </div>
                  <Progress value={Math.min(100, systemHealth.networkLatency * 2)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Power className="w-4 h-4" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">System Uptime</div>
                  <div className="text-lg font-semibold">{formatUptime(systemHealth.uptime)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Last Maintenance</div>
                  <div className="text-sm font-semibold">{new Date(systemHealth.lastMaintenance).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Next Maintenance</div>
                  <div className="text-sm font-semibold">{new Date(systemHealth.nextMaintenance).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Active Models</div>
                  <div className="text-lg font-semibold">{modelPerformance.filter(m => m.status === 'active').length}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Alert key={alert.id} className={alert.resolved ? 'opacity-50' : ''}>
                <AlertTriangle className={`h-4 w-4 ${getAlertColor(alert.type).replace('bg-', 'text-')}`} />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{alert.message}</div>
                      <div className="text-sm text-muted-foreground">
                        Component: {alert.component} | {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getAlertColor(alert.type)}>
                        {alert.type.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        {alert.severity.toUpperCase()}
                      </Badge>
                      {alert.resolved && (
                        <Badge variant="outline" className="bg-green-500">
                          RESOLVED
                        </Badge>
                      )}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}