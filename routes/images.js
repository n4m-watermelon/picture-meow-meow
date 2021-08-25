const express = require("express");
const router = express.Router();
const images = require("../model/images");
const verify = require("../verifyToken");
const cloudinary = require("../config/cloudinary/index");
const upload = require("../utils/multer");

router.get("/", verify, async (req, res) => {
  try {
    const imageList = await images.find();
    res.json(imageList);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", verify, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    let imageData = new images({
      title: req.body.title,
      description: req.body.description,
      cloudinary_id: result.public_id,
      img_url: result.secure_url,
      author: req.user._id,
    });
    let savedData = await imageData.save();
    res.json(savedData);
  } catch (error) {
    console.log(error);
  }
});
router.put("/:id", verify, upload.single("image"), async (req, res) => {
  try {
    let findImage = await images.findById(req.params.id);
    await cloudinary.uploader.destroy(findImage.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);

    let data = {
      title: req.body.title || findImage.title,
      description: req.body.description || findImage.description,
      cloudinary_id: result.public_id || findImage.cloudinary_id,
      img_url: result.secure_url || findImage.img_url,
      author: findImage.author,
    };

    let afterUpdate = await images.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(afterUpdate);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", verify, async (req, res) => {
  try {
    let findImage = await images.findById(req.params.id);
    await cloudinary.uploader.destroy(findImage.cloudinary_id);

    const afterRemove = await images.remove({ _id: req.params.id });
    res.json(afterRemove);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
