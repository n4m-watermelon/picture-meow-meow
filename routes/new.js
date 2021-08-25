const express = require("express");
const router = express.Router();
const News = require("../model/news");

router.get("/", async (req, res) => {
  try {
    const listNews = await News.find();
    res.json(listNews);
  } catch (err) {
    res.json({ message: err });
  }
});
router.post("/", async (req, res) => {
  const createANews = new News({
    title: req.body.title,
    srcSet: req.body.srcSet,
  });

  try {
    let data = await createANews.save();
    res.json(data);
  } catch (error) {
    res.json({ message: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const removeANews = await News.remove({ _id: req.params.id });
    res.json(removeANews);
  } catch (err) {
    res.json({ message: err });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const updateANews = await News.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          srcSet: req.body.srcSet,
        },
      }
    );
    res.json(updateANews);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
