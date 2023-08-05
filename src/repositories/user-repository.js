const ValidationError = require("../utils/validation-error");
const { User, Role } = require("../models");
const ClientError = require("../utils/client-error");
const { StatusCodes } = require("http-status-codes");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        // this error is thrown @Service layer, will catch from service layer to improve.
        throw new ValidationError(error);
      }

      throw error;
    }
  }

  async destroy(userId) {
    try {
      const user = await User.destroy({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, { attributes: ["email", "id"] });
      return user;
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({ where: { email: userEmail } });

      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "Invalid Email sent in the request",
          "Please check the email for there is no record of the email",
          StatusCodes.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      console.log("######### printing the error ##########");
      console.log(error);
      console.log("something went wrong in repository layer");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.warn("something went wrong in isAdmin section");
      throw error;
    }
  }
}

module.exports = UserRepository;
