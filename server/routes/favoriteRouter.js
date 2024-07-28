const express = require("express");
const favoriteController = require("../controllers/favoriteController");
const authentication = require("../middlewares/authentication");
const upload = require("../middlewares/uploadImage");

const favoriteRouter = express.Router();

favoriteRouter.post("/", authentication, favoriteController.addFavorite);
favoriteRouter.delete("/:id", authentication, favoriteController.deleteFavorite);
module.exports = favoriteRouter;
