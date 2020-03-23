import {ServerErrorResponse} from "../responses/generalResponses/ServerErrorResponse.js";
import {GetTrafficStatusEndpoint} from "../endpoints/GetTrafficStatusEndpoint.js";


class ApiClient {
    constructor(requester, onServerErrorDo = () => {}) {
        this._requester = requester;
        this._handleServerError = onServerErrorDo;
        this._handleResponse = this._handleResponse.bind(this);
    }

    _handleResponse(response, onResponse) {
        if (response instanceof ServerErrorResponse) {
            return this._handleServerError(response);
        }

        return onResponse(response);
    }

    getTrafficStatus(onResponse) {
        return this._requester.call({
            endpoint: new GetTrafficStatusEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }
}

export default ApiClient;