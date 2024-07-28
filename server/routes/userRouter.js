const express = require("express");
const passport = require("../config/passport");
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const upload = require("../middlewares/uploadImage");

const userRouter = express.Router();
const uploadMiddleware = upload();

userRouter.get("/", userController.getUserInfo);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/goggle-login", userController.googleLogin)

userRouter.put(
  "/profile/image",
  authentication,
  uploadMiddleware.single("profile_image"),
  userController.updateProfileImage,
);

userRouter.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
userRouter.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });

userRouter.get('/auth/twitter', passport.authenticate('twitter'));
userRouter.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });

userRouter.get('/auth/instagram', passport.authenticate('instagram'));
userRouter.get('/auth/instagram/callback', 
  passport.authenticate('instagram', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });

module.exports = userRouter;
