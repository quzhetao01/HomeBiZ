import supertest from 'supertest';
import app from './app.js'

const request = require('supertest');
const assert = require('assert');

describe("POST /login", () => {
    describe("given a valid username and password", () => {
        
        test("should response with status code 200", async () => {
            const response = await supertest(app).post("/login").send({
                username: "test",
                password: "123"
            });
            expect(response.statusCode).toBe(302);
        })
    });

    // describe("given an invalid username or password", () => {

    // })
})