'use client'

import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Target, 
  Lightbulb, 
  Cpu, 
  Brain, 
  Zap,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const features = [
  {
    icon: Cpu,
    title: 'Internet de las Cosas (IoT)',
    description: 'Simulación de sensores inteligentes que capturan datos ambientales y energéticos en tiempo real.',
    color: '#00d4ff',
  },
  {
    icon: Brain,
    title: 'Inteligencia Artificial',
    description: 'Algoritmos predictivos que analizan patrones y detectan anomalías automáticamente.',
    color: '#00ff88',
  },
  {
    icon: Zap,
    title: 'Monitoreo Energético',
    description: 'Seguimiento continuo del consumo eléctrico con visualización en tiempo real.',
    color: '#ffd93d',
  },
]

const objectives = [
  'Demostrar la integración de IoT con sistemas de IA',
  'Implementar monitoreo en tiempo real de variables energéticas',
  'Desarrollar algoritmos de predicción y detección de anomalías',
  'Crear un dashboard interactivo y visualmente atractivo',
  'Simular un entorno de producción industrial real',
]

export function AcademicSection() {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-primary" />
        Presentación Académica
      </h2>

      <div className="glass rounded-xl p-6 border border-primary/30">
        {/* Project Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-primary text-glow-cyan mb-2">
            SmartEnergy AI
          </h3>
          <p className="text-lg text-foreground mb-4">
            Sistema Inteligente de Monitoreo y Predicción Energética
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Proyecto académico que demuestra la convergencia de tecnologías emergentes: 
            Internet de las Cosas (IoT), Inteligencia Artificial y Análisis de Datos 
            aplicados al monitoreo y optimización del consumo energético.
          </p>
        </motion.div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="p-5 rounded-lg bg-neon-red/5 border border-neon-red/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-neon-red" />
              <h4 className="font-semibold text-neon-red">Problemática</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              El consumo energético ineficiente representa un desafío significativo tanto 
              económico como ambiental. La falta de monitoreo en tiempo real y sistemas 
              predictivos dificulta la optimización del uso de energía y la detección 
              temprana de anomalías que pueden resultar en desperdicios o fallas.
            </p>
          </motion.div>

          <motion.div
            className="p-5 rounded-lg bg-neon-green/5 border border-neon-green/30"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-neon-green" />
              <h4 className="font-semibold text-neon-green">Solución Propuesta</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              SmartEnergy AI integra sensores IoT virtuales con un motor de IA para 
              proporcionar monitoreo en tiempo real, análisis predictivo y alertas 
              automáticas. El sistema permite identificar patrones de consumo, predecir 
              picos de demanda y detectar anomalías antes de que se conviertan en problemas.
            </p>
          </motion.div>
        </div>

        {/* Key Features */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-sm font-semibold text-foreground mb-4 text-center">
            Tecnologías Implementadas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  className="p-4 rounded-lg bg-secondary/30 border border-border/50 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: feature.color }}
                >
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h5 className="font-semibold text-foreground mb-2">{feature.title}</h5>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Objectives */}
        <motion.div
          className="p-5 rounded-lg bg-primary/5 border border-primary/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h4 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Objetivos del Proyecto
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.05 }}
              >
                <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
                <span>{objective}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact */}
        <motion.div
          className="mt-6 pt-6 border-t border-border/50 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h4 className="text-sm font-semibold text-foreground mb-3">Impacto Tecnológico</h4>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ArrowRight className="w-3 h-3 text-primary" />
              Eficiencia energética mejorada
            </span>
            <span className="flex items-center gap-1">
              <ArrowRight className="w-3 h-3 text-primary" />
              Reducción de costos operativos
            </span>
            <span className="flex items-center gap-1">
              <ArrowRight className="w-3 h-3 text-primary" />
              Mantenimiento predictivo
            </span>
            <span className="flex items-center gap-1">
              <ArrowRight className="w-3 h-3 text-primary" />
              Toma de decisiones informada
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
