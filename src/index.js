const express = require("express");
const bodyParser = require("body-parser");
const { PORT, DB_SYNC } = require("./config/serveConfig");
const apiRoutes = require("./routes/index");

const app = express();

const db = require('./models');

const prepareAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  
  if (DB_SYNC) {
    db.sequelize.sync()
  }

  // const user = await db.User.findByPk(4); 
  // const role = await db.Role.findAll(user.id);
  // console.log(role);
  // console.log(user.getRole());

  app.listen(PORT, () => {
    console.log(`server started successfully at ${PORT}`);
  });


};

prepareAndStartServer();
