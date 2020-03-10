var s = Snap("#fadu-viva");
var backgroundLayer = s.group();
var busesLayer = s.group();

var fondo = Snap.load('img/fondo.svg', function (loadedBackgroundFragment) {
  backgroundLayer.append(loadedBackgroundFragment);
});

var colectivo = Snap.load('img/bondi.svg', function (loadedBusFragment) {
  busesLayer.append(loadedBusFragment);
  var identityMatrix = new Snap.Matrix();
  identityMatrix.scale(0.15);
  busesLayer.transform(identityMatrix);
  busesLayer.animate({transform: identityMatrix}, 200)
});

