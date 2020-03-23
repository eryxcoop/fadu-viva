import {ApiClient, RemoteRequester} from "./communication";

class App {
    static SVG_ID = "fadu-viva";

    static IMAGES_URLS = {
        BACKGROUND: 'img/fondo.svg'
    };

    static LAYERS_NAMES = {
        BACKGROUND: "background-layer",
        CARS_FIRST_LANE: "cars-first-lane",
        BUSES_FIRST_LANE: "buses-first-lane",
        BUSES_SECOND_LANE: "buses-second-lane",
        TRAIN_LANE: "layer-train",
        CARS_SECOND_LANE: "cars-second-lane",
    };

    static ASSETS_NAMES = {
        TRAIN: "Tren"
    };

    constructor() {
        this.paper = undefined;
        this.layers = {
            train: undefined,
        };
        this.assets = {
            train: undefined,
        };

        this.services = {
            transit: undefined,
            train: undefined,
            weather: undefined,
            time: undefined,
        }
    }

    setup() {
        this.initializePaper();
        this.loadBackground(function() {
            this.fetchAllLayers();
            this.fetchAllAssets();
        }.bind(this));
    }

    initializePaper() {
        this.paper = Snap(`#${this.constructor.SVG_ID}`);
    }

    loadBackground(onBackgroundLoad) {
        this.assets.background = Snap.load(this._imagesURLs().BACKGROUND, function (fragment) {
            this.paper.add(fragment);
            onBackgroundLoad();
        }.bind(this));
    }

    fetchAllLayers() {
        this.layers.train = this.paper.select(`#${this._layersNames().TRAIN_LANE}`)
    }

    fetchAllAssets() {
        this.assets.train = this.layers.train.select(`#${this._assetsNames().TRAIN}`);
        // TODO: train initial position (useless afterwards)
        this.assets.train.transform(new Snap.Matrix().translate(-1200, 0))
    }

    animateTrain() {
        let matrixToAnimateTrainFromLeftToRight = new Snap.Matrix();
        matrixToAnimateTrainFromLeftToRight.translate(2000, 0);
        this.assets.train.animate({transform: matrixToAnimateTrainFromLeftToRight}, 2000);

    }

    _imagesURLs() {
        return this.constructor.IMAGES_URLS;
    }

    _layersNames() {
        return this.constructor.LAYERS_NAMES;
    }

    _assetsNames() {
        return this.constructor.ASSETS_NAMES;
    }
}

let app = new App();
app.setup();
setTimeout(app.animateTrain.bind(app), 3000);


const requester = new RemoteRequester("http://127.0.0.1:5000/");
const api_client = new ApiClient(requester);
api_client.getTrafficStatus((response) => {console.log(response)});

/*

  Pasos ideales:

  tener distintas animaciones prearmadas (ej: transitoBondisAlto, transitoAutosBajo, etc)
     - tener helpers para animar un bondi X con cierta animacion e easings (ej: se frena, arranca)
     - borrar cada bondi cada vez que se va de pantalla, o probar como anda sin borrar. capaz empieza explotar por recursos
  triggerear esas animaciones prearmadas con un evento (en nuestro caso, algo que venga del server nos diga "transito medio" y triggerear eso

  a analizar: animaciones con colores. hay que usar animate, fill y select (ej: el cielo)

*/

