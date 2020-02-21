const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.user;

exports.login = (req, res) => {
  //check if email and pass match in db tbl user
  const email = req.body.email;
  const password = req.body.password; //use encryption in real world case!
  User.findOne({ where: { email, password } }).then(user => {
    if (user) {
      const token = jwt.sign({ userId: user.id }, "my-secret-key");
      res.send({
        email,
        token
      });
    } else {
      res.send({
        error: true,
        message: "Wrong Email or Password!"
      });
    }
  });
};

// Register a user.
exports.signUp = (req, res) => {
  if (!req.body.name || !req.body.password || !req.body.email) {
    res.json({
      message: "Please provide a username, email and a password."
    });
  } else {
    db.sync()
      .then(() => {
        const newUser = {
          email: req.body.email,
          password: req.body.password,
          name: req.body.name
        };

        return User.create(newUser).then(() => {
          res.status(201).json({
            message: "Account created!"
          });
        });
      })
      .catch(error => {
        res.status(403).json({
          message: error
        });
      });
  }
};
