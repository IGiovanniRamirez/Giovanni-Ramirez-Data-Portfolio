# 📊 Validando hipótesis de negocio con pruebas estadísticas: Experimento A/B en página de inicio

## 📌 Objetivo del Proyecto

El objetivo de este proyecto es validar hipótesis de negocio mediante un **experimento A/B**, evaluando el impacto de una nueva versión de la página de inicio (Versión B) frente a la versión actual (Versión A).

Se busca responder:

- ¿La nueva versión aumenta la **tasa de conversión**?
- ¿Incrementa el **gasto promedio por usuario**?
- ¿La conversión depende de la **fuente de tráfico**?
- ¿Existen diferencias entre **usuarios nuevos y recurrentes**?

El propósito final es transformar evidencia estadística en decisiones estratégicas basadas en datos.

---

## 🗂️ Dataset Utilizado

El análisis se realiza sobre un dataset en formato CSV que contiene información de usuarios expuestos al experimento A/B.

### Variables principales:

- `user_id`: identificador único de usuario  
- `group`: versión asignada (A o B)  
- `converted`: indicador de conversión (0 = no convirtió, 1 = convirtió)  
- `revenue`: monto gastado por usuario  
- `traffic_source`: canal de adquisición (Organic, Ads, Email, Referral)  
- `user_type`: tipo de usuario (Nuevo, Recurrente)  

El dataset permite analizar tanto métricas de desempeño como variables categóricas relevantes para el negocio.

---

## 🔎 Etapas del Análisis

El proyecto sigue un flujo analítico estructurado:

### 1️⃣ Exploración y limpieza de datos (EDA)
- Revisión de valores nulos
- Validación de tipos de datos
- Estadística descriptiva inicial
- Distribución de usuarios por grupo

### 2️⃣ Análisis de tasa de conversión
- Cálculo de proporciones por grupo
- Aplicación de **prueba Z para proporciones**
- Evaluación de significancia estadística

### 3️⃣ Análisis de gasto promedio
- Comparación de medias entre grupos
- Aplicación de **prueba t de Student**
- Evaluación de significancia estadística

### 4️⃣ Análisis de variables categóricas
- Tablas de contingencia
- Aplicación de **prueba Chi-cuadrado**
- Evaluación de:
  - Fuente de tráfico vs conversión
  - Tipo de usuario vs conversión

### 5️⃣ Visualización de resultados
- Comparación gráfica de tasas de conversión
- Distribución de revenue por grupo
- Análisis segmentado por canal

### 6️⃣ Conclusiones e insights ejecutivos
- Interpretación estadística
- Traducción a impacto de negocio
- Recomendaciones accionables

---

## 🛠️ Tecnologías Utilizadas

- Python  
- Pandas  
- Seaborn 
- SciPy  
- Statsmodels  
- Jupyter Notebook / Google Colab  

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

## 🧑‍💻 Autor

Proyecto desarrollado como parte de un proceso de formación en **Data Analytics**, enfocado en análisis exploratorio, calidad de datos y generación de insights de negocio.

---

📬 *Sugerencias y comentarios son bienvenidos.*
