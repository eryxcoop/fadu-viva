import Canvas from "./canvas.js";
import Animator from "./animator.js";
import {ApiClient, RemoteRequester} from "./communication";

class App {
    constructor() {
        this._canvas = new Canvas();
        this._animator = undefined;
        this.apiClient = new ApiClient(new RemoteRequester("http://127.0.0.1:5000/"));
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

    trafficService() {
        return this.apiClient;
    }
}

export default App;