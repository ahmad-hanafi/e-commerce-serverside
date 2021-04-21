const request = require('supertest')
const app = require("../app")

describe("Login user / Success Case", () => {
    it("Should response 200", (done) => {
        request(app)
            .post("/login")
            .send({
                email: "aman@kak.com",
                password: "aman",
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(200)
                expect(body).toHaveProperty('access_token', expect.any(String))

                done()
            });
    })
})

describe("Login user / Failed Case", () => {
    it("Wrong password and status response 400", (done) => {
        request(app)
            .post("/login")
            .send({
                email: "aman@kak.com",
                password: "aman1",
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message')

                done()
            })

    })
    it("Email is undefined on DB", (done) => {
        request(app)
            .post("/login")
            .send({
                email: "aman1@kak.com",
                password: "aman",
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'invalid email or password')

                done()
            })

    })
    it("Email and password are empty", (done) => {

        request(app)
            .post("/login")
            .send({
                email: "",
                password: "",
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Email cannot be empty')

                done()
            })
    })

})


