const express = require("express");
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const upload = require("../middlewares/uploadImage");

const userRouter = express.Router();
const uploadMiddleware = upload();

userRouter.get("/", userController.getUserInfo);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

userRouter.put(
  "/profile/image",
  authentication,
  uploadMiddleware.single("profile_image"),
  userController.updateProfileImage,
);

module.exports = userRouter;
