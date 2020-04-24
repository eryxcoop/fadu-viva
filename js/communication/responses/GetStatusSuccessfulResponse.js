import {SuccessfulApiResponse} from "./generalResponses/SuccessfulApiResponse.js";

export class GetStatusSuccessfulResponse extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            "object": {
                "services": {
                    "traffic": {
                        "status": 5.34
                    }
                }
            },
            "errors": []
        }
    }

    trafficStatus() {
        return this.services().traffic.status
    }

    arrivingBuses() {
        return this.services().buses.arriving;
    }

    departingBuses() {
        return this.services().buses.departing;
    }

    services() {
        return this.content().services
    }
}