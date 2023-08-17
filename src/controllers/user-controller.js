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
    res.status(error.statusCode).json({
      err: error.explanation,
      message: error.message,
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
    res.status(error.statusCode).json({
      err: error.explanation,
      message: error.message,
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
    const userEmail = req.body.userEmail;
    const response = await userService.isAdmin(userEmail);

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

const toRole = async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const role = req.body.role;

    const response = await userService.toRole(userEmail, role);
    return res.status(200).json({
      success: response,
      err: {},
      data: response,
      message: `user is promoted/demoted to ${role || "admin"}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      message: "something went wrong in controllers/toRole",
      success: false,
      data: {},
    });
  }
};

module.exports = { create, signIn, isAuthenticated, isAdmin, toRole };
