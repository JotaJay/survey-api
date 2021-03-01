import request from "supertest";
import { app } from "../app";

import createConnection from "../database";

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Should return 201 when creating a new user", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "User Example",
    });

    expect(response.status).toBe(201);
  });

  it("Should return 409 when user already exists", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "User Example",
    });

    expect(response.status).toBe(409);
  });
});
