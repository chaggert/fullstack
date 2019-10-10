const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);
const User = require("../models/user");

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: "root", password: "sekret" });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username or password is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUserShortUsername = {
      username: "ro",
      name: "Superuser",
      password: "salainen"
    };

    const resultShortUsername = await api
      .post("/api/users")
      .send(newUserShortUsername)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(resultShortUsername.body.error).toContain(
      "is shorter than the minimum allowed length (3)."
    );

    const newUserShortPassword = {
      username: "super123",
      name: "Superuser",
      password: "sa"
    };

    const resultShortPassword = await api
      .post("/api/users")
      .send(newUserShortPassword)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(resultShortPassword.body.error).toContain(
      "Password must be at least 3 characters"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
