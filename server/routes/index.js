const userRouter = require("./userRouter")
const destinationRouter = require("./destinationRouter")
const favoriteRouter = require("./favoriteRouter");

const router = require("express").Router()

router.use("/users", userRouter);
router.use("/favorite", favoriteRouter);
router.use("/destination", destinationRouter);

module.exports = router