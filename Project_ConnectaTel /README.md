# 📊 Análisis de Uso de Clientes – ConnectaTel

## 🧠 Objetivo del proyecto

El objetivo de este proyecto es **analizar el comportamiento real de uso de los clientes** de la empresa de telecomunicaciones *ConnectaTel* en Latinoamérica (México y Colombia), utilizando datos históricos **hasta el año 2024**.

A través de un análisis exploratorio y de segmentación, se busca:

* Identificar **patrones de consumo** en llamadas y mensajes.
* Detectar **comportamientos atípicos (outliers)**.
* Construir **segmentos de clientes** según edad y nivel de uso.
* Generar **insights accionables** que ayuden a optimizar la oferta de planes y mejorar la experiencia del usuario.

Este proyecto simula un escenario real de trabajo para un rol de **Data Analyst**.

---

## 🗂️ Datasets utilizados

El análisis se basa en **tres datasets** que se complementan entre sí:

### 1. `plans.csv`

Catálogo de los planes móviles ofrecidos por ConnectaTel:

* Nombre del plan
* Precio mensual
* Minutos incluidos
* Mensajes incluidos
* GB incluidos
* Costos por consumo adicional

### 2. `users_latam.csv`

Información demográfica y contractual de los clientes:

* `user_id`
* Edad
* Ciudad
* Fecha de registro
* Plan contratado
* Fecha de churn (cuando aplica)

### 3. `usage.csv`

Registro del **uso real del servicio** por parte de los usuarios:

* Identificador del evento
* `user_id`
* Tipo de uso (`call` o `text`)
* Fecha del evento
* Duración de llamadas
* Longitud de mensajes

---

## 🔍 Etapas del análisis

El proyecto sigue un flujo de trabajo estructurado y reproducible:

1. **Carga y exploración inicial**

   * Revisión de estructura, dimensiones y tipos de datos.

2. **Identificación de problemas de calidad de datos**

   * Detección de valores nulos, sentinels y valores inválidos.
   * Revisión de fechas fuera de rango.

3. **Limpieza y preparación de los datos**

   * Corrección de edades inválidas.
   * Estandarización de variables categóricas.
   * Manejo justificado de valores nulos (MAR).

4. **Construcción de métricas de uso por usuario**

   * Cantidad de mensajes.
   * Cantidad de llamadas.
   * Minutos totales de llamadas.

5. **Análisis estadístico y visualización**

   * Histogramas y boxplots.
   * Evaluación de distribuciones y detección de outliers.

6. **Segmentación de clientes**

   * Segmentación por nivel de uso (Bajo, Medio, Alto).
   * Segmentación por edad (Joven, Adulto, Adulto Mayor).

7. **Insights ejecutivos y recomendaciones**

   * Interpretación de resultados.
   * Identificación de segmentos valiosos.
   * Propuestas de mejora en los planes comerciales.

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

## 📌 Resultados destacados

* La mayoría de los usuarios presentan **uso medio** de los servicios.
* Los usuarios de **alto uso**, aunque minoritarios, son los más valiosos para el negocio.
* Existen oportunidades claras para **diseñar planes diferenciados** basados en el comportamiento real de los clientes.

---
# 🧑‍💻 Autor

**Iván Giovanni Ramírez Correa**

Proyecto desarrollado como parte de formación **del Bootcamp de Data Analyst**.

---

📬 *Sugerencias y comentarios son bienvenidos.*

