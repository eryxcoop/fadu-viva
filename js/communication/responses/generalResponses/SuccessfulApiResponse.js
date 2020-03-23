import {ApiResponse} from "../response.js"

export class SuccessfulApiResponse extends ApiResponse {
    static defaultResponse() {
        throw new Error("You have to implement the method");
    }

    static understandThis(jsonResponse) {
        return jsonResponse.errors.length === 0;
    }
}