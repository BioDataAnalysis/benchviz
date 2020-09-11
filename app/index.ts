import express, { Application } from "express"

const app: Application = express();

app.listen(3000, () => {
    console.log("🦠 Listening on port 3000");
});

app.get("/", (request, response): void => {
    response.send("Hi!");
});
