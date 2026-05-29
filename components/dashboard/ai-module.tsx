'use client'

import { motion } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Activity,
  Gauge
} from 'lucide-react'
import type { AIAnalysis, SensorData } from '@/hooks/use-sensor-simulation'

interface AIModuleProps {
  aiAnalysis: AIAnalysis | null
  sensorData: SensorData | null
}

export function AIModule({ aiAnalysis, sensorData }: AIModuleProps) {
  if (!aiAnalysis || !sensorData) {
    return (
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Motor de Inteligencia Artificial
        </h2>
        <div className="glass rounded-xl p-8 flex items-center justify-center">
          <div className="text-muted-foreground">Inicializando módulo IA...</div>
        </div>
      </section>
    )
  }

  const TrendIcon = aiAnalysis.trend === 'up' ? TrendingUp : 
                    aiAnalysis.trend === 'down' ? TrendingDown : Activity

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Motor de Inteligencia Artificial
        </h2>
        
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/30"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Activity className="w-4 h-4 text-neon-green" />
          </motion.div>
          <span className="text-xs font-medium text-neon-green">IA Procesando</span>
        </motion.div>
      </div>

      <div className="glass rounded-xl p-6 border border-primary/30 glow-cyan">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Prediction */}
          <motion.div
            className="text-center p-4 rounded-lg bg-primary/10 border border-primary/30"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-sm text-muted-foreground mb-2">Predicción Próxima</div>
            <motion.div
              key={aiAnalysis.prediction}
              className="text-3xl font-bold font-mono text-primary text-glow-cyan"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {aiAnalysis.prediction.toLocaleString()}
              <span className="text-lg ml-1">W</span>
            </motion.div>
            <div className="text-xs text-muted-foreground mt-1">Consumo esperado</div>
          </motion.div>

          {/* Confidence */}
          <motion.div
            className="text-center p-4 rounded-lg bg-accent/10 border border-accent/30"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-sm text-muted-foreground mb-2">Nivel de Confianza</div>
            <div className="relative w-20 h-20 mx-auto mb-2">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-secondary"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-accent"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: aiAnalysis.confidence / 100 }}
                  transition={{ duration: 1 }}
                  style={{
                    strokeDasharray: `${2 * Math.PI * 35}`,
                    strokeDashoffset: `${2 * Math.PI * 35 * (1 - aiAnalysis.confidence / 100)}`,
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-accent">{aiAnalysis.confidence.toFixed(0)}%</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Precisión del modelo</div>
          </motion.div>

          {/* Trend */}
          <motion.div
            className={`text-center p-4 rounded-lg ${
              aiAnalysis.trend === 'up' ? 'bg-neon-red/10 border-neon-red/30' :
              aiAnalysis.trend === 'down' ? 'bg-neon-green/10 border-neon-green/30' :
              'bg-secondary/50 border-border/50'
            } border`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-sm text-muted-foreground mb-2">Tendencia Actual</div>
            <motion.div
              animate={{ y: aiAnalysis.trend === 'up' ? [-2, 2, -2] : aiAnalysis.trend === 'down' ? [2, -2, 2] : 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex justify-center mb-2"
            >
              <TrendIcon className={`w-12 h-12 ${
                aiAnalysis.trend === 'up' ? 'text-neon-red' :
                aiAnalysis.trend === 'down' ? 'text-neon-green' :
                'text-muted-foreground'
              }`} />
            </motion.div>
            <div className={`text-lg font-bold ${
              aiAnalysis.trend === 'up' ? 'text-neon-red' :
              aiAnalysis.trend === 'down' ? 'text-neon-green' :
              'text-foreground'
            }`}>
              {aiAnalysis.trend === 'up' ? 'Incremento' :
               aiAnalysis.trend === 'down' ? 'Decremento' : 'Estable'}
            </div>
          </motion.div>

          {/* Risk Probability */}
          <motion.div
            className={`text-center p-4 rounded-lg ${
              aiAnalysis.riskProbability > 70 ? 'bg-neon-red/10 border-neon-red/30' :
              aiAnalysis.riskProbability > 40 ? 'bg-neon-yellow/10 border-neon-yellow/30' :
              'bg-neon-green/10 border-neon-green/30'
            } border`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-sm text-muted-foreground mb-2">Probabilidad de Riesgo</div>
            <div className="flex justify-center mb-2">
              <Gauge className={`w-10 h-10 ${
                aiAnalysis.riskProbability > 70 ? 'text-neon-red' :
                aiAnalysis.riskProbability > 40 ? 'text-neon-yellow' :
                'text-neon-green'
              }`} />
            </div>
            <motion.div
              key={aiAnalysis.riskProbability}
              className={`text-2xl font-bold font-mono ${
                aiAnalysis.riskProbability > 70 ? 'text-neon-red' :
                aiAnalysis.riskProbability > 40 ? 'text-neon-yellow' :
                'text-neon-green'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              {aiAnalysis.riskProbability.toFixed(0)}%
            </motion.div>
          </motion.div>
        </div>

        {/* Anomaly Detection & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Anomaly Status */}
          <motion.div
            className={`p-4 rounded-lg border ${
              aiAnalysis.anomalyDetected
                ? 'bg-neon-red/10 border-neon-red/30'
                : 'bg-neon-green/10 border-neon-green/30'
            }`}
            animate={aiAnalysis.anomalyDetected ? { opacity: [1, 0.7, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="flex items-center gap-3 mb-2">
              {aiAnalysis.anomalyDetected ? (
                <AlertTriangle className="w-6 h-6 text-neon-red" />
              ) : (
                <CheckCircle className="w-6 h-6 text-neon-green" />
              )}
              <span className={`font-semibold ${
                aiAnalysis.anomalyDetected ? 'text-neon-red' : 'text-neon-green'
              }`}>
                {aiAnalysis.anomalyDetected ? 'Anomalía Detectada' : 'Sistema Normal'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {aiAnalysis.anomalyDetected
                ? aiAnalysis.anomalyType || 'Se ha detectado un patrón anormal en los datos'
                : 'No se han detectado anomalías en el sistema'}
            </p>
          </motion.div>

          {/* AI Recommendation */}
          <motion.div
            className="p-4 rounded-lg bg-primary/10 border border-primary/30"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              <span className="font-semibold text-primary">Recomendación IA</span>
            </div>
            <p className="text-sm text-muted-foreground">{aiAnalysis.recommendation}</p>
          </motion.div>
        </div>

        {/* AI Status Bar */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Modelo: Neural Network v2.1</span>
              <span>•</span>
              <span>Algoritmo: LSTM Predictivo</span>
              <span>•</span>
              <span>Última actualización: Ahora</span>
            </div>
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-primary">Analizando datos en tiempo real...</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
