const request = require("supertest");

describe("With API", () => {
  const { PORT, server } = require("./app");
  const baseURL = `http://localhost:${PORT}/api`;

  afterAll(async () => {
    await server.close();
  });
    
  describe("GET /users", () => {
    it("should return 200", async () => {
      const response = await request(baseURL).get(
        "/users?since=33&per_page=77"
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(77);
      expect(response.body.error).toBeUndefined();
    });
  });

  describe("GET /users/MarianellaGL/details", () => {
    it("should return 200", async () => {
      const response = await request(baseURL).get(
        "/users/MarianellaGL/details"
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBeDefined();
      expect(response.body.login).toBe("MarianellaGL");
      expect(response.body.url).toBe("https://github.com/MarianellaGL");
      expect(response.body.error).toBeUndefined();
    });

    it("should return 404", async () => {
      const response = await request(baseURL).get(
        "/users/UserThatDoesNotExist28912398/details"
      );
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });

  describe("GET /users/MarianellaGL/repos", () => {
    it("should return 200", async () => {
      const response = await request(baseURL).get("/users/MarianellaGL/repos");
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].id).toBeDefined();
      expect(response.body[0].full_name).toBeDefined();
      expect(response.body[0].url).toBeDefined();
      expect(response.body.error).toBeUndefined();
    });

    it("should return 404", async () => {
      const response = await request(baseURL).get(
        "/users/UserThatDoesNotExist28912398/repos"
      );
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });
});
