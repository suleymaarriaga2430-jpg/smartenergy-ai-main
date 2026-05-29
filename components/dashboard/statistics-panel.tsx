'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Thermometer,
  Activity,
  Brain,
  AlertTriangle,
  Database
} from 'lucide-react'
import type { HistoricalData, AIAnalysis, SensorData } from '@/hooks/use-sensor-simulation'

interface StatisticsPanelProps {
  historicalData: HistoricalData[]
  aiAnalysis: AIAnalysis | null
  sensorData: SensorData | null
  totalRecords: number
}

interface StatCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: React.ReactNode
  color: string
}

function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  return (
    <motion.div
      className="glass rounded-lg p-4 border border-border/50"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="p-1.5 rounded-lg bg-secondary/50" style={{ color }}>
          {icon}
        </div>
      </div>
      <motion.div
        key={value}
        className="text-2xl font-bold font-mono mb-1"
        style={{ color }}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        {value}
      </motion.div>
      <span className="text-xs text-muted-foreground">{subtitle}</span>
    </motion.div>
  )
}

export function StatisticsPanel({ historicalData, aiAnalysis, sensorData, totalRecords }: StatisticsPanelProps) {
  const stats = useMemo(() => {
    if (historicalData.length === 0) {
      return {
        avgConsumption: 0,
        maxTemp: 0,
        minTemp: 0,
        avgHumidity: 0,
        efficiency: 0,
        anomalies: 0,
      }
    }

    const temps = historicalData.map(d => d.temperature)
    const consumptions = historicalData.map(d => d.powerConsumption)
    const humidities = historicalData.map(d => d.humidity)

    const avgConsumption = consumptions.reduce((a, b) => a + b, 0) / consumptions.length
    const maxTemp = Math.max(...temps)
    const minTemp = Math.min(...temps)
    const avgHumidity = humidities.reduce((a, b) => a + b, 0) / humidities.length
    
    // Calculate efficiency (inverse of variance - higher is better)
    const variance = consumptions.reduce((sum, val) => sum + Math.pow(val - avgConsumption, 2), 0) / consumptions.length
    const efficiency = Math.max(0, 100 - (variance / 1000))

    const anomalies = consumptions.filter(c => c > 3500).length

    return {
      avgConsumption: Math.round(avgConsumption),
      maxTemp: Math.round(maxTemp * 10) / 10,
      minTemp: Math.round(minTemp * 10) / 10,
      avgHumidity: Math.round(avgHumidity),
      efficiency: Math.round(efficiency),
      anomalies,
    }
  }, [historicalData])

  const efficiencyData = [
    { name: 'Eficiencia', value: stats.efficiency, color: '#00ff88' },
    { name: 'Pérdida', value: 100 - stats.efficiency, color: '#2a2a3a' },
  ]

  const consumptionDistribution = useMemo(() => {
    const low = historicalData.filter(d => d.powerConsumption < 2500).length
    const normal = historicalData.filter(d => d.powerConsumption >= 2500 && d.powerConsumption < 3500).length
    const high = historicalData.filter(d => d.powerConsumption >= 3500).length
    
    return [
      { name: 'Bajo', value: low, color: '#00ff88' },
      { name: 'Normal', value: normal, color: '#00d4ff' },
      { name: 'Alto', value: high, color: '#ffd93d' },
    ]
  }, [historicalData])

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        Panel de Estadísticas
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <StatCard
          title="Consumo Promedio"
          value={`${stats.avgConsumption.toLocaleString()}W`}
          subtitle="Últimos registros"
          icon={<Zap className="w-4 h-4" />}
          color="#ffd93d"
        />
        <StatCard
          title="Temp. Máxima"
          value={`${stats.maxTemp}°C`}
          subtitle="Pico registrado"
          icon={<Thermometer className="w-4 h-4" />}
          color="#ff6b6b"
        />
        <StatCard
          title="Eficiencia Energética"
          value={`${stats.efficiency}%`}
          subtitle="Rendimiento actual"
          icon={<TrendingUp className="w-4 h-4" />}
          color="#00ff88"
        />
        <StatCard
          title="Anomalías Detectadas"
          value={stats.anomalies}
          subtitle="En período actual"
          icon={<AlertTriangle className="w-4 h-4" />}
          color="#ffd93d"
        />
        <StatCard
          title="Registros Procesados"
          value={totalRecords.toLocaleString()}
          subtitle="Total acumulado"
          icon={<Database className="w-4 h-4" />}
          color="#00d4ff"
        />
        <StatCard
          title="Precisión IA"
          value={`${aiAnalysis?.confidence?.toFixed(0) ?? 0}%`}
          subtitle="Modelo predictivo"
          icon={<Brain className="w-4 h-4" />}
          color="#00d4ff"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Efficiency Gauge */}
        <motion.div
          className="glass rounded-xl p-6 border border-border/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-neon-green" />
            Eficiencia Energética
          </h3>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={efficiencyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {efficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  key={stats.efficiency}
                  className="text-3xl font-bold text-neon-green"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  {stats.efficiency}%
                </motion.span>
                <span className="text-xs text-muted-foreground">Eficiencia</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Índice de eficiencia energética basado en estabilidad del consumo
          </div>
        </motion.div>

        {/* Consumption Distribution */}
        <motion.div
          className="glass rounded-xl p-6 border border-border/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            Distribución de Consumo
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consumptionDistribution}>
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(18, 24, 38, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {consumptionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-xs">
            {consumptionDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
