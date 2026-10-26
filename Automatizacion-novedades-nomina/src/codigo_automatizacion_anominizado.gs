/******************************************************
* GENERAL - AUTOMATIZACIÓN DE NOVEDADES DE NÓMINA
* V1 - MODO PRUEBA
*
* Esta versión:
* - Lee los Excel de RH de la carpeta NÓMINA.
* - Identifica personas y fechas.
* - Consulta PARAMETROS.
* - Obtiene primera y última marcación.
* - Redondea a 15 minutos.
* - Determina jornada según área/cargo.
* - Calcula horas extra.
* - Escribe resultados SOLO en CONTROL.
*
* NO modifica todavía:
* - Hojas de trabajadores
* - TOTAL GENERAL
******************************************************/


const CONFIG = {

CARPETA_RAIZ: 'PRODUCCIÓN',
CARPETA_ANO: '2026',
CARPETA_NOMINA: 'NOMINA',
HOJA_PARAMETROS: 'PARAMETROS',
HOJA_CONTROL: 'CONTROL',
FILA_INICIO_PERSONAS: 2,
ZONA_HORARIA: 'America/Bogota',

HEADERS_PARAMETROS: [
'NOMBRE RH',
'NOMBRE HOJA',
'AREA',
'CARGO',
'ACTIVO'
]

};


/******************************************************
* MENÚ
******************************************************/

function onOpen() {

  const ui = SpreadsheetApp.getUi();

  ui.createMenu('📋 NOMINA GENERAL')

    .addItem(
      '🔎 Ver control',
      'VER_CONTROL'
    )
    
    .addSeparator()
    
    .addItem(
      '⚙️ Configurar sistema',
      'CONFIGURAR_SISTEMA'
    )

    .addItem(
      '🧪 Ejecutar prueba',
      'EJECUTAR_PRUEBA'
    )

    .addSeparator()

    .addItem(
      '👥 Actualizar hojas individuales',
      'ACTUALIZAR_HOJAS_INDIVIDUALES'
    )

    .addItem(
      '📊 Actualizar TOTAL GENERAL',
      'ACTUALIZAR_TOTAL_GENERAL'
    )
     
    .addToUi();

}

/******************************************************
* CONFIGURACIÓN INICIAL
******************************************************/

function CONFIGURAR_SISTEMA() {

const ss = SpreadsheetApp.getActiveSpreadsheet();

validarParametros_();

let control = ss.getSheetByName(CONFIG.HOJA_CONTROL);

if (!control) {

control = ss.insertSheet(CONFIG.HOJA_CONTROL);

}

control.clear();

const headers = [

'FECHA PROCESO',
'ARCHIVO',
'NOMBRE RH',
'NOMBRE HOJA',
'AREA',
'CARGO',
'FECHA',
'MARCACIONES',
'ENTRADA HR',
'SALIDA HR',
'ENTRADA AJUSTADA',
'SALIDA AJUSTADA',
'JORNADA',
'HORAS TRABAJADAS',
'HORAS EXTRA',
'ESTADO',
'OBSERVACIÓN',
'ID ARCHIVO'

];

control
.getRange(1, 1, 1, headers.length)
.setValues([headers]);

control
.getRange(1, 1, 1, headers.length)
.setFontWeight('bold');

control.setFrozenRows(1);

SpreadsheetApp.getUi().alert(
'Sistema configurado correctamente.\n\n' +
'La siguiente prueba NO modificará las hojas de los trabajadores.'
);

}


/******************************************************
* EJECUTAR PRUEBA
******************************************************/

function EJECUTAR_PRUEBA() {

  const ui =
    SpreadsheetApp.getUi();

  try {

    validarParametros_();

    // -----------------------------------------
    // VALIDAR PERÍODO
    // -----------------------------------------

    const periodo =
      obtenerPeriodoConfigurado_();

    Logger.log(
      '========================================'
    );

    Logger.log(
      'INICIO DE PRUEBA'
    );

    Logger.log(
      'Fecha inicio: ' +
      Utilities.formatDate(
        periodo.fechaInicio,
        Session.getScriptTimeZone(),
        'dd/MM/yyyy'
      )
    );

    Logger.log(
      'Fecha fin: ' +
      Utilities.formatDate(
        periodo.fechaFin,
        Session.getScriptTimeZone(),
        'dd/MM/yyyy'
      )
    );

    // -----------------------------------------
    // CARPETA NOMINA
    // -----------------------------------------

    const carpeta =
      obtenerCarpetaNomina_();

    const archivos =
      carpeta.getFiles();

    let cantidadExcel = 0;
    let archivosProcesados = 0;
    let archivosOmitidos = 0;
    let registrosProcesados = 0;

    // -----------------------------------------
    // RECORRER ARCHIVOS
    // -----------------------------------------

    while (archivos.hasNext()) {

      const archivo =
        archivos.next();

      if (!esExcel_(archivo)) {
        continue;
      }

      cantidadExcel++;

      Logger.log(
        '----------------------------------------'
      );

      Logger.log(
        'EXCEL ENCONTRADO: ' +
        archivo.getName()
      );

      // ---------------------------------------
      // VALIDAR ESTRUCTURA RH
      // ---------------------------------------

      if (!esArchivoRH_(archivo)) {

        Logger.log(
          'ARCHIVO OMITIDO: no tiene estructura RH.'
        );

        archivosOmitidos++;

        continue;

      }

      Logger.log(
        'ARCHIVO RH CONFIRMADO: ' +
        archivo.getName()
      );

      // ---------------------------------------
      // PROCESAR
      // ---------------------------------------

      const cantidadRegistros =
        procesarExcelPrueba_(
          archivo
        );

      registrosProcesados +=
        cantidadRegistros;

      // Solo contamos como procesado si
      // realmente tuvo registros del período.

      if (cantidadRegistros > 0) {

        archivosProcesados++;

      } else {

        Logger.log(
          'Archivo RH sin registros dentro del período: ' +
          archivo.getName()
        );

      }

    }

    // -----------------------------------------
    // RESULTADO
    // -----------------------------------------

    Logger.log(
      '========================================'
    );

    Logger.log(
      'Excel encontrados: ' +
      cantidadExcel
    );

    Logger.log(
      'Excel RH con registros del período: ' +
      archivosProcesados
    );

    Logger.log(
      'Excel omitidos: ' +
      archivosOmitidos
    );

    Logger.log(
      'Registros procesados: ' +
      registrosProcesados
    );

    ui.alert(

      'Prueba terminada.\n\n' +

      'PERÍODO:\n' +

      Utilities.formatDate(
        periodo.fechaInicio,
        Session.getScriptTimeZone(),
        'dd/MM/yyyy'
      ) +

      ' al ' +

      Utilities.formatDate(
        periodo.fechaFin,
        Session.getScriptTimeZone(),
        'dd/MM/yyyy'
      ) +

      '\n\n' +

      'Excel encontrados: ' +
      cantidadExcel +

      '\n\n' +

      'Excel RH con registros del período: ' +
      archivosProcesados +

      '\n\n' +

      'Excel omitidos: ' +
      archivosOmitidos +

      '\n\n' +

      'Registros procesados: ' +
      registrosProcesados +

      '\n\n' +

      'Revisa la hoja CONTROL.'

    );

  } catch (error) {

    Logger.log(
      'ERROR: ' +
      error.message
    );

    ui.alert(
      'Se produjo un error:\n\n' +
      error.message
    );

  }

}

function esArchivoRH_(archivo) {

  let temporal = null;

  try {

    temporal = convertirExcelATemporal_(archivo);

    const ssTemporal =
      SpreadsheetApp.openById(
        temporal.getId()
      );

    const hoja =
      ssTemporal.getSheets()[0];

    const datos =
      hoja.getDataRange().getValues();

    if (
      !datos ||
      datos.length === 0
    ) {

      return false;

    }

    const encabezados =
      datos[0].map(h =>
        String(h)
          .replace(/\uFEFF/g, '')
          .replace(/\u00A0/g, ' ')
          .trim()
          .toUpperCase()
      );

    Logger.log(
      'Encabezados de "' +
      archivo.getName() +
      '": ' +
      JSON.stringify(encabezados)
    );

    const requeridos = [
      'NOMBRE',
      'FECHA',
      'HORA',
      'MODO'
    ];

    const esRH =
      requeridos.every(columna =>
        encabezados.indexOf(columna) !== -1
      );

    return esRH;

  } catch (error) {

    Logger.log(
      'No se pudo validar "' +
      archivo.getName() +
      '": ' +
      error.message
    );

    return false;

  } finally {

    if (temporal) {

      try {
        temporal.setTrashed(true);
      } catch (e) {
        Logger.log(
          'No se pudo eliminar temporal: ' +
          e.message
        );
      }

    }

  }

}

/******************************************************
* PROCESAR EXCEL EN MODO PRUEBA
******************************************************/

function procesarExcelPrueba_(archivo) {

  const temporal =
    convertirExcelATemporal_(archivo);

  try {

    const ssTemporal =
      SpreadsheetApp.openById(
        temporal.getId()
      );

    /*
     * Asegurar zona horaria Colombia.
     */
    ssTemporal.setSpreadsheetTimeZone(
      CONFIG.ZONA_HORARIA
    );

    const hoja =
      ssTemporal.getSheets()[0];

    const rangoDatos =
      hoja.getDataRange();

    /*
     * =====================================================
     * DOS FORMAS DE LEER EL MISMO ARCHIVO
     * =====================================================
     */

    const datosValores =
      rangoDatos.getValues();

    const datosMostrados =
      rangoDatos.getDisplayValues();


    Logger.log(
      '========================================'
    );

    Logger.log(
      'Archivo procesado: ' +
      archivo.getName()
    );

    Logger.log(
      'Zona horaria temporal: ' +
      ssTemporal.getSpreadsheetTimeZone()
    );

    Logger.log(
      'Hoja temporal: ' +
      hoja.getName()
    );

    Logger.log(
      'Filas encontradas: ' +
      datosValores.length
    );

    Logger.log(
      'Columnas encontradas: ' +
      (
        datosValores.length > 0
          ? datosValores[0].length
          : 0
      )
    );


    if (datosValores.length < 2) {

      Logger.log(
        'Archivo sin registros: ' +
        archivo.getName()
      );

      /*
       * Aunque el archivo venga vacío, continuamos
       * para que CONTROL pueda registrar los días
       * sin marcaciones.
       */

    }


    /*
     * =====================================================
     * ENCABEZADOS
     * =====================================================
     */

    const encabezados =
      datosValores.length > 0
        ? datosValores[0].map(h =>
            normalizarTexto_(h)
          )
        : [];


    Logger.log(
      'ENCABEZADOS NORMALIZADOS: ' +
      JSON.stringify(encabezados)
    );


    /*
     * =====================================================
     * COLUMNAS RH
     * =====================================================
     */

    let columnas = null;

    if (datosValores.length > 0) {

      columnas =
        obtenerColumnasRH_(
          encabezados
        );

    }


    /*
     * =====================================================
     * CONSTRUIR DATOS PARA EL PROCESAMIENTO
     * =====================================================
     */

    let datos = [];

    if (
      datosValores.length > 0 &&
      columnas
    ) {

      datos =
        datosValores.map(
          (fila, indiceFila) => {

            const filaNueva =
              fila.slice();

            if (
              columnas.hora !== undefined &&
              datosMostrados[indiceFila]
            ) {

              filaNueva[columnas.hora] =
                datosMostrados[indiceFila][
                  columnas.hora
                ];

            }

            return filaNueva;

          }
        );

    }


    /*
     * =====================================================
     * PERÍODO CONFIGURADO
     * =====================================================
     */

    const periodo =
      obtenerPeriodoConfigurado_();

    Logger.log(
      'PERÍODO CONFIGURADO: ' +
      Utilities.formatDate(
        periodo.fechaInicio,
        CONFIG.ZONA_HORARIA,
        'dd/MM/yyyy'
      ) +
      ' hasta ' +
      Utilities.formatDate(
        periodo.fechaFin,
        CONFIG.ZONA_HORARIA,
        'dd/MM/yyyy'
      )
    );


    /*
     * =====================================================
     * PARÁMETROS
     * =====================================================
     *
     * Contiene todos los empleados configurados.
     */

    const parametros =
      cargarParametros_();


    /*
     * =====================================================
     * AGRUPAR MARCACIONES
     * =====================================================
     *
     * Si el archivo contiene registros válidos,
     * agrupamos persona + fecha.
     *
     * Si no contiene registros, simplemente
     * tendremos un objeto vacío.
     */

    let registros = {};

    if (
      datos.length > 1 &&
      columnas
    ) {

      registros =
        agruparRegistros_(
          datos,
          columnas
        );

    }


    /*
     * =====================================================
     * ÍNDICE DE REGISTROS DEL ARCHIVO
     * =====================================================
     *
     * La clave es:
     *
     * NOMBRE NORMALIZADO | FECHA
     *
     * Esto permite buscar rápidamente si una
     * persona tiene o no marcación en determinado día.
     */

    const registrosPeriodo =
      {};

    Object.keys(registros).forEach(
      clave => {

        const registro =
          registros[clave];

        if (
          fechaDentroDelPeriodo_(
            registro.fecha,
            periodo
          )
        ) {

          registrosPeriodo[clave] =
            registro;

        }

      }
    );


    /*
     * =====================================================
     * PROCESAR TODOS LOS EMPLEADOS ACTIVOS
     * Y TODOS LOS DÍAS LUNES-SÁBADO
     * =====================================================
     *
     * Esta es la principal mejora.
     *
     * Ya no dependemos únicamente de las marcaciones
     * encontradas en el archivo.
     *
     * CONTROL tendrá también los días en los que
     * NO EXISTE ninguna marcación.
     */

    let totalFilasControl =
      0;

    let totalConMarcacion =
      0;

    let totalSinMarcacion =
      0;


    Object.keys(parametros).forEach(
      nombreParametro => {

        const parametro =
          parametros[nombreParametro];


        /*
         * Solo empleados activos.
         */

        if (!parametro.activo) {
          return;
        }


        /*
         * =================================================
         * RECORRER CADA FECHA DEL PERÍODO
         * =================================================
         */

        const fechaActual =
          new Date(
            periodo.fechaInicio
          );

        fechaActual.setHours(
          0,
          0,
          0,
          0
        );


        while (
          fechaActual <= periodo.fechaFin
        ) {

          const dia =
            fechaActual.getDay();


          /*
           * Solo lunes a sábado.
           *
           * Domingo = 0
           */

          if (
            dia >= 1 &&
            dia <= 6
          ) {

            const fechaClave =
              formatearFechaClave_(
                fechaActual
              );

            const clave =
              nombreParametro +
              '|' +
              fechaClave;


            /*
             * =================================================
             * ¿EXISTEN MARCACIONES?
             * =================================================
             */

            const registro =
              registrosPeriodo[clave];


            let entradaHR =
              null;

            let salidaHR =
              null;

            let marcaciones =
              0;


            if (registro) {

              entradaHR =
                registro.entrada;

              salidaHR =
                registro.salida;

              marcaciones =
                registro.horas.length;

              totalConMarcacion++;

            } else {

              totalSinMarcacion++;

            }


            /*
             * =================================================
             * CALCULAR NOVEDAD
             * =================================================
             *
             * Si no existe registro, construimos
             * explícitamente una novedad de
             * SIN MARCACIÓN.
             */

            let calculo;


            if (!registro) {

              calculo = {

                estado:
                  'SIN MARCACIÓN',

                observacion:
                  'VERIFICAR NO HAY MARCACIONES PARA ESTE DIA',

                entradaAjustada:
                  null,

                salidaAjustada:
                  null,

                jornada:
                  0,

                horasTrabajadas:
                  0,

                horasExtra:
                  0

              };

            } else {

              calculo =
                calcularNovedad_(
                  registro,
                  parametro.cargo
                );

            }


            /*
             * =================================================
             * DETERMINAR ESTADO / OBSERVACIÓN
             * =================================================
             */

            let estado =
              calculo.estado;

            let observacion =
              calculo.observacion;


            /*
             * Solo una marcación:
             * entrada o salida.
             */

            if (
              registro &&
              registro.horas.length === 1
            ) {

              estado =
                'MARCACIÓN INCOMPLETA';


              if (entradaHR) {

                observacion =
                  'VERIFICAR SOLO HAY MARCACION DE ENTRADA';

              } else if (salidaHR) {

                observacion =
                  'VERIFICAR SOLO HAY MARCACION DE SALIDA';

              }

            }


            /*
             * =================================================
             * VALIDAR DURACIÓN INFERIOR AL TURNO
             * =================================================
             *
             * Si existen entrada y salida, pero las
             * horas trabajadas son inferiores a la
             * jornada esperada, lo marcamos como NOVEDAD.
             */

            if (
              registro &&
              entradaHR &&
              salidaHR &&
              calculo.estado === 'OK' &&
              calculo.horasTrabajadas <
                calculo.jornada
            ) {

              estado =
                'NOVEDAD';

              observacion =
                'VERIFICAR NOVEDAD DURACION DE TURNO INFERIOR';

            }


            /*
             * =================================================
             * REGISTRAR EN CONTROL
             * =================================================
             */

            registrarResultadoControl_({

              archivo:
                archivo.getName(),

              idArchivo:
                archivo.getId(),

              nombre:
                nombreParametro,

              nombreHoja:
                parametro.nombreHoja,

              area:
                parametro.area,

              cargo:
                parametro.cargo,

              fecha:
                new Date(fechaActual),

              marcaciones:
                marcaciones,

              entradaHR:
                entradaHR,

              salidaHR:
                salidaHR,

              entradaAjustada:
                calculo.entradaAjustada,

              salidaAjustada:
                calculo.salidaAjustada,

              jornada:
                calculo.jornada,

              horasTrabajadas:
                calculo.horasTrabajadas,

              horasExtra:
                calculo.horasExtra,

              estado:
                estado,

              observacion:
                observacion

            });


            totalFilasControl++;

          }


          /*
           * Avanzar un día.
           */

          fechaActual.setDate(
            fechaActual.getDate() + 1
          );

        }

      }
    );


    /*
     * =====================================================
     * RESUMEN DEL PROCESAMIENTO
     * =====================================================
     */

    Logger.log(
      '========================================'
    );

    Logger.log(
      'FILAS REGISTRADAS EN CONTROL: ' +
      totalFilasControl
    );

    Logger.log(
      'DÍAS CON MARCACIÓN: ' +
      totalConMarcacion
    );

    Logger.log(
      'DÍAS SIN MARCACIÓN: ' +
      totalSinMarcacion
    );

    Logger.log(
      '========================================'
    );


    return totalFilasControl;


  } finally {

    /*
     * Eliminar archivo temporal.
     */

    temporal.setTrashed(true);

  }

}

/******************************************************
* AGRUPAR REGISTROS POR PERSONA + FECHA
******************************************************/

function agruparRegistros_(datos, columnas) {

const registros = {};

for (let i = 1; i < datos.length; i++) {

const fila = datos[i];

const nombre =
normalizarTexto_(
fila[columnas.nombre]
);

if (!nombre) {
continue;
}

const fecha =
convertirFecha_(fila[columnas.fecha]);

const hora =
convertirHora_(fila[columnas.hora]);

if (!fecha || !hora) {
continue;
}

const clave =
nombre + '|' + formatearFechaClave_(fecha);

if (!registros[clave]) {

registros[clave] = {

nombre: nombre,

fecha: fecha,

horas: []

};

}

registros[clave].horas.push(hora);

}


Object.keys(registros).forEach(clave => {

const r =
registros[clave];

r.horas.sort(
(a, b) => a.getTime() - b.getTime()
);

r.entrada =
r.horas[0];

r.salida =
r.horas[r.horas.length - 1];

});

return registros;

}


/******************************************************
* CÁLCULO DE NOVEDAD
******************************************************/

function calcularNovedad_(registro, cargo) {

  const entrada =
    registro.entrada || null;

  const salida =
    registro.salida || null;


  /*
   * =====================================================
   * SIN MARCACIONES
   * =====================================================
   */

  if (!entrada && !salida) {

    return {

      estado:
        'SIN MARCACIÓN',

      observacion:
        'No se encontraron marcaciones válidas para la persona y fecha.',

      entradaAjustada:
        null,

      salidaAjustada:
        null,

      jornada:
        0,

      horasTrabajadas:
        0,

      horasExtra:
        0

    };

  }


  /*
   * =====================================================
   * MARCACIÓN INCOMPLETA
   * =====================================================
   *
   * Si solamente existe entrada:
   *
   * entrada      → conservar
   * salida       → vacío
   * entrada ajustada → calcular
   * salida ajustada  → vacío
   *
   * Si solamente existe salida:
   *
   * entrada      → vacío
   * salida       → conservar
   * entrada ajustada → vacío
   * salida ajustada  → calcular
   *
   * No calculamos horas trabajadas ni horas extra
   * porque no tenemos el intervalo completo.
   */

  if (
    !entrada ||
    !salida ||
    registro.horas.length < 2 ||
    entrada.getTime() === salida.getTime()
  ) {

    let entradaAjustada =
      null;

    let salidaAjustada =
      null;


    if (entrada) {

      entradaAjustada =
        redondear15_(
          entrada
        );

    }


    if (salida) {

      salidaAjustada =
        redondear15_(
          salida
        );

    }


    let observacion =
      'Marcación incompleta.';


    if (
      entrada &&
      !salida
    ) {

      observacion =
        'Solo existe marcación de entrada para la persona y fecha.';

    }


    if (
      !entrada &&
      salida
    ) {

      observacion =
        'Solo existe marcación de salida para la persona y fecha.';

    }


    if (
      entrada &&
      salida &&
      entrada.getTime() === salida.getTime()
    ) {

      observacion =
        'Las marcaciones de entrada y salida son iguales.';

    }


    return {

      estado:
        'MARCACIÓN INCOMPLETA',

      observacion:
        observacion,

      entradaAjustada:
        entradaAjustada,

      salidaAjustada:
        salidaAjustada,

      jornada:
        0,

      horasTrabajadas:
        0,

      horasExtra:
        0

    };

  }


  /*
   * =====================================================
   * REGISTRO COMPLETO
   * =====================================================
   */

  const entradaAjustada =
    redondear15_(
      entrada
    );

  const salidaAjustada =
    redondear15_(
      salida
    );


  /*
   * =====================================================
   * JORNADA
   * =====================================================
   */

  const jornada =
    obtenerJornada_(
      registro.fecha,
      entradaAjustada,
      cargo
    );


  /*
   * =====================================================
   * HORAS TRABAJADAS
   * ===================================================== */

  const horasTrabajadas =
    diferenciaHoras_(
      entradaAjustada,
      salidaAjustada
    );


  /*
   * =====================================================
   * HORAS EXTRA
   * ===================================================== */

  let horasExtra =
    horasTrabajadas -
    jornada;


  if (horasExtra < 0) {

    horasExtra = 0;

  }


  /*
   * =====================================================
   * RESULTADO COMPLETO
   * =====================================================
   */

  return {

    estado:
      'OK',

    observacion:
      '',

    entradaAjustada:
      entradaAjustada,

    salidaAjustada:
      salidaAjustada,

    jornada:
      jornada,

    horasTrabajadas:
      horasTrabajadas,

    horasExtra:
      horasExtra

  };

}

/******************************************************
* REGLAS DE JORNADA
******************************************************/

function obtenerJornada_(fecha, entradaAjustada, cargo) {

  const dia =
    fecha.getDay();

  const cargoNormalizado =
    normalizarTexto_(cargo);

  /*
   * ==================================================
   * DOMINGO
   * ==================================================
   *
   * Todavía no se ha definido una regla.
   */

  if (dia === 0) {

    return 0;

  }


  /*
   * ==================================================
   * COORDINADOR DE MANTENIMIENTO
   * ==================================================
   */

  if (
    cargoNormalizado.includes('COORDINADOR')
  ) {

    /*
     * Lunes a jueves
     * → 9:00 horas
     */

    if (
      dia >= 1 &&
      dia <= 4
    ) {

      return 9 / 24;

    }

    /*
     * Viernes y sábado
     *
     * Entrada < 08:30
     * → 5:00 horas
     *
     * Entrada >= 08:30
     * → 6:00 horas
     */

    if (
      dia === 5 ||
      dia === 6
    ) {

      if (!entradaAjustada) {

        return 5 / 24;

      }

      const horaEntrada =
        entradaAjustada.getHours() +
        entradaAjustada.getMinutes() / 60;

      if (
        horaEntrada >= 8.5
      ) {

        return 6 / 24;

      } else {

        return 5 / 24;

      }

    }

  }


  /*
   * ==================================================
   * SUPERVISOR DE PRODUCCIÓN
   * ==================================================
   */

  if (
    cargoNormalizado.includes('SUPERVISOR')
  ) {

    /*
     * Lunes a jueves
     * → 9:00 horas
     */

    if (
      dia >= 1 &&
      dia <= 4
    ) {

      return 9 / 24;

    }

    /*
     * Viernes y sábado
     *
     * Entrada < 08:30
     * → 5:00 horas
     *
     * Entrada >= 08:30
     * → 6:00 horas
     */

    if (
      dia === 5 ||
      dia === 6
    ) {

      if (!entradaAjustada) {

        return 5 / 24;

      }

      const horaEntrada =
        entradaAjustada.getHours() +
        entradaAjustada.getMinutes() / 60;

      if (
        horaEntrada >= 8.5
      ) {

        return 6 / 24;

      } else {

        return 5 / 24;

      }

    }

  }


  /*
   * ==================================================
   * AUXILIAR DE PRODUCCIÓN
   * ==================================================
   *
   * Esta regla se conserva exactamente.
   */

  if (
    cargoNormalizado.includes('AUXILIAR')
  ) {

    /*
     * Lunes a jueves
     * → 8:30 horas
     */

    if (
      dia >= 1 &&
      dia <= 4
    ) {

      return 8.5 / 24;

    }

    /*
     * Viernes y sábado
     *
     * Entrada ajustada < 08:30
     * → 5:00
     *
     * Entrada ajustada >= 08:30
     * → 5:30
     */

    if (
      dia === 5 ||
      dia === 6
    ) {

      const horaEntrada =
        entradaAjustada.getHours() +
        entradaAjustada.getMinutes() / 60;

      if (
        horaEntrada >= 8.5
      ) {

        return 5.5 / 24;

      } else {

        return 5 / 24;

      }

    }

  }


  /*
   * ==================================================
   * CARGO SIN REGLA
   * ==================================================
   */

  return 0;

}

/******************************************************
* REDONDEAR A 15 MINUTOS
******************************************************/

function redondear15_(fecha) {

const resultado =
new Date(fecha);

resultado.setSeconds(0);
resultado.setMilliseconds(0);

const minutos =
resultado.getMinutes();

const minutosRedondeados =
Math.round(minutos / 15) * 15;

if (minutosRedondeados === 60) {

resultado.setHours(
resultado.getHours() + 1
);

resultado.setMinutes(0);

} else {

resultado.setMinutes(
minutosRedondeados
);

}

return resultado;

}


/******************************************************
* DIFERENCIA ENTRE HORAS
******************************************************/

function diferenciaHoras_(entrada, salida) {

return (
salida.getTime() -
entrada.getTime()
) / 86400000;

}


/******************************************************
* CONVERTIR EXCEL A GOOGLE SHEETS TEMPORAL
******************************************************/

function convertirExcelATemporal_(archivo) {

  const blob = archivo.getBlob();

  blob.setContentType(
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );

  const recurso = {
    name: '[TEMP GENERAL] ' + archivo.getName(),
    mimeType: 'application/vnd.google-apps.spreadsheet'
  };

  const creado = Drive.Files.create(
    recurso,
    blob
  );

  Utilities.sleep(2000);

  const temporal =
    DriveApp.getFileById(creado.id);

  /*
   * MUY IMPORTANTE:
   *
   * El Excel convertido puede quedar con una
   * zona horaria diferente a Colombia.
   *
   * Eso provoca desplazamientos como:
   *
   * 05:50 → 02:50
   *
   * y:
   *
   * 17/08/2026 → 16/08/2026
   *
   * Forzamos la hoja temporal a la zona horaria
   * de Colombia ANTES de leer los valores.
   */

  const ssTemporal =
    SpreadsheetApp.openById(
      temporal.getId()
    );

  ssTemporal.setSpreadsheetTimeZone(
    CONFIG.ZONA_HORARIA
  );

  return temporal;

}

/******************************************************
* OBTENER CARPETA NÓMINA
******************************************************/

function obtenerCarpetaNomina_() {

// Configura aquí el ID de la carpeta raíz en tu propio Google Drive
const ID_PRODUCCION = 'REEMPLAZAR_CON_ID_DE_CARPETA';

// Acceder a la carpeta raíz configurada mediante su ID
const raiz = DriveApp.getFolderById(ID_PRODUCCION);

// Buscar la carpeta 2026 dentro de PRODUCCIÓN
const carpetasAno = raiz.getFolders();
let ano = null;

while (carpetasAno.hasNext()) {

const carpeta = carpetasAno.next();

if (
carpeta.getName().trim() ===
String(CONFIG.CARPETA_ANO).trim()
) {
ano = carpeta;
break;
}
}

if (!ano) {
throw new Error(
`No se encontró la carpeta "${CONFIG.CARPETA_ANO}" dentro de "${raiz.getName()}".`
);
}

// Buscar NOMINA dentro de 2026
const carpetasNomina = ano.getFolders();
let nomina = null;

while (carpetasNomina.hasNext()) {

const carpeta = carpetasNomina.next();

if (
carpeta.getName().trim().toUpperCase() ===
String(CONFIG.CARPETA_NOMINA).trim().toUpperCase()
) {
nomina = carpeta;
break;
}
}

if (!nomina) {
throw new Error(
`No se encontró la carpeta "${CONFIG.CARPETA_NOMINA}" dentro de "${ano.getName()}".`
);
}

return nomina;
}

function obtenerUnicaCarpeta_(iterator, nombre) {

if (!iterator.hasNext()) {

throw new Error(
`No se encontró la carpeta "${nombre}".`
);

}

return iterator.next();

}

/******************************************************
* IDENTIFICAR ARCHIVO EXCEL
******************************************************/

function esExcel_(archivo) {

const mime =
archivo.getMimeType();

return (
mime ===
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
||
mime ===
'application/vnd.ms-excel'
);

}


/******************************************************
* COLUMNAS DEL ARCHIVO RH
******************************************************/

function obtenerColumnasRH_(headers) {

// Normalizar encabezados para evitar problemas
// con espacios, mayúsculas y caracteres invisibles.
const encabezadosNormalizados = headers.map(header =>
String(header)
.replace(/\uFEFF/g, '')
.replace(/\u00A0/g, ' ')
.trim()
.toUpperCase()
);

const buscar = nombre => {

const nombreNormalizado = String(nombre)
.replace(/\uFEFF/g, '')
.replace(/\u00A0/g, ' ')
.trim()
.toUpperCase();

const indice = encabezadosNormalizados.indexOf(nombreNormalizado);

if (indice === -1) {

throw new Error(
`No se encontró la columna "${nombre}" en el archivo RH. ` +
`Columnas encontradas: ${headers.join(' | ')}`
);

}

return indice;

};

return {

nombre: buscar('NOMBRE'),
fecha: buscar('FECHA'),
hora: buscar('HORA'),
modo: buscar('MODO')

};

}


/******************************************************
* CARGAR PARAMETROS
******************************************************/

function cargarParametros_() {

const ss =
SpreadsheetApp.getActiveSpreadsheet();

const hoja =
ss.getSheetByName(
CONFIG.HOJA_PARAMETROS
);

const ultimaFila =
hoja.getLastRow();

if (ultimaFila < 2) {

throw new Error(
'La hoja PARAMETROS no contiene personas.'
);

}

const datos =
hoja
.getRange(
2,
1,
ultimaFila - 1,
5
)
.getValues();

const parametros = {};

datos.forEach(fila => {

const nombre =
normalizarTexto_(fila[0]);

if (!nombre) {
return;
}

parametros[nombre] = {

nombreHoja:
String(fila[1]).trim(),

area:
String(fila[2]).trim(),

cargo:
String(fila[3]).trim(),

activo:
normalizarTexto_(fila[4]) === 'SI'

};

});

return parametros;

}


/******************************************************
* VALIDAR PARAMETROS
******************************************************/

function validarParametros_() {

const ss =
SpreadsheetApp.getActiveSpreadsheet();

const hoja =
ss.getSheetByName(
CONFIG.HOJA_PARAMETROS
);

if (!hoja) {

throw new Error(
'No existe la hoja PARAMETROS.'
);

}

const headers =
hoja
.getRange(1, 1, 1, 5)
.getValues()[0]
.map(h =>
normalizarTexto_(h)
);

CONFIG.HEADERS_PARAMETROS.forEach(
(esperado, indice) => {

if (
headers[indice] !==
normalizarTexto_(esperado)
) {

throw new Error(
`PARAMETROS: la columna ${indice + 1} debe ser "${esperado}".`
);

}

}
);

}


/******************************************************
* NORMALIZAR TEXTO
******************************************************/

function normalizarTexto_(texto) {

if (
texto === null ||
texto === undefined
) {

return '';

}

return String(texto)
.trim()
.toUpperCase()
.normalize('NFD')
.replace(/[\u0300-\u036f]/g, '')
.replace(/\s+/g, ' ');

}


/******************************************************
* FECHA
******************************************************/

function convertirFecha_(valor) {

  if (
    valor === null ||
    valor === undefined ||
    valor === ''
  ) {
    return null;
  }

  /*
   * =====================================================
   * FECHA PROVENIENTE DEL EXCEL CONVERTIDO
   * =====================================================
   *
   * Google Sheets puede entregar una fecha de Excel
   * como un objeto Date que, al interpretarse en
   * America/Bogota, queda desplazado al día anterior.
   *
   * Ejemplo:
   *
   * Fecha real en Excel:
   * 05/09/2026
   *
   * Valor Date interpretado:
   * 04/09/2026 22:00:00
   *
   * En este caso debemos recuperar los componentes
   * UTC del Date, que representan el día calendario
   * original de Excel.
   */

  if (
    Object.prototype.toString.call(valor) ===
      '[object Date]' &&
    !isNaN(valor.getTime())
  ) {

    return new Date(
      valor.getUTCFullYear(),
      valor.getUTCMonth(),
      valor.getUTCDate()
    );

  }


  /*
   * =====================================================
   * RESPALDO PARA FECHAS QUE LLEGUEN COMO TEXTO
   * =====================================================
   */

  if (typeof valor === 'string') {

    const texto =
      valor
        .trim()
        .replace(/\s+/g, ' ');

    /*
     * dd/MM/yyyy
     */

    let match =
      texto.match(
        /^(\d{1,2})\/(\d{1,2})\/(\d{4})/
      );

    if (match) {

      const dia =
        Number(match[1]);

      const mes =
        Number(match[2]) - 1;

      const anio =
        Number(match[3]);

      const fecha =
        new Date(
          anio,
          mes,
          dia
        );

      if (
        fecha.getFullYear() === anio &&
        fecha.getMonth() === mes &&
        fecha.getDate() === dia
      ) {

        return fecha;

      }

      return null;

    }


    /*
     * yyyy-MM-dd
     */

    match =
      texto.match(
        /^(\d{4})-(\d{1,2})-(\d{1,2})/
      );

    if (match) {

      const anio =
        Number(match[1]);

      const mes =
        Number(match[2]) - 1;

      const dia =
        Number(match[3]);

      return new Date(
        anio,
        mes,
        dia
      );

    }

    return null;

  }

  return null;

}

/******************************************************
* HORA
******************************************************/

function convertirHora_(valor) {

  /*
   * Si Google Sheets devuelve un Date,
   * ahora que la hoja temporal está en
   * America/Bogota usamos la hora LOCAL.
   */

  if (
    Object.prototype.toString.call(valor) ===
      '[object Date]' &&
    !isNaN(valor.getTime())
  ) {

    return new Date(
      1899,
      11,
      30,
      valor.getHours(),
      valor.getMinutes(),
      valor.getSeconds()
    );

  }

  /*
   * Hora como fracción de día.
   *
   * Ejemplo:
   * 0.25 = 06:00:00
   */

  if (
    typeof valor === 'number'
  ) {

    let totalSegundos =
      Math.round(
        valor * 86400
      );

    totalSegundos =
      totalSegundos % 86400;

    const horas =
      Math.floor(
        totalSegundos / 3600
      );

    const minutos =
      Math.floor(
        (totalSegundos % 3600) / 60
      );

    const segundos =
      totalSegundos % 60;

    return new Date(
      1899,
      11,
      30,
      horas,
      minutos,
      segundos
    );

  }

  if (
    typeof valor === 'string'
  ) {

    const texto =
      valor.trim();

    const match =
      texto.match(
        /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/
      );

    if (match) {

      const horas =
        Number(match[1]);

      const minutos =
        Number(match[2]);

      const segundos =
        Number(match[3] || 0);

      if (
        horas >= 0 &&
        horas <= 23 &&
        minutos >= 0 &&
        minutos <= 59 &&
        segundos >= 0 &&
        segundos <= 59
      ) {

        return new Date(
          1899,
          11,
          30,
          horas,
          minutos,
          segundos
        );

      }

    }

  }

  return null;

}


/******************************************************
* CLAVE DE FECHA
******************************************************/

function formatearFechaClave_(fecha) {

  return Utilities.formatDate(
    fecha,
    CONFIG.ZONA_HORARIA,
    'yyyy-MM-dd'
  );

}

/******************************************************
* REGISTRAR EN CONTROL
******************************************************/

function registrarResultadoControl_(r) {

  const ss =
    SpreadsheetApp.getActiveSpreadsheet();

  const hoja =
    ss.getSheetByName(
      CONFIG.HOJA_CONTROL
    );

  if (!hoja) {
    throw new Error(
      'No existe la hoja CONTROL.'
    );
  }


  /*
   * =====================================================
   * FECHA Y HORA DEL PROCESO
   * =====================================================
   */

  const fechaProceso =
    Utilities.formatDate(
      new Date(),
      CONFIG.ZONA_HORARIA,
      'dd/MM/yyyy HH:mm:ss'
    );


  /*
   * =====================================================
   * FECHA DE LA MARCACIÓN
   * =====================================================
   */

  let fechaTexto = '';

  if (r.fecha) {

    fechaTexto =
      Utilities.formatDate(
        r.fecha,
        CONFIG.ZONA_HORARIA,
        'dd/MM/yyyy'
      );

  }


  /*
   * =====================================================
   * CONVERTIR HORA A TEXTO
   * =====================================================
   */

  const convertirHoraTexto =
    function(valor) {

      if (
        valor === null ||
        valor === undefined ||
        valor === ''
      ) {
        return '';
      }

      if (
        Object.prototype.toString.call(valor) ===
          '[object Date]' &&
        !isNaN(valor.getTime())
      ) {

        return Utilities.formatDate(
          valor,
          CONFIG.ZONA_HORARIA,
          'HH:mm:ss'
        );

      }

      return String(valor);

    };


  /*
   * =====================================================
   * CONVERTIR DURACIÓN A NÚMERO
   * =====================================================
   *
   * Google Sheets representa una duración como
   * fracción de día.
   *
   * Ejemplo:
   *
   * 9 horas = 9 / 24 = 0,375
   *
   * Posteriormente aplicamos formato [h]:mm:ss
   * para que se vea como:
   *
   * 9:00:00
   */

  const convertirDuracion =
    function(valor) {

      if (
        valor === null ||
        valor === undefined ||
        valor === ''
      ) {
        return '';
      }


      /*
       * Si ya es número, lo dejamos intacto.
       */

      if (
        typeof valor === 'number'
      ) {

        return valor;

      }


      /*
       * Si por alguna razón llega como Date,
       * extraemos la duración sin zona horaria.
       */

      if (
        Object.prototype.toString.call(valor) ===
          '[object Date]' &&
        !isNaN(valor.getTime())
      ) {

        const horas =
          Number(
            Utilities.formatDate(
              valor,
              'UTC',
              'HH'
            )
          );

        const minutos =
          Number(
            Utilities.formatDate(
              valor,
              'UTC',
              'mm'
            )
          );

        const segundos =
          Number(
            Utilities.formatDate(
              valor,
              'UTC',
              'ss'
            )
          );

        return (
          horas * 3600 +
          minutos * 60 +
          segundos
        ) / 86400;

      }


      return valor;

    };


  /*
   * =====================================================
   * INSERTAR REGISTRO
   * =====================================================
   */

  hoja.appendRow([

    fechaProceso,

    r.archivo,

    r.nombre,

    r.nombreHoja,

    r.area,

    r.cargo,

    fechaTexto,

    Number(r.marcaciones),

    convertirHoraTexto(
      r.entradaHR
    ),

    convertirHoraTexto(
      r.salidaHR
    ),

    convertirHoraTexto(
      r.entradaAjustada
    ),

    convertirHoraTexto(
      r.salidaAjustada
    ),

    convertirDuracion(
      r.jornada
    ),

    convertirDuracion(
      r.horasTrabajadas
    ),

    convertirDuracion(
      r.horasExtra
    ),

    r.estado,

    r.observacion,

    r.idArchivo

  ]);


  /*
   * =====================================================
   * FORMATO DE LA FILA NUEVA
   * =====================================================
   *
   * appendRow() acaba de crear la última fila.
   */

  const filaNueva =
    hoja.getLastRow();


  /*
   * MARCACIONES
   *
   * H = columna 8
   */

  hoja
    .getRange(
      filaNueva,
      8
    )
    .setNumberFormat(
      '0'
    );


  /*
   * JORNADA
   *
   * M = columna 13
   */

  hoja
    .getRange(
      filaNueva,
      13
    )
    .setNumberFormat(
      '[h]:mm:ss'
    );


  /*
   * HORAS TRABAJADAS
   *
   * N = columna 14
   */

  hoja
    .getRange(
      filaNueva,
      14
    )
    .setNumberFormat(
      '[h]:mm:ss'
    );


  /*
   * HORAS EXTRA
   *
   * O = columna 15
   */

  hoja
    .getRange(
      filaNueva,
      15
    )
    .setNumberFormat(
      '[h]:mm:ss'
    );

}

/******************************************************
* VER CONTROL
******************************************************/

function VER_CONTROL() {

const ss =
SpreadsheetApp.getActiveSpreadsheet();

const hoja =
ss.getSheetByName(
CONFIG.HOJA_CONTROL
);

if (!hoja) {

SpreadsheetApp.getUi().alert(
'La hoja CONTROL todavía no existe.'
);

return;

}

ss.setActiveSheet(hoja);

}

function PRUEBA_CARPETAS() {

const miUnidad = DriveApp.getRootFolder();

Logger.log('MI UNIDAD: ' + miUnidad.getName());
Logger.log('ID MI UNIDAD: ' + miUnidad.getId());

const carpetas = miUnidad.getFoldersByName('PRODUCCIÓN');

if (!carpetas.hasNext()) {
throw new Error('No encuentro PRODUCCIÓN directamente en Mi unidad.');
}

let numero = 0;

while (carpetas.hasNext()) {

numero++;

const produccion = carpetas.next();

Logger.log('--- PRODUCCIÓN #' + numero + ' ---');
Logger.log('Nombre: ' + produccion.getName());
Logger.log('ID: ' + produccion.getId());

const subcarpetas = produccion.getFolders();

let nombres = [];

while (subcarpetas.hasNext()) {
nombres.push(subcarpetas.next().getName());
}

Logger.log(
'Carpetas dentro: ' +
(nombres.length ? nombres.join(' | ') : '[NINGUNA]')
);
}

Logger.log('Total carpetas PRODUCCIÓN encontradas en Mi unidad: ' + numero);
}

function obtenerPeriodoConfigurado_() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const hoja =
    ss.getSheetByName(CONFIG.HOJA_PARAMETROS);

  if (!hoja) {
    throw new Error(
      'No existe la hoja PARAMETROS.'
    );
  }

  const fechaInicio =
    hoja.getRange('H2').getValue();

  const fechaFin =
    hoja.getRange('H3').getValue();

  if (!(fechaInicio instanceof Date) ||
      isNaN(fechaInicio.getTime())) {

    throw new Error(
      'La Fecha inicio en PARAMETROS!H2 no es válida.'
    );

  }

  if (!(fechaFin instanceof Date) ||
      isNaN(fechaFin.getTime())) {

    throw new Error(
      'La Fecha fin en PARAMETROS!H3 no es válida.'
    );

  }

  const inicio = new Date(fechaInicio);
  inicio.setHours(0, 0, 0, 0);

  const fin = new Date(fechaFin);
  fin.setHours(23, 59, 59, 999);

  if (inicio > fin) {

    throw new Error(
      'La Fecha inicio no puede ser posterior a la Fecha fin.'
    );

  }

  return {
    fechaInicio: inicio,
    fechaFin: fin
  };

}
function fechaDentroDelPeriodo_(fecha, periodo) {

  if (!fecha) {
    return false;
  }

  let fechaComparar;

  if (fecha instanceof Date) {

    fechaComparar = new Date(fecha);

  } else {

    fechaComparar =
      new Date(fecha);

  }

  if (
    !(fechaComparar instanceof Date) ||
    isNaN(fechaComparar.getTime())
  ) {

    return false;

  }

  fechaComparar.setHours(12, 0, 0, 0);

  return (
    fechaComparar >= periodo.fechaInicio &&
    fechaComparar <= periodo.fechaFin
  );

}

function ACTUALIZAR_HOJAS_INDIVIDUALES() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const hojaParametros =
    ss.getSheetByName(CONFIG.HOJA_PARAMETROS);

  const hojaControl =
    ss.getSheetByName(CONFIG.HOJA_CONTROL);

  if (!hojaParametros) {
    throw new Error('No existe la hoja PARAMETROS.');
  }

  if (!hojaControl) {
    throw new Error('No existe la hoja CONTROL.');
  }


  // ============================================================
  // 1. PERIODO
  // ============================================================

  const periodo = obtenerPeriodoConfigurado_();

  const fechaInicio = new Date(periodo.fechaInicio);
  fechaInicio.setHours(0, 0, 0, 0);

  const fechaFin = new Date(periodo.fechaFin);
  fechaFin.setHours(0, 0, 0, 0);


  // ============================================================
  // 2. PARAMETROS
  // ============================================================

  const ultimaFilaParametros =
    hojaParametros.getLastRow();

  if (ultimaFilaParametros < 2) {
    throw new Error(
      'La hoja PARAMETROS no contiene personas.'
    );
  }

  const datosParametros =
    hojaParametros
      .getRange(
        2,
        1,
        ultimaFilaParametros - 1,
        5
      )
      .getValues();

  const empleados = [];

  datosParametros.forEach(fila => {

    const nombreRH =
      normalizarTexto_(fila[0]);

    const nombreHoja =
      String(fila[1] || '').trim();

    if (!nombreRH || !nombreHoja) {
      return;
    }

    empleados.push({

      nombreRH: nombreRH,

      nombreHoja: nombreHoja,

      nombreHojaNormalizado:
        normalizarTexto_(nombreHoja),

      area:
        String(fila[2] || '').trim(),

      cargo:
        String(fila[3] || '').trim(),

      activo:
        normalizarTexto_(fila[4]) === 'SI'

    });

  });


  // ============================================================
  // 3. LEER CONTROL
  // ============================================================

  const ultimaFilaControl =
    hojaControl.getLastRow();

  if (ultimaFilaControl < 2) {
    throw new Error(
      'La hoja CONTROL no contiene registros.'
    );
  }

  const rangoControl =
    hojaControl.getRange(
      2,
      1,
      ultimaFilaControl - 1,
      18
    );

  const valoresControl =
    rangoControl.getValues();

  const displayControl =
    rangoControl.getDisplayValues();


  // ============================================================
  // 4. FECHA CLAVE
  // ============================================================

  function obtenerFechaClaveControl_(valor, textoDisplay) {

    if (
      Object.prototype.toString.call(valor) === '[object Date]' &&
      !isNaN(valor.getTime())
    ) {

      return Utilities.formatDate(
        valor,
        CONFIG.ZONA_HORARIA,
        'dd/MM/yyyy'
      );

    }

    const texto =
      String(textoDisplay || valor || '').trim();

    if (!texto) {
      return '';
    }

    let match =
      texto.match(
        /^(\d{1,2})\/(\d{1,2})\/(\d{4})/
      );

    if (match) {

      const dia =
        String(Number(match[1])).padStart(2, '0');

      const mes =
        String(Number(match[2])).padStart(2, '0');

      const anio =
        match[3];

      return dia + '/' + mes + '/' + anio;
    }

    match =
      texto.match(
        /^(\d{4})-(\d{1,2})-(\d{1,2})/
      );

    if (match) {

      const anio =
        match[1];

      const mes =
        String(Number(match[2])).padStart(2, '0');

      const dia =
        String(Number(match[3])).padStart(2, '0');

      return dia + '/' + mes + '/' + anio;
    }

    return '';
  }


  // ============================================================
  // 5. INDICES DE CONTROL
  // ============================================================

  const indicePorRH = {};
  const indicePorHoja = {};


  function guardarRegistro_(indice, clave, registro) {

    if (!clave) {
      return;
    }

    if (!indice[clave]) {
      indice[clave] = registro;
      return;
    }

    const actual = indice[clave];

    const nuevoTieneMarcacion =
      registro.entradaTexto !== '' ||
      registro.salidaTexto !== '';

    const actualTieneMarcacion =
      actual.entradaTexto !== '' ||
      actual.salidaTexto !== '';

    if (
      nuevoTieneMarcacion &&
      !actualTieneMarcacion
    ) {
      indice[clave] = registro;
      return;
    }

    const nuevoOK =
      normalizarTexto_(registro.estado) === 'OK';

    const actualOK =
      normalizarTexto_(actual.estado) === 'OK';

    if (nuevoOK && !actualOK) {
      indice[clave] = registro;
    }

  }


  for (let i = 0; i < valoresControl.length; i++) {

    const fila =
      valoresControl[i];

    const filaDisplay =
      displayControl[i];

    const nombreRH =
      normalizarTexto_(fila[2]);

    const nombreHoja =
      normalizarTexto_(fila[3]);

    const fechaClave =
      obtenerFechaClaveControl_(
        fila[6],
        filaDisplay[6]
      );

    if (!fechaClave) {
      continue;
    }

    const registro = {

      fecha:
        fila[6],

      entradaTexto:
        String(filaDisplay[10] || '').trim(),

      salidaTexto:
        String(filaDisplay[11] || '').trim(),

      horasExtraTexto:
        String(filaDisplay[14] || '').trim(),

      estado:
        String(fila[15] || '').trim(),

      observacion:
        String(fila[16] || '').trim()

    };


    if (nombreRH) {

      guardarRegistro_(
        indicePorRH,
        nombreRH + '|' + fechaClave,
        registro
      );

    }


    if (nombreHoja) {

      guardarRegistro_(
        indicePorHoja,
        nombreHoja + '|' + fechaClave,
        registro
      );

    }

  }


  // ============================================================
  // 6. MAPA DE HOJAS
  // ============================================================

  const mapaHojas = {};

  ss.getSheets().forEach(hoja => {

    mapaHojas[
      normalizarTexto_(hoja.getName())
    ] = hoja;

  });


  // ============================================================
  // 7. PROCESAR EMPLEADOS
  // ============================================================

  empleados.forEach(empleado => {

    if (!empleado.activo) {
      return;
    }


    const hoja =
      mapaHojas[
        empleado.nombreHojaNormalizado
      ];


    if (!hoja) {

      Logger.log(
        'No existe hoja para: ' +
        empleado.nombreHoja
      );

      return;
    }


    // ==========================================================
    // 8. CONSTRUIR LAS FECHAS DEL PERIODO
    // ==========================================================

    const registros = [];

    let fechaActual =
      new Date(fechaInicio);


    while (fechaActual <= fechaFin) {

      const diaSemana =
        fechaActual.getDay();


      if (
        diaSemana >= 1 &&
        diaSemana <= 6
      ) {

        const fechaClave =
          Utilities.formatDate(
            fechaActual,
            CONFIG.ZONA_HORARIA,
            'dd/MM/yyyy'
          );


        let registro =
          indicePorRH[
            empleado.nombreRH +
            '|' +
            fechaClave
          ];


        if (!registro) {

          registro =
            indicePorHoja[
              empleado.nombreHojaNormalizado +
              '|' +
              fechaClave
            ];

        }


        if (registro) {

          registros.push({

            fecha:
              new Date(fechaActual),

            entradaTexto:
              registro.entradaTexto,

            salidaTexto:
              registro.salidaTexto,

            horasExtraTexto:
              registro.horasExtraTexto,

            estado:
              registro.estado,

            observacion:
              registro.observacion

          });

        } else {

          registros.push({

            fecha:
              new Date(fechaActual),

            entradaTexto:
              '',

            salidaTexto:
              '',

            horasExtraTexto:
              '0:00:00',

            estado:
              'SIN REGISTRO EN CONTROL',

            observacion:
              'VERIFICAR REGISTRO NO ENCONTRADO EN CONTROL'

          });

        }

      }

      fechaActual.setDate(
        fechaActual.getDate() + 1
      );

    }


    const cantidadFilas =
      registros.length;


    // ==========================================================
    // 9. LOCALIZAR TOTAL
    // ==========================================================

    let filaTotal =
      encontrarFilaTotalHorasExtra_(hoja);


    if (!filaTotal) {

      throw new Error(
        'No se encontró la fila TOTAL de horas extra en la hoja "' +
        hoja.getName() +
        '"'
      );

    }


    // ==========================================================
    // 10. REDIMENSIONAR EL BLOQUE
    //
    // NO INSERTAMOS AUTOMATICAMENTE TODAS LAS FILAS.
    //
    // Se utiliza exactamente la cantidad necesaria.
    // ==========================================================

    const filaInicioDatos = 18;

    const filasActuales =
      filaTotal - filaInicioDatos;


    // ----------------------------------------------------------
    // Guardamos la altura de una fila modelo.
    // ----------------------------------------------------------

    const alturaFilaModelo =
      hoja.getRowHeight(filaInicioDatos);


    // ----------------------------------------------------------
    // Si sobran filas, eliminarlas.
    // ----------------------------------------------------------

    if (filasActuales > cantidadFilas) {

      const filasSobran =
        filasActuales - cantidadFilas;

      hoja.deleteRows(
        filaInicioDatos + cantidadFilas,
        filasSobran
      );

    }


    // ----------------------------------------------------------
    // Si faltan filas, insertarlas.
    // ----------------------------------------------------------

    if (filasActuales < cantidadFilas) {

      const filasFaltan =
        cantidadFilas - filasActuales;

      const nuevaFilaTotal =
        encontrarFilaTotalHorasExtra_(hoja);

      hoja.insertRowsBefore(
        nuevaFilaTotal,
        filasFaltan
      );

    }


    // Volvemos a localizar el total después
    // de modificar la estructura.
    filaTotal =
      encontrarFilaTotalHorasExtra_(hoja);


    if (!filaTotal) {

      throw new Error(
        'No se pudo localizar nuevamente la fila TOTAL en "' +
        hoja.getName() +
        '"'
      );

    }


    // ==========================================================
    // 11. RECONSTRUIR LAS COMBINACIONES DE LAS FILAS
    //
    // I:S = Descripción
    // T:AA = Persona
    // ==========================================================

    const rangoBloque =
      hoja.getRange(
        filaInicioDatos,
        1,
        cantidadFilas,
        hoja.getMaxColumns()
      );


    // Primero eliminamos combinaciones existentes
    // dentro del bloque.
    const combinaciones =
      rangoBloque.getMergedRanges();

    combinaciones.forEach(rango => {

      rango.breakApart();

    });


    // ==========================================================
    // 12. COPIAR FORMATO DE LA FILA MODELO
    // ==========================================================

    if (cantidadFilas > 0) {

      const filaModelo =
        hoja.getRange(
          filaInicioDatos,
          1,
          1,
          hoja.getMaxColumns()
        );


      const rangoDestino =
        hoja.getRange(
          filaInicioDatos,
          1,
          cantidadFilas,
          hoja.getMaxColumns()
        );


      filaModelo.copyTo(
        rangoDestino,
        SpreadsheetApp.CopyPasteType.PASTE_FORMAT,
        false
      );


      // Altura de todas las filas.
      hoja.setRowHeights(
        filaInicioDatos,
        cantidadFilas,
        alturaFilaModelo
      );

    }

// ============================================================
// 13. VOLVER A CREAR LAS CELDAS COMBINADAS
//
// C:D   = Día
// E:F   = Mes
// G:H   = Año
// I:S   = Descripción
// T:AA  = Personas
// AD:AE = Hora salida
// AF:AG = Horas extra
// ============================================================

for (
  let fila = filaInicioDatos;
  fila < filaInicioDatos + cantidadFilas;
  fila++
) {

  // ----------------------------------------------------------
  // DÍA
  // ----------------------------------------------------------

  hoja
    .getRange(
      fila,
      3,       // C
      1,
      2        // C:D
    )
    .merge();


  // ----------------------------------------------------------
  // MES
  // ----------------------------------------------------------

  hoja
    .getRange(
      fila,
      5,       // E
      1,
      2        // E:F
    )
    .merge();


  // ----------------------------------------------------------
  // AÑO
  // ----------------------------------------------------------

  hoja
    .getRange(
      fila,
      7,       // G
      1,
      2        // G:H
    )
    .merge();


  // ----------------------------------------------------------
  // DESCRIPCIÓN
  // ----------------------------------------------------------

  hoja
    .getRange(
      fila,
      9,       // I
      1,
      11       // I:S
    )
    .merge();


  // ----------------------------------------------------------
  // PERSONAS
  // ----------------------------------------------------------

  hoja
    .getRange(
      fila,
      20,      // T
      1,
      8        // T:AA
    )
    .merge();


  // ----------------------------------------------------------
  // HORA DE SALIDA
  // AD:AE
  // ----------------------------------------------------------

  hoja
    .getRange(
      fila,
      30,      // AD
      1,
      2        // AD:AE
    )
    .merge();


  // ----------------------------------------------------------
  // HORAS EXTRA
  // AF:AG
  // ----------------------------------------------------------

  hoja
    .getRange(
      fila,
      32,      // AF
      1,
      2        // AF:AG
    )
    .merge();

}
    
    // ==========================================================
    // 14. LIMPIAR CONTENIDO DEL BLOQUE
    // ==========================================================

    if (cantidadFilas > 0) {

      hoja
        .getRange(
          filaInicioDatos,
          3,
          cantidadFilas,
          15
        )
        .clearContent();


      hoja
        .getRange(
          filaInicioDatos,
          29,
          cantidadFilas,
          4
        )
        .clearContent();


      hoja
        .getRange(
          filaInicioDatos,
          36,
          cantidadFilas,
          1
        )
        .clearContent();

    }


    // ==========================================================
    // 15. FECHAS
    // ==========================================================

    const valoresDia = [];
    const valoresMes = [];
    const valoresAnio = [];


    registros.forEach(registro => {

      valoresDia.push([
        registro.fecha.getDate()
      ]);

      valoresMes.push([
        registro.fecha.getMonth() + 1
      ]);

      valoresAnio.push([
        registro.fecha.getFullYear()
      ]);

    });


    if (cantidadFilas > 0) {

      hoja
        .getRange(
          filaInicioDatos,
          3,
          cantidadFilas,
          1
        )
        .setValues(valoresDia);


      hoja
        .getRange(
          filaInicioDatos,
          5,
          cantidadFilas,
          1
        )
        .setValues(valoresMes);


      hoja
        .getRange(
          filaInicioDatos,
          7,
          cantidadFilas,
          1
        )
        .setValues(valoresAnio);

    }


    // ==========================================================
    // 16. OBSERVACION CONTROL Q -> I
    // ==========================================================

    const observaciones =
      registros.map(registro => [
        registro.observacion || ''
      ]);


    if (cantidadFilas > 0) {

      hoja
        .getRange(
          filaInicioDatos,
          9,
          cantidadFilas,
          1
        )
        .setValues(observaciones);

    }


    // ==========================================================
    // 17. PERSONA T
    // ==========================================================

    const nombres =
      registros.map(() => [
        empleado.nombreHoja
      ]);


    if (cantidadFilas > 0) {

      hoja
        .getRange(
          filaInicioDatos,
          20,
          cantidadFilas,
          1
        )
        .setValues(nombres);

    }


    // ==========================================================
    // 18. HORAS
    //
    // K -> AC
    // L -> AD
    // O -> AF
    // ==========================================================

    const entradas = [];
    const salidas = [];
    const horasExtra = [];


    registros.forEach(registro => {

      entradas.push([
        registro.entradaTexto || ''
      ]);

      salidas.push([
        registro.salidaTexto || ''
      ]);

      horasExtra.push([
        registro.horasExtraTexto || '0:00:00'
      ]);

    });


    if (cantidadFilas > 0) {

      hoja
        .getRange(
          filaInicioDatos,
          29,
          cantidadFilas,
          1
        )
        .setValues(entradas);


      hoja
        .getRange(
          filaInicioDatos,
          30,
          cantidadFilas,
          1
        )
        .setValues(salidas);


      hoja
        .getRange(
          filaInicioDatos,
          32,
          cantidadFilas,
          1
        )
        .setValues(horasExtra);

    }


    // ==========================================================
    // 19. PAGO 100%
    // ==========================================================

    if (cantidadFilas > 0) {

      hoja
        .getRange(
          filaInicioDatos,
          34,
          cantidadFilas,
          1
        )
        .setValues(
          registros.map(() => ['Sí'])
        );

    }


    // ==========================================================
    // 20. REPOSICION / COMPENSATORIO
    // ==========================================================

    if (cantidadFilas > 0) {

      hoja
        .getRange(
          filaInicioDatos,
          36,
          cantidadFilas,
          1
        )
        .clearContent();

    }


    // ==========================================================
    // 21. FORMATOS DE HORA
    // ==========================================================

    if (cantidadFilas > 0) {

      hoja
        .getRange(
          filaInicioDatos,
          29,
          cantidadFilas,
          2
        )
        .setNumberFormat('HH:mm');


      hoja
        .getRange(
          filaInicioDatos,
          32,
          cantidadFilas,
          1
        )
        .setNumberFormat('[h]:mm:ss');

    }


    // ==========================================================
    // 22. TOTAL
    // ==========================================================

    filaTotal =
      encontrarFilaTotalHorasExtra_(hoja);


    hoja
      .getRange(
        filaTotal,
        32
      )
      .setFormula(
        '=SUM(AF' +
        filaInicioDatos +
        ':AF' +
        (filaTotal - 1) +
        ')'
      );


    hoja
      .getRange(
        filaTotal,
        32
      )
      .setNumberFormat('[h]:mm:ss');


    Logger.log(
      'Hoja actualizada: ' +
      hoja.getName() +
      ' | Filas utilizadas: ' +
      cantidadFilas +
      ' | Total en fila: ' +
      filaTotal
    );

  });


  SpreadsheetApp.flush();


  ss.toast(
    'Hojas individuales actualizadas correctamente.',
    'NOMINA GENERAL',
    5
  );

}

  function convertirFechaTextoControl_(valor) {

  if (!valor) {
    return null;
  }

  const texto =
    String(valor)
      .trim();

  const match =
    texto.match(
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})/
    );

  if (!match) {
    return null;
  }

  const dia =
    Number(match[1]);

  const mes =
    Number(match[2]) - 1;

  const anio =
    Number(match[3]);

  const fecha =
    new Date(
      anio,
      mes,
      dia
    );

  if (
    fecha.getFullYear() !== anio ||
    fecha.getMonth() !== mes ||
    fecha.getDate() !== dia
  ) {
    return null;
  }

  fecha.setHours(
    12,
    0,
    0,
    0
  );

  return fecha;
}

function convertirHoraTextoIndividual_(valor) {

  if (
    valor === null ||
    valor === undefined ||
    valor === ''
  ) {
    return null;
  }

  const texto =
    String(valor)
      .trim();

  const match =
    texto.match(
      /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/
    );

  if (!match) {
    return null;
  }

  const horas =
    Number(match[1]);

  const minutos =
    Number(match[2]);

  const segundos =
    Number(match[3] || 0);

  if (
    horas < 0 ||
    horas > 23 ||
    minutos < 0 ||
    minutos > 59 ||
    segundos < 0 ||
    segundos > 59
  ) {
    return null;
  }

  // Convertir directamente a fracción de día.
  // NO usamos Date.
  // NO interviene la zona horaria.

  return (
    horas * 3600 +
    minutos * 60 +
    segundos
  ) / 86400;
}

function convertirDuracionTextoIndividual_(valor) {

  if (
    valor === null ||
    valor === undefined ||
    valor === ''
  ) {
    return null;
  }

  const texto =
    String(valor)
      .trim();

  const match =
    texto.match(
      /^(\d+):(\d{1,2})(?::(\d{1,2}))?$/
    );

  if (!match) {
    return null;
  }

  const horas =
    Number(match[1]);

  const minutos =
    Number(match[2]);

  const segundos =
    Number(match[3] || 0);

  if (
    horas < 0 ||
    minutos < 0 ||
    minutos > 59 ||
    segundos < 0 ||
    segundos > 59
  ) {
    return null;
  }

  return (
    horas * 3600 +
    minutos * 60 +
    segundos
  ) / 86400;
}

function encontrarFilaTotalHorasExtra_(hoja) {

  const filaInicio = 18;

  const ultimaFila =
    hoja.getLastRow();

  if (
    ultimaFila < filaInicio
  ) {
    return null;
  }


  // ==================================================
  // PRIMERA OPCIÓN:
  // BUSCAR LA FÓRMULA DEL TOTAL EN AF
  // ==================================================

  const formulas =
    hoja
      .getRange(
        filaInicio,
        32,
        ultimaFila - filaInicio + 1,
        1
      )
      .getFormulas();

  for (
    let i = 0;
    i < formulas.length;
    i++
  ) {

    const formula =
      String(
        formulas[i][0] || ''
      )
      .toUpperCase()
      .replace(/\s+/g, '');

    if (
      formula.indexOf('SUM(AF') !== -1
    ) {

      return filaInicio + i;

    }

  }


  // ==================================================
  // SEGUNDA OPCIÓN:
  // BUSCAR EL TEXTO DEL TOTAL
  // ==================================================

  const maxColumnas =
    Math.min(
      hoja.getMaxColumns(),
      40
    );

  const valores =
    hoja
      .getRange(
        filaInicio,
        1,
        ultimaFila - filaInicio + 1,
        maxColumnas
      )
      .getDisplayValues();

  for (
    let i = 0;
    i < valores.length;
    i++
  ) {

    for (
      let j = 0;
      j < valores[i].length;
      j++
    ) {

      const texto =
        normalizarTexto_(
          valores[i][j]
        );

      /*
       * Reconocer diferentes formas de nombrar
       * la fila de total.
       */

      if (
        texto === 'TOTAL' ||
        texto.indexOf('TOTAL HORAS EXTRA') !== -1 ||
        texto.indexOf('TOTAL HORAS') !== -1 ||
        texto.indexOf('TOTAL DE HORAS') !== -1 ||
        texto.indexOf('TOTAL DE HORAS AUTORIZADAS') !== -1
      ) {

        return filaInicio + i;

      }

    }

  }


  // ==================================================
  // NO ENCONTRADO
  // ==================================================

  return null;

}

function copiarFormatoYestructuraFila_(
  hoja,
  filaModelo,
  filaInicioDestino,
  cantidadFilas
) {

  const ultimaColumna =
    hoja.getMaxColumns();

  // ==================================================
  // COPIAR LA FILA MODELO COMPLETA
  // ==================================================
  //
  // PASTE_NORMAL permite copiar:
  // - bordes
  // - fondos
  // - alineación
  // - formatos
  // - validaciones
  // - estructura de celdas
  //
  // Después limpiaremos el contenido.
  //
  // ==================================================

  const rangoModelo =
    hoja.getRange(
      filaModelo,
      1,
      1,
      ultimaColumna
    );

  const rangoDestino =
    hoja.getRange(
      filaInicioDestino,
      1,
      cantidadFilas,
      ultimaColumna
    );

  rangoModelo.copyTo(
    rangoDestino,
    SpreadsheetApp.CopyPasteType.PASTE_NORMAL,
    false
  );

  // ==================================================
  // COPIAR ALTURA
  // ==================================================

  const altura =
    hoja.getRowHeight(
      filaModelo
    );

  for (
    let i = 0;
    i < cantidadFilas;
    i++
  ) {

    hoja.setRowHeight(
      filaInicioDestino + i,
      altura
    );
  }

  // ==================================================
  // LIMPIAR CONTENIDO DE LAS NUEVAS FILAS
  // ==================================================
  //
  // No queremos copiar los datos de Luis de la fila 28.
  // Solo queremos copiar la estructura.
  //
  // ==================================================

  rangoDestino.clearContent();

  // ==================================================
  // RESTAURAR COMBINACIONES
  // ==================================================

  const combinaciones =
    rangoModelo.getMergedRanges();

  for (
    let i = 0;
    i < cantidadFilas;
    i++
  ) {

    const filaDestino =
      filaInicioDestino + i;

    for (
      let j = 0;
      j < combinaciones.length;
      j++
    ) {

      const rangoCombinado =
        combinaciones[j];

      // Solo combinaciones que pertenecen
      // exactamente a la fila modelo.

      if (
        rangoCombinado.getRow() !==
        filaModelo
      ) {
        continue;
      }

      if (
        rangoCombinado.getNumRows() !==
        1
      ) {
        continue;
      }

      const columna =
        rangoCombinado.getColumn();

      const numeroColumnas =
        rangoCombinado.getNumColumns();

      const nuevoRango =
        hoja.getRange(
          filaDestino,
          columna,
          1,
          numeroColumnas
        );

      const existentes =
        nuevoRango.getMergedRanges();

      if (
        existentes.length === 0
      ) {

        nuevoRango.merge();
      }
    }
  }
}

function ACTUALIZAR_TOTAL_GENERAL() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const NOMBRE_HOJA_TOTAL = 'TOTAL GENERAL';
  const NOMBRE_HOJA_PARAMETROS = CONFIG.HOJA_PARAMETROS;

  const FILA_INICIO = 18;
  const FILA_MAXIMA_LECTURA = 100;

  // ============================================================
  // 1. PARAMETROS
  // ============================================================

  const hojaParametros =
    ss.getSheetByName(NOMBRE_HOJA_PARAMETROS);

  if (!hojaParametros) {
    throw new Error(
      'No existe la hoja PARAMETROS.'
    );
  }

  const ultimaFilaParametros =
    hojaParametros.getLastRow();

  if (ultimaFilaParametros < 2) {
    throw new Error(
      'PARAMETROS no contiene empleados.'
    );
  }

  const datosParametros =
    hojaParametros
      .getRange(
        2,
        1,
        ultimaFilaParametros - 1,
        5
      )
      .getValues();

  const empleados = [];

  datosParametros.forEach(fila => {

    const nombreRH =
      normalizarTexto_(fila[0]);

    if (!nombreRH) return;

    const nombreHoja =
      String(fila[1] || '').trim();

    const area =
      String(fila[2] || '').trim();

    const cargo =
      String(fila[3] || '').trim();

    const activo =
      normalizarTexto_(fila[4]) === 'SI';

    if (!activo) return;

    if (!nombreHoja) {
      throw new Error(
        'El empleado "' +
        nombreRH +
        '" está activo pero no tiene NOMBRE HOJA.'
      );
    }

    empleados.push({
      nombreRH: nombreRH,
      nombreHoja: nombreHoja,
      area: area,
      cargo: cargo
    });

  });

  if (empleados.length === 0) {
    throw new Error(
      'No hay empleados activos en PARAMETROS.'
    );
  }

  // ============================================================
  // 2. PERIODO
  //
  // Se lee como texto visible para evitar desplazamientos
  // de fecha por zona horaria.
  // ============================================================

  const periodo =
    hojaParametros
      .getRange('H2:H3')
      .getDisplayValues();

  const fechaInicio =
    parsearFechaTotalGENERAL_(
      periodo[0][0]
    );

  const fechaFin =
    parsearFechaTotalGENERAL_(
      periodo[1][0]
    );

  if (!fechaInicio) {
    throw new Error(
      'PARAMETROS!H2 no contiene una fecha válida.'
    );
  }

  if (!fechaFin) {
    throw new Error(
      'PARAMETROS!H3 no contiene una fecha válida.'
    );
  }

  if (
    fechaInicio.getTime() >
    fechaFin.getTime()
  ) {
    throw new Error(
      'La fecha inicio no puede ser posterior a la fecha fin.'
    );
  }

  // ============================================================
  // 3. GENERAR CALENDARIO DEL PERIODO
  //
  // SOLO LUNES A SÁBADO.
  // NO SE UTILIZAN FECHAS DE LAS HOJAS PARA CREAR EL PERIODO.
  // ============================================================

  const fechasPeriodo = [];
  const fechasPermitidas = {};

  let fechaCursor =
    new Date(
      fechaInicio.getFullYear(),
      fechaInicio.getMonth(),
      fechaInicio.getDate()
    );

  const fechaLimite =
    new Date(
      fechaFin.getFullYear(),
      fechaFin.getMonth(),
      fechaFin.getDate()
    );

  while (
    fechaCursor.getTime() <=
    fechaLimite.getTime()
  ) {

    const diaSemana =
      fechaCursor.getDay();

    // Domingo = 0
    if (diaSemana !== 0) {

      const fecha =
        new Date(
          fechaCursor.getFullYear(),
          fechaCursor.getMonth(),
          fechaCursor.getDate()
        );

      const clave =
        claveFechaTotalGENERAL_(fecha);

      fechasPeriodo.push({
        fecha: fecha,
        clave: clave
      });

      fechasPermitidas[clave] = true;
    }

    fechaCursor.setDate(
      fechaCursor.getDate() + 1
    );
  }

  // ============================================================
  // 4. ESTRUCTURAS DE ACUMULACION
  // ============================================================

  const personas = {};
  const dias = {};
  const detalle = [];

  empleados.forEach(empleado => {

    personas[empleado.nombreRH] = {
      puesto: empleado.cargo,
      persona: empleado.nombreRH,
      horasExtra: 0
    };

  });

  fechasPeriodo.forEach(item => {

    dias[item.clave] = {
      fecha: item.fecha,
      horasExtra: 0
    };

  });

  // ============================================================
  // 5. LEER LAS HOJAS INDIVIDUALES
  //
  // C = día
  // E = mes
  // G = año
  // AC = entrada
  // AD = salida
  // AF = horas extra
  //
  // MUY IMPORTANTE:
  // AF se toma de DISPLAY VALUES.
  // ============================================================

  empleados.forEach(empleado => {

    const hoja =
      ss.getSheetByName(
        empleado.nombreHoja
      );

    if (!hoja) {
      throw new Error(
        'No existe la hoja "' +
        empleado.nombreHoja +
        '" para "' +
        empleado.nombreRH +
        '".'
      );
    }

    /*
     * Para el periodo actual las novedades están dentro
     * de las primeras 100 filas.
     *
     * No usamos getLastRow(), porque una hoja puede tener
     * contenido/formato residual muy abajo.
     */

    const ultimaFilaLectura =
      Math.min(
        hoja.getMaxRows(),
        FILA_MAXIMA_LECTURA
      );

    if (
      ultimaFilaLectura <
      FILA_INICIO
    ) {
      return;
    }

    const cantidadFilas =
      ultimaFilaLectura -
      FILA_INICIO +
      1;

    /*
     * C:AF = 30 columnas.
     */

    const rango =
      hoja.getRange(
        FILA_INICIO,
        3,
        cantidadFilas,
        30
      );

    const valores =
      rango.getValues();

    const display =
      rango.getDisplayValues();

    for (
      let i = 0;
      i < cantidadFilas;
      i++
    ) {

      const filaReal =
        FILA_INICIO + i;

      // --------------------------------------------------------
      // FECHA
      // --------------------------------------------------------

      const diaTexto =
        String(display[i][0] || '').trim();

      const mesTexto =
        String(display[i][2] || '').trim();

      const anioTexto =
        String(display[i][4] || '').trim();

      /*
       * Ignorar filas que no tengan fecha.
       *
       * Esto evita:
       * Empleado Solicitante
       * Nombre
       * Cargo
       * Firma
       * Total de Horas Autorizadas
       * etc.
       */

      if (
        !diaTexto ||
        !mesTexto ||
        !anioTexto
      ) {
        continue;
      }

      const dia =
        Number(diaTexto);

      const mes =
        Number(mesTexto);

      const anio =
        Number(anioTexto);

      if (
        !Number.isFinite(dia) ||
        !Number.isFinite(mes) ||
        !Number.isFinite(anio)
      ) {
        continue;
      }

      const fecha =
        new Date(
          anio,
          mes - 1,
          dia
        );

      /*
       * Validación estricta de la fecha.
       */

      if (
        fecha.getFullYear() !== anio ||
        fecha.getMonth() !== mes - 1 ||
        fecha.getDate() !== dia
      ) {
        continue;
      }

      const claveFecha =
        claveFechaTotalGENERAL_(fecha);

      /*
       * ESTA ES LA BARRERA DEFINITIVA DEL PERIODO.
       *
       * Cualquier fecha fuera de H2:H3 se ignora.
       *
       * Por tanto 16/08/2026 nunca puede entrar.
       */

      if (
        !fechasPermitidas[claveFecha]
      ) {
        continue;
      }

      // --------------------------------------------------------
      // HORAS EXTRA
      // --------------------------------------------------------

      /*
       * AF es el índice 29 porque empezamos en C:
       *
       * C  = 0
       * D  = 1
       * E  = 2
       * ...
       * AC = 26
       * AD = 27
       * AE = 28
       * AF = 29
       */

      const afDisplay =
        String(
          display[i][29] || ''
        ).trim();

      /*
       * Si AF está vacío, no hay horas extra.
       */

      if (!afDisplay) {
        continue;
      }

      /*
       * LEEMOS AF POR SU REPRESENTACION VISIBLE.
       *
       * Ejemplo:
       * 1:15:00 = 1.25 horas
       * 2:15:00 = 2.25 horas
       * 0:15:00 = 0.25 horas
       */

      const horasExtra =
        convertirHorasDesdeDisplayTotalGENERAL_(
          afDisplay
        );

      if (horasExtra === null) {
        continue;
      }

      if (horasExtra < 0) {
        throw new Error(
          'Se encontró una hora extra negativa en "' +
          empleado.nombreHoja +
          '", fila ' +
          filaReal +
          ', fecha ' +
          formatearFechaTotalGENERAL_(fecha) +
          '.'
        );
      }

      /*
       * Si es cero, no necesitamos generar detalle.
       */

      if (horasExtra === 0) {
        continue;
      }

      // --------------------------------------------------------
      // ENTRADA / SALIDA
      // --------------------------------------------------------

      const entrada =
        convertirHoraDisplayTotalGENERAL_(
          display[i][26]
        );

      const salida =
        convertirHoraDisplayTotalGENERAL_(
          display[i][27]
        );

      // --------------------------------------------------------
      // ACUMULAR PERSONA
      // --------------------------------------------------------

      if (
        !personas[empleado.nombreRH]
      ) {

        personas[empleado.nombreRH] = {
          puesto: empleado.cargo,
          persona: empleado.nombreRH,
          horasExtra: 0
        };

      }

      personas[
        empleado.nombreRH
      ].horasExtra += horasExtra;

      // --------------------------------------------------------
      // ACUMULAR DIA
      // --------------------------------------------------------

      dias[
        claveFecha
      ].horasExtra += horasExtra;

      // --------------------------------------------------------
      // DETALLE
      // --------------------------------------------------------

      detalle.push({
        fecha: new Date(
          fecha.getFullYear(),
          fecha.getMonth(),
          fecha.getDate()
        ),
        persona: empleado.nombreRH,
        cargo: empleado.cargo,
        entrada: entrada,
        salida: salida,
        horasExtra: horasExtra
      });

    }

  });

  // ============================================================
  // 6. CONSOLIDAR POR PERSONA
  // ============================================================

  const tablaPersonas =
    Object.keys(personas)
      .map(nombre => personas[nombre])
      .sort((a, b) => {

        if (
          b.horasExtra !==
          a.horasExtra
        ) {
          return (
            b.horasExtra -
            a.horasExtra
          );
        }

        return a.persona.localeCompare(
          b.persona
        );

      });

  // ============================================================
  // 7. CONSOLIDAR POR DIA
  // ============================================================

  const tablaDias =
    fechasPeriodo.map(item => {

      return {
        fecha: dias[item.clave].fecha,
        horasExtra: dias[item.clave].horasExtra
      };

    });

  // ============================================================
  // 8. VALIDACION DE INTEGRIDAD
  // ============================================================

  let totalPersonas = 0;

  tablaPersonas.forEach(registro => {

    totalPersonas +=
      registro.horasExtra;

  });

  let totalDias = 0;

  tablaDias.forEach(registro => {

    totalDias +=
      registro.horasExtra;

  });

  let totalDetalle = 0;

  detalle.forEach(registro => {

    totalDetalle +=
      registro.horasExtra;

  });

  /*
   * Comparación con tolerancia mínima por coma flotante.
   */

  const personasRed =
    Math.round(
      totalPersonas * 1000000
    ) / 1000000;

  const diasRed =
    Math.round(
      totalDias * 1000000
    ) / 1000000;

  const detalleRed =
    Math.round(
      totalDetalle * 1000000
    ) / 1000000;

  if (
    personasRed !== diasRed ||
    personasRed !== detalleRed
  ) {

    throw new Error(
      'ERROR DE INTEGRIDAD EN TOTAL GENERAL.\n\n' +
      'Total por persona: ' +
      personasRed +
      ' horas\n' +
      'Total por día: ' +
      diasRed +
      ' horas\n' +
      'Total detalle: ' +
      detalleRed +
      ' horas\n\n' +
      'No se generó el consolidado porque los totales no coinciden.'
    );

  }

  // ============================================================
  // 9. CREAR / OBTENER TOTAL GENERAL
  // ============================================================

  let hojaTotal =
    ss.getSheetByName(
      NOMBRE_HOJA_TOTAL
    );

  if (!hojaTotal) {

    hojaTotal =
      ss.insertSheet(
        NOMBRE_HOJA_TOTAL
      );

  }

  /*
   * NO ELIMINAMOS FILAS.
   *
   * Simplemente limpiamos el contenido y formato utilizado
   * anteriormente.
   *
   * Esto evita el error:
   * "No se pueden eliminar todas las filas que no estén
   * inmovilizadas."
   */

  hojaTotal.clear();

  // ============================================================
  // 10. TITULO
  // ============================================================

  hojaTotal
    .getRange('A1')
    .setValue('TOTAL GENERAL')
    .setFontWeight('bold')
    .setFontSize(14);

  hojaTotal
    .getRange('A2')
    .setValue('PERIODO');

  hojaTotal
    .getRange('B2')
    .setValue(
      formatearFechaTotalGENERAL_(fechaInicio) +
      ' al ' +
      formatearFechaTotalGENERAL_(fechaFin)
    );

  // ============================================================
  // 11. TABLA POR PERSONA
  // ============================================================

  hojaTotal
    .getRange('A4')
    .setValue(
      'HORAS EXTRA POR PERSONA'
    )
    .setFontWeight('bold');

  hojaTotal
    .getRange(
      5,
      1,
      1,
      4
    )
    .setValues([[
      'PUESTO',
      'PERSONA',
      'HORAS EXTRA',
      'HORAS EXTRA DECIMAL'
    ]])
    .setFontWeight('bold');

  const datosPersonas =
    tablaPersonas.map(registro => {

      return [
        registro.puesto,
        registro.persona,
        registro.horasExtra / 24,
        registro.horasExtra
      ];

    });

  if (
    datosPersonas.length > 0
  ) {

    hojaTotal
      .getRange(
        6,
        1,
        datosPersonas.length,
        4
      )
      .setValues(
        datosPersonas
      );

    hojaTotal
      .getRange(
        6,
        3,
        datosPersonas.length,
        1
      )
      .setNumberFormat(
        '[h]:mm:ss'
      );

    hojaTotal
      .getRange(
        6,
        4,
        datosPersonas.length,
        1
      )
      .setNumberFormat(
        '0.00'
      );

  }

  const filaTotalPersonas =
    6 + datosPersonas.length;

  hojaTotal
    .getRange(
      filaTotalPersonas,
      1
    )
    .setValue(
      'TOTAL PERIODO'
    )
    .setFontWeight('bold');

  hojaTotal
    .getRange(
      filaTotalPersonas,
      3
    )
    .setValue(
      totalPersonas / 24
    )
    .setNumberFormat(
      '[h]:mm:ss'
    )
    .setFontWeight('bold');

  hojaTotal
    .getRange(
      filaTotalPersonas,
      4
    )
    .setValue(
      totalPersonas
    )
    .setNumberFormat(
      '0.00'
    )
    .setFontWeight('bold');

  // ============================================================
  // 12. TABLA POR DIA
  // ============================================================

  hojaTotal
    .getRange('F4')
    .setValue(
      'HORAS EXTRA POR DIA'
    )
    .setFontWeight('bold');

  hojaTotal
    .getRange(
      5,
      6,
      1,
      3
    )
    .setValues([[
      'FECHA',
      'HORAS EXTRA',
      'HORAS EXTRA DECIMAL'
    ]])
    .setFontWeight('bold');

  const datosDias =
    tablaDias.map(registro => {

      return [
        formatearFechaTotalGENERAL_(registro.fecha),
        registro.horasExtra / 24,
        registro.horasExtra
      ];

    });
  if (
    datosDias.length > 0
  ) {

    hojaTotal
      .getRange(
        6,
        6,
        datosDias.length,
        3
      )
      .setValues(
        datosDias
      );

    hojaTotal
      .getRange(
        6,
        7,
        datosDias.length,
        1
      )
      .setNumberFormat(
        '[h]:mm:ss'
      );

    hojaTotal
      .getRange(
        6,
        8,
        datosDias.length,
        1
      )
      .setNumberFormat(
        '0.00'
      );

  }

  const filaTotalDias =
    6 + datosDias.length;

  hojaTotal
    .getRange(
      filaTotalDias,
      6
    )
    .setValue(
      'TOTAL PERIODO'
    )
    .setFontWeight('bold');

  hojaTotal
    .getRange(
      filaTotalDias,
      7
    )
    .setValue(
      totalDias / 24
    )
    .setNumberFormat(
      '[h]:mm:ss'
    )
    .setFontWeight('bold');

  hojaTotal
    .getRange(
      filaTotalDias,
      8
    )
    .setValue(
      totalDias
    )
    .setNumberFormat(
      '0.00'
    )
    .setFontWeight('bold');

  // ============================================================
  // 13. TABLA DETALLADA
  // ============================================================

  const filaTituloDetalle =
    Math.max(
      filaTotalPersonas,
      filaTotalDias
    ) + 3;

  const filaEncabezadoDetalle =
    filaTituloDetalle + 1;

  const filaInicioDetalle =
    filaEncabezadoDetalle + 1;

  hojaTotal
    .getRange(
      filaTituloDetalle,
      1
    )
    .setValue(
      'DETALLE DE HORAS EXTRA'
    )
    .setFontWeight('bold');

  hojaTotal
    .getRange(
      filaEncabezadoDetalle,
      1,
      1,
      5
    )
    .setValues([[
      'FECHA',
      'PERSONA',
      'HORA ENTRADA',
      'HORA SALIDA',
      'HORAS EXTRA'
    ]])
    .setFontWeight('bold');

  detalle.sort((a, b) => {

    const diferenciaFecha =
      a.fecha.getTime() -
      b.fecha.getTime();

    if (
      diferenciaFecha !== 0
    ) {
      return diferenciaFecha;
    }

    return a.persona.localeCompare(
      b.persona
    );

  });

  const datosDetalle =
    detalle.map(registro => {

      return [
        formatearFechaTotalGENERAL_(registro.fecha),
        registro.persona,
        registro.entrada || '',
        registro.salida || '',
        registro.horasExtra / 24
      ];

    });

  if (
    datosDetalle.length > 0
  ) {

    hojaTotal
      .getRange(
        filaInicioDetalle,
        1,
        datosDetalle.length,
        5
      )
      .setValues(
        datosDetalle
      );

    hojaTotal
      .getRange(
        filaInicioDetalle,
        3,
        datosDetalle.length,
        2
      )
      .setNumberFormat(
        'HH:mm:ss'
      );

    hojaTotal
      .getRange(
        filaInicioDetalle,
        5,
        datosDetalle.length,
        1
      )
      .setNumberFormat(
        '[h]:mm:ss'
      );

  }

  // ============================================================
  // 14. FORMATO
  // ============================================================

  hojaTotal.setFrozenRows(5);

  hojaTotal.setColumnWidth(1, 180);
  hojaTotal.setColumnWidth(2, 190);
  hojaTotal.setColumnWidth(3, 110);
  hojaTotal.setColumnWidth(4, 140);

  hojaTotal.setColumnWidth(5, 25);

  hojaTotal.setColumnWidth(6, 110);
  hojaTotal.setColumnWidth(7, 110);
  hojaTotal.setColumnWidth(8, 140);

  SpreadsheetApp.flush();

  // ============================================================
  // 15. CONFIRMACION
  // ============================================================

  const totalFinal =
    Math.round(
      totalPersonas * 100
    ) / 100;

  SpreadsheetApp.getUi().alert(
    'TOTAL GENERAL actualizado correctamente.\n\n' +
    'Periodo: ' +
    formatearFechaTotalGENERAL_(fechaInicio) +
    ' al ' +
    formatearFechaTotalGENERAL_(fechaFin) +
    '\n\n' +
    'Total horas extra: ' +
    totalFinal.toFixed(2) +
    ' horas\n\n' +
    'Personas activas: ' +
    empleados.length +
    '\n' +
    'Registros de detalle: ' +
    detalle.length
  );

}


// ============================================================
// AUXILIARES
// ============================================================

function parsearFechaTotalGENERAL_(texto) {

  if (
    texto === null ||
    texto === undefined
  ) {
    return null;
  }

  const match =
    String(texto)
      .trim()
      .match(
        /^(\d{1,2})\/(\d{1,2})\/(\d{4})/
      );

  if (!match) {
    return null;
  }

  const dia =
    Number(match[1]);

  const mes =
    Number(match[2]);

  const anio =
    Number(match[3]);

  const fecha =
    new Date(
      anio,
      mes - 1,
      dia
    );

  if (
    fecha.getFullYear() !== anio ||
    fecha.getMonth() !== mes - 1 ||
    fecha.getDate() !== dia
  ) {
    return null;
  }

  return fecha;

}


function claveFechaTotalGENERAL_(fecha) {

  return (
    fecha.getFullYear() +
    '-' +
    String(
      fecha.getMonth() + 1
    ).padStart(2, '0') +
    '-' +
    String(
      fecha.getDate()
    ).padStart(2, '0')
  );

}


function formatearFechaTotalGENERAL_(fecha) {

  return (
    String(
      fecha.getDate()
    ).padStart(2, '0') +
    '/' +
    String(
      fecha.getMonth() + 1
    ).padStart(2, '0') +
    '/' +
    fecha.getFullYear()
  );

}


function convertirHorasDesdeDisplayTotalGENERAL_(texto) {

  if (
    texto === null ||
    texto === undefined
  ) {
    return null;
  }

  const valor =
    String(texto)
      .trim();

  if (!valor) {
    return null;
  }

  /*
   * Formatos esperados:
   *
   * 0:00:00
   * 0:15:00
   * 1:15:00
   * 2:15:00
   *
   * También acepta:
   * 1:15
   * 2:30
   */

  const match =
    valor.match(
      /^(\d+):(\d{1,2})(?::(\d{1,2}))?$/
    );

  if (!match) {

    /*
     * Si alguna celda estuviera mostrando directamente
     * un decimal, también lo aceptamos.
     */

    const numero =
      Number(
        valor.replace(',', '.')
      );

    if (
      !isNaN(numero) &&
      isFinite(numero)
    ) {
      return numero;
    }

    return null;
  }

  const horas =
    Number(match[1]);

  const minutos =
    Number(match[2]);

  const segundos =
    Number(match[3] || 0);

  if (
    minutos < 0 ||
    minutos > 59 ||
    segundos < 0 ||
    segundos > 59
  ) {
    return null;
  }

  return (
    horas +
    minutos / 60 +
    segundos / 3600
  );

}


function convertirHoraDisplayTotalGENERAL_(texto) {

  if (
    texto === null ||
    texto === undefined
  ) {
    return null;
  }

  const valor =
    String(texto).trim();

  if (!valor) {
    return null;
  }

  const match =
    valor.match(
      /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/
    );

  if (!match) {
    return null;
  }

  const horas =
    Number(match[1]);

  const minutos =
    Number(match[2]);

  const segundos =
    Number(match[3] || 0);

  if (
    horas < 0 ||
    horas > 23 ||
    minutos < 0 ||
    minutos > 59 ||
    segundos < 0 ||
    segundos > 59
  ) {
    return null;
  }

  /*
   * Creamos una fecha ficticia únicamente para poder
   * mostrar la hora en la tabla de detalle.
   */

  return new Date(
    1899,
    11,
    30,
    horas,
    minutos,
    segundos
  );

}