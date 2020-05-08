class DaytimeAnimator {
    constructor(canvas) {
        this._DURATION = 10;
        this._canvas = canvas;
    }

    animateAccordingTo(brightness) {
        this._animateDayTime(brightness);
        this._animateElectricLights(brightness);
    }

    _animateDayTime(brightness) {
        const brightnessOpacity = gsap.utils.mapRange(0, 10, 0.7, 0, brightness);
        const previousOpacity = this._previousOpacity(this._canvas.sky());
        gsap.fromTo(this._canvas.sky(), {opacity: previousOpacity}, {opacity: brightnessOpacity, duration: this._DURATION, ease: "sine.out", stagger: 0.5});
    }

    _animateElectricLights(brightness) {
        const previousOpacity = this._previousOpacity(this._canvas.lights());
        if (brightness <= 3) {
            gsap.fromTo(this._canvas.lights(), {opacity: previousOpacity}, {opacity: 0.5, duration: this._DURATION, ease: "expo.in", stagger: 1});
        } else {
            gsap.fromTo(this._canvas.lights(), {opacity: previousOpacity}, {opacity: 0, duration: this._DURATION, ease: "expo.out", stagger: 1});
        }
    }

    _previousOpacity(elements) {
        gsap.getProperty(elements[0], "opacity")
    }
}

export default DaytimeAnimator;