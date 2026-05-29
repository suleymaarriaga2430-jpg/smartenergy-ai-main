# SmartEnergy AI Dashboard

## Sistema Inteligente de Monitoreo Energético con IoT e Inteligencia Artificial

---

# Descripción del Proyecto

SmartEnergy AI es una aplicación web desarrollada con Next.js, TypeScript y Supabase que simula un sistema IoT de monitoreo energético en tiempo real.

El proyecto fue desarrollado con fines académicos para demostrar la integración de:

* Internet de las Cosas (IoT)
* Inteligencia Artificial (IA)
* Bases de datos en la nube
* Dashboards interactivos
* Simulación de sensores
* Sistemas de alertas inteligentes

La plataforma genera datos simulados de sensores virtuales, los almacena en una base de datos Supabase y los visualiza mediante una interfaz moderna e interactiva.

---

# Tecnologías Utilizadas

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Shadcn UI

## Backend y Base de Datos

* Supabase
* PostgreSQL

## Inteligencia Artificial

* Simulación de modelos predictivos
* Detección de anomalías
* Predicciones energéticas

---

# Requisitos Previos

Antes de ejecutar el proyecto, asegúrese de tener instalado:

## Node.js

Versión recomendada:

```text
Node.js 20 o superior
```

Verificar instalación:

```bash
node -v
```

---

## NPM

Verificar instalación:

```bash
npm -v
```

---

## Cuenta de Supabase

Crear una cuenta gratuita en:

https://supabase.com

---

# Descarga del Proyecto

Extraer el archivo ZIP del proyecto en una carpeta local.

IMPORTANTE:

Evitar nombres de carpetas con:

* &
* acentos
* caracteres especiales
* espacios innecesarios

Ejemplo recomendado:

```text
C:\Proyectos\smartenergy-ai
```

---

# Configuración de Supabase

## Paso 1: Crear Proyecto

1. Iniciar sesión en Supabase.
2. Crear un nuevo proyecto.
3. Asignar:

   * Nombre del proyecto.
   * Contraseña para la base de datos.
   * Región más cercana.

Esperar a que Supabase termine la configuración.

---

## Paso 2: Crear las Tablas

Abrir:

```text
SQL Editor
```

Crear una nueva consulta SQL.

Ejecutar el siguiente script:

```sql
CREATE TABLE sensor_readings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sensor_id TEXT NOT NULL,
    sensor_type TEXT NOT NULL,
    value NUMERIC NOT NULL,
    unit TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ai_predictions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    prediction_type TEXT NOT NULL,
    predicted_value NUMERIC NOT NULL,
    actual_value NUMERIC,
    confidence NUMERIC,
    trend TEXT,
    timestamp TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    sensor_id TEXT,
    value NUMERIC,
    threshold NUMERIC,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE statistics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    average_consumption NUMERIC,
    max_temperature NUMERIC,
    efficiency NUMERIC,
    anomalies_detected INTEGER,
    records_processed INTEGER,
    ai_accuracy NUMERIC,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE system_config (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    config_key TEXT UNIQUE NOT NULL,
    config_value TEXT,
    updated_at TIMESTAMP DEFAULT NOW()
);
```

Verificar que las tablas aparezcan correctamente en:

```text
Database → Tables
```

---

# Obtención de Credenciales

Abrir:

```text
Settings → API Keys
```

Copiar:

## Project URL

Ejemplo:

```text
https://xxxxxxxxxxxx.supabase.co
```

---

## Publishable Key

La clave comienza con:

```text
sb_publishable_
```

IMPORTANTE:

No utilizar:

```text
sb_secret_
```

ya que esa clave es privada.

---

# Configuración del Archivo .env.local

En la raíz del proyecto crear:

```text
.env.local
```

Agregar:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_PUBLISHABLE_KEY
```

Ejemplo:

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcxyz.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxxxxxxxxxxxxx
```

Guardar el archivo.

---

# Instalación de Dependencias

Abrir terminal dentro de la carpeta del proyecto.

Ejecutar:

```bash
npm install
```

Esperar a que finalice la instalación.

---

# Dependencias Adicionales (si son necesarias)

Si aparecen errores relacionados con Supabase:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

---

# Ejecución del Proyecto

Dentro de la carpeta raíz ejecutar:

```bash
npm run dev
```

Si todo es correcto aparecerá un mensaje similar a:

```text
Local: http://localhost:3000
```

---

# Acceso a la Aplicación

Abrir el navegador.

Ingresar:

```text
http://localhost:3000
```

La aplicación deberá cargar automáticamente.

---

# Funcionalidades Disponibles

## Simulación IoT

Generación automática de datos simulados:

* Temperatura
* Humedad
* Voltaje
* Corriente
* Consumo energético

---

## Dashboard en Tiempo Real

Visualización dinámica de:

* Temperatura actual
* Humedad actual
* Consumo energético
* Estado del sistema
* Indicadores de riesgo

---

## Inteligencia Artificial

Funciones implementadas:

* Predicción de consumo energético
* Detección de anomalías
* Análisis de tendencias
* Evaluación de riesgo

---

## Alertas Inteligentes

Generación automática de:

* Alertas de consumo elevado
* Anomalías detectadas
* Riesgos energéticos

---

## Base de Datos

Almacenamiento histórico de:

* Lecturas de sensores
* Predicciones IA
* Alertas
* Estadísticas

---

# Solución de Problemas

## Error: pnpm no se reconoce

Utilizar:

```bash
npm install
npm run dev
```

---

## Error: Hydration Failed

Este error puede producirse por relojes o datos dinámicos renderizados entre servidor y cliente.

Generalmente no afecta el funcionamiento de la aplicación.

---

## Error: Cannot execute CREATE TABLE in a read-only transaction

Crear las tablas desde una rama editable de Supabase o utilizar una rama de desarrollo.

---

## Error: Variables de entorno no detectadas

Verificar:

```text
.env.local
```

y reiniciar el servidor:

```bash
CTRL + C
npm run dev
```

---

# Arquitectura del Sistema

```text
Sensores Virtuales
        ↓
Simulación IoT
        ↓
Supabase Database
        ↓
Motor de IA
        ↓
Dashboard Web
        ↓
Sistema de Alertas
```

---

# Autor

Erick Yasir De la Cruz Ricárdez
Suleyma Estefany Arriaga Mejía

---

# Propósito Académico

Este proyecto fue desarrollado con fines educativos para demostrar la integración de tecnologías IoT, Inteligencia Artificial y sistemas web modernos mediante simulación virtual de sensores y análisis de datos en tiempo real.
