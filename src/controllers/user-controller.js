const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      data: response,
      err: {},
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      message: "something went wrong in controllers/Create",
      success: false,
      data: {},
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      data: response,
      err: {},
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      message: "something went wrong in controllers/sign In",
      success: false,
      data: {},
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);

    return res.status(200).json({
      success: true,
      err: {},
      data: response,
      message: "successfully, user is authenticated & token is valid",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      message: "something went wrong in controllers/is authenticated",
      success: false,
      data: {},
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const userId = req.body.userId;
    const response = await userService.isAdmin(userId);

    return res.status(200).json({
      success: response,
      err: {},
      data: response,
      message: `user is ${response ? "an admin" : "not an admin"}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      message: "something went wrong in controllers/isAdmin",
      success: false,
      data: {},
    });
  }
};

module.exports = { create, signIn, isAuthenticated, isAdmin };
