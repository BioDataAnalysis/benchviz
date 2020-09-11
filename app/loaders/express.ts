import express from "express";

export default async (app: express.Application) => {
    app.listen(3000, () => {
        console.log("🦠 Listening on port 3000");
    });

    app.get("/", (request: express.Request, response: express.Response): void => {
        response.send("Hi!");
    });

    app.post("/api/v1/login", (request: express.Request, response: express.Response): void => {
        console.log();
    });

    app.post("/api/v1/submission", (request: express.Request, response: express.Response): void => {
        console.log(request);
    });
};
