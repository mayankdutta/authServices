const { JWT_KEY } = require("../config/serveConfig");
const UserRepository = require("../repositories/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name === 'ValidationError') {
        // this error is now thrown @controller will catch from there.
        throw error;
      }
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

  async signIn(user) {
    try {
      console.warn("inside signin : ", user);

      const storedUser = await this.userRepository.getByEmail(user.email);
      // console.log('user matched: ', user);
      const passwordMatch = this.checkPassword(
        user.password,
        storedUser.password
      );

      if (!passwordMatch) {
        console.log("password doesntn't match");
        throw { error: "password doesn't match" };
      }

      // in JWT create token it should be a plain JS object, we cannot pass Sequelize object.
      const newJWT = this.createToken({
        email: storedUser.email,
        id: storedUser.id,
      });
      return { token: newJWT };
    } catch (error) {

      if (error.name === 'AttributeNotFound') {
        throw error;
      }
      console.log("something went wrong in sign in process");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "invalid token" };
      }

      const user = this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "no user with this token exist" };
      }
      return user.id;
    } catch (error) {
      console.log("something went wrong during verification of token");
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

  checkPassword(userInputPassword, encryptedPassword) {
    try {
      // console.log(userInputPassword, " & " ,encryptedPassword)
      return bcrypt.compareSync(userInputPassword, encryptedPassword);
    } catch (error) {
      console.warn("something went wrong in password comoparison, ", error);
      throw error;
    }
  }

  async isAdmin(userEmail) {
    try {
      const response = await this.userRepository.isAdmin(userEmail);
      return response;
    } catch (error) {
      console.warn("something went wrong in isAdmin section");
      throw error;
    }
  }

  async toRole(userEmail, role) {
    try {
      const response = await this.userRepository.toRole(userEmail, role);
      return response;
    } catch (error) {
      console.warn("something went wrong in isRole section");
      throw error;
    }
  }
}

module.exports = UserService;
