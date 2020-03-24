class Canvas {
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
        CARS_SECOND_LANE: "Autopista",
    };

    static ASSETS_NAMES = {
        TRAIN: "Tren",
        CARS_SECOND_LANE: "Autos_1_"
    };

    constructor() {
        this.paper = undefined;
        this.layers = {
            train: undefined,
            cars_second_lane: undefined,
        };
        this.assets = {
            train: undefined,
            cars_second_lane: undefined,
        };
    }

    initialize(callback) {
        this.initializePaper();
        this.loadBackground(function () {
            this.fetchAllLayers();
            this.fetchAllAssets();
            callback(this);
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
        this.layers.train = this.paper.select(`#${this._layersNames().TRAIN_LANE}`);
        this.layers.cars_second_lane = this.paper.select(`#${this._layersNames().CARS_SECOND_LANE}`)
    }

    fetchAllAssets() {
        this.assets.train = this.layers.train.select(`#${this._assetsNames().TRAIN}`);
        // TODO: train initial position (useless afterwards)
        this.assets.train.transform(new Snap.Matrix().translate(-1200, 0));

        this.assets.cars_second_lane = this.layers.cars_second_lane.select(`#${this._assetsNames().CARS_SECOND_LANE}`);
        // TODO: cars initial position (useless afterwards)
        this.assets.cars_second_lane.transform(new Snap.Matrix().translate(-2000, 0));
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

export default Canvas;