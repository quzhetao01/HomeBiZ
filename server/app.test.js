import supertest from 'supertest';
import app from './app.js'

describe("POST /login", () => {
    describe("given a valid username and password", () => {
        
        test("should response with status code 200", async () => {
            const response = await request(app).post("/login").send({
                username: "test",
                password: "123"
            });
            expect(response.statusCode).toBe(200);
        })
    });

    // describe("given an invalid username or password", () => {

    // })
})