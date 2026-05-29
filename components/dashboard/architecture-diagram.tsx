'use client'

import { motion } from 'framer-motion'
import { 
  Cpu, 
  Database, 
  Brain, 
  Monitor, 
  Bell,
  Radio,
  ArrowDown,
  Server
} from 'lucide-react'

const architectureSteps = [
  {
    id: 1,
    title: 'Sensores Virtuales',
    description: 'Generación de datos simulados',
    icon: Radio,
    color: '#00d4ff',
  },
  {
    id: 2,
    title: 'Procesamiento IoT',
    description: 'Gateway y protocolo de comunicación',
    icon: Cpu,
    color: '#4ecdc4',
  },
  {
    id: 3,
    title: 'Supabase',
    description: 'Base de datos PostgreSQL',
    icon: Database,
    color: '#3ecf8e',
  },
  {
    id: 4,
    title: 'Motor IA',
    description: 'Análisis predictivo y detección',
    icon: Brain,
    color: '#00ff88',
  },
  {
    id: 5,
    title: 'Dashboard Inteligente',
    description: 'Visualización en tiempo real',
    icon: Monitor,
    color: '#00d4ff',
  },
  {
    id: 6,
    title: 'Alertas Inteligentes',
    description: 'Notificaciones automáticas',
    icon: Bell,
    color: '#ff6b6b',
  },
]

export function ArchitectureDiagram() {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Server className="w-5 h-5 text-primary" />
        Arquitectura del Sistema
      </h2>

      <div className="glass rounded-xl p-6 border border-border/50">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {architectureSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.id} className="flex flex-col items-center">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Connection line for desktop */}
                  {index < architectureSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2 z-0">
                      <motion.div
                        className="h-full bg-gradient-to-r from-current to-transparent"
                        style={{ color: step.color }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                      />
                      <motion.div
                        className="absolute top-1/2 left-0 w-2 h-2 rounded-full -translate-y-1/2"
                        style={{ backgroundColor: step.color }}
                        animate={{ 
                          x: [0, 60, 0],
                          opacity: [1, 0.5, 1]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: index * 0.3 
                        }}
                      />
                    </div>
                  )}

                  {/* Node */}
                  <motion.div
                    className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center border-2"
                    style={{ 
                      borderColor: step.color,
                      backgroundColor: `${step.color}15`,
                      boxShadow: `0 0 20px ${step.color}30`
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: `0 0 30px ${step.color}50`
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${step.color}30`,
                        `0 0 30px ${step.color}50`,
                        `0 0 20px ${step.color}30`,
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Icon className="w-8 h-8" style={{ color: step.color }} />
                  </motion.div>

                  {/* Mobile connection arrow */}
                  {index < architectureSteps.length - 1 && (
                    <motion.div
                      className="lg:hidden flex justify-center my-2"
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  )}
                </motion.div>

                <motion.div
                  className="text-center mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Data Flow Animation */}
        <motion.div
          className="mt-8 pt-6 border-t border-border/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-3">Flujo de Datos en Tiempo Real</div>
            <div className="relative h-8 rounded-lg bg-secondary/30 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary/60 via-accent/60 to-transparent"
                animate={{ x: ['-100%', '400%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                Datos → Procesamiento → Análisis → Visualización → Acción
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
