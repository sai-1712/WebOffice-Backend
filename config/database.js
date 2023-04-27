const mongoose = require("mongoose");
exports.dbconnection = () => {
    mongoose
        .connect("mongodb+srv://vd2507:vaibhav@cluster0.nmxul8d.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connection to MONGODB successful");
        })
        .catch((err) => {
            console.log(err);
        });
};
