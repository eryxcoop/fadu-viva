import {ApiResponse} from "../response.js"

export class SuccessfulApiResponse extends ApiResponse {
    static defaultResponses() {
        throw new Error("You have to implement the method");
    }

    static understandThis(jsonResponse) {
        return jsonResponse.errors.length === 0;
    }
}