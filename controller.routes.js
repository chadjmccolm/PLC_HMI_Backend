module.exports = app => {
    
    const controller = require("./controller");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", controller.readAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:symbol", controller.readOne);
  
    // Update a Tutorial with id
    router.post("/", controller.writeOne);
  
    app.use('/api/controller', router);
  };