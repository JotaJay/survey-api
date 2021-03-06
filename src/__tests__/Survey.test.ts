import request from "supertest";
import { app } from "../app";

import createConnection from "../database";

describe("Survey", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  let surveyId;

  it("Should return 201 when creating a new valid survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "New Survey",
      description: "New Survey Description",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    surveyId = response.body.id;
  });

  it("Should return 409 when attempting to create a survey that already exists", async () => {
    const response = await request(app).post("/surveys").send({
      title: "New Survey",
      description: "New Survey Description",
    });

    expect(response.status).toBe(409);
  });

  it("Should return 200 when trying to get survey list", async () => {
    const response = await request(app).get("/surveys").send();

    expect(response.status).toBe(200);
  });

  it("Should return 200 when trying to get a survey id that exists", async () => {
    const response = await request(app).get(`/surveys/${surveyId}`).send();

    expect(response.status).toBe(200);
  });

  it("Should return 400 when trying to get a survey id that does not exist", async () => {
    const response = await request(app).get(`/surveys/1`).send();

    expect(response.status).toBe(400);
  });
});
