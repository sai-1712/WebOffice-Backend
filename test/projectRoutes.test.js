const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // assuming the app is exported from app.js
const server = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("--------------------   Project API Routes   -----------------------", () => {
    let userId;

    before(async () => {
        // create a sample user
        console.log("\n-------------------------------------------------------------------------------------\n");
        const user = await chai.request(app).post("/signIn").send({
            email: "change@managerwo.com",
            password: "change@123"
        });
        console.log("before done");
        userId = user.body.data.userLogin._id;
        console.log("userId: " + userId);
    });

    describe("GET /getproject/:id", () => {
        it("should return an array of projects for the given user id", (done) => {
            chai
            .request(app)
            .get(`/getproject/:${userId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                expect(res.body.message).to.equal("success");
                expect(res.body.data.projects).to.be.an("array");
                done();
            });
        });
        
        it("should return an error message for an invalid user id", (done) => {
            const invalidUserId = "invalid_id";
            chai
            .request(app)
            .get(`/getproject/:${invalidUserId}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an("object");
                expect(res.body.message).to.equal("fail");
                expect(res.body.error).to.be.an("object");
                done();
            });
        });
    });

    after((done) => {
        done();
      });

});
