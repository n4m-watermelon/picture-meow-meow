const express = require("express");
const router = express.Router();
const post = require("../model/post");
const verify = require("../verifyToken");
const cloudinary = require("../config/cloudinary/index");
const upload = require("../utils/multer");

router.get("/", verify, async (req, res) => {
  try {
    const allPosts = await post.find();
    res.json(allPosts);
  } catch (err) {
    res.json({ message: err });
  }
});
router.post("/", verify,  upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    let postSave = new post({
      title: req.body.title,
      description: req.body.description,
      cloudinary_id: result.public_id,
      img_url: result.secure_url,
      author: req.user._id,
    });
    let savedData = await postSave.save();
    res.json(savedData);
  } catch (error) {
    console.log(error);
  }
});
router.put("/:id", verify, upload.single("image"), async (req, res) => {
  try {
    let findImage = await post.findById(req.params.id);
    await cloudinary.uploader.destroy(findImage.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);

    let data = {
      title: req.body.title || findImage.title,
      description: req.body.description || findImage.description,
      cloudinary_id: result.public_id || findImage.cloudinary_id,
      img_url: result.secure_url || findImage.img_url,
      author: findImage.author,
    };

    let afterUpdate = await post.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(afterUpdate);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", verify, async (req, res) => {
  try {
    let findImage = await post.findById(req.params.id);
    await cloudinary.uploader.destroy(findImage.cloudinary_id);
    const afterRemove = await images.remove({ _id: req.params.id });

    res.json(afterRemove);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
