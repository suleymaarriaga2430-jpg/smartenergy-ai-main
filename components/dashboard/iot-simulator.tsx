'use client'

import { motion } from 'framer-motion'
import { 
  Radio, 
  Wifi, 
  Cpu, 
  Thermometer, 
  Droplets, 
  Zap,
  Activity
} from 'lucide-react'
import type { SensorData } from '@/hooks/use-sensor-simulation'

interface IoTSimulatorProps {
  sensorData: SensorData | null
  isConnected: boolean
}

interface VirtualSensorProps {
  name: string
  icon: React.ReactNode
  value: string | number
  unit: string
  status: 'active' | 'transmitting' | 'idle'
  color: string
}

function VirtualSensor({ name, icon, value, unit, status, color }: VirtualSensorProps) {
  return (
    <motion.div
      className="glass rounded-lg p-4 border border-border/50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ borderColor: color }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-secondary/50">
            {icon}
          </div>
          <span className="text-sm font-medium text-foreground">{name}</span>
        </div>
        
        {/* LED Indicator */}
        <motion.div
          className={`w-3 h-3 rounded-full ${
            status === 'active' ? 'bg-neon-green' :
            status === 'transmitting' ? 'bg-neon-cyan' :
            'bg-muted'
          }`}
          animate={{
            opacity: status === 'transmitting' ? [1, 0.3, 1] : 1,
            scale: status === 'active' ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{
            boxShadow: status !== 'idle' ? `0 0 10px ${status === 'active' ? '#00ff88' : '#00d4ff'}` : 'none'
          }}
        />
      </div>
      
      <div className="flex items-baseline gap-1 mb-2">
        <motion.span
          key={value}
          className="text-xl font-bold font-mono"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {value}
        </motion.span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Radio className="w-3 h-3" />
        </motion.div>
        <span>
          {status === 'transmitting' ? 'Transmitiendo datos...' :
           status === 'active' ? 'Sensor activo' :
           'En espera'}
        </span>
      </div>
    </motion.div>
  )
}

export function IoTSimulator({ sensorData, isConnected }: IoTSimulatorProps) {
  const getStatus = (): 'active' | 'transmitting' | 'idle' => {
    if (!isConnected) return 'idle'
    return Math.random() > 0.5 ? 'transmitting' : 'active'
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Wifi className="w-5 h-5 text-primary" />
          Simulación Virtual de Sensores IoT
        </h2>
        
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30"
          animate={{ opacity: isConnected ? 1 : 0.5 }}
        >
          <motion.div
            animate={{ rotate: isConnected ? 360 : 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Cpu className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-xs font-medium text-primary">
            {isConnected ? 'Simulación Activa' : 'Desconectado'}
          </span>
        </motion.div>
      </div>

      {/* Data Flow Animation */}
      <div className="glass rounded-xl p-6 border border-border/50 mb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-muted-foreground">
            Flujo de datos en tiempo real
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-neon-green"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-xs text-neon-green">Transmisión activa</span>
          </div>
        </div>

        {/* Data Flow Visualization */}
        <div className="relative h-12 mb-6 overflow-hidden rounded-lg bg-secondary/30">
          <motion.div
            className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-primary/50 to-transparent"
            animate={{ x: ['0%', '500%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-accent/50 to-transparent"
            animate={{ x: ['0%', '500%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-neon-green/50 to-transparent"
            animate={{ x: ['0%', '500%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="px-2 py-1 rounded bg-background/50">Sensores</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
                →
              </motion.div>
              <span className="px-2 py-1 rounded bg-background/50">Gateway IoT</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}>
                →
              </motion.div>
              <span className="px-2 py-1 rounded bg-background/50">Procesamiento</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}>
                →
              </motion.div>
              <span className="px-2 py-1 rounded bg-background/50">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Virtual Sensors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <VirtualSensor
            name="Sensor Temperatura"
            icon={<Thermometer className="w-4 h-4 text-neon-red" />}
            value={sensorData?.temperature ?? '--'}
            unit="°C"
            status={getStatus()}
            color="#ff6b6b"
          />
          
          <VirtualSensor
            name="Sensor Humedad"
            icon={<Droplets className="w-4 h-4 text-neon-blue" />}
            value={sensorData?.humidity ?? '--'}
            unit="%"
            status={getStatus()}
            color="#4ecdc4"
          />
          
          <VirtualSensor
            name="Sensor Corriente"
            icon={<Activity className="w-4 h-4 text-neon-yellow" />}
            value={sensorData?.current?.toFixed(2) ?? '--'}
            unit="A"
            status={getStatus()}
            color="#ffd93d"
          />
          
          <VirtualSensor
            name="Sensor Voltaje"
            icon={<Zap className="w-4 h-4 text-neon-cyan" />}
            value={sensorData?.voltage?.toFixed(1) ?? '--'}
            unit="V"
            status={getStatus()}
            color="#00d4ff"
          />
          
          <VirtualSensor
            name="Medidor Consumo"
            icon={<Zap className="w-4 h-4 text-neon-green" />}
            value={sensorData?.powerConsumption ?? '--'}
            unit="W"
            status={getStatus()}
            color="#00ff88"
          />
        </div>
      </div>

      {/* Status Message */}
      <motion.div
        className="text-center text-sm text-muted-foreground"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ⚡ Sistema de simulación virtual - No se utiliza hardware real ⚡
      </motion.div>
    </section>
  )
}
