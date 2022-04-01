module.exports = app => {
    
  const controller = require("./controller");

  var router = require("express").Router();

  // Trigger a connection
  router.get("/connect", controller.connect)

  // Retrieve all Tutorials
  router.get("/", controller.readAll);

  // Retrieve the ADS client connection status
  router.get("/connected", controller.connected);

  // Retrieve a single Tutorial with id
  router.get("/:symbol", controller.readOne);

  // Update a Tutorial with id
  router.post("/", controller.writeOne);

  app.use('/api/controller', router);

};