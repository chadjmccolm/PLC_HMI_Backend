const dataStructure = require("./dataStructure");
const db = require("./dataStructure");
const ads = require('ads-client')

const ADSclient = new ads.Client({
    targetAmsNetId: '127.0.0.1.1.1', //or 'localhost'
    targetAdsPort: 851,
});

ADSclient.connect()
    .then(result => {   
        console.log(`Connected to the ${result.targetAmsNetId}`)
        console.log(`Router assigned us AmsNetId ${result.localAmsNetId} and port ${result.localAdsPort}`)
    })
    .catch(err => {
        console.log('Something failed:', err)
});

// Retrieve all values from the ADS server
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

// Send the status of the connection
exports.connected = (req, res) => {
    res.status(400).send({connected: ADSclient.connection.connected});
};

// Find a single symbol from the ADS server
exports.readOne = (req, res) => {

    // If no symbol parameter then request was empty
    if(!req.params.symbol){
        res.status(400).send({message: "Request Content Empty"});
        return;
    }

    // If client not yet connected return an error message
    if(!ADSclient.connection.connected){
        res.status(400).send({message: "ADS Client Not Connected"});
        return;
    }

    // Construct the output
    output = {};
    console.log("Requesting symbol: '" + req.params.symbol + "'");
    ADSclient.readSymbol(req.params.symbol).then(result => {
        output[req.params.symbol] = result.value;
        console.log(output);
        res.status(200).send(output);
    }).catch(err => {
        console.log(err);
        res.status(400).send({message: err});
    })
    
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