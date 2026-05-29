'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  Github, 
  Twitter, 
  Linkedin,
  CheckCircle,
  Code
} from 'lucide-react'

const technologies = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Recharts',
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="glass-strong border-t border-border/50 mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">SmartEnergy AI</h3>
                <p className="text-xs text-muted-foreground">Monitoreo Inteligente</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Sistema de monitoreo energético basado en IoT e Inteligencia Artificial 
              para la optimización del consumo y detección de anomalías.
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Code className="w-4 h-4 text-primary" />
              Tecnologías Utilizadas
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full bg-secondary text-foreground border border-border/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Estado del Sistema</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <motion.div
                  className="w-2 h-2 rounded-full bg-neon-green"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-neon-green">Sistema Operativo</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-neon-green" />
                <span>Todos los servicios activos</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                <span className="text-foreground">Versión:</span> 1.0.0
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="text-foreground">Última actualización:</span> {new Date().toLocaleDateString('es-ES')}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} SmartEnergy AI. Proyecto Académico - Demostración de IoT e IA.
            </p>
            
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <motion.div
          className="mt-6 h-1 rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </footer>
  )
}
