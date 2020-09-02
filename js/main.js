import App from "./app.js"
import FakeRequester from "./communication/requester/FakeRequester.js";

let app = new App(new FakeRequester(), 20);
// let app = new App();
app.initialize(app.pollForStatusAndAnimate);