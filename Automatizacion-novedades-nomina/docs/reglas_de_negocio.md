# Reglas de negocio

## 1. Propósito y alcance

Este documento resume las reglas que se observan en la versión publicada del código fuente. Describe el comportamiento implementado, no una interpretación legal de cómo debe liquidarse una nómina.

Antes de utilizar la solución en un proceso real, las reglas deben ser revisadas y autorizadas por los responsables de nómina y validadas frente a la normativa laboral vigente.

## 2. Identificación y homologación de empleados

- Los nombres se convierten a mayúsculas.
- Se eliminan espacios al inicio y al final.
- Se reducen secuencias de espacios a un solo espacio.
- Se eliminan marcas diacríticas para facilitar la comparación de nombres con y sin tildes.
- La hoja `PARAMETROS` relaciona el nombre encontrado en el archivo de origen con el nombre de la hoja individual, área, cargo y estado activo.
- El estado activo se reconoce cuando el valor normalizado de `ACTIVO` es `SI`.

## 3. Validación del archivo de origen

El archivo debe contener los encabezados siguientes:

- `NOMBRE`
- `FECHA`
- `HORA`
- `MODO`

Los archivos que no cumplan con la estructura requerida se omiten durante el procesamiento de prueba. Las marcaciones sin nombre, fecha válida u hora válida no se incorporan al agrupamiento de registros.

## 4. Agrupación de marcaciones

- Las marcaciones se agrupan por nombre normalizado y fecha.
- Las horas de cada grupo se ordenan cronológicamente.
- La primera marcación del grupo se toma como entrada.
- La última marcación del grupo se toma como salida.
- Si existe una sola marcación o las horas de entrada y salida son iguales, el registro se identifica como incompleto y no se calcula un intervalo completo de horas trabajadas.

## 5. Período de procesamiento

- La fecha inicial se obtiene de `PARAMETROS!H2`.
- La fecha final se obtiene de `PARAMETROS!H3`.
- Ambas celdas deben contener fechas válidas.
- La fecha inicial no puede ser posterior a la fecha final.
- Los registros se filtran para incluir únicamente fechas dentro del período configurado.
- El procesamiento de control recorre los días de lunes a sábado para los empleados activos configurados, permitiendo identificar días sin marcación.
- En esa rutina, el domingo no se procesa como día de trabajo para el registro de ausencia de marcación.

## 6. Redondeo de marcaciones

Las horas de entrada y salida se redondean al intervalo de 15 minutos más cercano mediante `Math.round(minutos / 15) * 15`. Si el redondeo llega a 60 minutos, se avanza una hora y los minutos quedan en cero.

Este comportamiento describe el algoritmo del código. No determina por sí mismo si la regla de redondeo es legal o adecuada para una política de nómina concreta.

## 7. Jornadas configuradas por cargo y día

La función `obtenerJornada_()` aplica las siguientes reglas codificadas:

| Cargo reconocido por el texto | Día | Jornada esperada |
|---|---|---:|
| Contiene `COORDINADOR` | Lunes a jueves | 9 horas |
| Contiene `COORDINADOR` | Viernes y sábado, entrada ajustada antes de las 08:30 | 5 horas |
| Contiene `COORDINADOR` | Viernes y sábado, entrada ajustada a las 08:30 o después | 6 horas |
| Contiene `SUPERVISOR` | Lunes a jueves | 9 horas |
| Contiene `SUPERVISOR` | Viernes y sábado, entrada ajustada antes de las 08:30 | 5 horas |
| Contiene `SUPERVISOR` | Viernes y sábado, entrada ajustada a las 08:30 o después | 6 horas |
| Contiene `AUXILIAR` | Lunes a jueves | 8 horas y 30 minutos |
| Contiene `AUXILIAR` | Viernes y sábado, entrada ajustada antes de las 08:30 | 5 horas |
| Contiene `AUXILIAR` | Viernes y sábado, entrada ajustada a las 08:30 o después | 5 horas y 30 minutos |
| Cualquier cargo | Domingo | 0 horas |
| Cargo sin coincidencia con las categorías anteriores | Cualquier día | 0 horas |

La comparación se realiza con el texto normalizado del cargo. Por eso, las descripciones de cargo deben configurarse de forma consistente y probarse con datos ficticios antes de ejecutar el proceso.

## 8. Cálculo de horas trabajadas y horas extra

Cuando existen una entrada y una salida válidas:

1. Se redondean ambas marcaciones.
2. Se obtiene la jornada esperada según la fecha, la hora de entrada ajustada y el cargo.
3. Se calcula la diferencia entre salida ajustada y entrada ajustada.
4. Las horas extra se calculan como horas trabajadas menos jornada esperada.
5. Si la diferencia es negativa, las horas extra se establecen en cero.

En términos conceptuales:

`Horas extra = max(0, horas trabajadas - jornada esperada)`

La implementación calcula las duraciones como fracciones de día, que Google Sheets puede presentar mediante formatos de duración como `[h]:mm:ss`.

## 9. Estados y observaciones

El procesamiento puede generar situaciones que requieren revisión, entre ellas:

- **SIN MARCACIÓN:** no se encontró un registro para la persona y fecha.
- **MARCACIÓN INCOMPLETA:** falta entrada o salida, o ambas marcaciones son iguales.
- **NOVEDAD:** la duración calculada es inferior a la jornada esperada en el escenario contemplado por el código.
- **OK:** el cálculo se realizó sin activar las condiciones de excepción descritas.

Las observaciones sirven como alertas de revisión; no reemplazan la verificación de la causa real de una ausencia o diferencia.

## 10. Revisión y consolidación

- Los resultados del procesamiento inicial se registran en `CONTROL`.
- La función de actualización de hojas individuales distribuye la información para revisión.
- Las correcciones deben revisarse antes de generar el consolidado.
- `TOTAL GENERAL` se construye desde las hojas individuales configuradas, no debe tratarse como sustituto de la revisión.
- El proceso incluye controles de integridad para detectar inconsistencias en el consolidado.

## 11. Reglas que requieren validación antes de uso productivo

- Tratamiento de domingos y festivos.
- Recargos nocturnos, dominicales y festivos, cuando apliquen.
- Pausas, almuerzos, descansos y turnos que cruzan la medianoche.
- Marcaciones duplicadas, correcciones de asistencia y excepciones autorizadas.
- Cargos nuevos o cargos cuyo nombre no coincida con las categorías reconocidas.
- Cambios de jornada derivados de actualizaciones normativas o de políticas internas.

**Aviso:** este documento explica la lógica observada en el código de portafolio. No constituye asesoría laboral ni certifica que las reglas implementadas cumplan con la normativa vigente.

