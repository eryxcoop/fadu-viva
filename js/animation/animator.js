import HighwayTrafficLoopAnimator from "./trafficAnimator.js";
import BusAnimator from "./busAnimator.js";
import DaytimeAnimator from "./daytimeAnimator.js";


class Animator {
    constructor(canvas) {
        this._daytimeAnimator = new DaytimeAnimator(canvas);
        this._busAnimator = new BusAnimator(canvas);
        this._trafficAnimator = new HighwayTrafficLoopAnimator(canvas);
    }

    animateAccordingTo(statusResponse) {
        this._daytimeAnimator.animateAccordingTo(statusResponse.daylightBrightness());
        this._busAnimator.animateArrivingBuses(statusResponse.arrivingBuses());
        this._busAnimator.animateDepartingBuses(statusResponse.departingBuses());
        this._trafficAnimator.animateAccordingTo(statusResponse.trafficStatus());
    }
}

export default Animator;