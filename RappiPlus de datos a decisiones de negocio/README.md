# 📊 RappiPlus — De datos a decisiones de negocio

## 🧠 Descripción del proyecto
Este proyecto tiene como objetivo analizar el desempeño del servicio de suscripción **RappiPlus**, evaluando su impacto en el comportamiento de compra de los usuarios, la rentabilidad del negocio y la efectividad de las estrategias de marketing.

A través de un enfoque **data-driven**, se desarrollan análisis en Python, SQL y Power BI para transformar datos en insights accionables que apoyen la toma de decisiones.

---

## 🎯 Objetivo del proyecto

Responder preguntas clave del negocio:

- ¿Podemos confiar en los datos?
- ¿El negocio es rentable?
- ¿Dónde se pierden los usuarios en el proceso de compra?
- ¿Los usuarios regresan después de registrarse?
- ¿Los cambios en el producto generan impacto?
- ¿Cómo comunicar los resultados de forma clara y efectiva?

---

## 📂 Datasets utilizados

El análisis se basa en los siguientes datasets:

### 🔹 1. Orders (Pedidos)
- Archivo: `rappiplus_orders_raw.csv`
- Contiene información de cada pedido:
  - Usuario
  - Fecha
  - Producto
  - Cantidad
  - Precio
  - Descuento
  - Monto total

---

### 🔹 2. Catalog (Catálogo de productos)
- Archivo: `rappiplus_catalog.csv`
- Información de productos:
  - Nombre del producto
  - Categoría
  - Costo unitario
  - Proveedor

---

### 🔹 3. Marketing (Inversión en marketing)
- Archivo: `rappiplus_marketing_spend.csv`
- Información de campañas:
  - Fecha
  - País
  - Canal (organic, social, paid_search)
  - Gasto

---

### 🔹 4. Events (Funnel de conversión)
- Tabla SQL: `events`
- Contiene eventos del usuario:
  - first_visit
  - select_item
  - add_to_cart
  - begin_checkout
  - add_payment_info
  - purchase

---

### 🔹 5. Users & User Activity (Retención)
- Tablas SQL:
  - `users`
  - `user_activity`
- Permiten analizar comportamiento post-registro

---

### 🔹 6. Experimento A/B
- Archivo: `experiment_checkout_ui.csv`
- Datos del experimento:
  - Variante (control / tratamiento)
  - Conversión
  - Dispositivo
  - País

---

## ⚙️ Etapas del análisis

El proyecto se desarrolló en 6 etapas principales:

---

### 🔹 Paso 1: Preparación y calidad de datos (Python)

- Limpieza de datasets
- Tratamiento de valores nulos
- Corrección de tipos de datos
- Eliminación de duplicados
- Estandarización de variables categóricas

📦 **Resultado:** 3 datasets limpios listos para análisis

---

### 🔹 Paso 2: Análisis de rentabilidad (Python)

- Cálculo de KPIs:
  - Revenue
  - Costos
  - Marketing
  - Profit
- Análisis de comportamiento de ventas:
  - Ticket promedio
  - Cantidad por orden
  - Producto más vendido

📊 **Insight clave:** El negocio es rentable y sostenible

---

### 🔹 Paso 3: Funnel de conversión (SQL)

- Construcción del funnel:
  - Usuarios por etapa
- Cálculo de tasas de conversión
- Identificación de puntos de abandono

📉 **Insight clave:** Mayor drop-off en el proceso de pago

---

### 🔹 Paso 4: Retención por cohortes (SQL)

- Creación de cohortes por mes de registro
- Cálculo de retención semanal (W1, W2, W3)

📈 **Insight clave:** ~40% de usuarios regresan, retención estable

---

### 🔹 Paso 5: Evaluación de impacto (A/B Testing con Python)

- Prueba estadística (z-test)
- Comparación control vs tratamiento

📊 **Resultado:** No hay evidencia significativa de mejora en conversión

---

### 🔹 Paso 6: Dashboard en Power BI

- Visualización de KPIs
- Análisis temporal (YTD)
- Rentabilidad por producto y categoría
- Análisis de marketing
- Drill-through a nivel de producto

📌 **Resultado:** Dashboard interactivo para toma de decisiones

---

## 📊 Herramientas utilizadas

- **Python:** Pandas, NumPy, Statsmodels  
- **SQL:** PostgreSQL  
- **Power BI:** Visualización y dashboard  
- **Jupyter Notebook:** Desarrollo del análisis  

---

## 🚀 Principales conclusiones

- El negocio es rentable y presenta crecimiento sostenido  
- Existe fricción en el checkout (oportunidad de mejora)  
- La retención es moderada (~40%)  
- El experimento A/B no mostró impacto significativo  
- Existen productos con alto potencial y otros con pérdidas  

---

## 📌 Autor

**Iván Giovanni Ramírez Correa**  
Proyecto desarrollado como parte del bootcamp de Data Analyst 🚀

---

## 📎 Nota

Este proyecto demuestra habilidades en:

- Análisis exploratorio de datos  
- Modelado y limpieza de datos  
- SQL analítico  
- Estadística aplicada  
- Visualización y storytelling  

👉 Enfocado en resolver problemas reales de negocio con datos.
