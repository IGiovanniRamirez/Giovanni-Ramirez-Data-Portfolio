# 🏭 Analítica End-to-End de Manufactura con Python y Power BI

## 🧩 Descripción del proyecto

Este proyecto desarrolla una solución integral de **Business Intelligence** para una planta manufacturera, integrando datos de **Producción, Calidad, Mantenimiento e Inventarios** mediante un modelo dimensional tipo **Star Schema**.

A partir de datos sintéticos generados con Python, se construyó un dashboard interactivo en Power BI que permite monitorear indicadores clave de desempeño (KPIs), identificar oportunidades de mejora y apoyar la toma de decisiones basada en datos.

El análisis responde preguntas como:

- ¿Qué líneas presentan menor OEE?
- ¿Cuáles son las principales causas de downtime?
- ¿Qué defectos generan mayores pérdidas?
- ¿Cómo impacta el mantenimiento en la disponibilidad?
- ¿Qué productos presentan mayor riesgo de obsolescencia?

---

# 🎯 Objetivo del proyecto

Diseñar una solución de Business Intelligence capaz de evaluar el desempeño operacional de una planta manufacturera mediante indicadores estratégicos de producción, calidad, mantenimiento e inventarios.

Los principales KPIs analizados incluyen:

- OEE (Overall Equipment Effectiveness)
- Availability, Performance y Quality
- MTBF y MTTR
- Reliability y Maintainability
- First Pass Yield (FPY)
- DPMO y Sigma Level
- Inventory Turnover
- Holding Cost
- Cost of Poor Quality (COPQ)

---

# 🗂️ Modelo de Datos

El proyecto utiliza un **Data Warehouse** construido bajo arquitectura **Star Schema**.

### Tablas de dimensiones

- DimProduct
- DimOperator
- DimLine
- DimShift
- DimDowntimeFactor
- DimDate

### Tablas de hechos

- FactProduction
- FactDowntime
- FactQuality
- FactMaintenance
- FactInventory

---

# ⚙️ Etapas del proyecto

## 1. Diseño del modelo dimensional

- Construcción del esquema estrella.
- Definición de dimensiones y tablas de hechos.
- Modelado de relaciones para análisis multidimensional.

## 2. Generación de datos sintéticos

- Simulación de procesos industriales utilizando Python.
- Aplicación de distribuciones estadísticas y reglas de negocio.
- Generación de datasets coherentes para producción, calidad, mantenimiento e inventarios.

## 3. Análisis exploratorio de datos (EDA)

- Validación de consistencia de los datos.
- Identificación de patrones y valores atípicos.
- Preparación de la información para el modelo analítico.

## 4. Desarrollo del Dashboard

Construcción de un dashboard ejecutivo en Power BI compuesto por cinco vistas:

- Executive Overview
- Production Analytics
- Quality Analytics
- Maintenance Analytics
- Inventory Analytics

## 5. Análisis e Insights

Identificación de oportunidades relacionadas con:

- Incremento del OEE.
- Reducción del downtime.
- Mejora de la confiabilidad de equipos.
- Disminución de costos de mala calidad.
- Optimización de inventarios.

---

# 📈 Principales resultados

- Desarrollo de un modelo analítico completo basado en arquitectura dimensional.
- Construcción de más de 50 KPIs industriales mediante DAX.
- Integración de información operativa en un dashboard ejecutivo.
- Identificación de oportunidades de mejora en eficiencia, calidad, mantenimiento e inventarios.
- Generación de recomendaciones orientadas a la toma de decisiones basada en datos.

---

# 🛠️ Tecnologías utilizadas

- Python (Pandas, NumPy)
- Power BI
- DAX (Data Analysis Expressions)
- Data Warehousing
- Star Schema
- Business Intelligence
- Data Analytics
- Exploratory Data Analysis (EDA)
- KPI Management
- Manufacturing Analytics
