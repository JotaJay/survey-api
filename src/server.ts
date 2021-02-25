import "reflect-metadata";
import express from "express";
import "./database";

import { router } from "./routes";
const app = express();
const port = 3333;

app.get("/users", (request, response) => {
  return response.json({ message: "Hello World" });
});

app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Running on port ${port}`));
