const dataStructure = require("./dataStructure");
const db = require("./dataStructure");

// Retrieve all Tutorials from the database.
exports.readAll = (req, res) => {
    try{
        data = db;
    }
    catch (e) {
        console.log(e);
        res.status(400).send({message: "Error Grabbing Data"});
    }
    res.status(200).send(data);
};

// Find a single Tutorial with an id
exports.readOne = (req, res) => {
    // If no symbol parameter then request was empty
    if(!req.params.symbol){
        res.status(400).send({message: "Request Content Empty"});
        return;
    }
    output = {};
    if(db[req.params.symbol]){
        output[req.params.symbol] = db[req.params.symbol];
        res.status(200).send(output);
    }
    else{
        res.status(400).send({message: "Error Grabbing Data"});
    }
    
};

// Write a symbols data to the ADS server
exports.writeOne = (req, res) => {
    // If symbol parameter then request was empty
    if(!req.body.symbol){
        res.status(400).send({message: "Request Symbol Empty"});
        return;
    }
    else if(!req.body.value){
        res.status(400).send({message: "Request Symbol Empty"});
        return;
    }
    else{
        try{
            db[req.body.symbol] = req.body.value;
        }
        catch(e){
            console.log(e);
            res.status(500).send({message: "Error Writing Data"});
            return;
        }
        res.status(200).send(db);
    }

};