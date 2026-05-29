// Tipos para la base de datos IoT

export interface SensorReading {
  id: string
  sensor_id: string
  sensor_type: 'temperature' | 'humidity' | 'power' | 'voltage' | 'current'
  value: number
  unit: string
  timestamp: string
  created_at: string
}

export interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  message: string
  sensor_id: string | null
  value: number | null
  threshold: number | null
  is_read: boolean
  created_at: string
}

export interface AIPrediction {
  id: string
  prediction_type: 'consumption' | 'temperature' | 'anomaly' | 'maintenance'
  predicted_value: number
  actual_value: number | null
  confidence: number
  trend: 'up' | 'down' | 'stable' | null
  timestamp: string
  created_at: string
}

export interface SystemConfig {
  id: string
  key: string
  value: Record<string, unknown>
  updated_at: string
}

export interface Statistics {
  id: string
  period: 'hourly' | 'daily' | 'weekly' | 'monthly'
  metric_type: string
  avg_value: number | null
  min_value: number | null
  max_value: number | null
  total_readings: number
  efficiency: number | null
  period_start: string
  period_end: string
  created_at: string
}

// Tipos para inserción (sin campos auto-generados)
export type SensorReadingInsert = Omit<SensorReading, 'id' | 'created_at' | 'timestamp'> & {
  timestamp?: string
}

export type AlertInsert = Omit<Alert, 'id' | 'created_at' | 'is_read'> & {
  is_read?: boolean
}

export type AIPredictionInsert = Omit<AIPrediction, 'id' | 'created_at' | 'timestamp'> & {
  timestamp?: string
}

export type StatisticsInsert = Omit<Statistics, 'id' | 'created_at'>
