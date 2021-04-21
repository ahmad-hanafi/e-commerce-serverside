const request = require("supertest")
const app = require("../app")
const { Product,sequelize } = require('../models')
const {queryInterface} = sequelize
const { generateToken } = require('../helpers/jwt')

let access_token = generateToken({ email: "aman@kak.com", id: 1 })

beforeAll((done) => {
    queryInterface.bulkInsert('Products', 
     [
       {
        id: 1,
        name: "Beras bulog 5kg",
        image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
        price: 59500,
        stock: 5,
        category: "Bulog",
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        id: 2,
        name: "Beras bulog 15kg",
        image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/9/27/9c156ef5-74cb-4c94-baa4-b672a1ae8373.jpg",
        price: 135000,
        stock: 10,
        category: "Bulog",
        createdAt: new Date(),
        updatedAt: new Date()
       }
      ], {})
      .then(() => {
          done()
      })
      .catch((err) => {
          done(err)
      })
})

afterAll((done) => {
    queryInterface.bulkDelete('Products', null, {})
    .then(() => {
        done()
    })
    .catch((err) => {
        done(err)
    })
})

describe("Create Product / Success case", () => {
    it("Should return response 201", (done) => {
        request(app)
            .post("/products")
            .set('access_token', access_token)
            .send({
                name: "Beras Bulog 5kg",
                image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
                price: 59500,
                stock: 10,
                category: "Bulog"
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', 'Beras Bulog 5kg')
                expect(body).toHaveProperty('category', 'Bulog')
                expect(body).toHaveProperty('image_url', 'https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg')
                expect(body).toHaveProperty('price', 59500)
                expect(body).toHaveProperty('stock', 10)

                done()
            })
    })
})

describe("Create Product / Failed case", () => {
    it("Tidak menyertakan access token", (done) => {
        request(app)
            .post("/products")
            .send({
                name: "Beras Bulog 5kg",
                image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
                price: 59500,
                stock: 10,
                category: "Bulog"
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'jwt must be provided')
                done()
            })
    })

    it("Menyertakan access token tapi bukan punya admin", (done) => {
        request(app)
            .post("/products")
            .set('access_token', access_token+2)
            .send({
                name: "Beras Bulog 5kg",
                image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
                price: 59500,
                stock: 10,
                category: "Bulog"
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'invalid signature')
                done()
            })
    })

        it("field yg required tidak diisi", (done) =>{
            request(app)
            .post("/products")
            .set('access_token', access_token)
            .send({
                name: "",
                image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
                price: 59500,
                stock: 10,
                category: "Bulog"
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Name is required')
                done()
            })
        })

        it("stock diisikan angka minus", (done) =>{
            request(app)
            .post("/products")
            .set('access_token', access_token)
            .send({
                name: "Beras Bulog 5kg",
                image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
                price: 59500,
                stock: -10,
                category: "Bulog"
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Cannot be negative value')
                done()
            })
        })

        it("price diisikan angka minus", (done) =>{
             request(app)
            .post("/products")
            .set('access_token', access_token)
            .send({
                name: "Beras Bulog 5kg",
                image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
                price: -59500,
                stock: 10,
                category: "Bulog"
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Cannot be negative value')
                done()
            })
        })

        it("field diisikan tipe data yg tidak sesuai", (done) =>{
            request(app)
                .post("/products")
                .set('access_token', access_token)
                .send({
                    name: "Beras Bulog 5kg",
                    image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
                    price: 59500,
                    stock: "aba",
                    category: "Bulog"
                })
                .end(function (err, res) {
                    if (err) done(err);
                    const { body, status } = res
                    expect(status).toEqual(400)
                    expect(body).toHaveProperty('message', 'Must number')
                    done()
                })
        })
})

let idProduct = 1
describe("Update Product / Success case", () => {
    it("Should return response 201", (done) => {

        request(app)
        .put("/products/" + idProduct)
        .set('access_token', access_token)
        .send({
            id: idProduct,
            name: "Beras Bulog 15kg",
            image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/9/27/9c156ef5-74cb-4c94-baa4-b672a1ae8373.jpg",
            price: 135000,
            stock: 5,
            category: "Bulog"
        })
        .end(function (err, res) {
            if (err) done(err);
            const {body, status} = res
            expect(status).toEqual(200)
            expect(body).toHaveProperty("message", "Succeess Update")
            
            done()
        })
    })
})

describe("Update Product / Failed case", () => {
    it("Tidak menyertakan access token", (done) => {
        request(app)
            .post("/products")
            .send({
                name: "Beras Bulog 5kg",
                image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
                price: 59500,
                stock: 10,
                category: "Bulog"
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'jwt must be provided')
                done()
            })
    })

    it("Menyertakan access token tapi bukan punya admin", (done) => {
        request(app)
            .post("/products")
            .set('access_token', access_token+2)
            .send({
                name: "Beras Bulog 5kg",
                image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
                price: 59500,
                stock: 10,
                category: "Bulog"
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'invalid signature')
                done()
            })
    })

        it("field yg required tidak diisi", (done) =>{
            request(app)
            .post("/products")
            .set('access_token', access_token)
            .send({
                name: "",
                image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
                price: 59500,
                stock: 10,
                category: "Bulog"
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Name is required')
                done()
            })
        })

        it("stock diisikan angka minus", (done) =>{
            request(app)
            .post("/products")
            .set('access_token', access_token)
            .send({
                name: "Beras Bulog 5kg",
                image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
                price: 59500,
                stock: -10,
                category: "Bulog"
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Cannot be negative value')
                done()
            })
        })

        it("price diisikan angka minus", (done) =>{
             request(app)
            .post("/products")
            .set('access_token', access_token)
            .send({
                name: "Beras Bulog 5kg",
                image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
                price: -59500,
                stock: 10,
                category: "Bulog"
            })
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message', 'Cannot be negative value')
                done()
            })
        })

        it("field diisikan tipe data yg tidak sesuai", (done) =>{
            request(app)
                .post("/products")
                .set('access_token', access_token)
                .send({
                    name: "Beras Bulog 5kg",
                    image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
                    price: 59500,
                    stock: "aba",
                    category: "Bulog"
                })
                .end(function (err, res) {
                    if (err) done(err);
                    const { body, status } = res
                    expect(status).toEqual(400)
                    expect(body).toHaveProperty('message', 'Must number')
                    done()
                })
        })
})

describe("Delete Product / Success case", () => {
    it("Should return response 200", (done) => {

        request(app)
        .delete("/products/" + 2)
        .set('access_token', access_token)
        .end(function (err, res) {
            if (err) done(err);
            const {body, status} = res
            expect(status).toEqual(200)
            expect(body).toHaveProperty('message', 'Product success to delete')
            
            done()
        })
    })
})

describe("Delete Product / Failed case", () => {
    it("Tidak menyertakan access token", (done) => {
        request(app)
        .delete("/products/" + idProduct)
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'jwt must be provided')
                done()
            })
    })
    it("Menyertakan access token tapi bukan punya admin", (done) => {
        request(app)
        .delete("/products/" + idProduct)
        .set('access_token', access_token+1)
            .end(function (err, res) {
                if (err) done(err);
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body).toHaveProperty('message', 'invalid signature')

                done()
            })
    })
})