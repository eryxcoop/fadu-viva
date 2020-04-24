import Canvas from "./canvas.js";
import Animator from "./animator.js";
import {ApiClient, RemoteRequester} from "./communication";
import {GetStatusSuccessfulResponse} from "./communication/responses/GetStatusSuccessfulResponse.js"; // todo remove this

const A_MINUTE = 60 * 1000;

class App {
    constructor(pollingTimeout = A_MINUTE) {
        this._canvas = new Canvas();
        this._animator = undefined;
        this._pollingTimeout = pollingTimeout;
        this._apiClient = new ApiClient(new RemoteRequester("http://127.0.0.1:5000/"));

        this._mock_index = 0;

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
        // this._apiClient.getStatus(this._animateCanvasWith);
        let statusJsonResponses = [
            {
                "object": {
                    "services": {
                        "traffic": {"status": 8},
                        "buses": {"arriving": ["42", "37"], "departing": ["33"]}
                    }
                }, "errors": []
            }, {
                "object": {
                    "services": {
                        "traffic": {"status": 8},
                        "buses": {"arriving": ["28"], "departing": ["42", "37"]}
                    }
                }, "errors": []
            }, {
                "object": {
                    "services": {
                        "traffic": {"status": 5.9},
                        "buses": {"arriving": [], "departing": ["160"]}
                    }
                }, "errors": []
            }, {
                "object": {
                    "services": {
                        "traffic": {"status": 2},
                        "buses": {"arriving": ["42", "166"], "departing": ["28", "34", "37"]}
                    }
                }, "errors": []
            }];
        let statusResponse = new GetStatusSuccessfulResponse(statusJsonResponses[this._mock_index]);
        this._mock_index++;
        if (this._mock_index === statusJsonResponses.length) this._mock_index = 0;
        this._animateCanvasWith(statusResponse);
    }

    _animateCanvasWith(statusResponse) {
        this._animator.animateAccordingTo(statusResponse);
    }
}

export default App;