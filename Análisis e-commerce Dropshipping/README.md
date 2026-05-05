# 🧠 Dropshipping Profitability Analytics

## 🎯 1. Objetivo del proyecto

Este proyecto tiene como objetivo evaluar la rentabilidad real de un negocio de e-commerce bajo el modelo de dropshipping con pago contra entrega (Cash on Delivery - COD).

A diferencia de análisis tradicionales, aquí se integran:

- 📦 Operación logística  
- 💰 Costos de producto  
- 🚚 Costos de envío y devoluciones  
- 📣 Inversión en marketing  

👉 Pregunta clave:

**¿El negocio es realmente rentable después de considerar todos los costos?**

---

## 📂 2. Datasets utilizados

Se trabajó con datos 100% reales de una operación de e-commerce.

### 📦 orders_clean
Información a nivel de pedido y producto:
- order_id  
- fecha  
- producto y variación  
- cantidad  
- status_group (delivered, cancelled, returned, etc.)  
- revenue  
- cost_product  
- cost_shipping  
- cost_return  

---

### 👤 customers_clean
Información de clientes:
- customer_id  
- phone  
- datos de ubicación  

---

### 📣 marketing_clean
Datos de campañas publicitarias:
- date  
- channel (Meta Ads, TikTok Ads)  
- marketing_cost  

---

## ⚙️ 3. Etapas del análisis

### 🧹 3.1 Data Cleaning (Python - Pandas)

- Estandarización de columnas  
- Limpieza de estados de pedidos  
- Manejo de valores nulos  
- Creación de variables clave (flags)  

---

### 🏗️ 3.2 Data Modeling (SQL)

- Integración de datasets (orders + customers + marketing)  
- Construcción de la tabla analítica `fact_final`  
- Cálculo de métricas reales según estado del pedido  
- Prorrateo del costo de marketing por pedido  

---

### 🔍 3.3 Exploratory Data Analysis (EDA)

- Distribución de pedidos por estado  
- Proporción de pedidos efectivos vs no efectivos  
- Análisis de revenue y costos  
- Identificación de patrones operativos  

---

### 📊 3.4 KPI Calculation

#### 💰 Financieros
- Revenue total  
- Costos (producto, shipping, devoluciones, marketing)  
- Profit operativo  
- Profit neto  
- Márgenes  

#### 🚚 Operativos
- Fulfillment Rate  
- Return Rate  
- Cancellation Rate  
- Loss Rate  

#### 📣 Marketing
- Marketing Cost Total  
- Marketing Cost per Order  
- Marketing Cost per Delivered Order  
- ROAS  

---

### 📈 3.5 Data Visualization (Tableau)

Se desarrolló un dashboard con 4 vistas principales:

- 🟦 Executive Overview  
- 🟩 Unit Economics  
- 🟥 Operational Performance  
- 🟪 Marketing Performance  

---

## 🧠 4. Insights clave

- ⚠️ El negocio es rentable, pero con un margen neto bajo (~2%)  
- 🔄 Las cancelaciones son parte de una estrategia para reducir pérdidas mayores por devoluciones  
- 📉 Un alto porcentaje de pedidos no se completa  
- 📣 El marketing tiene ROAS positivo, pero no garantiza rentabilidad real  
- 🎯 El principal reto es la calidad de la demanda generada  

---

## 🚀 5. Resultado del proyecto

Este análisis permitió entender que:

👉 El crecimiento del negocio no depende solo del volumen de ventas  
👉 Sino de mejorar la calidad de los pedidos y la conversión real  

### Oportunidades:

- Mejorar segmentación de marketing  
- Optimizar la oferta y comunicación  
- Alinear producto con el mercado  
- Incrementar la tasa de pedidos entregados  

---

## 🛠️ 6. Tecnologías utilizadas

- 🐍 Python (Pandas)  
- 🗄️ SQL  
- 📊 Tableau  

---

## 🔗 7. Enlaces

- 📊 Dashboard: [https://public.tableau.com/app/profile/giovanni.ramirez1825/viz/Anlisisdecomercioelectrnicoydropshipping/ExecutiveOverview?publish=yes]  
- 💻 Notebook / Código: [LINK_AQUI]  
