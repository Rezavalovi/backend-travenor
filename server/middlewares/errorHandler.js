const errorHandler = (error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message || "Internal server error";

  switch (error.name) {
    case "BadRequest":
      sendError(res, 400, error.message || "Bad Request");
      break;
    case "Unauthorized":
      status = 401;
      sendError(res, 401, "Unauthorized");
      break;
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      sendError(res, 400, error.errors[0].message);
      break;
    case "InvalidToken":
    case "JsonWebTokenError":
      sendError(res, 401, "Invalid token");
      break;
    case "Forbidden":
      sendError(res, 403, "You are not authorized");
      break;
    case "NotFound":
      sendError(res, 404, "Data not found");
      break;
    default:
      sendError(res, status, message);
      break;
  }
};

const sendError = (res, status, message) => {
  res.status(status).json({ message });
};

module.exports = { errorHandler, sendError };
