const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // assuming the app is exported from app.js
const server = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("--------------------   Employee API Routes   -----------------------", () => {
  let userId;
  let employeeId;

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

  after((done) => {
    // delete the sample user and associated employees
    // await chai.request(app).delete(`/users/${userId}`);
    done();
  });

  describe("POST /addemployee/:id", () => {
    it("should add an employee to a user", async () => {
      const res = await chai.request(app).post(`/addemployee/:${userId}`).send({
        id: "emp143",
        fname: "sk",
        lname: "vd",
        uname: "johndoe",
        email: "johndoe@example.com",
        jdate: "12-12-12",
        phone: "1234567890",
        company: "Example Inc.",
        designation: "Software Engineer",
        department: "Engineering"
      });
      expect(res).to.have.status(201);
      expect(res.body.message).to.equal("successfully added an employee");
      employeeId = res.body.data.newuser.employees[0]._id;
    });
  });

  describe("GET /getemployee/:id", () => {
    it("should get list of employees by user ID", async () => {
      const res = await chai.request(app).get(`/getemployee/:${userId}`);
      expect(res).to.have.status(200);
    });
  });

  
  describe("POST /editemployee/:id", () => {
    it("should edit an employee by ID", async () => {
      const res = await chai
        .request(app)
        .post(`/editemployee/:${employeeId}`)
        .send({
          id: "emp143",
          fname: "sk",
          lname: "r",
          uname: "johndoe",
          email: "johndoe@example.com",
          jdate: "12-12-12",
          phone: "1234567890",
          company: "Example Inc.",
          designation: "Software Engineer",
          department: "Engineering"
        });
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal("successfully edited emp");
      });
    });
    
    describe("GET /deleteemployee/:id", () => {
      it("should delete an employee by ID", async () => {
        const res = await chai.request(app).get(`/deleteemployee/:${employeeId}`);
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal("successfully deleted a client");
      });
    });
});
