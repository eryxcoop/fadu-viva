import {Requester} from "./Requester.js";
import fakeRequesterExpectedResponses from "../mocks/fakeRequesterExpectedResponses.js";

class FakeRequester extends Requester {
    constructor(expectedResponses) {
        super();
        this._expectedResponses = expectedResponses || fakeRequesterExpectedResponses();
        this._responsesIndex = Object.fromEntries(Object.keys(this._expectedResponses).map(key => [key, 0]));
    }

    call({endpoint, onResponse, data = undefined}) {
        const expectedResponseType = this._expectedResponses[endpoint.constructor.name];
        const expectedResponseIndex = this._responsesIndex[endpoint.constructor.name];
        // TODO: Agregar response por defecto si no está definida en el diccionario
        const jsonResponses = expectedResponseType.defaultResponses();
        this._incResponseIndex(endpoint, jsonResponses);
        const endpointResponse = new expectedResponseType(jsonResponses[expectedResponseIndex]);
        console.log(endpointResponse);

        setTimeout(() => onResponse(endpointResponse), 2500);
    }

    _incResponseIndex(endpoint, responses) {
        const endpointName = endpoint.constructor.name;
        this._responsesIndex[endpointName] = (this._responsesIndex[endpointName] + 1) % responses.length;
    }
}

export default FakeRequester;