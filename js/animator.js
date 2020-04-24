class Animator {
    constructor(canvas) {
        this._canvas = canvas;
    }

    animateAccordingTo(statusResponse) {
        this._animateArrivingBuses(statusResponse.arrivingBuses(), this._canvas.arrivingBusesStartOffset(), this._canvas.arrivingBusesEndOffset());
        this._animateDepartingBuses(statusResponse.departingBuses(), this._canvas.departingBusesStartOffset(), this._canvas.departingBusesEndOffset());
    }

    _animateArrivingBuses(busesName, startOffset, endingOffset) {
        const timeline = gsap.timeline({paused: true});
        busesName.map(busName => {
            const busTween = this._animateBus(this._canvas.getArrivingBus(busName),
                this._canvas.arrivingBusStopOffset(busName), startOffset, endingOffset);
            timeline.add(busTween, `<${gsap.utils.random(1, 3)}`)
        });
        timeline.play();
    }

    _animateDepartingBuses(busesName, startOffset, endingOffset) {
        const timeline = gsap.timeline({paused: true});
        busesName.map(busName => {
            const busTween = this._animateBus(this._canvas.getDepartingBus(busName),
                this._canvas.departingBusStopOffset(busName), startOffset, endingOffset);
            timeline.add(busTween, `<${gsap.utils.random(1, 3)}`)
        });
        timeline.play();
    }

    _animateBus(bus, busStopOffset, startOffset, endingOffset) {
        const waitingTimeInSeconds = gsap.utils.random(2,5);
        const timeline = gsap.timeline({onComplete: () => gsap.set(bus, {x: startOffset})});
        timeline.to(bus, {ease: "power1.out", duration: "random(5,7)", x: busStopOffset});
        timeline.to(bus, {ease: "power1.in", duration: "random(5,7)", x: endingOffset}, `+=${waitingTimeInSeconds}`);
        return timeline;
    }
}

export default Animator;