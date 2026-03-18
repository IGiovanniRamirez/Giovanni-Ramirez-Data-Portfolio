# 📊 Análisis del Desempeño Financiero de Adventure Works con SQL

## 🧩 Descripción del proyecto

Este proyecto tiene como objetivo analizar el desempeño financiero de la empresa **Adventure Works** a nivel de país y territorio, con el fin de identificar los mercados más rentables y apoyar la toma de decisiones estratégicas sobre inversión en marketing.

A partir de datos de ventas, productos, territorios y campañas, se construyó un análisis que permite responder:

* ¿Cuánto estamos ganando por país?
* ¿Qué tan rentable es cada mercado considerando los gastos de marketing?

---

## 🎯 Objetivo del proyecto

El objetivo principal es evaluar la rentabilidad de los mercados y optimizar la asignación del presupuesto de marketing mediante el cálculo y análisis de indicadores clave como:

* Ingresos totales
* Costos operativos
* Beneficio bruto
* Margen (%)
* ROI (%)

Este análisis busca identificar oportunidades de crecimiento y detectar ineficiencias en costos y campañas.

---

## 🗂️ Datasets utilizados

Se trabajó con un subconjunto del dataset de AdventureWorks, compuesto por las siguientes tablas:

* **ventas_2017**
  Contiene las transacciones de ventas a nivel de línea de pedido (producto por orden).

* **productos**
  Incluye información del catálogo de productos, precios y costos unitarios.

* **productos_categorias**
  Permite clasificar los productos en categorías y subcategorías.

* **territorios**
  Relaciona cada territorio con su país y continente.

* **campanas**
  Contiene información sobre el gasto en marketing por territorio.

---

## ⚙️ Etapas del análisis

### 1. Exploración del esquema

* Revisión de las tablas disponibles
* Identificación de claves primarias y foráneas
* Comprensión de las relaciones entre datasets

---

### 2. Extracción y limpieza de datos

* Integración de múltiples tablas mediante JOINs
* Manejo de valores nulos con `COALESCE`
* Creación de métricas base:

  * ingreso_total
  * costo_total

---

### 3. Cálculo de KPIs financieros

* Agregación de datos por país y territorio
* Cálculo de:

  * Ingresos
  * Costos
  * Gasto en campañas
  * Beneficio bruto
  * Margen (%)
  * ROI (%)

---

### 4. Validación de datos (QA)

* Verificación de valores nulos en claves
* Detección de cantidades no válidas (≤ 0)
* Validación de precios negativos
* Revisión de consistencia en agregaciones

---

### 5. Análisis e insights

* Identificación de mercados más rentables
* Evaluación de eficiencia de campañas de marketing
* Comparación de desempeño entre países

---

### 6. Conclusiones y recomendaciones

Se desarrolló un resumen ejecutivo basado en el enfoque:

**Contexto → Hallazgos → Implicaciones (CFI)**

Principales resultados:

* Estados Unidos destaca como el mercado más rentable (alto margen y ROI)
* Algunos países presentan baja eficiencia en campañas
* Se identifican oportunidades para optimizar costos y reasignar inversión

---

## 🛠️ Tecnologías utilizadas

* SQL (PostgreSQL)
* Google Sheets / Dashboard

---

## ▶️ Cómo ejecutar el notebook

El archivo **`.ipynb` ya se encuentra subido en este repositorio**, por lo que puede ejecutarse fácilmente desde GitHub o Google Colab.

### 🔁 Guía breve de reproducción 

#### Opción 1:

1. Abre el notebook directamente desde GitHub en este repositorio dando clic en el link del archivo `.ipynb`.
2. **Opcional:** Si quieres descargar el archivo `.ipynb` para despues ejecutarlo en un notebook como Jupyter o Colab puedes hacerlo dando clic en el icono de descargar.
<img width="112" height="49" alt="image" src="https://github.com/user-attachments/assets/a77290eb-2da4-4384-a717-1aabc00f1d22" />


#### Opción 2:
  
1. Despues de abrir el archivo `.ipynb` haz clic en el botón **“Open in Colab”** (si está disponible).
2. Si elegiste la opcion de descargar el archivo ve a 👉 https://colab.research.google.com/.
3. Seleccionar **Upload Notebook**.
4. Subir el archivo `.ipynb`
5. Cargar el dataset en la ruta correspondiente.

> Google Colab no requiere instalación local y permite ejecutar el análisis de forma inmediata.

---
# 🧑‍💻 Autor

**Iván Giovanni Ramírez Correa**

Proyecto desarrollado como parte de formación **del Bootcamp de Data Analyst**.

---

📬 *Sugerencias y comentarios son bienvenidos.*
