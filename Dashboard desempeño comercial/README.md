# 📊 Dashboard de Desempeño Comercial 2024–2025  
**Andes Retail Group**

## 📌 Descripción del proyecto

Este proyecto consiste en el desarrollo de un **dashboard interactivo en Power BI** para analizar el desempeño comercial de **Andes Retail Group**, una empresa de retail con operaciones en **Perú, Chile y Colombia**.

El objetivo del análisis es transformar datos transaccionales de ventas en **información visual clara y accionable**, permitiendo comprender la evolución del negocio entre **2024 y 2025**, identificar patrones de comportamiento y detectar oportunidades de mejora comercial.

El dashboard fue diseñado para proporcionar tanto una **visión ejecutiva del desempeño general del negocio** como un **análisis detallado de los factores que influyen en las ventas y la rentabilidad**.

---

# 🎯 Objetivo del proyecto

Construir un **dashboard interactivo de inteligencia de negocios** que permita responder preguntas estratégicas como:

- ¿Cómo ha evolucionado el ingreso total entre 2024 y 2025?
- ¿Qué segmentos de clientes aportan mayor ingreso y rentabilidad?
- ¿Qué categorías de producto tienen mayor impacto en el negocio?
- ¿Existen diferencias relevantes entre países o regiones?
- ¿Qué patrones temporales se observan a lo largo del año?
- ¿Dónde podrían existir oportunidades de mejora comercial?

El resultado final es un **dashboard con dos vistas principales**:

**1️⃣ Overview Ejecutivo**

Proporciona una lectura rápida del estado general del negocio mediante indicadores clave y comparaciones globales.

**2️⃣ Análisis Detallado**

Permite explorar patrones de ventas, comportamiento de clientes y desempeño por categoría, país y estacionalidad.

---

# 📂 Dataset utilizado

El análisis se basa en el dataset:

**`Andes_Retail_Group_2024_2025.xlsx`**

Este dataset contiene **transacciones de ventas del negocio retail Andes Retail Group** para los años **2024 y 2025**.

Cada fila representa un **pedido individual**, incluyendo información sobre:

- Cliente
- Ubicación geográfica
- Categoría de producto
- Métricas financieras

## Variables principales del dataset

| Columna | Descripción |
|------|------|
| ID_Pedido | Identificador único del pedido |
| Fecha_Pedido | Fecha en la que se realizó la venta |
| Estación | Temporada del año (Verano, Otoño, Invierno, Primavera) |
| ID_Cliente | Identificador del cliente |
| Segmento_Cliente | Segmento comercial del cliente |
| Región | Región dentro del país |
| País | País donde se realizó la venta |
| Categoría_Producto | Tipo de producto vendido |
| Unidades_Vendidas | Cantidad de unidades vendidas |
| Precio_Unitario | Precio por unidad |
| Ingresos | Total de la venta |
| Costo | Costo asociado a la venta |

A partir de estas variables se calcularon indicadores como:

- **Margen Bruto**
- **% Margen**
- **Variación interanual (YoY)**

---

# 🧠 Etapas del análisis

El proyecto se desarrolló siguiendo un flujo típico de **Business Intelligence con Power BI**.

## 1️⃣ Conexión y exploración de datos

Se importó el dataset en **Power BI Desktop** y se realizó una exploración inicial para:

- Validar los tipos de datos
- Comprender la estructura del dataset
- Identificar métricas y dimensiones clave

---

## 2️⃣ Transformación de datos (Power Query)

Se realizaron transformaciones para preparar el dataset para análisis:

- Ajuste de formatos de fecha al formato **español (Latinoamérica)**
- Corrección de tipos de datos numéricos
- Creación de una **columna condicional "Nivel_Venta"** basada en ingresos
- Validación de calidad de datos utilizando **Column Profile**

---

## 3️⃣ Diseño del dashboard

Antes de construir las visualizaciones se definió:

- Estructura del dashboard
- KPIs principales
- Tipo de gráficos adecuados para cada análisis
- Jerarquía visual del diseño
- Segmentadores de datos para exploración interactiva

---

## 4️⃣ Construcción del dashboard

Se desarrollaron dos vistas principales:

### 📊 Vista Overview (Ejecutiva)

Incluye:

- KPIs principales del negocio
- Variación interanual de indicadores
- Evolución de ingresos por mes
- Comparación de ingresos por país
- Comparación por categoría de producto

---

### 🔎 Vista de análisis detallado

Permite profundizar en los datos mediante:

- Análisis de **estacionalidad vs ingresos**
- Comparación de **segmentos de cliente vs margen**
- Comparación de **categorías vs margen**
- Análisis de **país vs nivel de venta**
- Tabla de detalle de pedidos

---

## 5️⃣ Narrativa de negocio (modelo SCQA)

El dashboard incluye una narrativa estructurada utilizando el modelo:

**SCQA (Situation, Complication, Question, Answer)**

Esto permite traducir los datos en **insights estratégicos para la toma de decisiones**.

---

# 📈 Herramientas utilizadas

- **Power BI Desktop**
- **Power Query**
- **DAX (Data Analysis Expressions)**
- **Jupyter Notebook** (documentación del proyecto)
- **GitHub** (portafolio)

---

# ▶️ Cómo ejecutar o visualizar el proyecto

Este repositorio incluye:

- 📓 **Notebook de Jupyter** con la documentación del proyecto
- 📊 **Archivo Power BI (.pbix)** con el dashboard

El notebook funciona como **documentación del proceso de análisis**, no como código ejecutable.

---

# 👀 Cómo ver el dashboard

## Ver el archivo desde Google Drive

Puedes acceder directamente al archivo de Power BI en el siguiente enlace:

🔗  
https://drive.google.com/file/d/1NqHzzCXkpOqwbtB-az1JQodPmTDfLZ07/view?usp=drive_link

Para visualizarlo:

1. Descarga el archivo `.pbix`
2. Abre el archivo en **Power BI Desktop**

---

# 📊 Resultado del proyecto

El dashboard permite:

- Analizar la evolución de ingresos entre 2024 y 2025
- Identificar patrones de estacionalidad
- Comparar desempeño entre países
- Analizar segmentos de clientes
- Evaluar rentabilidad por categoría
- Esto facilita la toma de decisiones estratégicas basadas en datos.

---

# 👤 Autor

**Iván Giovanni Ramírez Correa**

Proyecto desarrollado como parte de formación en **análisis de datos y business intelligence**.
