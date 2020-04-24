class Animator {
    constructor(canvas) {
        this._canvas = canvas;

        this._animateTraffic = this._animateTraffic.bind(this);
        this._animateCar = this._animateCar.bind(this);
        this._updateCurrentTrafficAnimation = this._updateCurrentTrafficAnimation.bind(this);
        this._onRepeat = this._onRepeat.bind(this);

        this._first_lane_cars_timeline = gsap.timeline({paused: true});
        this._animateCars(this._canvas.assets.cars_first_lane);
    }

    animateAccordingTo(statusResponse) {
        console.log('interrupcion');

        // this._animateArrivingBuses(statusResponse.arrivingBuses(), this._canvas.arrivingBusesStartOffset(), this._canvas.arrivingBusesEndOffset());
        // this._animateDepartingBuses(statusResponse.departingBuses(), this._canvas.departingBusesStartOffset(), this._canvas.departingBusesEndOffset());

        this._animateTraffic(statusResponse.trafficStatus());
    }

    _onRepeat(car) {
        if (car.interrupted) {
            car.interrupted = false;
            gsap.killTweensOf(car);
            this._animateCar(car);
        }
    }

    _animateTraffic(trafficStatus) {
        this._first_lane_cars_timeline.play();
        this._updateCurrentTrafficAnimation(trafficStatus);
    }

    _updateCurrentTrafficAnimation(trafficStatus) {
        this._canvas.assets.cars_first_lane.map(car => {
            car.interrupted = true;
        });
    }

    _animateCars(cars) {
        cars.map(car => {this._animateCar(car)});
    }

    _animateCar(car) {
        this._first_lane_cars_timeline.fromTo(
            car,
            {x: this._canvas.carsStartOffset()},
            {repeat: -1, duration: 4, ease: "none", x: this._canvas.carsEndOffset(), onRepeat: this._onRepeat, onRepeatParams: [car]},
            `<${gsap.utils.random(0.3, 0.6)}`
        );
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
        const timeline = gsap.timeline();
        timeline.fromTo(bus, {x: startOffset}, {ease: "power1.out", duration: "random(5,7)", x: busStopOffset});
        timeline.to(bus, {ease: "power1.in", duration: "random(5,7)", x: endingOffset}, `+=${waitingTimeInSeconds}`);
        return timeline;
    }
}

export default Animator;