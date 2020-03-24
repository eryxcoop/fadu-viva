class Animator {
    constructor(canvas) {
        this._canvas = canvas;
    }

    animateTrain() {
        let matrixToAnimateTrainFromLeftToRight = new Snap.Matrix();
        matrixToAnimateTrainFromLeftToRight.translate(2000, 0);
        this._canvas.assets.train.animate({transform: matrixToAnimateTrainFromLeftToRight}, 2000);
    }
}

export default Animator;