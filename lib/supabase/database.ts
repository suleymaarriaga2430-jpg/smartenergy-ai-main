import { createClient } from './client'
import type { 
  SensorReading, 
  SensorReadingInsert, 
  Alert, 
  AlertInsert, 
  AIPrediction, 
  AIPredictionInsert,
  Statistics,
  StatisticsInsert
} from './types'

// ============ SENSOR READINGS ============

export async function insertSensorReading(reading: SensorReadingInsert): Promise<SensorReading | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('sensor_readings')
    .insert(reading)
    .select()
    .single()
  
  if (error) {
    console.error('Error inserting sensor reading:', error)
    return null
  }
  return data
}

export async function insertSensorReadingsBatch(readings: SensorReadingInsert[]): Promise<SensorReading[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('sensor_readings')
    .insert(readings)
    .select()
  
  if (error) {
    console.error('Error inserting sensor readings batch:', error)
    return []
  }
  return data || []
}

export async function getLatestSensorReadings(limit = 50): Promise<SensorReading[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('sensor_readings')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching sensor readings:', error)
    return []
  }
  return data || []
}

export async function getSensorReadingsByType(
  sensorType: SensorReading['sensor_type'], 
  limit = 20
): Promise<SensorReading[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('sensor_readings')
    .select('*')
    .eq('sensor_type', sensorType)
    .order('timestamp', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching sensor readings by type:', error)
    return []
  }
  return data || []
}

export async function getSensorReadingsForChart(
  sensorType: SensorReading['sensor_type'],
  hours = 1
): Promise<SensorReading[]> {
  const supabase = createClient()
  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()
  
  const { data, error } = await supabase
    .from('sensor_readings')
    .select('*')
    .eq('sensor_type', sensorType)
    .gte('timestamp', since)
    .order('timestamp', { ascending: true })
  
  if (error) {
    console.error('Error fetching chart data:', error)
    return []
  }
  return data || []
}

// ============ ALERTS ============

export async function insertAlert(alert: AlertInsert): Promise<Alert | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('alerts')
    .insert(alert)
    .select()
    .single()
  
  if (error) {
    console.error('Error inserting alert:', error)
    return null
  }
  return data
}

export async function getAlerts(limit = 20): Promise<Alert[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching alerts:', error)
    return []
  }
  return data || []
}

export async function getUnreadAlerts(): Promise<Alert[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('is_read', false)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching unread alerts:', error)
    return []
  }
  return data || []
}

export async function markAlertAsRead(alertId: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('alerts')
    .update({ is_read: true })
    .eq('id', alertId)
  
  if (error) {
    console.error('Error marking alert as read:', error)
    return false
  }
  return true
}

export async function deleteAlert(alertId: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('alerts')
    .delete()
    .eq('id', alertId)
  
  if (error) {
    console.error('Error deleting alert:', error)
    return false
  }
  return true
}

// ============ AI PREDICTIONS ============

export async function insertAIPrediction(prediction: AIPredictionInsert): Promise<AIPrediction | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('ai_predictions')
    .insert(prediction)
    .select()
    .single()
  
  if (error) {
    console.error('Error inserting AI prediction:', error)
    return null
  }
  return data
}

export async function getLatestAIPredictions(limit = 10): Promise<AIPrediction[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('ai_predictions')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching AI predictions:', error)
    return []
  }
  return data || []
}

export async function updatePredictionActualValue(
  predictionId: string, 
  actualValue: number
): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('ai_predictions')
    .update({ actual_value: actualValue })
    .eq('id', predictionId)
  
  if (error) {
    console.error('Error updating prediction actual value:', error)
    return false
  }
  return true
}

// ============ STATISTICS ============

export async function insertStatistics(stats: StatisticsInsert): Promise<Statistics | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('statistics')
    .insert(stats)
    .select()
    .single()
  
  if (error) {
    console.error('Error inserting statistics:', error)
    return null
  }
  return data
}

export async function getStatistics(
  period: Statistics['period'] = 'hourly',
  limit = 24
): Promise<Statistics[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('statistics')
    .select('*')
    .eq('period', period)
    .order('period_start', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching statistics:', error)
    return []
  }
  return data || []
}

// ============ REALTIME SUBSCRIPTIONS ============

export function subscribeToSensorReadings(
  callback: (reading: SensorReading) => void
) {
  const supabase = createClient()
  return supabase
    .channel('sensor_readings_changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'sensor_readings' },
      (payload) => callback(payload.new as SensorReading)
    )
    .subscribe()
}

export function subscribeToAlerts(
  callback: (alert: Alert) => void
) {
  const supabase = createClient()
  return supabase
    .channel('alerts_changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'alerts' },
      (payload) => callback(payload.new as Alert)
    )
    .subscribe()
}

export function subscribeToAIPredictions(
  callback: (prediction: AIPrediction) => void
) {
  const supabase = createClient()
  return supabase
    .channel('ai_predictions_changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'ai_predictions' },
      (payload) => callback(payload.new as AIPrediction)
    )
    .subscribe()
}
