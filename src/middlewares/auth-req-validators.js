const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "something went wrong",
      err: "email/password is missing",
    });
  }
  next();
};

const validateIsAdminRequest = (req, res, next) => {
  // console.log('req.body: ', req.body);
  if (!req.body.userEmail) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "something went wrong",
      err: "id is missing",
    });
  }

  next();
};

module.exports = { validateUserAuth, validateIsAdminRequest };
