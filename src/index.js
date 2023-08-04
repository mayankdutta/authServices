const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serveConfig");
const apiRoutes = require("./routes/index");

const app = express();

const UserService = require("./services/user-service.js");

const prepareAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  const userService = new UserService();

  app.listen(PORT, () => {
    console.log(`server started successfully at ${PORT}`);
  });
};

prepareAndStartServer();
