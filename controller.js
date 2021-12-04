const dataStructure = require("./dataStructure");
const db = require("./dataStructure");

// Retrieve all Tutorials from the database.
exports.readAll = (req, res) => {
    console.log("read all function");
    res.send(db);
};

// Find a single Tutorial with an id
exports.readOne = (req, res) => {
    console.log("read one function");
    // If no symbol parameter then request was empty
    if(!req.params.symbol){
        res.status(400).send({message: "Request Content Empty"});
        return;
    }
    output = {};
    output[req.params.symbol] = db[req.params.symbol];
    res.status(200).send(output);
};

// Write a symbols data to the ADS server
exports.writeOne = (req, res) => {
    // If symbol parameter then request was empty
    if(!req.body.symbol){
        res.status(400).send({message: "Request Symbol Empty"});
        return;
    }
    else{
        db[req.body.symbol] = req.body.value;
        res.status(200).send(db);
    }

};