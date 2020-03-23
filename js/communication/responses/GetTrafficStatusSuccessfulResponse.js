import {SuccessfulApiResponse} from "./generalResponses/SuccessfulApiResponse.js";

export class GetTrafficStatusSuccessfulResponse extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            "object": {
                "status": 5.34
            },
            "errors": []
        }
    }

    status() {
        return this.content()['status']
    }
}