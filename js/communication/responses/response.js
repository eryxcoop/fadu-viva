export class ApiResponse {
    static understandThis(jsonResponse) {
        throw new Error("You have to implement the method");
    }

    constructor(jsonResponse) {
        this._jsonResponse = jsonResponse;
    }

    hasError() {
        return this.errors().length >= 1
    }

    errors() {
        return this._jsonResponse.errors || [];
    }

    content() {
        return this._jsonResponse.object || {};
    }
}