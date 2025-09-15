'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

interface MarketDataUpdate {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  timestamp: Date
}

interface PositionUpdate {
  positionId: string
  symbol: string
  currentPrice: number
  unrealizedPnL: number
  delta: number
  gamma: number
  theta: number
  vega: number
  timestamp: Date
}

interface PortfolioUpdate {
  portfolioId: string
  totalValue: number
  dailyPnL: number
  totalReturn: number
  marginUtilization: number
  timestamp: Date
}

interface RiskAlert {
  id: string
  type: 'MARGIN_WARNING' | 'DRAWDOWN_ALERT' | 'VOLATILITY_SPIKE' | 'POSITION_LIMIT'
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  message: string
  timestamp: Date
  data: any
}

interface StrategySignal {
  strategyId: string
  type: 'BUY' | 'SELL' | 'HEDGE' | 'CLOSE'
  symbol: string
  strength: number
  confidence: number
  timestamp: Date
}

interface UseWebSocketOptions {
  autoConnect?: boolean
  enableLogging?: boolean
}

export interface UseWebSocketReturn {
  socket: Socket | null
  isConnected: boolean
  connectionError: string | null
  connect: () => void
  disconnect: () => void
  
  // Market data
  subscribeMarketData: (symbols: string[]) => void
  unsubscribeMarketData: (symbols: string[]) => void
  onMarketDataUpdate: (callback: (data: MarketDataUpdate) => void) => () => void
  
  // Position updates
  subscribePositions: (portfolioId: string) => void
  unsubscribePositions: (portfolioId: string) => void
  onPositionUpdate: (callback: (data: PositionUpdate) => void) => () => void
  
  // Portfolio updates
  subscribePortfolio: (portfolioId: string) => void
  unsubscribePortfolio: (portfolioId: string) => void
  onPortfolioUpdate: (callback: (data: PortfolioUpdate) => void) => () => void
  
  // Risk alerts
  subscribeRiskAlerts: () => void
  unsubscribeRiskAlerts: () => void
  onRiskAlert: (callback: (data: RiskAlert) => void) => () => void
  
  // Strategy signals
  subscribeStrategySignals: (strategyId: string) => void
  unsubscribeStrategySignals: (strategyId: string) => void
  onStrategySignal: (callback: (data: StrategySignal) => void) => () => void
  
  // General messaging
  sendMessage: (message: { text: string; senderId: string }) => void
  onMessage: (callback: (data: { text: string; senderId: string; timestamp: string }) => void) => () => void
}

export function useWebSocket(
  serverUrl: string = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001',
  options: UseWebSocketOptions = {}
): UseWebSocketReturn {
  const {
    autoConnect = true,
    enableLogging = false
  } = options

  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  // Event listeners storage
  const marketDataListenersRef = useRef<Set<(data: MarketDataUpdate) => void>>(new Set())
  const positionUpdateListenersRef = useRef<Set<(data: PositionUpdate) => void>>(new Set())
  const portfolioUpdateListenersRef = useRef<Set<(data: PortfolioUpdate) => void>>(new Set())
  const riskAlertListenersRef = useRef<Set<(data: RiskAlert) => void>>(new Set())
  const strategySignalListenersRef = useRef<Set<(data: StrategySignal) => void>>(new Set())
  const messageListenersRef = useRef<Set<(data: { text: string; senderId: string; timestamp: string }) => void>>(new Set())

  const log = useCallback((message: string, ...args: any[]) => {
    if (enableLogging) {
      console.log(`[WebSocket] ${message}`, ...args)
    }
  }, [enableLogging])

  const connect = useCallback(() => {
    if (socketRef.current?.connected) {
      log('Already connected')
      return
    }

    log('Connecting to WebSocket server...', serverUrl)
    
    try {
      socketRef.current = io(serverUrl, {
        transports: ['websocket', 'polling'],
        timeout: 5000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      })

      const socket = socketRef.current

      socket.on('connect', () => {
        log('Connected to WebSocket server', socket.id)
        setIsConnected(true)
        setConnectionError(null)
      })

      socket.on('disconnect', (reason) => {
        log('Disconnected from WebSocket server', reason)
        setIsConnected(false)
      })

      socket.on('connect_error', (error) => {
        log('Connection error', error.message)
        setConnectionError(error.message)
        setIsConnected(false)
      })

      // Market data updates
      socket.on('market_data_update', (data: MarketDataUpdate) => {
        marketDataListenersRef.current.forEach(listener => {
          try {
            listener(data)
          } catch (error) {
            console.error('Error in market data listener:', error)
          }
        })
      })

      // Position updates
      socket.on('position_update', (data: PositionUpdate) => {
        positionUpdateListenersRef.current.forEach(listener => {
          try {
            listener(data)
          } catch (error) {
            console.error('Error in position update listener:', error)
          }
        })
      })

      // Portfolio updates
      socket.on('portfolio_update', (data: PortfolioUpdate) => {
        portfolioUpdateListenersRef.current.forEach(listener => {
          try {
            listener(data)
          } catch (error) {
            console.error('Error in portfolio update listener:', error)
          }
        })
      })

      // Risk alerts
      socket.on('risk_alert', (data: RiskAlert) => {
        riskAlertListenersRef.current.forEach(listener => {
          try {
            listener(data)
          } catch (error) {
            console.error('Error in risk alert listener:', error)
          }
        })
      })

      // Strategy signals
      socket.on('strategy_signal', (data: StrategySignal) => {
        strategySignalListenersRef.current.forEach(listener => {
          try {
            listener(data)
          } catch (error) {
            console.error('Error in strategy signal listener:', error)
          }
        })
      })

      // General messages
      socket.on('message', (data: { text: string; senderId: string; timestamp: string }) => {
        messageListenersRef.current.forEach(listener => {
          try {
            listener(data)
          } catch (error) {
            console.error('Error in message listener:', error)
          }
        })
      })

      socket.on('connection_confirmed', (data: { socketId: string; timestamp: string; subscriptions: string[] }) => {
        log('Connection confirmed', data)
      })

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)
      setConnectionError(error instanceof Error ? error.message : 'Unknown error')
    }
  }, [serverUrl, log])

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      log('Disconnecting from WebSocket server')
      socketRef.current.disconnect()
      socketRef.current = null
      setIsConnected(false)
    }
  }, [log])

  // Market data subscription
  const subscribeMarketData = useCallback((symbols: string[]) => {
    if (socketRef.current?.connected) {
      log('Subscribing to market data:', symbols)
      socketRef.current.emit('subscribe_market_data', symbols)
    }
  }, [log])

  const unsubscribeMarketData = useCallback((symbols: string[]) => {
    if (socketRef.current?.connected) {
      log('Unsubscribing from market data:', symbols)
      socketRef.current.emit('unsubscribe', symbols.map(s => `market_${s}`))
    }
  }, [log])

  const onMarketDataUpdate = useCallback((callback: (data: MarketDataUpdate) => void) => {
    marketDataListenersRef.current.add(callback)
    return () => {
      marketDataListenersRef.current.delete(callback)
    }
  }, [])

  // Position updates subscription
  const subscribePositions = useCallback((portfolioId: string) => {
    if (socketRef.current?.connected) {
      log('Subscribing to position updates for portfolio:', portfolioId)
      socketRef.current.emit('subscribe_positions', portfolioId)
    }
  }, [log])

  const unsubscribePositions = useCallback((portfolioId: string) => {
    if (socketRef.current?.connected) {
      log('Unsubscribing from position updates for portfolio:', portfolioId)
      socketRef.current.emit('unsubscribe', [`positions_${portfolioId}`])
    }
  }, [log])

  const onPositionUpdate = useCallback((callback: (data: PositionUpdate) => void) => {
    positionUpdateListenersRef.current.add(callback)
    return () => {
      positionUpdateListenersRef.current.delete(callback)
    }
  }, [])

  // Portfolio updates subscription
  const subscribePortfolio = useCallback((portfolioId: string) => {
    if (socketRef.current?.connected) {
      log('Subscribing to portfolio updates for portfolio:', portfolioId)
      socketRef.current.emit('subscribe_portfolio', portfolioId)
    }
  }, [log])

  const unsubscribePortfolio = useCallback((portfolioId: string) => {
    if (socketRef.current?.connected) {
      log('Unsubscribing from portfolio updates for portfolio:', portfolioId)
      socketRef.current.emit('unsubscribe', [`portfolio_${portfolioId}`])
    }
  }, [log])

  const onPortfolioUpdate = useCallback((callback: (data: PortfolioUpdate) => void) => {
    portfolioUpdateListenersRef.current.add(callback)
    return () => {
      portfolioUpdateListenersRef.current.delete(callback)
    }
  }, [])

  // Risk alerts subscription
  const subscribeRiskAlerts = useCallback(() => {
    if (socketRef.current?.connected) {
      log('Subscribing to risk alerts')
      socketRef.current.emit('subscribe_risk_alerts')
    }
  }, [log])

  const unsubscribeRiskAlerts = useCallback(() => {
    if (socketRef.current?.connected) {
      log('Unsubscribing from risk alerts')
      socketRef.current.emit('unsubscribe', ['risk_alerts'])
    }
  }, [log])

  const onRiskAlert = useCallback((callback: (data: RiskAlert) => void) => {
    riskAlertListenersRef.current.add(callback)
    return () => {
      riskAlertListenersRef.current.delete(callback)
    }
  }, [])

  // Strategy signals subscription
  const subscribeStrategySignals = useCallback((strategyId: string) => {
    if (socketRef.current?.connected) {
      log('Subscribing to strategy signals for strategy:', strategyId)
      socketRef.current.emit('subscribe_strategy_signals', strategyId)
    }
  }, [log])

  const unsubscribeStrategySignals = useCallback((strategyId: string) => {
    if (socketRef.current?.connected) {
      log('Unsubscribing from strategy signals for strategy:', strategyId)
      socketRef.current.emit('unsubscribe', [`signals_${strategyId}`])
    }
  }, [log])

  const onStrategySignal = useCallback((callback: (data: StrategySignal) => void) => {
    strategySignalListenersRef.current.add(callback)
    return () => {
      strategySignalListenersRef.current.delete(callback)
    }
  }, [])

  // General messaging
  const sendMessage = useCallback((message: { text: string; senderId: string }) => {
    if (socketRef.current?.connected) {
      log('Sending message:', message)
      socketRef.current.emit('message', message)
    }
  }, [log])

  const onMessage = useCallback((callback: (data: { text: string; senderId: string; timestamp: string }) => void) => {
    messageListenersRef.current.add(callback)
    return () => {
      messageListenersRef.current.delete(callback)
    }
  }, [])

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [autoConnect, connect, disconnect])

  return {
    socket: socketRef.current,
    isConnected,
    connectionError,
    connect,
    disconnect,
    
    // Market data
    subscribeMarketData,
    unsubscribeMarketData,
    onMarketDataUpdate,
    
    // Position updates
    subscribePositions,
    unsubscribePositions,
    onPositionUpdate,
    
    // Portfolio updates
    subscribePortfolio,
    unsubscribePortfolio,
    onPortfolioUpdate,
    
    // Risk alerts
    subscribeRiskAlerts,
    unsubscribeRiskAlerts,
    onRiskAlert,
    
    // Strategy signals
    subscribeStrategySignals,
    unsubscribeStrategySignals,
    onStrategySignal,
    
    // General messaging
    sendMessage,
    onMessage,
  }
}

// Hook for real-time market data
export function useRealTimeMarketData(symbols: string[] = ['SPX', 'QQQ', 'IWM', 'VIX']) {
  const [marketData, setMarketData] = useState<Record<string, MarketDataUpdate>>({})
  const [isConnected, setIsConnected] = useState(false)
  
  const websocket = useWebSocket('', { 
    autoConnect: true, 
    enableLogging: false 
  })

  useEffect(() => {
    if (websocket.isConnected) {
      setIsConnected(true)
      websocket.subscribeMarketData(symbols)
      
      const unsubscribe = websocket.onMarketDataUpdate((data) => {
        setMarketData(prev => ({
          ...prev,
          [data.symbol]: data
        }))
      })

      return () => {
        unsubscribe()
        websocket.unsubscribeMarketData(symbols)
      }
    } else {
      setIsConnected(false)
    }
  }, [websocket.isConnected, symbols, websocket])

  return {
    marketData,
    isConnected,
    error: websocket.connectionError
  }
}

// Hook for real-time position updates
export function useRealTimePositions(portfolioId: string) {
  const [positionUpdates, setPositionUpdates] = useState<PositionUpdate[]>([])
  const [isConnected, setIsConnected] = useState(false)
  
  const websocket = useWebSocket('', { 
    autoConnect: true, 
    enableLogging: false 
  })

  useEffect(() => {
    if (websocket.isConnected && portfolioId) {
      setIsConnected(true)
      websocket.subscribePositions(portfolioId)
      
      const unsubscribe = websocket.onPositionUpdate((data) => {
        setPositionUpdates(prev => {
          const existing = prev.findIndex(p => p.positionId === data.positionId)
          if (existing >= 0) {
            const updated = [...prev]
            updated[existing] = data
            return updated
          }
          return [...prev, data]
        })
      })

      return () => {
        unsubscribe()
        websocket.unsubscribePositions(portfolioId)
      }
    } else {
      setIsConnected(false)
    }
  }, [websocket.isConnected, portfolioId, websocket])

  return {
    positionUpdates,
    isConnected,
    error: websocket.connectionError
  }
}

// Hook for real-time risk alerts
export function useRealTimeRiskAlerts() {
  const [alerts, setAlerts] = useState<RiskAlert[]>([])
  const [isConnected, setIsConnected] = useState(false)
  
  const websocket = useWebSocket('', { 
    autoConnect: true, 
    enableLogging: false 
  })

  useEffect(() => {
    if (websocket.isConnected) {
      setIsConnected(true)
      websocket.subscribeRiskAlerts()
      
      const unsubscribe = websocket.onRiskAlert((data) => {
        setAlerts(prev => [data, ...prev.slice(0, 49)]) // Keep last 50 alerts
      })

      return () => {
        unsubscribe()
        websocket.unsubscribeRiskAlerts()
      }
    } else {
      setIsConnected(false)
    }
  }, [websocket.isConnected, websocket])

  const clearAlerts = useCallback(() => {
    setAlerts([])
  }, [])

  return {
    alerts,
    isConnected,
    clearAlerts,
    error: websocket.connectionError
  }
}

// Hook for real-time strategy signals
export function useRealTimeStrategySignals(strategyId: string) {
  const [signals, setSignals] = useState<StrategySignal[]>([])
  const [isConnected, setIsConnected] = useState(false)
  
  const websocket = useWebSocket('', { 
    autoConnect: true, 
    enableLogging: false 
  })

  useEffect(() => {
    if (websocket.isConnected && strategyId) {
      setIsConnected(true)
      websocket.subscribeStrategySignals(strategyId)
      
      const unsubscribe = websocket.onStrategySignal((data) => {
        setSignals(prev => [data, ...prev.slice(0, 19)]) // Keep last 20 signals
      })

      return () => {
        unsubscribe()
        websocket.unsubscribeStrategySignals(strategyId)
      }
    } else {
      setIsConnected(false)
    }
  }, [websocket.isConnected, strategyId, websocket])

  const clearSignals = useCallback(() => {
    setSignals([])
  }, [])

  return {
    signals,
    isConnected,
    clearSignals,
    error: websocket.connectionError
  }
}