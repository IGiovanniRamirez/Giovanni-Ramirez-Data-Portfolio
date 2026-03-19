# 🛒 Análisis de embudo y retención para MercadoLibre

## 📌 Descripción del proyecto
Este proyecto tiene como objetivo analizar el comportamiento de los usuarios dentro de la plataforma de MercadoLibre, enfocándose en dos aspectos clave del negocio:

- El **embudo de conversión**, para identificar en qué etapas se pierden usuarios.
- La **retención de usuarios**, para evaluar qué tan bien se mantienen activos a lo largo del tiempo.

A partir de este análisis, se generan **insights accionables** orientados a mejorar la conversión y la retención.

---

## 🎯 Objetivo

Analizar el recorrido del usuario desde su primera visita hasta la compra, así como su comportamiento posterior, para responder:

- ¿En qué etapa del embudo se pierde la mayor cantidad de usuarios?
- ¿Cómo varía la conversión entre etapas?
- ¿Cómo se comporta la retención de usuarios en el tiempo?
- ¿Existen diferencias relevantes por país?

---

## 🗂️ Datasets utilizados

### 1. `mercadolibre_funnel`
Contiene los eventos del usuario dentro del embudo de conversión.

**Columnas clave:**
- `user_id`: identificador único del usuario
- `event_name`: tipo de evento (first_visit, select_item, add_to_cart, etc.)
- `event_date`: fecha del evento
- `country`: país del usuario
- `device_category`: tipo de dispositivo
- `referral_source`: fuente de tráfico

---

### 2. `mercadolibre_retention`
Contiene información sobre la actividad de los usuarios después del registro.

**Columnas clave:**
- `user_id`: identificador del usuario
- `signup_date`: fecha de registro
- `activity_date`: fecha de actividad
- `day_after_signup`: días desde el registro
- `active`: indicador de actividad (1 = activo)
- `country`: país del usuario

---

## 🔄 Etapas del análisis

### 1. Exploración de datos
- Revisión de estructura de tablas
- Identificación de variables clave
- Validación de eventos del embudo

---

### 2. Construcción del embudo de conversión
- Definición del flujo completo:
  - first_visit → select_item → add_to_cart → begin_checkout → add_shipping_info → add_payment_info → purchase
- Conteo de usuarios únicos por etapa usando SQL (CTEs)

---

### 3. Cálculo de conversiones
- Cálculo de tasas de conversión por etapa
- Identificación de puntos críticos de abandono

---

### 4. Segmentación del embudo
- Análisis de conversiones por país (`country`)
- Identificación de variaciones geográficas en el comportamiento del usuario

---

### 5. Análisis de retención
- Cálculo de usuarios activos acumulados en:
  - Día 7 (D7)
  - Día 14 (D14)
  - Día 21 (D21)
  - Día 28 (D28)

---

### 6. Retención por país
- Comparación de tasas de retención entre países
- Identificación de mercados con mejor y peor desempeño

---

### 7. Análisis de cohortes
- Creación de cohortes mensuales (YYYY-MM)
- Evaluación de retención por cohorte en D7, D14, D21 y D28
- Identificación de tendencias en el tiempo

---

## 📊 Principales hallazgos

- La mayor caída del embudo ocurre entre **selección de producto y añadir al carrito**
- Existen diferencias significativas en conversión entre países
- La retención disminuye progresivamente con el tiempo
- Algunos países presentan mejor retención inicial, pero caída acelerada en el largo plazo

---

## 🚀 Recomendaciones

- Optimizar la página de producto para reducir fricción
- Implementar estrategias de confianza (reseñas, garantías, costos claros)
- Mejorar el proceso de checkout
- Aplicar estrategias de retención (incentivos, notificaciones, recompensas)

---

## 🧰 Tecnologías utilizadas

- SQL
- Google Colab
- Análisis de datos
- Modelado de métricas de producto

---

## 📈 Valor del proyecto

Este proyecto simula un caso real de análisis de producto, permitiendo:

- Comprender el comportamiento del usuario en plataformas digitales
- Identificar oportunidades de mejora basadas en datos
- Proponer soluciones accionables con impacto en negocio

---
