'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  XCircle,
  X,
  Clock
} from 'lucide-react'
import type { Alert } from '@/hooks/use-sensor-simulation'

interface AlertsPanelProps {
  alerts: Alert[]
  onDismiss: (id: string) => void
}

const alertStyles = {
  info: {
    bg: 'bg-neon-blue/10',
    border: 'border-neon-blue/30',
    icon: Info,
    iconColor: 'text-neon-blue',
    textColor: 'text-neon-blue',
  },
  warning: {
    bg: 'bg-neon-yellow/10',
    border: 'border-neon-yellow/30',
    icon: AlertTriangle,
    iconColor: 'text-neon-yellow',
    textColor: 'text-neon-yellow',
  },
  error: {
    bg: 'bg-neon-red/10',
    border: 'border-neon-red/30',
    icon: AlertCircle,
    iconColor: 'text-neon-red',
    textColor: 'text-neon-red',
  },
  critical: {
    bg: 'bg-neon-red/20',
    border: 'border-neon-red/50',
    icon: XCircle,
    iconColor: 'text-neon-red',
    textColor: 'text-neon-red',
  },
}

export function AlertsPanel({ alerts, onDismiss }: AlertsPanelProps) {
  const criticalAlerts = alerts.filter(a => a.type === 'critical')
  const warningAlerts = alerts.filter(a => a.type === 'warning' || a.type === 'error')
  const infoAlerts = alerts.filter(a => a.type === 'info')

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Sistema de Alertas Inteligentes
        </h2>
        
        <div className="flex items-center gap-4 text-sm">
          {criticalAlerts.length > 0 && (
            <motion.span
              className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-neon-red/20 text-neon-red"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <XCircle className="w-3.5 h-3.5" />
              {criticalAlerts.length} Críticas
            </motion.span>
          )}
          {warningAlerts.length > 0 && (
            <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-neon-yellow/20 text-neon-yellow">
              <AlertTriangle className="w-3.5 h-3.5" />
              {warningAlerts.length} Advertencias
            </span>
          )}
          <span className="text-muted-foreground">
            {alerts.length} alertas totales
          </span>
        </div>
      </div>

      <div className="glass rounded-xl p-4 border border-border/50 max-h-80 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Bell className="w-12 h-12 mb-3 opacity-30" />
            <p>No hay alertas activas</p>
            <p className="text-sm">El sistema está operando normalmente</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-2">
              {alerts.slice(0, 10).map((alert) => {
                const style = alertStyles[alert.type]
                const Icon = style.icon
                
                return (
                  <motion.div
                    key={alert.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${style.bg} ${style.border} ${
                      alert.type === 'critical' ? 'animate-pulse-glow' : ''
                    }`}
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                    layout
                  >
                    <motion.div
                      animate={alert.type === 'critical' ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Icon className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-medium ${style.textColor}`}>
                          {alert.type === 'critical' ? 'ALERTA CRÍTICA' :
                           alert.type === 'error' ? 'Error' :
                           alert.type === 'warning' ? 'Advertencia' : 'Información'}
                        </span>
                        {alert.sensor && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                            {alert.sensor}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-foreground">{alert.message}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(alert.timestamp).toLocaleTimeString('es-ES')}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onDismiss(alert.id)}
                      className="p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
