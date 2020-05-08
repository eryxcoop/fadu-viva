class HighwayTrafficLoopAnimator {
    constructor(canvas) {
        this._canvas = canvas;
        this._initializeCarsAnimation(this._canvas.firstLaneCars());
        setTimeout(() => this._initializeCarsAnimation(this._canvas.secondLaneCars()), 250);
    }

    animateAccordingTo(trafficCongestion) {
        const [speed, probability] = this._targetSpeedAndAppearanceProbabilityFromTrafficCongestion(trafficCongestion);
        this._setCarsTargetSpeedAndAppearanceProbability(this._canvas.firstLaneCars(), speed, probability);
        this._setCarsTargetSpeedAndAppearanceProbability(this._canvas.secondLaneCars(), speed, probability);
    }

    _initializeCarsAnimation(cars) {
        const defaultCarTargetSpeed = 1;
        const defaultCarAppearanceProbability = 0;
        this._setCarsTargetSpeedAndAppearanceProbability(cars, defaultCarTargetSpeed, defaultCarAppearanceProbability);
        this._animateCars(cars);
    }

    _targetSpeedAndAppearanceProbabilityFromTrafficCongestion(trafficCongestion) {
        let targetSpeed = undefined;
        let carAppearanceProbability = undefined;
        if (trafficCongestion < 2) {
            targetSpeed = 1.5;
            carAppearanceProbability = 0.05;
        } else if (trafficCongestion < 4.5) {
            targetSpeed = 1.33;
            carAppearanceProbability = 0.3;
        } else if (trafficCongestion < 6) {
            targetSpeed = 1;
            carAppearanceProbability = 0.6;
        } else if (trafficCongestion < 8) {
            targetSpeed = 0.83;
            carAppearanceProbability = 0.8;
        } else {
            targetSpeed = 0.44;
            carAppearanceProbability = 0.9;
        }
        return [targetSpeed, carAppearanceProbability];
    }

    _setCarsTargetSpeedAndAppearanceProbability(cars, speed, probability) {
        cars.map(car => {
            car.targetSpeed = speed;
            car.appearanceProbability = probability;
        });
    }

    _animateCars(cars) {
        cars.map((car, index) => {
            this._animateCar(car, cars, 3.5, index * 0.5 + 0.7);
        });
    }

    _animateCar(car, cars, duration, delay_ = gsap.utils.random(0.5, 0.7), position = 4) {
        gsap.fromTo(
            car,
            {x: this._canvas.carsStartOffset(), opacity: 0},
            {
                delay: delay_,
                repeat: -1,
                duration: duration,
                ease: "none",
                x: this._canvas.carsEndOffset(),
                onRepeat: function () {
                    const thisCar = this.targets()[0];
                    const carAppear = gsap.utils.random(0, 1) < thisCar.appearanceProbability;
                    gsap.set(thisCar, {opacity: (carAppear)? 1 : 0});
                },
                onUpdate: function (cars, startOffset, endOffset) {
                    const thisCar = this.targets()[0];
                    const thisCarIndex = cars.findIndex(car => car.id === thisCar.id);
                    const nextCarIndex = (index, length) => (index - 1 + length) % length;
                    const completeDistance = endOffset - startOffset;

                    const thisCarPosition = gsap.getProperty(cars[thisCarIndex], "x");
                    const nextCarPosition = gsap.getProperty(cars[nextCarIndex(thisCarIndex, cars.length)], "x");
                    const distanceWithNextCar = (nextCarPosition - thisCarPosition + completeDistance) % completeDistance;

                    const randomBrake = gsap.utils.random(0.992, 0.995);
                    const randomThrottle = gsap.utils.random(1.01, 1.05);

                    const startBrakeDistance = 500 * this.timeScale() * 1.2;
                    const tooFarAwayDistance = completeDistance / 3;

                    if (distanceWithNextCar < startBrakeDistance) {
                        const brakingValue = this.timeScale() * 0.9 * (distanceWithNextCar/startBrakeDistance);
                        const minSpeed = 0.1;
                        this.timeScale(Math.max(brakingValue, minSpeed));
                    } else if (tooFarAwayDistance < distanceWithNextCar || this.timeScale() < thisCar.targetSpeed) {
                        const throttleValue = this.timeScale() * randomThrottle;
                        const maxSpeed = thisCar.targetSpeed * 1.2;
                        this.timeScale(Math.min(throttleValue, maxSpeed));
                    } else if (thisCar.targetSpeed < this.timeScale()) {
                        this.timeScale(this.timeScale() * randomBrake);
                    }
                },
                onUpdateParams: [cars, this._canvas.carsStartOffset(), this._canvas.carsEndOffset()],
            }
        );
    }

}

export default HighwayTrafficLoopAnimator;