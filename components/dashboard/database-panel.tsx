'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  Search, 
  RefreshCw, 
  Cloud,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import type { HistoricalData } from '@/hooks/use-sensor-simulation'

interface DatabasePanelProps {
  historicalData: HistoricalData[]
  totalRecords: number
  dbStatus?: 'connected' | 'syncing' | 'error'
  lastSync?: Date
}

export function DatabasePanel({ 
  historicalData, 
  totalRecords,
  dbStatus = 'connected',
  lastSync 
}: DatabasePanelProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'high' | 'normal'>('all')

  const filteredData = useMemo(() => {
    let data = historicalData.slice(-50).reverse()
    
    if (filter === 'high') {
      data = data.filter(d => d.powerConsumption > 3000)
    } else if (filter === 'normal') {
      data = data.filter(d => d.powerConsumption <= 3000)
    }
    
    if (searchTerm) {
      data = data.filter(d => 
        d.temperature.toString().includes(searchTerm) ||
        d.humidity.toString().includes(searchTerm) ||
        d.powerConsumption.toString().includes(searchTerm)
      )
    }
    
    return data
  }, [historicalData, searchTerm, filter])

  const getStatusColor = () => {
    switch (dbStatus) {
      case 'connected': return 'text-neon-green border-neon-green/30 bg-neon-green/10'
      case 'syncing': return 'text-neon-blue border-neon-blue/30 bg-neon-blue/10'
      case 'error': return 'text-neon-red border-neon-red/30 bg-neon-red/10'
    }
  }

  const getStatusIcon = () => {
    switch (dbStatus) {
      case 'connected': return <CheckCircle className="w-4 h-4" />
      case 'syncing': return <Loader2 className="w-4 h-4 animate-spin" />
      case 'error': return <AlertCircle className="w-4 h-4" />
    }
  }

  const getStatusText = () => {
    switch (dbStatus) {
      case 'connected': return 'Conectado'
      case 'syncing': return 'Sincronizando...'
      case 'error': return 'Error de conexión'
    }
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Base de Datos IoT
        </h2>
        
        <div className="flex items-center gap-3">
          <motion.div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusColor()}`}
            animate={dbStatus === 'syncing' ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {getStatusIcon()}
            <span className="text-xs font-medium">{getStatusText()}</span>
          </motion.div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <Cloud className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">Supabase</span>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl border border-border/50 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border/50 bg-secondary/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar registros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-background/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilter('high')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filter === 'high' ? 'bg-neon-yellow text-background' : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  Alto Consumo
                </button>
                <button
                  onClick={() => setFilter('normal')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filter === 'normal' ? 'bg-neon-green text-background' : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  Normal
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{totalRecords.toLocaleString()} registros totales</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw className="w-4 h-4 text-primary" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-card border-b border-border/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Timestamp</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Temperatura</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Humedad</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Consumo</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Predicción IA</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record, index) => {
                const isHighConsumption = record.powerConsumption > 3000
                return (
                  <motion.tr
                    key={index}
                    className={`border-b border-border/30 hover:bg-secondary/30 transition-colors ${
                      isHighConsumption ? 'bg-neon-yellow/5' : ''
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {new Date(record.timestamp).toLocaleString('es-ES')}
                    </td>
                    <td className="px-4 py-3 font-mono">
                      <span className={record.temperature > 30 ? 'text-neon-red' : 'text-foreground'}>
                        {record.temperature.toFixed(1)}°C
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-neon-blue">
                      {record.humidity.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 font-mono">
                      <span className={isHighConsumption ? 'text-neon-yellow' : 'text-neon-green'}>
                        {record.powerConsumption.toLocaleString()}W
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-primary">
                      {record.aiPrediction ? `${record.aiPrediction.toLocaleString()}W` : '---'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                        isHighConsumption 
                          ? 'bg-neon-yellow/20 text-neon-yellow' 
                          : 'bg-neon-green/20 text-neon-green'
                      }`}>
                        <CheckCircle className="w-3 h-3" />
                        {isHighConsumption ? 'Alto' : 'Normal'}
                      </span>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/50 bg-secondary/20">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Mostrando {filteredData.length} de {historicalData.length} registros</span>
            <div className="flex items-center gap-2">
              <Cloud className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                Supabase conectado • Última sincronización: {lastSync ? lastSync.toLocaleTimeString('es-ES') : 'Ahora'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
