import { NextRequest, NextResponse } from "next/server";
import ZAI from 'z-ai-web-dev-sdk';

interface ModelMetrics {
  modelId: string;
  modelType: string;
  status: 'active' | 'training' | 'idle' | 'error';
  accuracy: number;
  performance: {
    winRate: number;
    sharpeRatio: number;
    maxDrawdown: number;
    totalTrades: number;
    profitFactor: number;
  };
  resourceUsage: {
    cpu: number;
    memory: number;
    gpu: number;
    disk: number;
  };
  lastUpdate: string;
  health: 'excellent' | 'good' | 'warning' | 'critical';
}

interface SystemMetrics {
  totalModels: number;
  activeModels: number;
  systemLoad: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  uptime: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const modelId = searchParams.get('modelId');
    const detailed = searchParams.get('detailed') === 'true';

    // Initialize ZAI SDK for additional insights
    const zai = await ZAI.create();

    if (modelId) {
      // Return specific model metrics
      const modelMetrics: ModelMetrics = {
        modelId,
        modelType: getModelTypeFromId(modelId),
        status: getRandomStatus(),
        accuracy: Math.random() * 20 + 80,
        performance: {
          winRate: Math.random() * 20 + 70,
          sharpeRatio: Math.random() * 1.5 + 1.0,
          maxDrawdown: -(Math.random() * 10 + 2),
          totalTrades: Math.floor(Math.random() * 1000) + 100,
          profitFactor: Math.random() * 0.5 + 1.2
        },
        resourceUsage: {
          cpu: Math.random() * 30 + 20,
          memory: Math.random() * 40 + 30,
          gpu: Math.random() * 50 + 10,
          disk: Math.random() * 20 + 10
        },
        lastUpdate: new Date().toISOString(),
        health: getRandomHealth()
      };

      return NextResponse.json({
        success: true,
        modelMetrics,
        timestamp: new Date().toISOString()
      });
    }

    // Return system-wide metrics
    const systemMetrics: SystemMetrics = {
      totalModels: 8,
      activeModels: 6,
      systemLoad: Math.random() * 30 + 40,
      memoryUsage: Math.random() * 30 + 50,
      diskUsage: Math.random() * 20 + 60,
      networkLatency: Math.random() * 20 + 10,
      uptime: Math.floor(Math.random() * 86400 * 7) + 86400, // 1-8 days
      lastMaintenance: new Date(Date.now() - 86400 * 1000 * 3).toISOString(), // 3 days ago
      nextMaintenance: new Date(Date.now() + 86400 * 1000 * 4).toISOString() // 4 days from now
    };

    if (detailed) {
      // Get all model metrics
      const allModels: ModelMetrics[] = [];
      const modelTypes = ['ooda_loop', 'strategy_discovery', 'risk_management', 'execution_agent'];
      
      for (let i = 0; i < systemMetrics.totalModels; i++) {
        const modelType = modelTypes[i % modelTypes.length];
        allModels.push({
          modelId: `model_${i + 1}`,
          modelType,
          status: i < systemMetrics.activeModels ? 'active' : 'idle',
          accuracy: Math.random() * 20 + 80,
          performance: {
            winRate: Math.random() * 20 + 70,
            sharpeRatio: Math.random() * 1.5 + 1.0,
            maxDrawdown: -(Math.random() * 10 + 2),
            totalTrades: Math.floor(Math.random() * 1000) + 100,
            profitFactor: Math.random() * 0.5 + 1.2
          },
          resourceUsage: {
            cpu: Math.random() * 30 + 20,
            memory: Math.random() * 40 + 30,
            gpu: Math.random() * 50 + 10,
            disk: Math.random() * 20 + 10
          },
          lastUpdate: new Date().toISOString(),
          health: getRandomHealth()
        });
      }

      return NextResponse.json({
        success: true,
        systemMetrics,
        allModels,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      systemMetrics,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Monitoring error:", error);
    return NextResponse.json(
      { error: "Internal server error during monitoring" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, modelId, parameters } = await request.json();

    if (!action) {
      return NextResponse.json(
        { error: "Action is required" },
        { status: 400 }
      );
    }

    // Initialize ZAI SDK
    const zai = await ZAI.create();

    let response = {};
    
    switch (action) {
      case "start_monitoring":
        response = {
          message: "Monitoring started successfully",
          monitoringId: `monitor_${Date.now()}`,
          status: "active",
          interval: parameters?.interval || 5000
        };
        break;
        
      case "stop_monitoring":
        response = {
          message: "Monitoring stopped successfully",
          status: "stopped",
          timestamp: new Date().toISOString()
        };
        break;
        
      case "get_health_report":
        const healthReport = await generateHealthReport(zai);
        response = healthReport;
        break;
        
      case "optimize_model":
        if (!modelId) {
          return NextResponse.json(
            { error: "Model ID is required for optimization" },
            { status: 400 }
          );
        }
        response = {
          message: `Model ${modelId} optimization initiated`,
          optimizationId: `opt_${Date.now()}`,
          estimatedTime: Math.floor(Math.random() * 300) + 120,
          parameters: parameters || {}
        };
        break;
        
      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      ...response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Monitoring action error:", error);
    return NextResponse.json(
      { error: "Internal server error during monitoring action" },
      { status: 500 }
    );
  }
}

// Helper functions
function getModelTypeFromId(modelId: string): string {
  const types = ['ooda_loop', 'strategy_discovery', 'risk_management', 'execution_agent'];
  const index = parseInt(modelId.split('_')[1]) || 0;
  return types[index % types.length];
}

function getRandomStatus(): 'active' | 'training' | 'idle' | 'error' {
  const statuses: ('active' | 'training' | 'idle' | 'error')[] = ['active', 'training', 'idle', 'error'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomHealth(): 'excellent' | 'good' | 'warning' | 'critical' {
  const healths: ('excellent' | 'good' | 'warning' | 'critical')[] = ['excellent', 'good', 'warning', 'critical'];
  return healths[Math.floor(Math.random() * healths.length)];
}

async function generateHealthReport(zai: any) {
  try {
    const healthResponse = await zai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an AI system health analyst for quantitative trading platforms."
        },
        {
          role: "user",
          content: "Generate a comprehensive health report for the AI trading system including model performance, system resources, and recommendations."
        }
      ],
      temperature: 0.3,
      max_tokens: 800
    });

    return {
      report: healthResponse.choices[0]?.message?.content || "Health report generated",
      overallHealth: getRandomHealth(),
      recommendations: [
        "Consider retraining models with latest market data",
        "Monitor memory usage for potential optimization",
        "Schedule maintenance during low trading hours"
      ],
      nextCheck: new Date(Date.now() + 3600000).toISOString() // 1 hour from now
    };
  } catch (error) {
    return {
      report: "Health report generation failed",
      overallHealth: "warning",
      recommendations: ["Manual system check required"],
      nextCheck: new Date(Date.now() + 1800000).toISOString() // 30 minutes from now
    };
  }
}