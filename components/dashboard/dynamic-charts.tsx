'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { BarChart3, TrendingUp } from 'lucide-react'
import type { HistoricalData } from '@/hooks/use-sensor-simulation'

interface DynamicChartsProps {
  historicalData: HistoricalData[]
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; dataKey: string; color: string }[]; label?: string }) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="glass-strong rounded-lg p-3 border border-border/50">
      <p className="text-xs text-muted-foreground mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground capitalize">
            {entry.dataKey === 'temperature' ? 'Temperatura' :
             entry.dataKey === 'humidity' ? 'Humedad' :
             entry.dataKey === 'powerConsumption' ? 'Consumo' :
             entry.dataKey === 'aiPrediction' ? 'Predicción IA' : entry.dataKey}:
          </span>
          <span className="font-mono font-semibold text-foreground">
            {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function DynamicCharts({ historicalData }: DynamicChartsProps) {
  const chartData = useMemo(() => {
    return historicalData.slice(-30).map((d, i) => ({
      ...d,
      time: new Date(d.timestamp).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      index: i,
    }))
  }, [historicalData])

  if (chartData.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Gráficas Dinámicas
        </h2>
        <div className="glass rounded-xl p-8 flex items-center justify-center">
          <div className="text-muted-foreground">Cargando datos...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        Gráficas Dinámicas en Tiempo Real
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Temperature Chart */}
        <motion.div
          className="glass rounded-xl p-4 border border-border/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-neon-red" />
            Temperatura vs Tiempo
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.3)" 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ff6b6b"
                  strokeWidth={2}
                  fill="url(#tempGradient)"
                  animationDuration={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Humidity Chart */}
        <motion.div
          className="glass rounded-xl p-4 border border-border/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-neon-blue" />
            Humedad vs Tiempo
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ecdc4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4ecdc4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.3)" 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="humidity"
                  stroke="#4ecdc4"
                  strokeWidth={2}
                  fill="url(#humidityGradient)"
                  animationDuration={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Power Consumption Chart */}
        <motion.div
          className="glass rounded-xl p-4 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-neon-yellow" />
            Consumo Energético vs Tiempo
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffd93d" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ffd93d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.3)" 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="powerConsumption"
                  stroke="#ffd93d"
                  strokeWidth={2}
                  fill="url(#powerGradient)"
                  animationDuration={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Prediction vs Real Chart */}
        <motion.div
          className="glass rounded-xl p-4 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Predicción IA vs Consumo Real
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.3)" 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px' }}
                  formatter={(value) => (
                    <span className="text-xs text-muted-foreground">
                      {value === 'powerConsumption' ? 'Consumo Real' : 'Predicción IA'}
                    </span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="powerConsumption"
                  stroke="#ffd93d"
                  strokeWidth={2}
                  dot={false}
                  animationDuration={300}
                />
                <Line
                  type="monotone"
                  dataKey="aiPrediction"
                  stroke="#00d4ff"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
