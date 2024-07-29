const { Destination } = require("../models");

class DestinationController {
  static async getAllDestination(req, res, next) {
    try {
      const data = await Destination.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getDetailDestinationById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Destination.findAll({
        where: {
          id: id,
        },
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addDestination(req, res, next) {
    try {
      const {
        name,
        location,
        rating,
        price,
        description,
        imageUrl,
      } = req.body;

      let body = {
        name,
        location,
        rating,
        price,
        description,
        imageUrl,
        a: req.user.id,
      };
      const createdDestination = await Destination.create(body);
      res.status(200).json({
        message: "Destination Succes added",
        data: createdDestination,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateDestination(req, res, next) {
      try {
          let { id } = req.params
          let { name, location, rating, price, description, imgUrl } = req.body

          await Destination.update(
            {
              name,
              location,
              rating,
              price,
              description,
              imgUrl,
            },
            {
              where: {
                id: id,
              },
            },
          );
          let data = await Destination.findByPk(id)
          if (!data) {
              throw { name: "NotFound" }
          }

          res.status(200).json({
            message: "Destination Succes updated",
            data
          });
      } catch (error) {
          console.log(error.message);
          next(error);
      }
  }

  static async deleteDestination(req, res, next) {
    try {
      const { id } = req.params;
      await Destination.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        message: "Destination deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DestinationController;
