const { Favorite, Destination } = require("../models");

class FavoriteController {
  static async addFavorite(req, res, next) {
    try {
      const { userId, destinationId } = req.body;

      if (!userId || !destinationId) {
        return res
          .status(400)
          .json({ message: "userId and destinationId are required" });
      }

      const existingFavorite = await Favorite.findOne({
        where: { userId, destinationId },
      });

      if (existingFavorite) {
        return res.status(400).json({ message: "Favorite already exists" });
      }

      const createdFavorite = await Favorite.create({ userId, destinationId });

      const favoriteWithDetails = await Favorite.findByPk(createdFavorite.id, {
        include: [
          {
            model: Destination,
            attributes: [
              "name",
              "location",
              "rating",
              "price",
              "description",
              "imageUrl",
            ],
          },
        ],
      });

      res.status(200).json({
        message: "Favorite added",
        data: favoriteWithDetails,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteFavorite(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "id is required" });
      }

      const favorite = await Favorite.findByPk(id);

      if (!favorite) {
        return res.status(404).json({ message: "Favorite not found" });
      }

      await Favorite.destroy({
        where: { id },
      });

      res.status(200).json({
        message: "Favorite deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FavoriteController;
