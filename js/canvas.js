class Canvas {
    static SVG_ID = "fadu-viva";

    static IMAGES_URLS = {
        BACKGROUND: 'img/fondo.svg'
    };

    static ASSETS_NAMES = {
        TRAIN: "Tren",
        CARS_SECOND_LANE: "Autos_1_",
    };

    constructor() {
        this.paper = undefined;
        this.assets = {
            train: undefined,
            cars_second_lane: undefined,
        };
    }

    initialize(callback) {
        this.initializePaper();
        this.loadBackground(function () {
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

    fetchAllAssets() {
        this.paper.select(`#${this._assetsNames().TRAIN}`).remove();

        this.assets.cars_second_lane = document.querySelectorAll(`#${this._assetsNames().CARS_SECOND_LANE}`);

        gsap.set(this.assets.cars_second_lane, {x: -2000});
        // gsap.set(autos, {opacity: 0.3});
        gsap.to(this.assets.cars_second_lane, {duration: 6, repeat: -1, x: 2500});
    }

    _imagesURLs() {
        return this.constructor.IMAGES_URLS;
    }

    _assetsNames() {
        return this.constructor.ASSETS_NAMES;
    }
}

export default Canvas;