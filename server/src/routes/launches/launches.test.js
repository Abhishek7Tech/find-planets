const { response } = require("express");
const request = require("supertest");
const app = require("../../../app");

describe("Test Get/ Launches", () => {
  test("It should respond with 200", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-type", /json/)
      .expect(200);
  });
});

describe("Test Post /launch", () => {
  const dataWIthDate = {
    mission: "Indian 234",
    rocket: "Yaan 246",
    target: "My Computer",
    launchDate: "January 4,2030",
  };

  const dataWithOutDate = {
    mission: "Indian 234",
    rocket: "Yaan 246",
    target: "My Computer",
  };
  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(dataWIthDate)
      .expect("Content-type", /json/)
      .expect(201);

    // const reqDate = new Date(dataWIthDate.launchDate).valueOf();
    // const resDate = new Date(dataWIthDate.launchDate).valueOf();

    // expect(reqDate).toBe(resDate);

    // expect(response.body).toMatchObject(dataWithOutDate);
  });

  test("It should catch missing properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(dataWithOutDate)
      .expect("Content-type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid date!",
    });
  });

  const dataWIthInvalidDate = {
    mission: "Indian 234",
    rocket: "Yaan 246",
    target: "My Computer",
    launchDate: "Jassddfsd",
  };

  test("It should catch invalid date", async () => {
    const response = await request(app)
      .post("/launches")
      .send(dataWIthInvalidDate)
      .expect("Content-type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Invalid date!",
    });
  });
});
