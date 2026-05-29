'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { 
  SensorReading, 
  Alert as DBAlert, 
  AIPrediction 
} from '@/lib/supabase/types'

export interface SensorData {
  id: string
  timestamp: Date
  temperature: number
  humidity: number
  current: number
  voltage: number
  powerConsumption: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  systemStatus: 'online' | 'warning' | 'offline'
}

export interface AIAnalysis {
  prediction: number
  confidence: number
  trend: 'up' | 'down' | 'stable'
  anomalyDetected: boolean
  anomalyType?: string
  recommendation: string
  riskProbability: number
}

export interface Alert {
  id: string
  type: 'info' | 'warning' | 'error' | 'critical'
  message: string
  timestamp: Date
  sensor?: string
  value?: number
}

export interface HistoricalData {
  timestamp: Date
  temperature: number
  humidity: number
  powerConsumption: number
  aiPrediction: number
}

// Generate realistic sensor data with smooth transitions
const generateSensorData = (prevData?: SensorData): SensorData => {
  const now = new Date()
  
  const baseTemp = 22 + Math.sin(now.getTime() / 60000) * 3
  const baseHumidity = 45 + Math.cos(now.getTime() / 90000) * 10
  const basePower = 2500 + Math.sin(now.getTime() / 45000) * 500
  
  const temp = prevData 
    ? prevData.temperature + (Math.random() - 0.5) * 2
    : baseTemp + (Math.random() - 0.5) * 4
  
  const humidity = prevData
    ? prevData.humidity + (Math.random() - 0.5) * 3
    : baseHumidity + (Math.random() - 0.5) * 8
  
  const power = prevData
    ? prevData.powerConsumption + (Math.random() - 0.5) * 100
    : basePower + (Math.random() - 0.5) * 300

  const clampedTemp = Math.max(15, Math.min(40, temp))
  const clampedHumidity = Math.max(20, Math.min(80, humidity))
  const clampedPower = Math.max(1500, Math.min(4500, power))
  
  let riskLevel: SensorData['riskLevel'] = 'low'
  if (clampedTemp > 35 || clampedPower > 4000) {
    riskLevel = 'critical'
  } else if (clampedTemp > 30 || clampedPower > 3500) {
    riskLevel = 'high'
  } else if (clampedTemp > 27 || clampedPower > 3000) {
    riskLevel = 'medium'
  }

  return {
    id: `sensor-${Date.now()}`,
    timestamp: now,
    temperature: Math.round(clampedTemp * 10) / 10,
    humidity: Math.round(clampedHumidity * 10) / 10,
    current: Math.round((clampedPower / 220) * 100) / 100,
    voltage: 220 + (Math.random() - 0.5) * 10,
    powerConsumption: Math.round(clampedPower),
    riskLevel,
    systemStatus: riskLevel === 'critical' ? 'warning' : 'online',
  }
}

// Generate AI analysis based on current and historical data
const generateAIAnalysis = (current: SensorData, history: HistoricalData[]): AIAnalysis => {
  const recentPower = history.slice(-10).map(h => h.powerConsumption)
  const avgPower = recentPower.length > 0 
    ? recentPower.reduce((a, b) => a + b, 0) / recentPower.length 
    : current.powerConsumption
  
  const prediction = avgPower * (1 + (Math.random() - 0.45) * 0.2)
  
  let trend: AIAnalysis['trend'] = 'stable'
  if (current.powerConsumption > avgPower * 1.05) {
    trend = 'up'
  } else if (current.powerConsumption < avgPower * 0.95) {
    trend = 'down'
  }
  
  const variance = recentPower.length > 2 
    ? Math.sqrt(recentPower.reduce((sum, val) => sum + Math.pow(val - avgPower, 2), 0) / recentPower.length)
    : 200
  const isAnomaly = Math.abs(current.powerConsumption - avgPower) > variance * 2

  const recommendations = [
    'Sistema operando dentro de parámetros normales',
    'Considerar reducción de carga en horarios pico',
    'Optimizar distribución de consumo energético',
    'Programar mantenimiento preventivo',
    'Revisar eficiencia de equipos conectados',
  ]

  return {
    prediction: Math.round(prediction),
    confidence: 85 + Math.random() * 12,
    trend,
    anomalyDetected: isAnomaly || current.riskLevel === 'critical',
    anomalyType: isAnomaly ? 'Pico de consumo anormal detectado' : undefined,
    recommendation: recommendations[Math.floor(Math.random() * recommendations.length)],
    riskProbability: current.riskLevel === 'critical' ? 85 + Math.random() * 10 
      : current.riskLevel === 'high' ? 60 + Math.random() * 20
      : current.riskLevel === 'medium' ? 30 + Math.random() * 20
      : Math.random() * 20,
  }
}

// Generate alerts based on sensor data
const generateAlerts = (data: SensorData, analysis: AIAnalysis): Alert[] => {
  const alerts: Alert[] = []
  
  if (data.temperature > 35) {
    alerts.push({
      id: `alert-temp-${Date.now()}`,
      type: 'critical',
      message: `Temperatura crítica: ${data.temperature}°C`,
      timestamp: new Date(),
      sensor: 'Temperatura',
      value: data.temperature,
    })
  } else if (data.temperature > 30) {
    alerts.push({
      id: `alert-temp-${Date.now()}`,
      type: 'warning',
      message: `Temperatura elevada: ${data.temperature}°C`,
      timestamp: new Date(),
      sensor: 'Temperatura',
      value: data.temperature,
    })
  }

  if (data.powerConsumption > 4000) {
    alerts.push({
      id: `alert-power-${Date.now()}`,
      type: 'critical',
      message: `Consumo crítico: ${data.powerConsumption}W`,
      timestamp: new Date(),
      sensor: 'Consumo',
      value: data.powerConsumption,
    })
  } else if (data.powerConsumption > 3500) {
    alerts.push({
      id: `alert-power-${Date.now()}`,
      type: 'warning',
      message: `Alto consumo energético: ${data.powerConsumption}W`,
      timestamp: new Date(),
      sensor: 'Consumo',
      value: data.powerConsumption,
    })
  }

  if (analysis.anomalyDetected) {
    alerts.push({
      id: `alert-anomaly-${Date.now()}`,
      type: 'error',
      message: analysis.anomalyType || 'Anomalía detectada por IA',
      timestamp: new Date(),
    })
  }

  return alerts
}

export function useSensorSimulation(updateInterval = 2000) {
  const [sensorData, setSensorData] = useState<SensorData | null>(null)
  const [aiAnalysis, setAIAnalysis] = useState<AIAnalysis | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [isConnected, setIsConnected] = useState(true)
  const [totalRecords, setTotalRecords] = useState(0)
  const [dbStatus, setDbStatus] = useState<'connected' | 'syncing' | 'error'>('connected')
  
  const supabaseRef = useRef(createClient())
  const lastSyncRef = useRef<Date>(new Date())

  // Persist sensor readings to Supabase
  const persistSensorReadings = useCallback(async (data: SensorData) => {
    try {
      setDbStatus('syncing')
      const supabase = supabaseRef.current
      
      // Insert multiple sensor readings for each type
      const readings = [
        {
          sensor_id: 'TEMP-001',
          sensor_type: 'temperature' as const,
          value: data.temperature,
          unit: '°C',
        },
        {
          sensor_id: 'HUM-001',
          sensor_type: 'humidity' as const,
          value: data.humidity,
          unit: '%',
        },
        {
          sensor_id: 'PWR-001',
          sensor_type: 'power' as const,
          value: data.powerConsumption,
          unit: 'W',
        },
        {
          sensor_id: 'VOLT-001',
          sensor_type: 'voltage' as const,
          value: data.voltage,
          unit: 'V',
        },
        {
          sensor_id: 'CURR-001',
          sensor_type: 'current' as const,
          value: data.current,
          unit: 'A',
        },
      ]

      const { error } = await supabase
        .from('sensor_readings')
        .insert(readings)
      
      if (error) {
        console.error('Error persisting sensor readings:', error)
        setDbStatus('error')
      } else {
        lastSyncRef.current = new Date()
        setDbStatus('connected')
      }
    } catch (err) {
      console.error('Failed to persist sensor readings:', err)
      setDbStatus('error')
    }
  }, [])

  // Persist alerts to Supabase
  const persistAlert = useCallback(async (alert: Alert) => {
    try {
      const supabase = supabaseRef.current
      
      const dbAlert: Omit<DBAlert, 'id' | 'created_at'> = {
        type: alert.type === 'error' ? 'warning' : alert.type === 'critical' ? 'critical' : alert.type === 'warning' ? 'warning' : 'info',
        title: alert.sensor ? `Alerta de ${alert.sensor}` : 'Alerta del Sistema',
        message: alert.message,
        sensor_id: alert.sensor || null,
        value: alert.value || null,
        threshold: null,
        is_read: false,
      }

      const { error } = await supabase
        .from('alerts')
        .insert(dbAlert)
      
      if (error) {
        console.error('Error persisting alert:', error)
      }
    } catch (err) {
      console.error('Failed to persist alert:', err)
    }
  }, [])

  // Persist AI predictions to Supabase
  const persistAIPrediction = useCallback(async (analysis: AIAnalysis, actualPower: number) => {
    try {
      const supabase = supabaseRef.current
      
      const prediction = {
        prediction_type: 'consumption' as const,
        predicted_value: analysis.prediction,
        actual_value: actualPower,
        confidence: Math.round(analysis.confidence * 100) / 100,
        trend: analysis.trend,
      }

      const { error } = await supabase
        .from('ai_predictions')
        .insert(prediction)
      
      if (error) {
        console.error('Error persisting AI prediction:', error)
      }
    } catch (err) {
      console.error('Failed to persist AI prediction:', err)
    }
  }, [])

  // Load initial data from Supabase
  const loadInitialData = useCallback(async () => {
    try {
      const supabase = supabaseRef.current
      
      // Load recent alerts
      const { data: dbAlerts } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)
      
      if (dbAlerts && dbAlerts.length > 0) {
        const formattedAlerts: Alert[] = dbAlerts.map((a: DBAlert) => ({
          id: a.id,
          type: a.type === 'critical' ? 'critical' : a.type === 'warning' ? 'warning' : a.type === 'info' ? 'info' : 'error',
          message: a.message,
          timestamp: new Date(a.created_at),
          sensor: a.sensor_id || undefined,
          value: a.value || undefined,
        }))
        setAlerts(formattedAlerts)
      }

      // Load record count
      const { count } = await supabase
        .from('sensor_readings')
        .select('*', { count: 'exact', head: true })
      
      if (count !== null) {
        setTotalRecords(count)
      }

      // Load recent sensor readings for historical data
      const { data: readings } = await supabase
        .from('sensor_readings')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100)
      
      if (readings && readings.length > 0) {
        // Group by timestamp (roughly)
        const groupedByTime = new Map<string, SensorReading[]>()
        readings.forEach((r: SensorReading) => {
          const timeKey = r.timestamp.slice(0, 19) // Group by second
          if (!groupedByTime.has(timeKey)) {
            groupedByTime.set(timeKey, [])
          }
          groupedByTime.get(timeKey)!.push(r)
        })

        const historical: HistoricalData[] = []
        groupedByTime.forEach((group, timeKey) => {
          const temp = group.find(r => r.sensor_type === 'temperature')
          const hum = group.find(r => r.sensor_type === 'humidity')
          const power = group.find(r => r.sensor_type === 'power')
          
          if (temp && hum && power) {
            historical.push({
              timestamp: new Date(timeKey),
              temperature: Number(temp.value),
              humidity: Number(hum.value),
              powerConsumption: Number(power.value),
              aiPrediction: Number(power.value) * (0.9 + Math.random() * 0.2),
            })
          }
        })
        
        setHistoricalData(historical.reverse().slice(-100))
      }
    } catch (err) {
      console.error('Failed to load initial data:', err)
    }
  }, [])

  // Set up realtime subscriptions
  useEffect(() => {
    const supabase = supabaseRef.current
    
    // Subscribe to new alerts
    const alertsChannel = supabase
      .channel('alerts_realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'alerts' },
        (payload) => {
          const newAlert = payload.new as DBAlert
          const formattedAlert: Alert = {
            id: newAlert.id,
            type: newAlert.type === 'critical' ? 'critical' : newAlert.type === 'warning' ? 'warning' : newAlert.type === 'info' ? 'info' : 'error',
            message: newAlert.message,
            timestamp: new Date(newAlert.created_at),
            sensor: newAlert.sensor_id || undefined,
            value: newAlert.value || undefined,
          }
          setAlerts(prev => [formattedAlert, ...prev].slice(0, 50))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(alertsChannel)
    }
  }, [])

  // Load initial data on mount
  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  const updateData = useCallback(() => {
    setSensorData(prev => {
      const newData = generateSensorData(prev ?? undefined)
      
      // Persist to database every update
      persistSensorReadings(newData)
      
      setHistoricalData(prevHistory => {
        const newHistorical: HistoricalData = {
          timestamp: newData.timestamp,
          temperature: newData.temperature,
          humidity: newData.humidity,
          powerConsumption: newData.powerConsumption,
          aiPrediction: 0,
        }
        
        const updated = [...prevHistory, newHistorical].slice(-100)
        return updated
      })

      setTotalRecords(prev => prev + 5) // 5 sensor readings per update
      
      return newData
    })
  }, [persistSensorReadings])

  // Update AI analysis when sensor data changes
  useEffect(() => {
    if (sensorData && historicalData.length > 0) {
      const analysis = generateAIAnalysis(sensorData, historicalData)
      setAIAnalysis(analysis)
      
      // Persist AI prediction
      persistAIPrediction(analysis, sensorData.powerConsumption)
      
      setHistoricalData(prev => {
        if (prev.length === 0) return prev
        const updated = [...prev]
        updated[updated.length - 1].aiPrediction = analysis.prediction
        return updated
      })
      
      // Generate and persist new alerts
      const newAlerts = generateAlerts(sensorData, analysis)
      if (newAlerts.length > 0) {
        newAlerts.forEach(alert => persistAlert(alert))
        setAlerts(prev => [...newAlerts, ...prev].slice(0, 50))
      }
    }
  }, [sensorData, historicalData.length, persistAIPrediction, persistAlert])

  // Periodic updates
  useEffect(() => {
    updateData()
    
    const interval = setInterval(() => {
      if (Math.random() > 0.98) {
        setIsConnected(false)
        setTimeout(() => setIsConnected(true), 1000)
      } else {
        updateData()
      }
    }, updateInterval)

    return () => clearInterval(interval)
  }, [updateInterval, updateData])

  const dismissAlert = useCallback(async (alertId: string) => {
    // Mark as read in database
    const supabase = supabaseRef.current
    await supabase
      .from('alerts')
      .update({ is_read: true })
      .eq('id', alertId)
    
    setAlerts(prev => prev.filter(a => a.id !== alertId))
  }, [])

  return {
    sensorData,
    aiAnalysis,
    alerts,
    historicalData,
    isConnected,
    totalRecords,
    dbStatus,
    lastSync: lastSyncRef.current,
    dismissAlert,
  }
}
