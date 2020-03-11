var s = Snap("#fadu-viva");
var backgroundLayer = s.group();
var busesLayer = s.group();

var fondo = Snap.load('img/fondo.svg', function (loadedBackgroundFragment) {
  backgroundLayer.append(loadedBackgroundFragment);
});

var colectivo = Snap.load('img/bondi.svg', function (loadedBusFragment) {
  var loadeBus = busesLayer.append(loadedBusFragment);
  var identityMatrix = new Snap.Matrix();
  identityMatrix.scale(0.2);
  identityMatrix.translate(8000, 1550);
  loadeBus.transform(identityMatrix);
  var matrixToAnimateBus = new Snap.Matrix();
  matrixToAnimateBus.scale(0.2);
  matrixToAnimateBus.translate(-1500, 1550);
  loadeBus.animate({transform: matrixToAnimateBus}, 5000)
});

// TODO: esto era una prueba de concepto, no sirve. deberiamos agregar todo al busesLayer (por el tema de transparencias) pero poder actuar sobre cada bondi en particular.
var colectivo2 = Snap.load('img/bondi.svg', function (loadedBusFragment) {
  var bus2Layer = s.group();
  var loadeBus = bus2Layer.append(loadedBusFragment);
  var identityMatrix = new Snap.Matrix();
  identityMatrix.scale(0.2);
  identityMatrix.translate(8000, 1650);
  loadeBus.transform(identityMatrix);
  var matrixToAnimateBus = new Snap.Matrix();
  matrixToAnimateBus.scale(0.2);
  matrixToAnimateBus.translate(-1500, 1650);
  loadeBus.animate({transform: matrixToAnimateBus}, 6500)
});


/*

  Pasos ideales:

  setup: construir fondo y los distintos layers, en orden, para tener las transparencias bien hechas
  tener distintas animaciones prearmadas (ej: transitoBondisAlto, transitoAutosBajo, etc)
     - tener helpers para animar un bondi X con cierta animacion e easings (ej: se frena, arranca)
     - borrar cada bondi cada vez que se va de pantalla, o probar como anda sin borrar. capaz empieza explotar por recursos
  triggerear esas animaciones prearmadas con un evento (en nuestro caso, algo que venga del server nos diga "transito medio" y triggerear eso

  a analizar: animaciones con colores. hay que usar animate, fill y select (ej: el cielo)

  NOTA: no tenmos transformaciones porcentuales. el tamaño del viewport svg nos va a liquidar porque cambian las escalas y las posiciones.
  ej: el bondi con viewport mas grande hay que achicarlo mas que 0.2, y moverlo a otras posiciones
  Podemos hacer settings para una resolucion puntual o, idealmente, encontrar una relacion porcentual para las posiciones y tamaños.

 */

