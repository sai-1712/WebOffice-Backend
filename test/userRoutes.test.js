const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // assuming the app is exported from app.js
const server = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("----------------------   User API Routes    ---------------------------", () => {
    let userId;

    before(async () => {

        // create a sample user
        console.log("\n-------------------------------------------------------------------------------------\n");
        const user = await chai.request(app).post("/signIn").send({
            email: "Mocha@admin.com",
            password: "Mocha@123"
        });
        console.log("before done");
        userId = user.body.data.userLogin._id;
        console.log("userId: " + userId);
    });

    
    describe('GET /getallusers', function() {
        it('should return a list of all users', async function() {
            const res = await chai.request(app).get('/getallusers');
            expect(res).to.have.status(201);
            expect(res.body.message).to.equal('success');
            expect(res.body.data.users).to.be.an('array');
        });
    });

    describe('POST /edituser/:id', function() {
    
        it('should edit a user', async function() {
          const res = await chai.request(app)
            .post(`/edituser/:${userId}`)
            .send({ name: 'Mocha Admin' });
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('successfully edited a user');
          expect(res.body.data.newuser.name).to.equal('Mocha Admin');
        });
    
        it('should handle errors correctly', async function() {
          const res = await chai.request(app)
            .post('/edituser/:nonexistentid')
            .send({ name: 'Mocha Admin Test' });
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('fail');
          expect(res.body.error).to.not.be.null;
        });
    });
    
    // describe('GET /deleteuser/:id', function() {
    
    //     it('should delete a user', async function() {
    //       const res = await chai.request(app).get(`/deleteuser/:${userId}`);
    //       expect(res).to.have.status(201);
    //       expect(res.body.message).to.equal('successfully deleted a user');
    //     });
    
    //     it('should handle errors correctly', async function() {
    //       const res = await chai.request(app).get('/deleteuser/:nonexistentid');
    //       expect(res).to.have.status(404);
    //       expect(res.body.message).to.equal('fail');
    //       expect(res.body.error).to.not.be.null;
    //     });
    // });
    
    after((done) => {
        // delete the sample user and associated employees
        // await chai.request(app).delete(`/users/${userId}`);
        done();
    });
});
