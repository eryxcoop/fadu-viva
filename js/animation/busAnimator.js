class BusAnimator {
    constructor(canvas) {
        this._canvas = canvas;
    }

    animateArrivingBuses(arrivingBuses) {
        this._animateBuses(this._canvas.arrivingBusesStartOffset(), this._canvas.arrivingBusesEndOffset(),
            arrivingBuses, this._canvas.getArrivingBus.bind(this._canvas), this._canvas.arrivingBusStopOffset.bind(this._canvas));
    }

    animateDepartingBuses(departingBuses) {
        this._animateBuses(this._canvas.departingBusesStartOffset(), this._canvas.departingBusesEndOffset(),
            departingBuses, this._canvas.getDepartingBus.bind(this._canvas), this._canvas.departingBusStopOffset.bind(this._canvas));
    }

    _animateBuses(startOffset, endingOffset, busNames, getBus, getStopOffset) {
        const timeline = gsap.timeline({paused: true});
        busNames.map(busName => {
            const busTween = this._animateBus(startOffset, endingOffset, getBus(busName), getStopOffset(busName));
            timeline.add(busTween, `<${gsap.utils.random(1, 3)}`)
        });
        timeline.play();
    }

    _animateBus(startOffset, endingOffset, bus, busStopOffset) {
        const waitingTimeInSeconds = gsap.utils.random(2,5);
        const timeline = gsap.timeline();
        timeline.fromTo(bus, {x: startOffset}, {ease: "power1.out", duration: "random(8,10)", x: busStopOffset});
        timeline.to(bus, {ease: "power1.in", duration: "random(8,10)", x: endingOffset}, `+=${waitingTimeInSeconds}`);
        return timeline;
    }
}

export default BusAnimator;