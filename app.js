const authroute = require("./routes/authroute");
const projectroute = require("./routes/projectroute");
const clientroute = require("./routes/clientroute");
const employeeroute = require("./routes/employeeroute");
const userroute = require("./routes/userroute");
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bodyparser = require('body-parser')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
// app.use(express.json());
app.use(authroute);
app.use(projectroute);
app.use(clientroute);
app.use(employeeroute);
app.use(userroute);
app.use(cors());
app.use(helmet())

module.exports = app;
