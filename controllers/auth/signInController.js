const User = require("../../models/userSchema");
const bcrypt = require("bcryptjs");

// const userHandler = ((user,token) => {
//     if (user.email.includes("@employeewo.com")) {
//         return {"token": token ,"role": "user"}
//     } else if (user.email.includes("@managerwo.com")) {
//         return {"token": token ,"role": "admin"}
//     } 
//     else return {};
// });

exports.signin = async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "fill data" });
        }

        console.log(email, password);
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();
            // console.log(token);
            // const tokenobj = userHandler(userLogin, token)
            // console.log("token obj ",tokenobj);

            res.cookie("jwttoken", token, {
                expires: new Date(Date.now() + 100000000),
                httpOnly: true,
            }); 


            if (!isMatch) {
                res.status(400).json({ message: "invalid cred" });
            } else {
                res.json({ data: { userLogin }, message: "logged in successfully" });
            }
        } else {
            res.status(400).json({ message: "invalid cred" });
        }
    } catch (err) {
        console.log(err);
    }
};
