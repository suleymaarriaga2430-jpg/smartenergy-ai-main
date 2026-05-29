'use client'

import { useSensorSimulation } from '@/hooks/use-sensor-simulation'
import { Header } from '@/components/dashboard/header'
import { MetricsPanel } from '@/components/dashboard/metrics-panel'
import { IoTSimulator } from '@/components/dashboard/iot-simulator'
import { DynamicCharts } from '@/components/dashboard/dynamic-charts'
import { AIModule } from '@/components/dashboard/ai-module'
import { AlertsPanel } from '@/components/dashboard/alerts-panel'
import { DatabasePanel } from '@/components/dashboard/database-panel'
import { StatisticsPanel } from '@/components/dashboard/statistics-panel'
import { ArchitectureDiagram } from '@/components/dashboard/architecture-diagram'
import { AcademicSection } from '@/components/dashboard/academic-section'
import { Footer } from '@/components/dashboard/footer'

export default function SmartEnergyDashboard() {
  const {
    sensorData,
    aiAnalysis,
    alerts,
    historicalData,
    isConnected,
    totalRecords,
    dbStatus,
    lastSync,
    dismissAlert,
  } = useSensorSimulation(2000)

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Header isConnected={isConnected} totalRecords={totalRecords} />
        
        <main className="container mx-auto px-4 py-6">
          {/* Real-time Metrics */}
          <MetricsPanel sensorData={sensorData} aiAnalysis={aiAnalysis} />
          
          {/* IoT Simulator */}
          <IoTSimulator sensorData={sensorData} isConnected={isConnected} />
          
          {/* Dynamic Charts */}
          <DynamicCharts historicalData={historicalData} />
          
          {/* AI Module */}
          <AIModule aiAnalysis={aiAnalysis} sensorData={sensorData} />
          
          {/* Alerts */}
          <AlertsPanel alerts={alerts} onDismiss={dismissAlert} />
          
          {/* Database Panel */}
          <DatabasePanel 
            historicalData={historicalData} 
            totalRecords={totalRecords}
            dbStatus={dbStatus}
            lastSync={lastSync}
          />
          
          {/* Statistics */}
          <StatisticsPanel 
            historicalData={historicalData} 
            aiAnalysis={aiAnalysis} 
            sensorData={sensorData}
            totalRecords={totalRecords}
          />
          
          {/* Architecture Diagram */}
          <ArchitectureDiagram />
          
          {/* Academic Presentation */}
          <AcademicSection />
        </main>
        
        <Footer />
      </div>
    </div>
  )
}
