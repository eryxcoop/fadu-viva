class Animator {
    constructor(canvas) {
        this._canvas = canvas;
    }

    animateAccordingTo(statusResponse) {
        this.animateTrafficInIntendenteCantilo(statusResponse.trafficStatus());
    }

    animateTrain() {
        let matrixToAnimateTrainFromLeftToRight = new Snap.Matrix();
        matrixToAnimateTrainFromLeftToRight.translate(2000, 0);
        this._canvas.assets.train.animate({transform: matrixToAnimateTrainFromLeftToRight}, 2000);
    }

    animateTrafficInIntendenteCantilo(trafficStatus) {
        if (trafficStatus <= 3) {
            this.animateLowTrafficInIntendenteCantilo();
        } else if (trafficStatus <= 6) {
            this.animateMediumTrafficInIntendenteCantilo();
        } else {
            this.animateHighTrafficInIntendenteCantilo();
        }
    }

    animateLowTrafficInIntendenteCantilo() {
        let matrixToAnimateCarsFromLeftToRight = new Snap.Matrix();
        matrixToAnimateCarsFromLeftToRight.translate(2000, 0);
        this._canvas.assets.cars_second_lane.animate({transform: matrixToAnimateCarsFromLeftToRight}, 4000);
    }

    animateMediumTrafficInIntendenteCantilo() {

    }

    animateHighTrafficInIntendenteCantilo() {

    }
}

export default Animator;