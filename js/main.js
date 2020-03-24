import App from "./app.js"

let app = new App();
app.initialize(function (app) {
    let animator = app.animator();
    animator.animateTrain();
    app.trafficService().getTrafficStatus((response) => {
        console.log(response)
    });
});