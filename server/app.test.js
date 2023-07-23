import supertest from 'supertest';
import app from './app.js'

const User = require("./models/user.model.js").User;
const Listing = require("./models/listing.model.js").Listing;
const Service = require("./models/service.model.js").Service;
const Review = require("./models/review.model.js").Review;


describe("POST /login", () => {

    describe("given a valid username and password", () => {
        
        
        test("should return 302 status and redirect to /success", async () => {
            const response = await supertest(app).post("/login").send({
                username: "test",
                password: "123"
            });
            expect(response.statusCode).toBe(302);
            expect(response.headers.location).toBe('/success');
        });

    });

    describe("given an invalid username or password", () => {

        test("should redirect to /failureLogin on wrong username" , async () => {
            const response = await supertest(app).post("/login").send({
                username: "test69",
                password: "123"
            });
            expect(response.headers.location).toBe('/failureLogin');
            expect(response.statusCode).toBe(302);
        });

        test("should redirect to /failureLogin on wrong password" , async () => {
            const response = await supertest(app).post("/login").send({
                username: "test",
                password: "1234"
            });
            expect(response.headers.location).toBe('/failureLogin');
            expect(response.statusCode).toBe(302);
        });
    });
});


describe('GET /success', () => {
    
    test('should respond with user data when authenticated', async () => {
      // Simulate authenticated user by setting req.isAuthenticated()
      const authenticatedAgent = supertest.agent(app);
      await authenticatedAgent.post('/login').send({ username: 'test', password: '123' });
  
      const response = await authenticatedAgent.get('/success');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user._id', "64a51e09665de511e092288b");
      expect(response.body).toHaveProperty('user.username', 'test');

    });
  
    test('should respond with an error when not authenticated', async () => {
      const response = await supertest(app).get('/success');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ user: null, error: 'Something went wrong' });
    });
});

describe('GET /failureLogin', () => {
    test('should respond with error message', async () => {
      const response = await supertest(app).get('/failureLogin');
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ user: null, error: 'Wrong username or password' });
    });
});
  

describe('POST /register', () => {

    test('should redirect to /success on successful registration', async () => {
        const newUser = {
            username: 'newtestuser',
            firstname: 'Stephen',
            lastName: 'Curry',
            password: 'testpassword'
        }

        const response = await supertest(app).post("/register").send(newUser);
        expect(response.status).toBe(302);
        expect(response.header.location).toBe('/success');

        //housekeeping
        await User.findOneAndDelete( {username: newUser.username});
    });

    test('should respond with an error for invalid registration request due no username', async () => {
        const invalidUser = {
          // Missing required fields
          // username: 'testuser2',
          firstName: 'John',
          lastName: 'Mayer',
          password: 'testpassword',
        };

        const response = await supertest(app).post('/register').send(invalidUser);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ user: null, error: 'No username was given' });
    });

    test('should respond with an error for invalid registration request due no password', async () => {
        const invalidUser = {
          // Missing required fields
          username: 'testuser2',
          firstName: 'John',
          lastName: 'Mayer',
          // password: 'testpassword',
        };

        const response = await supertest(app).post('/register').send(invalidUser);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ user: null, error: 'No password was given' });
    });

    test('should respond with an error for invalid registration request due duplicate username', async () => {
        const duplicateUser = {
          // Missing required fields
          username: 'test',
          firstName: 'John',
          lastName: 'Mayer',
          password: 'testpassword',
        };

        const response = await supertest(app).post('/register').send(duplicateUser);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ user: null, error: 'A user with the given username is already registered' });
    });

    test('should hash and store the user password in the database', async () => {
        const newUser = {
          username: 'newTestUser2',
          firstName: 'Steph',
          lastName: 'Chili',
          password: 'testpassword2',
        };
    
        const response = await supertest(app).post('/register').send(newUser);
        expect(response.status).toBe(302); // Redirect status code
        expect(response.header['location']).toBe('/success');
    
        // Check if the user is stored in the database
        const user = await User.findOne({ username: newUser.username });
        expect(user).toBeTruthy(); // User should exist in the database
        expect(user.password).not.toBe(newUser.password); // Password should be hashed

        await User.findOneAndDelete( {username: newUser.username});
      });
});

describe("GET /user", () => {

    describe("user is logged in", () => {

        test("should respond with user data ", async () => {
            const agent = supertest.agent(app);
            await agent.post('/login').send({
                username: "test",
                password: "123"
            });

            const response = await agent.get('/user');

            expect(response.status).toBe(200);
            expect(response.body.username).toBe("test");
            expect(response.body.lastName).toBe("One");
        })
    });

    describe("user is not logged in", () => {
        
        test("should respond with user not found", async () => {

            const response = await supertest(app).get('/user');

            expect(response.status).toBe(200);
            expect(response.text).toBe('No user found');
        })
    })
})

describe("POST /logout", () => {

    test('should logout user', async () => {
        
        const agent = supertest.agent(app);
        await agent.post('/login').send({
            username: "test",
            password: "123"
        });

        const response = await agent.post('/logout');

        expect(response.status).toBe(200);
        expect(response.text).toBe("Sucessfully logged out");

        // check that there is no user logged in
        const userResponse = await agent.get('/user');

        expect(userResponse.status).toBe(200);
        expect(userResponse.text).toBe('No user found');
    });


    test('should return error if there is no user logged in', async () => {
        
        const response = await supertest(app).post('/logout');

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No user is currently logged in");
    });
});


describe("PATCH /addInterest/:id", () => {
    
    test('should update the user category and respond with the updated user', async () => {
        // Create a new user in the database for testing
        const newUser = {
          username: 'testuser555',
          firstName: 'Stephen',
          lastName: 'Curry',
          password: 'testpassword',
        };
        const createdUser = await User.create(newUser);
        const newCategory = 'Fashion';
    
        // Perform a PATCH request to /addInterest/:id to update the user category
        const response = await supertest(app)
          .patch(`/addInterest/${createdUser._id}`)
          .send({ category: newCategory });
    
        expect(response.status).toBe(200);
        expect(response.body.category).toBe(newCategory);
        // Verify the user's ID to ensure it's the same as the one in the database
        expect(response.body._id).toBe(String(createdUser._id));
    
        // Housekeeping
        await User.findByIdAndRemove(createdUser._id);
      });
})

describe("PATCH /favourites/:id and PATCH /removeFavourites/:id" , () => {
    
    test('should add to the user favourites and respond with the updated user', async () => {

        const newUser = {
          username: 'testuser666',
          firstName: 'Stephen',
          lastName: 'Curry',
          password: 'testpassword',
        };
        const createdUser = await User.create(newUser);
        const retrievedListing = await Listing.findById('64a51f24665de511e092289b');
    
        // Perform a PATCH request to /favourites/:id to update the user favourites
        const response = await supertest(app)
          .patch(`/favourites/${createdUser._id}`)
          .send({ id: retrievedListing._id});

        expect(response.status).toBe(200);

        const updatedUser = await User.findById(createdUser._id);
        expect(updatedUser.favourites).toContainEqual(retrievedListing._id);

    });

    test('should then delete from the user favourites and respond with the updated user', async () => {

        const createdUser = await User.findOne({ username: 'testuser666' });
        const retrievedListing = await Listing.findById('64a51f24665de511e092289b');

        // Perform a PATCH request to /removeFavourites/:id to update the user favourites
        const response = await supertest(app)
          .patch(`/removeFavourites/${createdUser._id}`)
          .send({ id: retrievedListing._id});

          expect(response.status).toBe(200);

        const updatedUser = await User.findById(createdUser._id);
        expect(updatedUser.favourites).not.toContainEqual(retrievedListing.id);

        await User.findByIdAndRemove(createdUser._id);
    })
})


// describe("POST /services/:listing_id")   unused
// describe("POST /review/:listing_id")   unused