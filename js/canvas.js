const SVG_ID = "fadu-viva";

const LOADER_CONTAINER = 'spinner-container';

const IMAGES_URLS = {
    BACKGROUND: 'img/fadu-viva.svg'
};

const ASSETS_NAMES = {
    SKY: 'Cielo',
    SKY_LIGHT: 'Oscuridad',
    LIGHTS: 'Iluminacion',
    CARS_FIRST_LANE: [
        'Volkswagen_Gol_2015',
        'Up_naranja',
        'Peugeot_206_blanco',
        'Gold_trend_blanco',
        'Peugeot_206_rojo',
        'Camion'
    ],
    CARS_SECOND_LANE: [
        'Gold_trend_blanco-2',
        'Peugeot_206_azul',
        'Up_amarillo',
        'Fiorino',
        'Fiesta_azul',
        'Ecosport_verde',
        'Up_amarillo-2'
    ],
    ARRIVING_BUSES: {
        166: '_166_llegada',
        160: '_160_llegada',
        107: '_107_llegada',
        45: '_45_llegada',
        42: '_42_llegada',
        37: '_37_llegada',
        34: '_34_llegada',
        33: '_33_llegada',
        28: '_28_llegada',
    },
    DEPARTING_BUSES: {
        166: '_166_llegada-2',
        160: '_160_llegada-2',
        107: '_107_llegada-2',
        45: '_45_llegada-2',
        42: '_42_llegada-2',
        37: '_37_llegada-2',
        34: '_34_llegada-2',
        33: '_33_llegada-2',
        28: '_28_llegada-2',
    },
    TRAIN_TO_RETIRO: 'TrenARetiro',
    TRAIN_TO_VILLA_ROSA: 'TrenAVillaRosa',
    DAY_TREES: [
        // 'ArbolesFadu',
        'ArbolesInfinito',
        'ArbolesMetrobus',
        'ArbolesPlazoletaOscuridad',  // aca quedo mal el nombre en el svg
    ],
    NIGHT_TREES: [
        'ArbolesInfinitoOscuridad',
        'ArbolesMetrobusOscuridad',
        'ArbolesPlazoleta',  // aca quedo mal el nombre en el svg
    ]
};

const LOCATION_OFFSETS = {
    BUS_STOP_OFFSETS: {
        ARRIVING_BUSES: {
            166: -1900,
            160: -2300,
            107: -1500,
            45: -1100,
            42: -1950,
            37: -2350,
            34: -1150,
            33: -1150,
            28: -1550,
        },
        DEPARTING_BUSES: {
            166: 1100,
            160: 2300,
            107: 1900,
            45: 1500,
            42: 1150,
            37: 2350,
            34: 1950,
            33: 1550,
            28: 1550,
        },
    },
    ARRIVING_BUSES_START_OFFSET: 400,
    DEPARTING_BUSES_START_OFFSET: -400,
    ARRIVING_BUSES_END_OFFSET: -3500,
    DEPARTING_BUSES_END_OFFSET: 3500,
    CARS_START_OFFSET: -500,
    CARS_END_OFFSET: 3500,
    TRAIN_TO_RETIRO_START_OFFSET: -3300,
    TRAIN_TO_VILLA_ROSA_START_OFFSET: 3300,
    TRAIN_TO_RETIRO_END_OFFSET: 3500,
    TRAIN_TO_VILLA_ROSA_END_OFFSET: -3500,
};

class Canvas {
    constructor() {
        this.paper = undefined;
        this.assets = {
            cars_first_lane: undefined,
            cars_second_lane: undefined,
            arriving_buses: undefined,
            departing_buses: undefined,
            train_to_retiro: undefined,
            train_to_villa_rosa: undefined,
            sky: undefined,
            sky_light: undefined,
            street_lights: undefined,
            building_lights: undefined,
            day_trees: undefined,
            night_trees: undefined,
        };
    }

    initialize(callback) {
        this.initializePaper();
        this.loadBackground(function () {
            this.removeLoader();
            this.fetchAllAssets();
            this.initializeScene();
            callback(this);
        }.bind(this));
    }

    initializePaper() {
        this.paper = Snap(`#${SVG_ID}`);
    }

    removeLoader() {
        $(`.${LOADER_CONTAINER}`).fadeOut(1000);
    }

    loadBackground(onBackgroundLoad) {
        this.assets.background = Snap.load(this._imagesURLs().BACKGROUND, function (fragment) {
            this.paper.children().map(e => e.remove());
            this.paper.add(fragment);
            onBackgroundLoad();
        }.bind(this));
    }

    fetchAllAssets() {
        this._fetchSky();
        this._fetchStreetLights();
        this._fetchBuildingLights();
        this._fetchCars();
        this._fetchBuses();
        this._fetchTrees();
        // this._fetchTrains();
    }

    initializeScene() {
        this._hideCars();
        this._hideBuses();
        // this._hideTrains();
        this._setDefaultDayTime();
    }

    sky() {
        return this.assets.sky;
    }

    skyLight() {
        return this.assets.sky_light;
    }

    streetLights() {
        return this.assets.street_lights;
    }

    buildingLights() {
        return this.assets.building_lights;
    }

    dayTrees() {
        return this.assets.day_trees;
    }

    nightTrees() {
        return this.assets.night_trees;
    }

    carsStartOffset() {
        return this._locationOffsets().CARS_START_OFFSET;
    }

    carsEndOffset() {
        return this._locationOffsets().CARS_END_OFFSET;
    }

    firstLaneCars() {
        return this.assets.cars_first_lane;
    }

    secondLaneCars() {
        return this.assets.cars_second_lane;
    }

    getArrivingBus(busName) {
        return this.assets.arriving_buses[busName];
    }

    getDepartingBus(busName) {
        return this.assets.departing_buses[busName];
    }

    arrivingBusStopOffset(busName) {
        return this._locationOffsets().BUS_STOP_OFFSETS.ARRIVING_BUSES[busName];
    }

    departingBusStopOffset(busName) {
        return this._locationOffsets().BUS_STOP_OFFSETS.DEPARTING_BUSES[busName];
    }

    arrivingBusesStartOffset() {
        return this._locationOffsets().ARRIVING_BUSES_START_OFFSET;
    }

    departingBusesStartOffset() {
        return this._locationOffsets().DEPARTING_BUSES_START_OFFSET;
    }

    arrivingBusesEndOffset() {
        return this._locationOffsets().ARRIVING_BUSES_END_OFFSET;
    }

    departingBusesEndOffset() {
        return this._locationOffsets().DEPARTING_BUSES_END_OFFSET;
    }

    trainToRetiroStartOffset() {
        return this._locationOffsets().TRAIN_TO_RETIRO_START_OFFSET;
    }

    trainToVillaRosaStartOffset() {
        return this._locationOffsets().TRAIN_TO_VILLA_ROSA_START_OFFSET;
    }

    trainToRetiroEndOffset() {
        return this._locationOffsets().TRAIN_TO_RETIRO_END_OFFSET;
    }

    trainToVillaRosaEndOffset() {
        return this._locationOffsets().TRAIN_TO_VILLA_ROSA_END_OFFSET;
    }

    _imagesURLs() {
        return IMAGES_URLS;
    }

    _assetsNames() {
        return ASSETS_NAMES;
    }

    _locationOffsets() {
        return LOCATION_OFFSETS;
    }

    _fetchSky() {
        // TODO normalize names to all ID or all classes
        this.assets.sky = this.paper.select(`#${this._assetsNames().SKY}`).node;
        this.assets.sky_light = this.paper.selectAll(`.${this._assetsNames().SKY_LIGHT}`).items.map(e => e.node);
    }

    _fetchStreetLights() {
        // TODO fix svg to math all the lights within the same classname
        this.assets.street_lights = [];
        this.assets.street_lights.push(...this.paper.selectAll('.Iluminacion').items.map(e => e.node));
        this.assets.street_lights.push(...this.paper.selectAll('.Iluminacion2').items.map(e => e.node));
        this.assets.street_lights.push(...this.paper.selectAll('.Iluminacion3').items.map(e => e.node));
        this.assets.street_lights.push(this.paper.select('#Iluminacion-4').node);
    }

    _fetchBuildingLights() {
        this.assets.building_lights = [];
        this.assets.building_lights.push(...this.paper.selectAll('.Vidrios').items.map(e => e.node));
    }

    _fetchCars() {
        this.assets.cars_first_lane = this._assetsNames().CARS_FIRST_LANE.map(carId => this.paper.select(`#${carId}`).node);
        this.assets.cars_second_lane = this._assetsNames().CARS_SECOND_LANE.map(carId => this.paper.select(`#${carId}`).node);
    }

    _fetchBuses() {
        gsap.set('#VidriosColectivo', {fill: '#83969b'});

        this.assets.departing_buses = Object.fromEntries(
            Object.entries(this._assetsNames().DEPARTING_BUSES).map(
                ([busName, busId]) => [busName, this.paper.select(`#${busId}`).node]
            )
        );

        this.assets.arriving_buses = Object.fromEntries(
            Object.entries(this._assetsNames().ARRIVING_BUSES).map(
                ([busName, busId]) => [busName, this.paper.select(`#${busId}`).node]
            )
        );
    }

    _fetchTrains() {
        this.assets.train_to_retiro = this.paper.select(`#${this._assetsNames().TRAIN_TO_RETIRO}`).node;
        this.assets.train_to_villa_rosa = this.paper.select(`#${this._assetsNames().TRAIN_TO_VILLA_ROSA}`).node;
    }

    _fetchTrees() {
        this.assets.day_trees = this._assetsNames().DAY_TREES.map(treeId => this.paper.select(`#${treeId}`).node);
        this.assets.night_trees = this._assetsNames().NIGHT_TREES.map(treeId => this.paper.select(`#${treeId}`).node);
    }

    _hideCars() {
        gsap.set(this.assets.cars_first_lane, {x: this.carsStartOffset()});
        gsap.set(this.assets.cars_second_lane, {x: this.carsStartOffset()});
    }

    _hideBuses() {
        gsap.set(Object.entries(this.assets.arriving_buses).map(([_, bus]) => bus), {x: this.arrivingBusesStartOffset()});
        gsap.set(Object.entries(this.assets.departing_buses).map(([_, bus]) => bus), {x: this.departingBusesStartOffset()});
    }

    _hideTrains() {
        gsap.set(this.assets.train_to_retiro, {x: this.trainToRetiroStartOffset()});
        gsap.set(this.assets.train_to_villa_rosa, {x: this.trainToVillaRosaStartOffset()});
    }

    _setDefaultDayTime() {
        // TODO: use animator here: animator.setDefaultScene()
        gsap.set(this.dayTrees(), {opacity: 1});
        gsap.set(this.nightTrees(), {opacity: 0});
        gsap.set(this.skyLight(), {opacity: 0});
        gsap.set(this.streetLights(), {opacity: 0});
        gsap.set(this.buildingLights(), {fill: '#72a9b7', opacity: 1});
    }
}

export default Canvas;