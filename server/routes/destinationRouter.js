const destinationController = require("../controllers/destinationController");
const authentication = require("../middlewares/authentication");

const destinationRouter = require("express").Router();

destinationRouter.get("/", authentication, destinationController.getAllDestination);
destinationRouter.get(
  "/:id",
  authentication,
  destinationController.getDetailDestinationById,
);
destinationRouter.post("/", authentication, destinationController.addDestination);
destinationRouter.put("/:id", authentication, destinationController.updateDestination);

destinationRouter.delete("/:id", destinationController.deleteDestination);

module.exports = destinationRouter;
