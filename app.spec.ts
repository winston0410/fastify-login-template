import fastify from "./app";

describe("when GET /", function() {
  it("should return 200", async function(done) {
    const response = await fastify.inject({
      method: "GET",
      url: "/"
    });

    expect(response.statusCode).toBe(200);
    done();
  });
});

afterAll(() => {
  fastify.close();
});
