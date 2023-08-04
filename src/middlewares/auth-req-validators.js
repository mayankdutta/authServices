const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.pasword) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "something went wrong",
      err: "email/password is missing",
    });
  }
  next();
};

module.exports = { validateUserAuth };
