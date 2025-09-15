import { Server } from 'socket.io';

interface MarketDataUpdate {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: Date;
}

interface PositionUpdate {
  positionId: string;
  symbol: string;
  currentPrice: number;
  unrealizedPnL: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  timestamp: Date;
}

interface PortfolioUpdate {
  portfolioId: string;
  totalValue: number;
  dailyPnL: number;
  totalReturn: number;
  marginUtilization: number;
  timestamp: Date;
}

interface RiskAlert {
  id: string;
  type: 'MARGIN_WARNING' | 'DRAWDOWN_ALERT' | 'VOLATILITY_SPIKE' | 'POSITION_LIMIT';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  timestamp: Date;
  data: any;
}

interface StrategySignal {
  strategyId: string;
  type: 'BUY' | 'SELL' | 'HEDGE' | 'CLOSE';
  symbol: string;
  strength: number;
  confidence: number;
  timestamp: Date;
}

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    // Store client subscriptions
    const subscriptions: Set<string> = new Set();
    
    // Handle market data subscription
    socket.on('subscribe_market_data', (symbols: string[]) => {
      symbols.forEach(symbol => subscriptions.add(`market_${symbol}`));
      console.log(`Client ${socket.id} subscribed to market data:`, symbols);
    });

    // Handle position updates subscription
    socket.on('subscribe_positions', (portfolioId: string) => {
      subscriptions.add(`positions_${portfolioId}`);
      console.log(`Client ${socket.id} subscribed to positions:`, portfolioId);
    });

    // Handle portfolio updates subscription
    socket.on('subscribe_portfolio', (portfolioId: string) => {
      subscriptions.add(`portfolio_${portfolioId}`);
      console.log(`Client ${socket.id} subscribed to portfolio:`, portfolioId);
    });

    // Handle risk alerts subscription
    socket.on('subscribe_risk_alerts', () => {
      subscriptions.add('risk_alerts');
      console.log(`Client ${socket.id} subscribed to risk alerts`);
    });

    // Handle strategy signals subscription
    socket.on('subscribe_strategy_signals', (strategyId: string) => {
      subscriptions.add(`signals_${strategyId}`);
      console.log(`Client ${socket.id} subscribed to strategy signals:`, strategyId);
    });

    // Handle unsubscribe
    socket.on('unsubscribe', (patterns: string[]) => {
      patterns.forEach(pattern => {
        if (pattern.endsWith('*')) {
          const prefix = pattern.slice(0, -1);
          subscriptions.forEach(sub => {
            if (sub.startsWith(prefix)) {
              subscriptions.delete(sub);
            }
          });
        } else {
          subscriptions.delete(pattern);
        }
      });
      console.log(`Client ${socket.id} unsubscribed from:`, patterns);
    });

    // Simulate real-time market data updates
    const marketDataInterval = setInterval(() => {
      const symbols = ['SPX', 'QQQ', 'IWM', 'VIX'];
      symbols.forEach(symbol => {
        if (subscriptions.has(`market_${symbol}`)) {
          const update: MarketDataUpdate = {
            symbol,
            price: Math.random() * 1000 + 4000,
            change: (Math.random() - 0.5) * 50,
            changePercent: (Math.random() - 0.5) * 2,
            volume: Math.floor(Math.random() * 1000000),
            timestamp: new Date()
          };
          socket.emit('market_data_update', update);
        }
      });
    }, 1000);

    // Simulate position updates
    const positionInterval = setInterval(() => {
      subscriptions.forEach(sub => {
        if (sub.startsWith('positions_')) {
          const portfolioId = sub.substring(10);
          const update: PositionUpdate = {
            positionId: `pos_${Date.now()}`,
            symbol: 'SPX',
            currentPrice: Math.random() * 100 + 5000,
            unrealizedPnL: (Math.random() - 0.5) * 10000,
            delta: Math.random() * 2 - 1,
            gamma: Math.random() * 0.1,
            theta: Math.random() * 100 - 50,
            vega: Math.random() * 2000 - 1000,
            timestamp: new Date()
          };
          socket.emit('position_update', update);
        }
      });
    }, 2000);

    // Simulate portfolio updates
    const portfolioInterval = setInterval(() => {
      subscriptions.forEach(sub => {
        if (sub.startsWith('portfolio_')) {
          const portfolioId = sub.substring(10);
          const update: PortfolioUpdate = {
            portfolioId,
            totalValue: Math.random() * 100000 + 900000,
            dailyPnL: (Math.random() - 0.5) * 20000,
            totalReturn: Math.random() * 20,
            marginUtilization: Math.random() * 100,
            timestamp: new Date()
          };
          socket.emit('portfolio_update', update);
        }
      });
    }, 3000);

    // Simulate risk alerts
    const riskAlertInterval = setInterval(() => {
      if (subscriptions.has('risk_alerts') && Math.random() < 0.1) {
        const alertTypes = ['MARGIN_WARNING', 'DRAWDOWN_ALERT', 'VOLATILITY_SPIKE', 'POSITION_LIMIT'];
        const severities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
        const alert: RiskAlert = {
          id: `alert_${Date.now()}`,
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)] as any,
          severity: severities[Math.floor(Math.random() * severities.length)] as any,
          message: 'Risk alert triggered',
          timestamp: new Date(),
          data: { value: Math.random() * 100 }
        };
        socket.emit('risk_alert', alert);
      }
    }, 5000);

    // Simulate strategy signals
    const strategySignalInterval = setInterval(() => {
      subscriptions.forEach(sub => {
        if (sub.startsWith('signals_')) {
          const strategyId = sub.substring(8);
          if (Math.random() < 0.2) {
            const signal: StrategySignal = {
              strategyId,
              type: ['BUY', 'SELL', 'HEDGE', 'CLOSE'][Math.floor(Math.random() * 4)] as any,
              symbol: ['SPX', 'QQQ', 'IWM'][Math.floor(Math.random() * 3)],
              strength: Math.random(),
              confidence: Math.random(),
              timestamp: new Date()
            };
            socket.emit('strategy_signal', signal);
          }
        }
      });
    }, 4000);

    // Handle custom messages
    socket.on('message', (msg: { text: string; senderId: string }) => {
      socket.emit('message', {
        text: `Echo: ${msg.text}`,
        senderId: 'system',
        timestamp: new Date().toISOString(),
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      clearInterval(marketDataInterval);
      clearInterval(positionInterval);
      clearInterval(portfolioInterval);
      clearInterval(riskAlertInterval);
      clearInterval(strategySignalInterval);
    });

    // Send welcome message
    socket.emit('message', {
      text: 'Welcome to Quantitative Trading Platform Real-Time Data!',
      senderId: 'system',
      timestamp: new Date().toISOString(),
    });

    // Send initial connection confirmation
    socket.emit('connection_confirmed', {
      socketId: socket.id,
      timestamp: new Date().toISOString(),
      subscriptions: Array.from(subscriptions)
    });
  });
};