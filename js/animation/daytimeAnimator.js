class DaytimeAnimator {
    constructor(canvas) {
        this._DURATION = 4;
        this._canvas = canvas;
    }

    animateAccordingTo(brightness) {
        this._animateSkyLight(brightness);
        this._animateStreetAndBuildingLights(brightness);
    }

    _animateSkyLight(brightness) {
        const brightnessOpacity = gsap.utils.mapRange(0, 10, 0.5, 0, brightness);
        const skyBrightness = gsap.utils.mapRange(0, 10, 1, 0, brightness);
        gsap.to(this._canvas.skyLight(), {opacity: brightnessOpacity, duration: this._DURATION, ease: "none"});
        gsap.to(this._canvas.sky(), {fill: gsap.utils.interpolate("#aedef5", "#4682b4", skyBrightness), duration: this._DURATION, ease: 'none'});
    }

    _animateStreetAndBuildingLights(brightness) {
        const isNightTime = brightness <= 3;
        if (isNightTime) {
            this._animateNightLights();
        } else {
            this._animateDayLights();
        }
    }

    _animateNightLights() {
        // fixme this parameters value should be canvas responsibility
        gsap.to(this._canvas.streetLights(), {opacity: 0.5, duration: this._DURATION, ease: "none"});
        gsap.to(this._canvas.buildingLights(), {opacity: 0.5, fill: 'yellow', duration: this._DURATION, ease: 'none'});
    }

    _animateDayLights() {
        // fixme this parameters should be canvas responsibility
        gsap.to(this._canvas.streetLights(), {opacity: 0, duration: this._DURATION, ease: "none"});
        gsap.to(this._canvas.buildingLights(), {opacity: 1, fill: '#72a9b7', duration: this._DURATION, ease: 'none'});
    }
}

export default DaytimeAnimator;