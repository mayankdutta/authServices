const { StatusCodes } = require("http-status-codes");
const AppError = require("./error-handler");

// it is a client side issue, therefore it is kind of bad request.
class ValidationError extends AppError {
  constructor(errorObj) {
    let explanation = []; // has to parse from error object.
    let errorName = errorObj.name;

    errorObj.errors.forEach((err) => {
      explanation.push(err.message);
    });

    super(
      errorName,
      "--> Not able to validate the data sent in the request <--",
      explanation,
      StatusCodes.BAD_REQUEST
    );
  }
}

module.exports = ValidationError;
