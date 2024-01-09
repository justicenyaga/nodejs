const request = require("supertest");
const { Rental } = require("../../models/rental");
const mongoose = require("mongoose");

describe("/api/returns", () => {
  let server;
  let customerId;
  let movieId;
  let rental;

  beforeEach(async () => {
    server = require("../../index");

    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();

    rental = await Rental.create({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "12345",
      },
      movie: {
        _id: movieId,
        title: "12345",
        dailyRentalRate: 2,
      },
    });
  });

  afterEach(async () => {
    server.close();
    await Rental.deleteMany({});
  });

  it("should return 401 if the client is not logged in", async () => {
    const res = await request(server)
      .post("/api/returns")
      .send({ customerId, movieId });

    expect(res.status).toBe(401);
  });
});
