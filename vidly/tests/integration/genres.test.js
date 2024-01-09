const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");
const request = require("supertest");
const mongoose = require("mongoose");

let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    await server.close();
    await Genre.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      const response = await request(server).get("/api/genres");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(response.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a genre given a valid id", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if an invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/" + 1);
      expect(res.status).toBe(404);
    });

    it("should return 404 if no genre with the given id exists", async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server).get("/api/genres/" + id);
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    // Define the happy path, and then in each test, we change one parameter that clearly
    // aligns with the name of the test.
    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    it("should return 401 if the client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if the genre name is less than 5 characters", async () => {
      name = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the genre name is mote than 50 characters", async () => {
      name = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid", async () => {
      await exec();

      const genre = await Genre.find({ name: "genre1" });

      expect(genre).not.toBeNull();
    });

    it("should return the genre if it is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });

  describe("PUT /:id", () => {
    let genreId = new mongoose.Types.ObjectId();
    let token;
    let name;

    beforeEach(async () => {
      await Genre.create({ _id: genreId, name: "genre1" });
      token = new User().generateAuthToken();
      name = "genre5";
    });

    afterEach(async () => {
      await Genre.deleteMany({});
    });

    const exec = () =>
      request(server)
        .put("/api/genres/" + genreId)
        .set("x-auth-token", token)
        .send({ name });

    it("should return 401 if the client is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is less than 5 characters", async () => {
      name = "a";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is more than 50 characters", async () => {
      name = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 404 if no genre with the given id exists", async () => {
      genreId = new mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should update the genre if it is valid", async () => {
      await exec();
      const genre = await Genre.findById(genreId);
      expect(genre.name).toBe("genre5");
    });

    it("should return the genre if it is valid", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre5");
    });
  });

  describe("DELETE /:id", () => {
    let genreId = new mongoose.Types.ObjectId();
    let token;

    beforeEach(async () => {
      await Genre.create({ _id: genreId, name: "genre1" });
      token = new User({ isAdmin: true }).generateAuthToken();
    });

    afterEach(async () => {
      await Genre.deleteMany({});
    });

    const exec = () =>
      request(server)
        .delete("/api/genres/" + genreId)
        .set("x-auth-token", token);

    it("should return 401 if the client is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 403 if client is not an admin", async () => {
      token = new User().generateAuthToken();
      const res = await exec();
      expect(res.status).toBe(403);
    });

    it("should return 404 if no genre with the given id exists", async () => {
      genreId = new mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should delete the genre if it is valid", async () => {
      await exec();
      const genre = await Genre.findById(genreId);
      expect(genre).toBeNull();
    });

    it("should return the genre if it is valid", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
});
