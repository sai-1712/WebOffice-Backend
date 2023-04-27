const User = require("../../models/userSchema");
const fs = require("fs");

exports.signup = async (req, res) => {
  console.log("in req: ", req.body, req.file);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "enter fields" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "email exists" });
    }

    let profileobject = {
      data: fs.readFileSync("uploads/Chat.png"),
      contentType: "image/png",
    };
    if(req.file){
      profileobject = {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png",
      }
    }
    const user = new User({
      name,
      email,
      password,
      profile: profileobject
    });
    await user.save().then(() => {
        console.log("Image saved in MongoDB");
    })
    .catch((err) => {
        console.log(err, "Error has occured");
    });;

    token = await user.generateAuthToken();
    res.cookie("jwttoken", token, {
      expires: new Date(Date.now() + 100000000),
      httpOnly: true,
    });

    res.status(201).json({ data: { user }, message: "signed up successfully" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "failed to signup", error: err });
  }
};
