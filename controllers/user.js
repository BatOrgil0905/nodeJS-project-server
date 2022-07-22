const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  registerUser(req, res) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const number = req.body.number;
    const email = req.body.email;
    const password = req.body.password;
    console.log("Шинэ хэрэглэгч: " + firstname + " " + lastname);

    bcrypt.hash(password, 12)
      .then(result => {
        const user = new User({
          firstname: firstname,
          lastname: lastname,
          number: number,
          email: email,
          password: result,
        });
    
        user
          .save()
          .then(() => {
            res.json({
              message: "Хэрэглэгч амжилттай бүртгэгдлээ.",
            });
          })
          .catch((err) => {
            res.json({
              message: err.message,
            });
          });
      })
  }

  getUsers(req, res) {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  }

  getSingleUser(req, res) {
    const id = req.params.id;
    User.findById(id)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  }

  deleteUser(req, res) {
    const id = req.params.id;
    User.findByIdAndDelete(id)
      .then((user) => {
        res.json({
          message: "Deleted Successfully!",
          result: user,
        });
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  }

  updateUser(req, res) {
    const id = req.params.id;
    const { firstname, lastname, number, email } = req.body;
    User.findById(id).then((user) => {
      user.firstname = firstname;
      user.lastname = lastname;
      user.number = number;
      user.email = email;

      user.save().then((result) => {
        res.json({
          message: "update.success",
          result: result,
        });
      });
    });
  }

  login(req, res){
    const {email, password} = req.body;
    User.findOne({email: email})
      .then(user => {
        // console.log(user)
        if(!user){
          return res.json({
            message: "Имэйл олдсонгүй!"
          })
        }
        bcrypt.compare(password, user.password)
          .then(matched => {
            if(!matched){
              return res.json({
                message: "Алдаатай нууц үг байна..."
              })
            }

            const token = jwt.sign({
              userId: user._id
            },
             "user-secret",
            {
              expiresIn: '1h'
            })
            res.json({
              message: "Амжилттай нэвтэрлээ!",
              token: token,
              id: user._id
            });
            
          })
          .catch(err => {
            res.json(err.message);
          })
      })
  }
}

module.exports = new UserController()