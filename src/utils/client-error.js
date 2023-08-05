const { StatusCodes } = require("http-status-codes");
const AppError = require("./error-handler");

// it is a client side issue, therefore it is kind of bad request.
class ClientError extends AppError {
  constructor(name, message, explanation, statusCode) {
    super(name, message, explanation, statusCode);
  }
}

module.exports = ClientError;
