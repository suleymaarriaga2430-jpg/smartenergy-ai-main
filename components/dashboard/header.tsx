'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Database, 
  Cpu, 
  Wifi, 
  Clock,
  Zap
} from 'lucide-react'

interface HeaderProps {
  isConnected: boolean
  totalRecords: number
}

export function Header({ isConnected, totalRecords }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <header className="glass-strong sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-cyan">
                <Zap className="w-7 h-7 text-primary-foreground" />
              </div>
            </motion.div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold tracking-tight">
                <span className="text-primary text-glow-cyan">SmartEnergy</span>
                <span className="text-foreground ml-1">AI</span>
              </h1>
              <p className="text-xs lg:text-sm text-muted-foreground">
                Sistema Inteligente de Monitoreo Energético con IoT e IA
              </p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6">
            {/* Clock */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50">
              <Clock className="w-4 h-4 text-primary" />
              <div className="text-right">
                <div className="text-sm font-mono font-semibold text-foreground">
                  {formatTime(currentTime)}
                </div>
                <div className="text-[10px] text-muted-foreground capitalize">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>

            {/* Connection Status */}
            <motion.div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                isConnected ? 'bg-neon-green/10' : 'bg-neon-red/10'
              }`}
              animate={{ opacity: isConnected ? 1 : [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: isConnected ? 0 : Infinity }}
            >
              <Wifi className={`w-4 h-4 ${isConnected ? 'text-neon-green' : 'text-neon-red'}`} />
              <span className={`text-sm font-medium ${isConnected ? 'text-neon-green' : 'text-neon-red'}`}>
                {isConnected ? 'Sistema Online' : 'Reconectando...'}
              </span>
            </motion.div>

            {/* AI Status */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Cpu className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm font-medium text-primary">IA Activa</span>
            </div>

            {/* Database Status */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Database className="w-4 h-4 text-emerald-400" />
              </motion.div>
              <span className="text-sm font-medium text-emerald-400">
                Supabase
              </span>
            </div>

            {/* Activity Indicator */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Activity className="w-4 h-4 text-neon-cyan" />
              </motion.div>
              <span className="text-sm font-mono text-muted-foreground">
                {totalRecords.toLocaleString()} registros
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
