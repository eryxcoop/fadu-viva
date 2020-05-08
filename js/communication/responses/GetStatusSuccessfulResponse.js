import {SuccessfulApiResponse} from "./generalResponses/SuccessfulApiResponse.js";

export class GetStatusSuccessfulResponse extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            "object": {
                "services": {
                    "traffic": {
                        "status": 5.34
                    },
                    "buses": {
                        "arriving": ["42", "37"],
                        "departing": ["33"]
                    },
                    "daylight": {
                        "brightness": 1.35
                    }
                }
            },
            "errors": []
        }
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