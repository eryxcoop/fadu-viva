import {ApiResponse} from "../response.js"

export class ErrorApiResponse extends ApiResponse {
    static defaultResponses() {
        throw new Error("You have to implement the method");
    }

    static errorCodes() {
        throw new Error("You have to implement the method");
    }

    static understandThis(jsonResponse) {
        return jsonResponse.errors.length > 0 && this.errorCodes().includes(jsonResponse.errors[0].code);
    }

    errorMessages() {
        return this.errors().map(eachError => eachError.text)
    }

    description() {
        return "¡Ha ocurrido un error!"
    }

    message() {
        return this.errorMessages();
    }
}