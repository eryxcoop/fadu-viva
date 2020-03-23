import {Endpoint} from "./endpoint.js";
import {GetTrafficStatusSuccessfulResponse} from "../responses/GetTrafficStatusSuccessfulResponse.js";

export class GetTrafficStatusEndpoint extends Endpoint {
    static url() {
        return 'api/traffic-status'
    }

    ownResponses() {
        return [GetTrafficStatusSuccessfulResponse];
    }

    method() {
        return 'GET'
    }

    needsAuthorization() {
        return false;
    }
}