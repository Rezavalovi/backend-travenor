const userRouter = require("./userRouter")
const destinationRouter = require("./destinationRouter")

const router = require("express").Router()

router.use("/", userRouter);
router.use("/destination", destinationRouter);

module.exports = router