'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Brain, 
  Target, 
  Zap, 
  Activity,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users,
  Settings,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Lightbulb,
  GitBranch,
  Network,
  Award,
  Star,
  Filter,
  Search
} from 'lucide-react'

interface GeneticProgrammingMetrics {
  population: {
    totalStrategies: number
    activeStrategies: number
    diversity: number
    averageFitness: number
    bestFitness: number
    generation: number
    status: 'EVOLVING' | 'CONVERGED' | 'STALLED'
  }
  evolution: {
    crossoverRate: number
    mutationRate: number
    selectionPressure: number
    elitismRate: number
    tournamentSize: number
    status: 'ACTIVE' | 'PAUSED' | 'COMPLETED'
  }
  fitness: {
    riskAdjustedReturns: number
    robustness: number
    complexity: number
    economicRationale: number
    transactionCosts: number
    status: 'CALCULATING' | 'OPTIMIZED' | 'FAILED'
  }
  overfitting: {
    outOfSampleTest: number
    crossValidation: number
    regimeTesting: number
    complexityPenalty: number
    economicValidation: number
    status: 'MONITORING' | 'DETECTED' | 'CLEAR'
  }
}

interface ReinforcementLearningMetrics {
  training: {
    episodes: number
    averageReward: number
    bestReward: number
    explorationRate: number
    learningRate: number
    convergence: number
    status: 'TRAINING' | 'CONVERGED' | 'STALLED'
  }
  environment: {
    stateSpace: number
    actionSpace: number
    rewardFunction: number
    transactionCosts: number
    marketImpact: number
    status: 'SIMULATING' | 'LIVE' | 'BACKTESTING'
  }
  algorithm: {
    type: 'PPO' | 'SAC' | 'A2C' | 'DDPG'
    performance: number
    stability: number
    sampleEfficiency: number
    hyperparameters: number
    status: 'OPTIMIZED' | 'TUNING' | 'EXPLORING'
  }
  performance: {
    sharpeRatio: number
    sortinoRatio: number
    maxDrawdown: number
    winRate: number
    profitFactor: number
    status: 'IMPROVING' | 'STABLE' | 'DEGRADING'
  }
}

interface DiscoveredStrategy {
  id: string
  name: string
  type: string
  fitness: number
  generation: number
  complexity: number
  riskAdjustedReturn: number
  winRate: number
  maxDrawdown: number
  economicRationale: string
  status: 'CANDIDATE' | 'TESTING' | 'VALIDATED' | 'DEPLOYED'
  parameters: Record<string, any>
}

interface TrainingProgress {
  timestamp: string
  episode: number
  reward: number
  fitness: number
  bestFitness: number
  explorationRate: number
  convergence: number
}

export default function StrategyDiscoveryEngine() {
  const [gpMetrics, setGpMetrics] = useState<GeneticProgrammingMetrics>({
    population: {
      totalStrategies: 1000,
      activeStrategies: 847,
      diversity: 0.73,
      averageFitness: 0.68,
      bestFitness: 0.92,
      generation: 156,
      status: 'EVOLVING'
    },
    evolution: {
      crossoverRate: 0.85,
      mutationRate: 0.15,
      selectionPressure: 0.78,
      elitismRate: 0.10,
      tournamentSize: 5,
      status: 'ACTIVE'
    },
    fitness: {
      riskAdjustedReturns: 0.89,
      robustness: 0.82,
      complexity: 0.65,
      economicRationale: 0.78,
      transactionCosts: 0.91,
      status: 'CALCULATING'
    },
    overfitting: {
      outOfSampleTest: 0.87,
      crossValidation: 0.84,
      regimeTesting: 0.79,
      complexityPenalty: 0.88,
      economicValidation: 0.85,
      status: 'MONITORING'
    }
  })

  const [rlMetrics, setRlMetrics] = useState<ReinforcementLearningMetrics>({
    training: {
      episodes: 12500,
      averageReward: 0.73,
      bestReward: 0.91,
      explorationRate: 0.15,
      learningRate: 0.001,
      convergence: 0.82,
      status: 'TRAINING'
    },
    environment: {
      stateSpace: 247,
      actionSpace: 18,
      rewardFunction: 0.88,
      transactionCosts: 0.92,
      marketImpact: 0.85,
      status: 'SIMULATING'
    },
    algorithm: {
      type: 'PPO',
      performance: 0.86,
      stability: 0.79,
      sampleEfficiency: 0.83,
      hyperparameters: 0.91,
      status: 'OPTIMIZED'
    },
    performance: {
      sharpeRatio: 2.34,
      sortinoRatio: 2.87,
      maxDrawdown: -0.082,
      winRate: 0.684,
      profitFactor: 1.92,
      status: 'IMPROVING'
    }
  })

  const [discoveredStrategies, setDiscoveredStrategies] = useState<DiscoveredStrategy[]>([
    {
      id: '1',
      name: 'Volatility Mean Reversion v2',
      type: 'VOLATILITY_TRADING',
      fitness: 0.92,
      generation: 142,
      complexity: 0.68,
      riskAdjustedReturn: 0.89,
      winRate: 0.724,
      maxDrawdown: -0.068,
      economicRationale: 'Exploits volatility clustering and mean reversion patterns',
      status: 'VALIDATED',
      parameters: {
        lookbackPeriod: 14,
        entryThreshold: 1.5,
        exitThreshold: 0.5,
        positionSize: 0.15
      }
    },
    {
      id: '2',
      name: 'Skew Arbitrage Adaptive',
      type: 'SKEW_TRADING',
      fitness: 0.88,
      generation: 138,
      complexity: 0.72,
      riskAdjustedReturn: 0.85,
      winRate: 0.689,
      maxDrawdown: -0.074,
      economicRationale: 'Dynamically adjusts to changing skew dynamics',
      status: 'TESTING',
      parameters: {
        skewWindow: 20,
        hedgeRatio: 0.85,
        rebalanceThreshold: 0.1
      }
    },
    {
      id: '3',
      name: 'Liquidity Provider v3',
      type: 'MARKET_MAKING',
      fitness: 0.85,
      generation: 129,
      complexity: 0.81,
      riskAdjustedReturn: 0.82,
      winRate: 0.767,
      maxDrawdown: -0.045,
      economicRationale: 'Optimal bid-ask spread based on volatility',
      status: 'CANDIDATE',
      parameters: {
        spreadMultiplier: 1.2,
        inventoryLimit: 0.3,
        volatilityWindow: 10
      }
    }
  ])

  const [trainingProgress, setTrainingProgress] = useState<TrainingProgress[]>([
    {
      timestamp: new Date(Date.now() - 10 * 1000).toISOString(),
      episode: 12490,
      reward: 0.71,
      fitness: 0.68,
      bestFitness: 0.91,
      explorationRate: 0.16,
      convergence: 0.81
    },
    {
      timestamp: new Date(Date.now() - 5 * 1000).toISOString(),
      episode: 12495,
      reward: 0.73,
      fitness: 0.70,
      bestFitness: 0.91,
      explorationRate: 0.15,
      convergence: 0.82
    },
    {
      timestamp: new Date().toISOString(),
      episode: 12500,
      reward: 0.73,
      fitness: 0.72,
      bestFitness: 0.91,
      explorationRate: 0.15,
      convergence: 0.82
    }
  ])

  const [isTraining, setIsTraining] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (!isTraining) return

    const interval = setInterval(() => {
      // Simulate training progress
      setRlMetrics(prev => ({
        ...prev,
        training: {
          ...prev.training,
          episodes: prev.training.episodes + 5,
          averageReward: Math.max(0, Math.min(1, prev.training.averageReward + (Math.random() - 0.5) * 0.02)),
          explorationRate: Math.max(0.01, prev.training.explorationRate - 0.001),
          convergence: Math.max(0, Math.min(1, prev.training.convergence + (Math.random() - 0.5) * 0.01))
        }
      }))

      setGpMetrics(prev => ({
        ...prev,
        population: {
          ...prev.population,
          generation: prev.population.generation + 1,
          averageFitness: Math.max(0, Math.min(1, prev.population.averageFitness + (Math.random() - 0.5) * 0.01)),
          bestFitness: Math.max(0, Math.min(1, prev.population.bestFitness + (Math.random() - 0.5) * 0.005))
        }
      }))

      setTrainingProgress(prev => {
        const newProgress = [...prev.slice(-9), {
          timestamp: new Date().toISOString(),
          episode: prev[prev.length - 1].episode + 5,
          reward: Math.max(0, Math.min(1, prev[prev.length - 1].reward + (Math.random() - 0.5) * 0.02)),
          fitness: Math.max(0, Math.min(1, prev[prev.length - 1].fitness + (Math.random() - 0.5) * 0.01)),
          bestFitness: prev[prev.length - 1].bestFitness,
          explorationRate: Math.max(0.01, prev[prev.length - 1].explorationRate - 0.001),
          convergence: Math.max(0, Math.min(1, prev[prev.length - 1].convergence + (Math.random() - 0.5) * 0.01))
        }]
        return newProgress
      })

      setLastUpdate(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [isTraining])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': case 'EVOLVING': case 'TRAINING': case 'OPTIMIZED': case 'IMPROVING': case 'CALCULATING': case 'MONITORING': case 'SIMULATING': case 'DEPLOYED':
        return 'bg-green-500'
      case 'PAUSED': case 'CONVERGED': case 'STABLE': case 'VALIDATED':
        return 'bg-yellow-500'
      case 'ERROR': case 'FAILED': case 'STALLED': case 'DEGRADING':
        return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': case 'EVOLVING': case 'TRAINING': case 'OPTIMIZED': case 'IMPROVING': case 'CALCULATING': case 'MONITORING': case 'SIMULATING': case 'DEPLOYED':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'PAUSED': case 'CONVERGED': case 'STABLE': case 'VALIDATED':
        return <RefreshCw className="w-4 h-4 text-yellow-600 animate-spin" />
      case 'ERROR': case 'FAILED': case 'STALLED': case 'DEGRADING':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getStrategyStatusColor = (status: string) => {
    switch (status) {
      case 'DEPLOYED': return 'text-green-600'
      case 'VALIDATED': return 'text-blue-600'
      case 'TESTING': return 'text-yellow-600'
      case 'CANDIDATE': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`
  }

  const formatNumber = (value: number) => {
    return value.toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Strategy Discovery Engine</h2>
          <p className="text-muted-foreground">Genetic Programming & Reinforcement Learning</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="w-3 h-3 mr-1" />
            {isTraining ? 'Training' : 'Paused'}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsTraining(!isTraining)}
          >
            {isTraining ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isTraining ? 'Pause' : 'Resume'}
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Badge variant="outline">
            Last Update: {lastUpdate.toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* Discovery Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Strategy Discovery Overview
          </CardTitle>
          <CardDescription>
            Real-time genetic programming and reinforcement learning progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Total Strategies</div>
              <div className="text-lg font-semibold">{formatNumber(gpMetrics.population.totalStrategies)}</div>
              <div className="text-xs text-muted-foreground">GP Population</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Best Fitness</div>
              <div className="text-lg font-semibold text-green-600">{formatPercentage(gpMetrics.population.bestFitness)}</div>
              <div className="text-xs text-muted-foreground">Generation {gpMetrics.population.generation}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">RL Episodes</div>
              <div className="text-lg font-semibold">{formatNumber(rlMetrics.training.episodes)}</div>
              <div className="text-xs text-muted-foreground">{rlMetrics.algorithm.type}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Best Reward</div>
              <div className="text-lg font-semibold text-blue-600">{formatPercentage(rlMetrics.training.bestReward)}</div>
              <div className="text-xs text-muted-foreground">Convergence {formatPercentage(rlMetrics.training.convergence)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Discovery Methods */}
      <Tabs defaultValue="genetic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="genetic">Genetic Programming</TabsTrigger>
          <TabsTrigger value="reinforcement">Reinforcement Learning</TabsTrigger>
        </TabsList>

        <TabsContent value="genetic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Population */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Population Management
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(gpMetrics.population.status)}
                  <Badge variant="outline" className={getStatusColor(gpMetrics.population.status)}>
                    {gpMetrics.population.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Active Strategies</span>
                    <span>{formatNumber(gpMetrics.population.activeStrategies)}</span>
                  </div>
                  <Progress value={(gpMetrics.population.activeStrategies / gpMetrics.population.totalStrategies) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Population Diversity</span>
                    <span>{formatPercentage(gpMetrics.population.diversity)}</span>
                  </div>
                  <Progress value={gpMetrics.population.diversity * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Average Fitness</span>
                    <span>{formatPercentage(gpMetrics.population.averageFitness)}</span>
                  </div>
                  <Progress value={gpMetrics.population.averageFitness * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Best Fitness</span>
                    <span>{formatPercentage(gpMetrics.population.bestFitness)}</span>
                  </div>
                  <Progress value={gpMetrics.population.bestFitness * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Evolution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  Evolution Parameters
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(gpMetrics.evolution.status)}
                  <Badge variant="outline" className={getStatusColor(gpMetrics.evolution.status)}>
                    {gpMetrics.evolution.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Crossover Rate</span>
                    <span>{formatPercentage(gpMetrics.evolution.crossoverRate)}</span>
                  </div>
                  <Progress value={gpMetrics.evolution.crossoverRate * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Mutation Rate</span>
                    <span>{formatPercentage(gpMetrics.evolution.mutationRate)}</span>
                  </div>
                  <Progress value={gpMetrics.evolution.mutationRate * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Selection Pressure</span>
                    <span>{formatPercentage(gpMetrics.evolution.selectionPressure)}</span>
                  </div>
                  <Progress value={gpMetrics.evolution.selectionPressure * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Elitism Rate</span>
                    <span>{formatPercentage(gpMetrics.evolution.elitismRate)}</span>
                  </div>
                  <Progress value={gpMetrics.evolution.elitismRate * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Fitness */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Fitness Function
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(gpMetrics.fitness.status)}
                  <Badge variant="outline" className={getStatusColor(gpMetrics.fitness.status)}>
                    {gpMetrics.fitness.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Risk-Adjusted Returns</span>
                    <span>{formatPercentage(gpMetrics.fitness.riskAdjustedReturns)}</span>
                  </div>
                  <Progress value={gpMetrics.fitness.riskAdjustedReturns * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Robustness</span>
                    <span>{formatPercentage(gpMetrics.fitness.robustness)}</span>
                  </div>
                  <Progress value={gpMetrics.fitness.robustness * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Complexity</span>
                    <span>{formatPercentage(gpMetrics.fitness.complexity)}</span>
                  </div>
                  <Progress value={gpMetrics.fitness.complexity * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Economic Rationale</span>
                    <span>{formatPercentage(gpMetrics.fitness.economicRationale)}</span>
                  </div>
                  <Progress value={gpMetrics.fitness.economicRationale * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Overfitting Prevention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Overfitting Prevention
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(gpMetrics.overfitting.status)}
                  <Badge variant="outline" className={getStatusColor(gpMetrics.overfitting.status)}>
                    {gpMetrics.overfitting.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Out-of-Sample Test</span>
                    <span>{formatPercentage(gpMetrics.overfitting.outOfSampleTest)}</span>
                  </div>
                  <Progress value={gpMetrics.overfitting.outOfSampleTest * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Cross-Validation</span>
                    <span>{formatPercentage(gpMetrics.overfitting.crossValidation)}</span>
                  </div>
                  <Progress value={gpMetrics.overfitting.crossValidation * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Regime Testing</span>
                    <span>{formatPercentage(gpMetrics.overfitting.regimeTesting)}</span>
                  </div>
                  <Progress value={gpMetrics.overfitting.regimeTesting * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Economic Validation</span>
                    <span>{formatPercentage(gpMetrics.overfitting.economicValidation)}</span>
                  </div>
                  <Progress value={gpMetrics.overfitting.economicValidation * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reinforcement" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Training */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Training Progress
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(rlMetrics.training.status)}
                  <Badge variant="outline" className={getStatusColor(rlMetrics.training.status)}>
                    {rlMetrics.training.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Episodes</span>
                    <span>{formatNumber(rlMetrics.training.episodes)}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Average Reward</span>
                    <span>{formatPercentage(rlMetrics.training.averageReward)}</span>
                  </div>
                  <Progress value={rlMetrics.training.averageReward * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Best Reward</span>
                    <span>{formatPercentage(rlMetrics.training.bestReward)}</span>
                  </div>
                  <Progress value={rlMetrics.training.bestReward * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Exploration Rate</span>
                    <span>{formatPercentage(rlMetrics.training.explorationRate)}</span>
                  </div>
                  <Progress value={rlMetrics.training.explorationRate * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Convergence</span>
                    <span>{formatPercentage(rlMetrics.training.convergence)}</span>
                  </div>
                  <Progress value={rlMetrics.training.convergence * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Environment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  Trading Environment
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(rlMetrics.environment.status)}
                  <Badge variant="outline" className={getStatusColor(rlMetrics.environment.status)}>
                    {rlMetrics.environment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>State Space</span>
                    <span>{formatNumber(rlMetrics.environment.stateSpace)}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Action Space</span>
                    <span>{formatNumber(rlMetrics.environment.actionSpace)}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Reward Function</span>
                    <span>{formatPercentage(rlMetrics.environment.rewardFunction)}</span>
                  </div>
                  <Progress value={rlMetrics.environment.rewardFunction * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Transaction Costs</span>
                    <span>{formatPercentage(rlMetrics.environment.transactionCosts)}</span>
                  </div>
                  <Progress value={rlMetrics.environment.transactionCosts * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Market Impact</span>
                    <span>{formatPercentage(rlMetrics.environment.marketImpact)}</span>
                  </div>
                  <Progress value={rlMetrics.environment.marketImpact * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Algorithm */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Algorithm Configuration
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(rlMetrics.algorithm.status)}
                  <Badge variant="outline" className={getStatusColor(rlMetrics.algorithm.status)}>
                    {rlMetrics.algorithm.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Algorithm Type</span>
                    <span>{rlMetrics.algorithm.type}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Performance</span>
                    <span>{formatPercentage(rlMetrics.algorithm.performance)}</span>
                  </div>
                  <Progress value={rlMetrics.algorithm.performance * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Stability</span>
                    <span>{formatPercentage(rlMetrics.algorithm.stability)}</span>
                  </div>
                  <Progress value={rlMetrics.algorithm.stability * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Sample Efficiency</span>
                    <span>{formatPercentage(rlMetrics.algorithm.sampleEfficiency)}</span>
                  </div>
                  <Progress value={rlMetrics.algorithm.sampleEfficiency * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Hyperparameters</span>
                    <span>{formatPercentage(rlMetrics.algorithm.hyperparameters)}</span>
                  </div>
                  <Progress value={rlMetrics.algorithm.hyperparameters * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Performance Metrics
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(rlMetrics.performance.status)}
                  <Badge variant="outline" className={getStatusColor(rlMetrics.performance.status)}>
                    {rlMetrics.performance.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Sharpe Ratio</span>
                    <span>{rlMetrics.performance.sharpeRatio.toFixed(2)}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Sortino Ratio</span>
                    <span>{rlMetrics.performance.sortinoRatio.toFixed(2)}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Max Drawdown</span>
                    <span>{formatPercentage(rlMetrics.performance.maxDrawdown)}</span>
                  </div>
                  <Progress value={Math.abs(rlMetrics.performance.maxDrawdown) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Win Rate</span>
                    <span>{formatPercentage(rlMetrics.performance.winRate)}</span>
                  </div>
                  <Progress value={rlMetrics.performance.winRate * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Profit Factor</span>
                    <span>{rlMetrics.performance.profitFactor.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Discovered Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Discovered Strategies
          </CardTitle>
          <CardDescription>
            Top-performing strategies discovered by the AI engine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {discoveredStrategies.map((strategy) => (
              <div key={strategy.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{strategy.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {strategy.type}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getStrategyStatusColor(strategy.status)}`}>
                        {strategy.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{strategy.economicRationale}</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Fitness</div>
                        <div className="font-semibold text-green-600">{formatPercentage(strategy.fitness)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Generation</div>
                        <div className="font-semibold">{strategy.generation}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Win Rate</div>
                        <div className="font-semibold">{formatPercentage(strategy.winRate)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Max DD</div>
                        <div className="font-semibold text-red-600">{formatPercentage(strategy.maxDrawdown)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Complexity</div>
                        <div className="font-semibold">{formatPercentage(strategy.complexity)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Training Progress
          </CardTitle>
          <CardDescription>
            Real-time training metrics and convergence tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Current Episode</div>
                <div className="text-lg font-semibold">{formatNumber(trainingProgress[trainingProgress.length - 1]?.episode || 0)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Current Reward</div>
                <div className="text-lg font-semibold text-blue-600">{formatPercentage(trainingProgress[trainingProgress.length - 1]?.reward || 0)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Best Fitness</div>
                <div className="text-lg font-semibold text-green-600">{formatPercentage(trainingProgress[trainingProgress.length - 1]?.bestFitness || 0)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Exploration Rate</div>
                <div className="text-lg font-semibold">{formatPercentage(trainingProgress[trainingProgress.length - 1]?.explorationRate || 0)}</div>
              </div>
            </div>
            <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                <p>Training Progress Visualization</p>
                <p className="text-sm">Episode vs Reward/Fitness</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Convergence Alert */}
      {rlMetrics.training.convergence > 0.95 && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            High convergence detected ({formatPercentage(rlMetrics.training.convergence)}). 
            Consider reducing exploration rate or adjusting learning parameters.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}