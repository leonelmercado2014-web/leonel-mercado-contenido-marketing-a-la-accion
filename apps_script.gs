// Pega este código en script.google.com (Extensiones > Apps Script de tu Google Sheet)
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  function hoja(n, cab) {
    var h = ss.getSheetByName(n);
    if (!h) { h = ss.insertSheet(n); h.appendRow(cab); h.setFrozenRows(1); }
    return h;
  }
  if (d.tipo === 'registro') {
    hoja('Registros', ['Fecha','Nombre','Cédula','Teléfono','Correo','Entidad','Grupo/Ficha','Nota'])
      .appendRow([d.fecha,d.nombre,d.cedula,d.telefono,d.correo,d.entidad,d.grupo,d.nota||'']);
  } else if (d.tipo === 'avance') {
    hoja('Avance', ['Fecha','Cédula','Nombre','Módulo','Visto','Avance total'])
      .appendRow([d.fecha,d.cedula,d.nombre,d.modulo,d.visto?'Sí':'No',d.pct]);
  }
  return ContentService.createTextOutput('ok');
}
