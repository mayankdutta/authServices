const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serveConfig");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const prepareAndStartServer = async () => {
  app.listen(PORT, () => {
    console.log(`server started successfully at ${PORT}`);
  });
};

prepareAndStartServer();
