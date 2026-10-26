# Automatización de Novedades de Nómina con Google Apps Script

**Automatización de procesos · Calidad de datos · Trazabilidad · Analítica**

[![Google Sheets](https://img.shields.io/badge/Google%20Sheets-34A853?style=flat&logo=googlesheets&logoColor=white)](https://www.google.com/sheets/about/)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat&logo=googleappsscript&logoColor=white)](https://developers.google.com/apps-script)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

## 1. INFORMACIÓN GENERAL

**Nombre del proyecto:** Automatización de novedades de nómina y consolidación de horas extra

**Especialidad:** DA — Data Analytics

**Tecnologías utilizadas:**
- Google Sheets
- Google Apps Script (JavaScript)
- Google Drive
- Preparación de datos para Power BI

**Fuente del proyecto:** Problema operativo real. Automatización desarrollada para optimizar el procesamiento de novedades de nómina en un entorno empresarial que utilizaba hojas de cálculo como herramienta principal de gestión.

**Link a la fuente original:** No aplica un dataset público. El proyecto parte de un proceso interno de negocio y utiliza archivos de marcaciones de asistencia provenientes de un sistema biométrico implementado por la empresa para registrar las horas de entrada y salida de los empleados. Los archivos originales y los datos empresariales no se publicarán por motivos de confidencialidad.

---


## Navegación del proyecto

| Recurso | Descripción |
|---|---|
| [Arquitectura de la solución](docs/arquitectura.md) | Componentes técnicos, flujo de procesamiento y configuración. |
| [Reglas de negocio](docs/reglas_de_negocio.md) | Reglas de cálculo, validaciones, excepciones y limitaciones conocidas. |
| [Datos ficticios](ejemplos/datos_ficticios.csv) | Ejemplo de la estructura de entrada con información sintética. |
| [Código fuente](src/codigo_automatizacion.gs) | Implementación de la automatización en Google Apps Script. |

---

## 2. OBJETIVO

Desarrollar una solución de automatización que transforme las marcaciones de asistencia del personal en información estructurada para revisar, validar y consolidar las horas extra de nómina, reduciendo las tareas manuales y los errores de procesamiento.

La solución permite mantener trazabilidad entre los datos de origen, las novedades calculadas, la revisión individual de los registros y el consolidado final, generando una fuente estructurada que puede utilizarse posteriormente en análisis de datos y Power BI.

---

## 3. PLAN DE TRABAJO

### Paso 1. Exploración y levantamiento de requisitos

- Analizar el proceso de recepción y procesamiento de archivos de marcaciones.
- Identificar las tareas manuales, los errores recurrentes y las necesidades de trazabilidad.
- Definir las reglas de negocio para calcular jornadas y horas extra según el día de la semana y el cargo.
- Identificar las excepciones que requieren revisión humana, como marcaciones incompletas o empleados sin homologación.

### Paso 2. Preparación y estructuración de los datos

- Crear una hoja de parámetros para administrar empleados, nombres de hojas, áreas, cargos y estado activo.
- Establecer un período de procesamiento configurable.
- Normalizar nombres para facilitar la homologación entre los archivos de origen y las hojas individuales.
- Agrupar las marcaciones por empleado y fecha.
- Definir una estructura de control para registrar los resultados y las observaciones del procesamiento.

### Paso 3. Desarrollo de la automatización

- Implementar la lectura y procesamiento de los archivos de marcaciones mediante Google Apps Script.
- Calcular las horas de entrada y salida a partir de las marcaciones válidas.
- Aplicar reglas de redondeo al cuarto de hora y jornadas diferenciadas según el cargo y el día.
- Calcular las horas extra y registrar las novedades en la hoja de control.
- Automatizar la actualización de las hojas individuales de los empleados.
- Construir un consolidado final por persona y por día, incluyendo el detalle para auditoría.
- Crear un menú personalizado para ejecutar las principales operaciones desde Google Sheets.

### Paso 4. Validación y pruebas funcionales

- Verificar el tratamiento de las marcaciones completas e incompletas.
- Validar los cálculos con casos específicos de entrada, salida, jornada y horas extra.
- Comprobar que las correcciones manuales realizadas en las hojas individuales se reflejen en el consolidado final.
- Conciliar los totales por persona, por día y por detalle.
- Corregir problemas de interpretación de duraciones y desfases de fechas derivados del manejo de valores de Google Sheets.

### Paso 5. Consolidación y preparación para analítica

- Generar una tabla de horas extra por persona, ordenada de mayor a menor.
- Generar una tabla diaria de horas extra y un detalle de los registros procesados.
- Incorporar las horas en formato de duración y su equivalente decimal.
- Organizar la información para facilitar su conexión posterior con Power BI.

---

## 4. PREGUNTAS CLAVE

1. ¿Cómo garantizar que las reglas de negocio utilizadas para calcular las horas extra estén actualizadas y sean consistentes con las políticas de la empresa?

2. ¿Cómo asegurar que los datos de entrada, las correcciones manuales y los resultados consolidados mantengan la trazabilidad necesaria para una auditoría?

3. ¿Cómo escalar la solución para procesar más empleados, nuevos cargos, diferentes períodos y nuevas fuentes de información sin aumentar significativamente la complejidad del mantenimiento?

---

## 5. QUÉ SE HIZO Y CÓMO

La solución se desarrolló utilizando Google Apps Script, integrado con Google Sheets, para automatizar un proceso que anteriormente dependía de la revisión y consolidación manual de información.

La arquitectura se organizó en cuatro componentes principales:

**1. PARAMETROS**

Centraliza la configuración del período de nómina, los empleados activos, los nombres de sus hojas individuales, las áreas y los cargos.

**2. CONTROL**

Registra los resultados del procesamiento, las marcaciones originales, las horas ajustadas, las jornadas calculadas, las horas extra y las observaciones. Funciona como fuente de trazabilidad y auditoría del proceso automatizado.

**3. Hojas individuales**

Presentan las novedades de cada empleado para su revisión. Permiten corregir manualmente los registros que requieren validación antes de consolidar el resultado definitivo.

**4. HOJA TOTAL**

Consolida las horas extra a partir de las hojas individuales revisadas. Incluye el total por persona, el total diario y un detalle para auditoría.

### Decisiones técnicas relevantes

- Se implementó la normalización de nombres para resolver diferencias de escritura, tildes y espacios.
- Se estableció el redondeo de las marcaciones al intervalo de 15 minutos más cercano.
- Se parametrizaron las jornadas según el cargo y el día de la semana.
- Se incorporaron observaciones para identificar marcaciones incompletas y situaciones que requieren revisión.
- Se separó el resultado automatizado inicial de la validación manual y del consolidado definitivo.
- Se implementaron controles para comprobar la consistencia entre los totales por persona, por día y por detalle.
- Se corrigió el tratamiento de las duraciones y las fechas para evitar errores de interpretación en Google Sheets.
- Se creó un menú personalizado para ejecutar las operaciones principales sin necesidad de ingresar al editor de código.

La solución se diseñó para que las reglas y los resultados puedan mantenerse de forma centralizada, sin depender de fórmulas manuales repetidas en todas las hojas.

---

## 6. RESULTADOS

### Resultados funcionales comprobados

- Automatización del procesamiento de marcaciones y generación de novedades de nómina.
- Actualización automatizada de las hojas individuales de los empleados.
- Identificación de casos que requieren revisión por medio de estados y observaciones.
- Consolidación de las horas extra por empleado y por fecha.
- Generación de un detalle que facilita la revisión y auditoría.
- Validación de la consistencia entre los totales consolidados.
- Implementación de un menú personalizado para ejecutar el flujo operativo desde Google Sheets.
- Preparación de una estructura tabular para su uso posterior en Power BI.

### Resultado cuantitativo de validación

Durante la validación de un período de nómina, el consolidado alcanzó un total de **407,75 horas extra**, equivalentes a 407 horas y 45 minutos.

Este resultado se obtuvo después de identificar empleados activos que faltaban en la configuración y corregir un desfase en la visualización de las fechas. La validación confirmó la importancia de mantener completos los parámetros y verificar la integridad de los datos antes de publicar los resultados.

**Nota:** Este valor corresponde al período de prueba validado; no representa un indicador de ahorro de tiempo ni una medición de productividad.

---

## 7. CONCLUSIONES

Este proyecto permitió aplicar programación y análisis de datos a un problema real de gestión operativa, demostrando que es posible automatizar procesos administrativos incluso en entornos que no cuentan con un ERP.

Uno de los principales aprendizajes fue la importancia de separar el procesamiento automático, la revisión humana y la consolidación definitiva. La automatización no consiste únicamente en calcular resultados, sino también en detectar excepciones, conservar la trazabilidad y validar la integridad de la información.

También se comprobó que los detalles técnicos —como la normalización de nombres, la interpretación de duraciones y el manejo de fechas— pueden afectar significativamente la calidad de los resultados.

### ¿Qué mejoraría con más tiempo o recursos?

- Incorporar pruebas automatizadas para validar las principales reglas de negocio.
- Implementar registros de ejecución y manejo de errores más detallados.
- Ampliar las reglas configurables para festivos, excepciones y cambios de jornada, previa definición de las políticas aplicables.
- Automatizar la recepción de archivos y el seguimiento de ejecuciones.
- Desarrollar una integración estable con Power BI para facilitar el seguimiento de las horas extra y otros indicadores operativos.

### ¿Qué destacaría en una entrevista?

La capacidad de identificar un problema real, traducir reglas de negocio en código, construir una solución con Google Apps Script y diseñar controles para validar la calidad de los datos. También destacaría el enfoque de mejora continua: probar, detectar inconsistencias, corregirlas y verificar el resultado antes de considerar finalizada la automatización.

---

## Estructura del repositorio

```text
automatizacion-novedades-nomina/
├── README.md
├── src/
│   └── codigo_automatizacion.gs
├── docs/
│   ├── arquitectura.md
│   └── reglas_de_negocio.md
├── ejemplos/
│   └── datos_ficticios.csv
└── .gitignore
```

## Reglas de negocio y controles

La automatización incorpora reglas para normalizar empleados, validar la estructura de los archivos, agrupar marcaciones, redondear horas y determinar la jornada esperada según el cargo y el día de la semana.

También contempla una etapa de revisión humana antes de generar el consolidado definitivo. Los registros incompletos y las situaciones excepcionales deben verificarse antes de utilizar los resultados.

La lógica documentada describe el comportamiento del código; no constituye una certificación de cumplimiento de la normativa laboral. Las reglas aplicables deben validarse con los responsables de nómina y actualizarse cuando cambien las políticas o las disposiciones legales.

Consulta el documento completo de [reglas de negocio](docs/reglas_de_negocio.md).

## Instalación y configuración

La solución se ejecuta en Google Workspace y requiere una cuenta de Google con permisos para trabajar con Google Sheets, Google Drive y Google Apps Script.

1. Crea una hoja de cálculo de Google Sheets para las pruebas.
2. Abre **Extensiones → Apps Script**.
3. Incorpora el código fuente desde [`src/codigo_automatizacion.gs`](src/codigo_automatizacion.gs).
4. Configura las hojas y los encabezados descritos en la [documentación de arquitectura](docs/arquitectura.md).
5. Configura los parámetros del período, los empleados ficticios y las hojas individuales.
6. Si la implementación utiliza el servicio avanzado de Google Drive, habilítalo en el proyecto y configura la API correspondiente.
7. Revisa los permisos solicitados y autoriza únicamente los necesarios.
8. Ejecuta las pruebas con los [datos ficticios](ejemplos/datos_ficticios.csv), adaptándolos al formato de archivo que espera el código.
9. Valida los resultados antes de considerar la configuración terminada.

**Nota técnica:** el ejemplo público está en formato CSV, mientras que la versión del código documentada procesa archivos Excel. Para ejecutar el flujo actual, convierte los datos ficticios a un formato compatible antes de utilizarlos.

Las funciones, los nombres de hojas y los parámetros deben coincidir con los definidos en la versión del código fuente que se vaya a ejecutar.



## Seguridad y privacidad

Este proyecto se presenta con fines demostrativos y de portafolio.

- No publicar archivos reales de nómina ni de asistencia.
- No incluir nombres reales de empleados ni datos personales.
- No exponer identificadores privados de Google Drive.
- No publicar contraseñas, tokens ni credenciales.
- Revisar el código y los archivos antes de cada publicación.
- Utilizar datos sintéticos para las pruebas y demostraciones.
- Validar las reglas de negocio antes de cualquier uso productivo.

El archivo `.gitignore` ayuda a excluir determinados archivos locales, pero no elimina información que ya haya sido publicada en GitHub.


## Autor y propósito.

**Iván Giovanni Ramírez Correa**

Proyecto de portafolio enfocado en **automatización de procesos, análisis de datos y mejora continua**, desarrollado para demostrar cómo las herramientas de Google Workspace pueden utilizarse para resolver problemas operativos y mejorar la trazabilidad de la información.

El proyecto combina comprensión del proceso de negocio, programación, validación de datos y preparación de información para analítica.

---

*Proyecto de demostración. Los ejemplos públicos deben utilizar datos ficticios. La ejecución en un entorno real requiere configuración, pruebas y validación de las reglas aplicables.*

