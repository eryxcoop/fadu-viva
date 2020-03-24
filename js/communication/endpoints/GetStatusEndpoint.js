import {Endpoint} from "./endpoint.js";
import {GetStatusSuccessfulResponse} from "../responses/GetStatusSuccessfulResponse.js";

export class GetStatusEndpoint extends Endpoint {
    static url() {
        return 'api/get-status'
    }

    ownResponses() {
        return [GetStatusSuccessfulResponse];
    }

    method() {
        return 'GET'
    }

    needsAuthorization() {
        return false;
    }
}