import {ApiClient, RemoteRequester} from "./communication";
import App from "./app.js"

let app = new App();
app.initialize(function(app) {
    let animator = app.animator();
    animator.animateTrain();
    const requester = new RemoteRequester("http://127.0.0.1:5000/");
    const api_client = new ApiClient(requester);
    api_client.getTrafficStatus((response) => {console.log(response)});
});

/*

  Pasos ideales:

  tener distintas animaciones prearmadas (ej: transitoBondisAlto, transitoAutosBajo, etc)
     - tener helpers para animar un bondi X con cierta animacion e easings (ej: se frena, arranca)
     - borrar cada bondi cada vez que se va de pantalla, o probar como anda sin borrar. capaz empieza explotar por recursos
  triggerear esas animaciones prearmadas con un evento (en nuestro caso, algo que venga del server nos diga "transito medio" y triggerear eso

  a analizar: animaciones con colores. hay que usar animate, fill y select (ej: el cielo)

*/

