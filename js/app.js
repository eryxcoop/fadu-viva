import Canvas from "./canvas.js";
import Animator from "./animator.js";
import {ApiClient, RemoteRequester} from "./communication";

const A_MINUTE = 60 * 1000;

class App {
    constructor(pollingTimeout = A_MINUTE) {
        this._canvas = new Canvas();
        this._animator = undefined;
        this._pollingTimeout = pollingTimeout;
        this._apiClient = new ApiClient(new RemoteRequester("http://127.0.0.1:5000/"));

        this.pollForStatusAndAnimate = this.pollForStatusAndAnimate.bind(this);
        this._getStatusAndAnimate = this._getStatusAndAnimate.bind(this);
        this._animateCanvasWith = this._animateCanvasWith.bind(this);
    }

    initialize(callback) {
        this._canvas.initialize(function (canvas) {
            this._animator = new Animator(canvas);
            callback(this);
        }.bind(this));
    }

    pollForStatusAndAnimate() {
        this._getStatusAndAnimate();
        setInterval(this._getStatusAndAnimate, this._pollingTimeout);
    }

    _getStatusAndAnimate() {
        this._apiClient.getStatus(this._animateCanvasWith);
    }

    _animateCanvasWith(statusResponse) {
        this._animator.animateAccordingTo(statusResponse);
    }
}

export default App;