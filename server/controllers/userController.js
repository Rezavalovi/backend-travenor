const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const nodemailer = require("nodemailer");

const fs = require("fs/promises");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
  static async register(req, res, next) {
    try {
      let { username, email, password } = req.body;

      // validation email domain
      const validDomains = ["gmail.com", "hotmail.com", "yahoo.com"];
      const domain = email.split("@")[1];
      if (!validDomains.includes(domain)) {
        return res.status(400).json({ message: "Invalid email domain" });
      }

      // Validation password
      if (password.length < 8 || password.length > 64) {
        return res
          .status(400)
          .json({
            message: "Password must be between 8 and 64 characters long",
          });
      }
 
      const createdUser = await User.create({
        username,
        email,
        password,
      });
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "rezavalovi98@gmail.com",
          pass: process.env.PASSWORD_EMAIL,
        },
      });
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Reza Valovi" <foo@example.com>',
          to: createdUser.email,
          subject: "Hello ✔",
          text: "You are succes registed",
          html: "<b>You are succes registed</b>",
        });
        console.log("Message sent: %s", info.messageId);
      }
      main().catch(console.error);

      res.status(201).json({
        username: createdUser.username,
        email: createdUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw {
          name: "BadRequest",
          message: "Email is required",
        };
      }
      if (!password) {
        throw {
          name: "BadRequest",
          message: "Password is required",
        };
      }
      
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw {
          name: "Unauthorized",
          message: "Invalid email/password",
        };
      }
      const isPasswordCorrect = comparePassword(password, user.password);
      if (!isPasswordCorrect) {
        throw {
          name: "Unauthorized",
          message: "Invalid email/password",
        };
      }
      const access_token = signToken({ id: user.id, email: user.email });

      res.status(200).json({ access_token, id: user.id });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.body;
      // console.log(google_token);

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: Math.random().toString(),
        },
      });

      const access_token = signToken({ id: user.id });

      res.status(created ? 201 : 200).json({
        message: `User ${user.email} found`,
        access_token: access_token,
        id: user.id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async facebookLogin(req, res, next) {
    try {
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }

  static async twitterLogin(req, res, next) {
    try {
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }

  static async instagramLogin(req, res, next) {
    try {
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }

  static async getUserInfo(req, res, next) {
    try {
      const user = await User.findAll({
        attributes: ["username", "email", "profileImg"],
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfileImage(req, res, next) {
    try {
      const { email } = req.user;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        const error = new Error("Token tidak valid atau kadaluwarsa");
        error.name = "InvalidToken";
        throw error;
      }

      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "No image uploaded",
          data: null,
        });
      }

      const imagePath = req.file.path;

      const validImageFormats = /\.(jpeg|jpg|png)$/i;
      if (!validImageFormats.test(imagePath)) {
        await fs.unlink(imagePath);
        return res.status(400).json({
          status: 102,
          message: "Format Image tidak sesuai",
          data: null,
        });
      }

      if (user.profileImg) {
        await fs
          .unlink(user.profileImg)
          .catch((err) =>
            console.error(`Failed to delete old profile image: ${err}`),
          );
      }

      user.profileImg = imagePath;
      await user.save();

      res.status(200).json({
        status: 0,
        message: "Update Profile Image berhasil",
        data: user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
