'use client'

import { motion } from 'framer-motion'
import { 
  Thermometer, 
  Droplets, 
  Zap, 
  AlertTriangle, 
  Activity,
  Brain,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'
import type { SensorData, AIAnalysis } from '@/hooks/use-sensor-simulation'

interface MetricsPanelProps {
  sensorData: SensorData | null
  aiAnalysis: AIAnalysis | null
}

interface MetricCardProps {
  title: string
  value: string | number
  unit: string
  icon: React.ReactNode
  status: 'normal' | 'warning' | 'critical'
  trend?: 'up' | 'down' | 'stable'
  subtitle?: string
}

function MetricCard({ title, value, unit, icon, status, trend, subtitle }: MetricCardProps) {
  const statusColors = {
    normal: 'border-neon-green/30 bg-neon-green/5',
    warning: 'border-neon-yellow/30 bg-neon-yellow/5',
    critical: 'border-neon-red/30 bg-neon-red/5',
  }

  const statusGlow = {
    normal: 'glow-green',
    warning: 'glow-yellow',
    critical: 'glow-red',
  }

  const valueColors = {
    normal: 'text-neon-green',
    warning: 'text-neon-yellow',
    critical: 'text-neon-red',
  }

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus

  return (
    <motion.div
      className={`glass rounded-xl p-4 lg:p-5 border ${statusColors[status]} ${status === 'critical' ? 'animate-pulse-glow' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${statusColors[status]} ${statusGlow[status]}`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${valueColors[status]}`}>
            <TrendIcon className="w-3 h-3" />
            <span>{trend === 'up' ? 'Subiendo' : trend === 'down' ? 'Bajando' : 'Estable'}</span>
          </div>
        )}
      </div>
      
      <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
      
      <div className="flex items-baseline gap-1">
        <motion.span
          key={value}
          className={`text-2xl lg:text-3xl font-bold font-mono ${valueColors[status]}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </motion.span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
      )}
    </motion.div>
  )
}

export function MetricsPanel({ sensorData, aiAnalysis }: MetricsPanelProps) {
  if (!sensorData) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass rounded-xl p-5 animate-pulse">
            <div className="h-8 w-8 bg-muted rounded-lg mb-3" />
            <div className="h-4 w-20 bg-muted rounded mb-2" />
            <div className="h-8 w-16 bg-muted rounded" />
          </div>
        ))}
      </div>
    )
  }

  const getTempStatus = (temp: number): 'normal' | 'warning' | 'critical' => {
    if (temp > 35) return 'critical'
    if (temp > 30) return 'warning'
    return 'normal'
  }

  const getHumidityStatus = (humidity: number): 'normal' | 'warning' | 'critical' => {
    if (humidity > 70 || humidity < 25) return 'warning'
    return 'normal'
  }

  const getPowerStatus = (power: number): 'normal' | 'warning' | 'critical' => {
    if (power > 4000) return 'critical'
    if (power > 3500) return 'warning'
    return 'normal'
  }

  const getRiskStatus = (risk: string): 'normal' | 'warning' | 'critical' => {
    if (risk === 'critical' || risk === 'high') return 'critical'
    if (risk === 'medium') return 'warning'
    return 'normal'
  }

  const riskLabels = {
    low: 'Bajo',
    medium: 'Medio',
    high: 'Alto',
    critical: 'Crítico',
  }

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        Panel de Métricas en Tiempo Real
      </h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Temperatura"
          value={sensorData.temperature}
          unit="°C"
          icon={<Thermometer className="w-5 h-5 text-neon-red" />}
          status={getTempStatus(sensorData.temperature)}
          trend={aiAnalysis?.trend}
          subtitle="Sensor ambiental"
        />
        
        <MetricCard
          title="Humedad"
          value={sensorData.humidity}
          unit="%"
          icon={<Droplets className="w-5 h-5 text-neon-blue" />}
          status={getHumidityStatus(sensorData.humidity)}
          subtitle="Humedad relativa"
        />
        
        <MetricCard
          title="Consumo Eléctrico"
          value={sensorData.powerConsumption}
          unit="W"
          icon={<Zap className="w-5 h-5 text-neon-yellow" />}
          status={getPowerStatus(sensorData.powerConsumption)}
          trend={aiAnalysis?.trend}
          subtitle="Potencia activa"
        />
        
        <MetricCard
          title="Nivel de Riesgo"
          value={riskLabels[sensorData.riskLevel]}
          unit=""
          icon={<AlertTriangle className="w-5 h-5 text-neon-yellow" />}
          status={getRiskStatus(sensorData.riskLevel)}
          subtitle={`${aiAnalysis?.riskProbability?.toFixed(0) ?? 0}% probabilidad`}
        />
        
        <MetricCard
          title="Estado del Sistema"
          value={sensorData.systemStatus === 'online' ? 'Operativo' : 'Alerta'}
          unit=""
          icon={<Activity className="w-5 h-5 text-neon-green" />}
          status={sensorData.systemStatus === 'online' ? 'normal' : 'warning'}
          subtitle="Monitoreo 24/7"
        />
        
        <MetricCard
          title="Predicción IA"
          value={aiAnalysis?.prediction ?? '---'}
          unit="W"
          icon={<Brain className="w-5 h-5 text-primary" />}
          status="normal"
          subtitle={`${aiAnalysis?.confidence?.toFixed(0) ?? 0}% confianza`}
        />
      </div>
    </section>
  )
}
