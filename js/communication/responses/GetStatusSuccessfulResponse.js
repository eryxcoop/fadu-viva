import {SuccessfulApiResponse} from "./generalResponses/SuccessfulApiResponse.js";

export class GetStatusSuccessfulResponse extends SuccessfulApiResponse {
    static defaultResponses() {
        return [
            {
                "object": {
                    "services": {
                        "traffic": {"status": 1.4},
                        "buses": {"arriving": ["34", "37"], "departing": ["33"]},
                        "daylight": {"brightness": 2}
                    }
                }, "errors": []
            }, {
                "object": {
                    "services": {
                        "traffic": {"status": 1.4},
                        "buses": {"arriving": ["28"], "departing": []},
                        "daylight": {"brightness": 5}
                    }
                }, "errors": []
            }, {
                "object": {
                    "services": {
                        "traffic": {"status": 5.9},
                        "buses": {"arriving": [], "departing": []},
                        "daylight": {"brightness": 3}
                    }
                }, "errors": []
            }, {
                "object": {
                    "services": {
                        "traffic": {"status": 7.1},
                        "buses": {"arriving": ["42"], "departing": ["28", "34", "37"]},
                        "daylight": {"brightness": 1},
                    }
                }, "errors": []
            }];
    }

    daylightBrightness() {
        return this.services().daylight.brightness
    }

    trafficStatus() {
        return this.services().traffic.status
    }

    arrivingBuses() {
        // currently we don't handle repeated buses animation
        return [...new Set(this.services().buses.arriving)];
    }

    departingBuses() {
        // currently we don't handle repeated buses animation
        return [...new Set(this.services().buses.departing)];
    }

    services() {
        return this.content().services
    }
}