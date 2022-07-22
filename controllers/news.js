const News = require("../model/news");
const Comment = require("../model/comment");

class newsController {
  // registerNews(req, res) {
  //   const { title, avatar, description } = req.body;

  //   const news = new News({
  //     title: title,
  //     avatar: avatar,
  //     description: description,
  //   });

  //   news
  //     .save()
  //     .then(() => {
  //       res.json({
  //         message: "News added auccessfully",
  //       });
  //     })
  //     .catch((err) => {
  //       res.json({
  //         message: err.message,
  //       });
  //     });
  // }

  /* Async version */
  async registerNews(req, res){
    const { title, avatar, description } = req.body;
    console.log("Шинэ мэдээ: " + title.slice(0, 15));
    try {
      const news = new News({
        title: title,
        avatar: avatar,
        description: description,
        // publishedBy: req.user._id
      });

      const result = await news.save();
      res.json({
        message: "News added successfully",
        result: result
      })
    }
    catch (err) {
      res.json({
        message: err.message
      })
    }
  }

  getAllNews(req, res) {
    News.find()
      .then((news) => {
        res.json(news);
        //  const token = jwt.sign(
        //    {
        //      newsId: news._id,
        //    },
        //    "user-secret"
        //  );
        //  res.json({
        //    token: token,
        //  });
      })

      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  }

  getSingleNews(req, res) {
    const id = req.params.id;
    News.findById(id)
      .then((news) => {
        res.json(news);
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  }

  /* Async version of getSingleNews */

  // async getSingleNews(req, res){
  //   const { id } = req.params;
  //   try {
  //     News.findById(id)
  //       .lean()
  //       .populate('publishedBy', "firstname lastname" )
  //       .populate({
  //         path: 'comment',
  //         populate: {
  //           path: 'writtenBy',
  //           model: 'user',
  //           select: 'firstname lastname'
  //         }
  //       })
  //       .exec((err, result) => {
  //         if(!err){
  //           res.json(result);
  //         } else {
  //           throw new Error("Алдаа гарлаа")
  //         }
  //       })
  //   } catch (err) {
  //     res.json(err.message);
  //   }
  // }

  async newComment(req, res){
    const { comment } = req.body;
    const { id } = req.params;

    try {
      const newComment = new Comment({
        comment: comment,
        writtenBy: req.user._id,
        news: id
      });

      const result = await newComment.save();
      const updateNews = await News.findById(result.news);
      updateNews.addComment(result._id);
      await updateNews.save();
      res.json("Done!!")
    } catch (err) {
      res.json(err.message);
    }
  }

  deleteNews(req, res) {
    const id = req.params.id;
    News.findByIdAndDelete(id)
      .then((news) => {
        res.json({
          message: "News Deleted Successfully",
          result: news,
        });
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  }

  updateNews(req, res) {
    const id = req.params.id;
    const { title, avatar, description } = req.body;
    console.log(title.slice(0, 15) + "..." + " " + "шинэчлэгдлээ.");
    News.findById(id)
        .then(news => {
            news.title = title;
            news.avatar = avatar;
            news.description = description;

            news.save()
                .then((result) => {
                    res.json({
                    message: "News updated successfully",
                    result: result,
                    });
                });
        });
  }
}

module.exports = new newsController();