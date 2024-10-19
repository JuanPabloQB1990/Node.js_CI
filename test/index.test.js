import request from "supertest"
import app from "../app.js"

describe("GET /api/message", () => {
    it("should send back a JSON response", async() => {
        const res = await request(app).get("/api/message").send()
        expect(res.statusCode).toBe(200)
    })

    it("should response with an object", async() => {
        const res = await request(app).get("/api/users").send()
        expect(res.body).toBeInstanceOf(Object)
    })
})

describe("GET /api/users", () => {
    
    it("should response with an Array of users", async() => {
        const res = await request(app).get("/api/users").send()
        expect(res.body).toBeInstanceOf(Array)
    })
})

describe("POST /api/users", () => {
    describe("given the name correctly", () => {
        it("should response with 201 status code", async() => {
            const res = await request(app).post("/api/users").send({name: "pablo"})
            expect(res.statusCode).toBe(201)
        })
    
        it("should response with a message user created", async() => {
            const res = await request(app).post("/api/users").send({name: "pablo"})
            expect(res.body.msg).toEqual("user created");
        })
    
        it("should response have content-type: application/json in header", async() => {
            const res = await request(app).post("/api/users").send()
            expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"))
        })
    
        it("should response with user id", async() => {
            const res = await request(app).post("/api/users").send(
                {name: "Pablo" }
            )
            expect(res.body.msg).toEqual("user created");
        })

    })

    describe("when the name es missing", () => {
        test('[should response with a 400 status code', async() => {
            const fields = [
                {},
                {name: ""},
            
            ]
            for (const body of fields) {
                const res = await request(app).post("/api/users").send(body)
                expect(res.statusCode).toBe(400)
            }
        })
    })

})