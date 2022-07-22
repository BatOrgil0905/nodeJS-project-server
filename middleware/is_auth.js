const User = require('../model/user');
const News = require("../model/news")
const jwt = require('jsonwebtoken');

class IsAuth {
  async checkAuthentication(req, res, next) {
    const { authorization } = req.headers;
    // console.log(authorization)
    const token = authorization.split(' ')[1];
    // console.log(token)

    try {
      const result = jwt.verify(token, "user-secret");
      const user = await User.findById(result.userId);
      const news = await News.findById(result.newsId);
      // console.log(user);

      if(user){
        req.user = user;
        // console.log(req.user)
        next();
      } else {
        // location.pathname = '../login.html';
        throw new Error("Алдаа гарлаа...");
      }
    } catch (err) {
      res.json(err.message);
    }
  }
}

module.exports = new IsAuth();