import Canvas from "./canvas.js";
import Animator from "./animator.js";

class App {
    constructor() {
        this._canvas = new Canvas();
        this._animator = undefined;

        this.services = {
            transit: undefined,
            train: undefined,
            weather: undefined,
            time: undefined,
        }
    }

    initialize(callback) {
        this._canvas.initialize(function (canvas) {
            this._animator = new Animator(canvas);
            callback(this);
        }.bind(this));

    }

    animator() {
        return this._animator;
    }

    canvas() {
        return this._canvas;
    }
}

export default App;