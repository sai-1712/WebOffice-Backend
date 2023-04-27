const app = require("./app");
const { dbconnection } = require("./config/database");
dbconnection();
app.listen(8000, () => {
    console.log("Website running on port:8000");
});
