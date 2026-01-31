# 📊 Análisis de Uso de Clientes – ConnectaTel

## 🧠 Objetivo del proyecto

El objetivo de este proyecto es **analizar el comportamiento real de uso de los clientes** de la empresa de telecomunicaciones *ConnectaTel* en Latinoamérica (México y Colombia), con el fin de:

* Identificar **patrones de uso** en llamadas y mensajes.
* Detectar **comportamientos atípicos (outliers)**.
* Construir **segmentos de clientes** según edad y nivel de consumo.
* Extraer **insights accionables** que ayuden a optimizar los planes comerciales y mejorar la experiencia del usuario.

El análisis se realiza con datos históricos registrados **hasta el año 2024** y está orientado a un enfoque de **análisis exploratorio y segmentación**, típico de un rol de *Data Analyst*.

---

## 🗂️ Datasets utilizados

El proyecto se apoya en **tres fuentes de datos** que se complementan entre sí:

### 1. `plans.csv`

Catálogo de planes móviles ofrecidos por la empresa:

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

Detalle del **uso real del servicio**:

* Identificador del evento
* `user_id`
* Tipo de evento (`call` o `text`)
* Fecha del evento
* Duración de llamadas
* Longitud de mensajes

---

## 🔍 Etapas del análisis

El proyecto sigue un flujo de trabajo programático y reproducible:

1. **Carga y exploración inicial**

   * Revisión de estructura, tipos de datos y dimensiones de cada dataset.

2. **Identificación de problemas de calidad**

   * Detección de valores nulos, sentinels y valores inválidos.
   * Revisión de fechas fuera de rango.

3. **Limpieza de datos**

   * Corrección de edades inválidas.
   * Estandarización de valores categóricos.
   * Manejo justificado de valores nulos (MAR).

4. **Construcción de métricas de uso**

   * Agregación del uso por usuario:

     * Cantidad de mensajes
     * Cantidad de llamadas
     * Minutos totales de llamada

5. **Análisis estadístico y visualización**

   * Histogramas y boxplots.
   * Identificación y evaluación de outliers.

6. **Segmentación de clientes**

   * Segmentación por nivel de uso (Bajo, Medio, Alto).
   * Segmentación por edad (Joven, Adulto, Adulto Mayor).

7. **Insight ejecutivo**

   * Interpretación de resultados.
   * Identificación de segmentos valiosos.
   * Recomendaciones comerciales basadas en datos.

---

## ▶️ Cómo ejecutar el notebook

### Opción 1: Google Colab (recomendado)

1. Abre [https://colab.research.google.com](https://colab.research.google.com)
2. Selecciona **File → Open notebook → GitHub**
3. Pega la URL de este repositorio
4. Abre el notebook principal (`.ipynb`)
5. Ejecuta las celdas en orden

### Opción 2: Ejecución local

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   ```
2. Instala las dependencias:

   ```bash
   pip install pandas numpy seaborn matplotlib
   ```
3. Abre el notebook:

   ```bash
   jupyter notebook
   ```

---

## 🔁 Guía breve de reproducción

Para reproducir el análisis correctamente:

1. Asegúrate de que los archivos `plans.csv`, `users_latam.csv` y `usage.csv` estén en la ruta indicada en el notebook.
2. Ejecuta las celdas **en orden secuencial**.
3. No saltes las etapas de limpieza, ya que afectan los resultados posteriores.
4. Las visualizaciones y segmentaciones dependen directamente de las transformaciones previas.

---

## 📌 Resultados clave

* La mayoría de los clientes presentan **uso medio**.
* Los usuarios de **alto uso**, aunque minoritarios, son los más valiosos para el negocio.
* Existen oportunidades claras para **diseñar planes diferenciados** según comportamiento real.

---

## 🧑‍💻 Autor

Proyecto desarrollado como parte de un proceso de formación en **Data Analytics**, con enfoque en análisis exploratorio, calidad de datos y generación de insights de negocio.

---

📬 *Cualquier sugerencia o mejora es bienvenida.*
