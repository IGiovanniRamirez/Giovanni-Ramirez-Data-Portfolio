# 🏢 Dashboard de Análisis Comercial Inmobiliario  
**Proyecto: Andes Capital Real Estate**

---

## 🎯 Objetivo del proyecto

El objetivo de este proyecto es desarrollar un **dashboard interactivo en Power BI** que permita analizar el desempeño comercial de una empresa inmobiliaria, integrando información de ventas, clientes y propiedades.

A través de este análisis se busca:

- Evaluar el **desempeño general del negocio**.
- Identificar **qué segmentos, canales y tipos de propiedad generan mayor valor**.
- Analizar la **evolución temporal de las ventas**.
- Comprender la **recurrencia de clientes mediante análisis de cohortes**.
- Generar **insights estratégicos que apoyen la toma de decisiones**.

---

## 📂 Datasets utilizados

El modelo de datos se construyó bajo un **esquema estrella**, compuesto por:

### 🔹 Tabla de hechos

**`hecho_ventas_propiedades`**  
Contiene el detalle de cada transacción de venta.

- id_venta
- fecha_venta
- id_cliente
- id_propiedad
- ciudad
- precio_venta
- tipo_propiedad
- canal_venta
- porcentaje_comision
- monto_comision

---

### 🔹 Tablas dimensionales

**`dim_clientes`**  
Información de los clientes:

- id_cliente
- segmento_comprador
- pais
- ciudad

**`dim_propiedades`**  
Características de las propiedades:

- id_propiedad
- tipo_propiedad
- ciudad
- barrio
- habitaciones
- tamano_m2
- precio_publicado
- categoria_propiedad

**`dim_fecha`** *(creada en el proyecto)*  
Tabla calendario para análisis temporal:

- Date
- Año
- Mes
- Mes Número
- Año-Mes

---

## 🔄 Etapas del análisis

El desarrollo del proyecto siguió un flujo estructurado:

### 1️⃣ Limpieza de datos
- Validación de tipos de datos.
- Revisión de valores nulos (no se encontraron).
- Eliminación de inconsistencias en encabezados.
- Validación de duplicados en claves primarias.

---

### 2️⃣ Creación de tabla calendario
- Construcción dinámica usando `CALENDAR` y `ADDCOLUMNS`.
- Inclusión de campos clave para análisis temporal.

---

### 3️⃣ Modelado de datos
- Implementación de **esquema estrella**.
- Relaciones 1:* con filtro unidireccional.
- Integración de tablas de hechos y dimensiones.

---

### 4️⃣ Creación de medidas (DAX)

#### 🔹 Métricas principales:
- Ingreso Total
- Cantidad de Ventas
- Ticket Promedio
- Comisión Total

#### 🔹 Métricas analíticas:
- Participación (%) por:
  - Tipo de propiedad
  - Canal de venta
  - Segmento de cliente

#### 🔹 Inteligencia de tiempo:
- Ventas YTD
- Ventas MTD
- Crecimiento YoY

#### 🔹 Cohortes:
- Primera compra por cliente
- Mes cohorte
- Mes de venta

---

### 5️⃣ Diseño del dashboard

El dashboard se estructuró en tres páginas:

#### 📊 Overview Ejecutivo
- KPIs principales
- Tendencia de ventas
- Ventas por ciudad
- Crecimiento YoY

#### 📈 Análisis Comercial
- Ingresos por tipo de propiedad
- Canal de venta
- Segmento de cliente
- Tabla con formato condicional (semáforo)

#### 🧩 Análisis de Cohortes
- Matriz de cohortes
- Análisis de recurrencia de clientes

---

### 6️⃣ Análisis e insights
- Identificación de patrones de crecimiento.
- Evaluación de desempeño por segmento y canal.
- Análisis de retención de clientes.
- Generación de recomendaciones estratégicas.

---

## 🚀 Resultados del proyecto

El dashboard permite:

- Monitorear el **desempeño comercial en tiempo real**.
- Identificar **oportunidades de crecimiento**.
- Detectar **segmentos y canales más rentables**.
- Analizar el **ciclo de vida del cliente**.
- Apoyar decisiones basadas en datos.

---

## 🛠️ Herramientas utilizadas

- **Power BI**
- **DAX (Data Analysis Expressions)**
- **Power Query**
- Modelado de datos (esquema estrella)

---

## 📌 Conclusión

Este proyecto demuestra cómo transformar datos transaccionales en un **sistema de análisis estratégico**, permitiendo pasar de métricas descriptivas a **insights accionables** que impulsan el crecimiento del negocio.

---

Este repositorio incluye:

- 📓 **Notebook (`.ipynb`)** con la documentación del proyecto
- 📊 **Archivo Power BI (.pbix)** con el dashboard

El notebook funciona como **documentación del proceso de análisis**, no como código ejecutable.

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

# 👀 Cómo ver el dashboard

## Ver el archivo desde Google Drive

Puedes acceder directamente al archivo de Power BI en el siguiente enlace:

🔗  
https://drive.google.com/file/d/1ykyBGDg-c45HCgD2l7-zlUUl6yu1UwYa/view?usp=drive_link

Para visualizarlo:

1. Descarga el archivo `.pbix`
2. Abre el archivo en **Power BI Desktop**

---
# 🧑‍💻 Autor

**Iván Giovanni Ramírez Correa**

Proyecto desarrollado como parte de formación **del Bootcamp de Data Analyst**.
