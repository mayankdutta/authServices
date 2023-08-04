const { JWT_KEY } = require("../config/serveConfig");
const UserRepository = require("../repositories/user-repository");
const jwt = require("jsonwebtoken");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const user = await this.userRepository.destroy(userId);
      return user;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign({ payload: user }, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("somethign went wrong in token creation");
      throw error;
    }
  }
  verifyToken(token) {
    try {
      // if token is verified it will return the object using which we created this token.
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("something went wrong in token verification", error);
      throw error;
    }
  }
}

module.exports = UserService;
