# 📊 Explorando Drivers de Comportamiento en NovaRetail+

## 📌 Descripción del Proyecto

Este proyecto analiza el comportamiento de clientes de **NovaRetail+**, una plataforma de comercio electrónico en Latinoamérica, con el objetivo de identificar qué factores están más asociados con el ingreso anual generado por los usuarios.

El análisis tiene un enfoque **exploratorio y correlacional**, buscando detectar patrones relevantes que puedan apoyar decisiones estratégicas en crecimiento, marketing y retención de clientes.

⚠️ Importante:  
Este estudio identifica **asociaciones estadísticas**, no relaciones causales.

---

## 🎯 Objetivo del Proyecto

Identificar qué variables del comportamiento del cliente están más fuertemente asociadas con el **ingreso anual generado para la empresa**, mediante el uso de técnicas de análisis correlacional y visualización de datos.

---

## 📂 Dataset Utilizado

### 🗂️ Archivo
`novaretail_comportamiento_clientes_2024.csv`

### 📏 Tamaño
- 15,000 registros
- 12 variables

### 📊 Variables Principales

| Variable | Descripción |
|-----------|-------------|
| id_cliente | Identificador único del cliente |
| edad | Edad del cliente |
| nivel_ingreso | Ingreso anual estimado del cliente |
| visitas_mes | Número de visitas mensuales |
| compras_mes | Número de compras mensuales |
| gasto_publicidad_dirigida | Inversión publicitaria asignada |
| satisfaccion | Nivel de satisfacción (1-5) |
| miembro_premium | Suscripción premium (0 = No / 1 = Sí) |
| abandono | Indica abandono del cliente |
| tipo_dispositivo | Móvil, escritorio o tablet |
| region | Región geográfica |
| ingreso_anual | 💰 Ingreso generado por cliente (Variable objetivo) |

---

## 🛠️ Herramientas y Tecnologías

- Python
- Pandas
- NumPy
- Seaborn
- Matplotlib
- SciPy
- Jupyter Notebook / Google Colab

---

## 🔎 Etapas del Análisis

### 1️⃣ Carga y Exploración del Dataset
- Validación de estructura y tipos de datos
- Identificación de valores faltantes
- Análisis descriptivo inicial

---

### 2️⃣ Preparación y Limpieza de Datos
- Conversión de tipos de datos
- Validación de variables numéricas, binarias y categóricas
- Documentación de supuestos analíticos

---

### 3️⃣ Visualización de Relaciones
- Heatmap de correlaciones globales
- Scatterplots para relaciones clave
- Identificación de patrones visuales y posibles colinealidades

---

### 4️⃣ Cálculo de Correlaciones
Se aplicaron diferentes métodos según el tipo de variable:

- **Pearson:** Relaciones lineales entre variables numéricas  
- **Spearman:** Relaciones monotónicas  
- **Punto-biserial:** Variables binarias vs numéricas  
- **V de Cramér:** Asociaciones entre variables categóricas  

---

### 5️⃣ Interpretación de Resultados
- Traducción de métricas estadísticas a insights de negocio
- Identificación de drivers asociados al ingreso
- Evaluación de impacto potencial en decisiones estratégicas

---

### 6️⃣ Limitaciones y Próximos Pasos
- Reconocimiento de límites del análisis correlacional
- Propuesta de experimentos y segmentaciones futuras

---

## ▶️ Cómo Ejecutar el Notebook

### Opción 1 — Google Colab (Recomendada)

1. Descargar el notebook desde este repositorio.
2. Ir a 👉 https://colab.research.google.com/
3. Seleccionar **Upload Notebook**
4. Subir el archivo `.ipynb`
5. Cargar el dataset en la ruta correspondiente.
6. Ejecutar las celdas en orden.

---

### Opción 2 — Ejecutar Localmente

#### Requisitos
Instalar dependencias:

```bash
pip install pandas numpy seaborn matplotlib scipy

