const express = require('express');
const route = express.Router();
const newsController = require('../controllers/news');
const isAuth = require("../middleware/is_auth")

route.post('/news-register', newsController.registerNews);
route.get("/getAllNews", isAuth.checkAuthentication, newsController.getAllNews);
route.get("/getSingleNews/:id", isAuth.checkAuthentication, newsController.getSingleNews);

route.post('/comment/:id', isAuth.checkAuthentication, newsController.newComment)

route.delete('/delete-news/:id', newsController.deleteNews);

route.post(
  "/update-news/:id",
  isAuth.checkAuthentication,
  newsController.updateNews
);

module.exports = route;