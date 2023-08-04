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

module.exports = { create, signIn };
