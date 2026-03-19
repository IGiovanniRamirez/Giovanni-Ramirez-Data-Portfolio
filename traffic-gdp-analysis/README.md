# 🚦 Movilidad Urbana y Productividad Económica en LATAM

## 📌 Objetivo del proyecto

El objetivo de este proyecto es analizar la relación entre la **movilidad urbana** y la **productividad económica** en principales ciudades de Latinoamérica, con el fin de identificar patrones que permitan **priorizar inversiones en infraestructura de transporte**.

A través del análisis de datos, se busca responder preguntas como:
- ¿Las ciudades más productivas tienen mayor congestión?
- ¿El tráfico impacta negativamente el desempeño económico?
- ¿Qué ciudades requieren intervención prioritaria?

---

## 📊 Datasets utilizados

Se trabajó con dos fuentes principales de datos:

### 1. 🚗 TomTom Traffic Index
Contiene indicadores de tráfico urbano a nivel ciudad, incluyendo:
- Índice de tráfico en tiempo real
- Tiempo adicional por congestión (`jams_delay`)
- Número y longitud de embotellamientos
- Tiempo de viaje actual vs histórico

### 2. 📈 OECD Cities / Datos económicos urbanos
Incluye indicadores económicos y sociales por ciudad:
- PIB per cápita (`city_gdp_capita`)
- Tasa de desempleo (`unemployment_pct`)
- Contaminación del aire (`PM2.5`)
- Población

---

## 🧩 Etapas del análisis

El proyecto se desarrolló en las siguientes fases:

### 1. 🔍 Exploración de datos
- Carga de datasets
- Revisión de estructura (`.info()`, `.head()`)
- Identificación de tipos de datos incorrectos
- Detección de posibles inconsistencias

---

### 2. 🧹 Limpieza y preparación
- Conversión de tipos de datos (fechas y variables numéricas)
- Estandarización de nombres de columnas (snake_case)
- Normalización de nombres de ciudades
- Revisión de valores atípicos (ej. retrasos negativos)

---

### 3. 🔗 Integración de datasets
- Unión de datasets por ciudad
- Validación de consistencia entre fuentes
- Creación de dataset consolidado para análisis

---

### 4. 📊 Análisis exploratorio (EDA)
- Análisis de distribución de variables
- Comparación entre ciudades
- Identificación de patrones entre:
  - Tráfico
  - PIB per cápita
- Detección de outliers y anomalías

---

### 5. 📈 Análisis de relaciones
- Evaluación de correlaciones entre variables clave
- Interpretación de la relación entre congestión y productividad
- Segmentación de ciudades según desempeño

---

## 🎯 Hallazgos, conclusiones y recomendaciones

### 🔍 Hallazgos clave

- Existe una **correlación débil entre el tráfico y el PIB per cápita**, lo que indica que la congestión no depende directamente del nivel de riqueza de una ciudad.
- Las ciudades más grandes tienden a presentar **mayores niveles de congestión**, independientemente de su nivel económico.
- Se identificaron **outliers importantes**, como:
  - Ciudades con congestión extremadamente alta (ej. megaciudades)
  - Posibles inconsistencias en datos económicos (ej. valores atípicos de PIB)

---

### 🧠 Conclusiones

- La congestión urbana en Latinoamérica está más relacionada con **factores estructurales** (crecimiento urbano, densidad, planificación) que con el nivel de desarrollo económico.
- Ciudades con alto PIB no necesariamente tienen mejor movilidad, lo que evidencia **ineficiencias en infraestructura y planificación urbana**.
- La movilidad urbana representa un **factor crítico para la productividad**, especialmente en ciudades altamente congestionadas.

---

### 💡 Recomendaciones (Insights accionables)

#### 📍 Priorización de ciudades
- Enfocar inversiones en **megaciudades con alta congestión**, donde el impacto económico de la mejora es mayor.
- Identificar ciudades intermedias con crecimiento acelerado para **intervención preventiva**.

#### 🚧 Inversión en infraestructura
- Fortalecer sistemas de transporte público masivo
- Implementar soluciones de movilidad inteligente (gestión de tráfico en tiempo real)
- Promover alternativas sostenibles (bicicletas, movilidad eléctrica)

#### 🔍 Mejora de calidad de datos
- Validar fuentes con valores atípicos o inconsistentes
- Estandarizar indicadores entre países y ciudades
- Incorporar variables adicionales (densidad, uso de suelo, transporte público)

#### 📊 Análisis futuros
- Evaluar tráfico per cápita
- Analizar impacto ambiental (relación tráfico – contaminación)
- Incorporar análisis temporal para detectar tendencias

---

## 🛠️ Tecnologías utilizadas

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Jupyter Notebook

---

## 📎 Estructura del proyecto
