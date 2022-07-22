const express = require('express');
const route = express.Router();
const User = require('../model/user');
const userController = require('../controllers/user');
const authCheck = require('../middleware/is_auth');

route.get("/", (req, res) => {
  res.json({
    message: "Hi",
  });
});

route.post("/register", userController.registerUser);

route.get('/getUsers', authCheck.checkAuthentication, userController.getUsers);

route.get(
  "/get-single-user/:id", authCheck.checkAuthentication, userController.getSingleUser);

route.delete('/delete-user/:id', userController.deleteUser);

route.put(
  "/update-user/:id",
  authCheck.checkAuthentication,
  userController.updateUser
);

route.post('/login', userController.login)

module.exports = route;