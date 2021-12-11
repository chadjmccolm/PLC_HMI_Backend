// Handle imports
const ads = require('ads-client');

// Define ads.Client settings
const ADSclient = new ads.Client({
    targetAmsNetId: '127.0.0.1.1.1', //or 'localhost'
    targetAdsPort: 851,
});

// Create an ADSclient
ADSclient.connect()
    .then(result => {   
        console.log(`Connected to the ${result.targetAmsNetId}`);
        console.log(`Router assigned us AmsNetId ${result.localAmsNetId} and port ${result.localAdsPort}`);
    })
    .catch(err => {
        console.log('Something failed:', err);
});

// Retrieve all values from the ADS server
exports.readAll = (req, res) => {

    // If client not yet connected return an error message
    if(!ADSclient.connection.connected){
        res.status(400).send({message: "ADS Client Not Connected"});
        return;
    }

    // Get the list of symbols
    symbols = [];
    ADSclient.readAndCacheSymbols().then(result => {
        for(element in result){
            // Add to symbol array if it's not a system variable
            if(!(result[element].name.startsWith('Constants.') || result[element].name.startsWith('Global_Version.') || result[element].name.startsWith('TwinCAT_SystemInfoVarList.'))){
                symbols.push(result[element].name);
            }
        }
    }).then(result => {
        // Then, construct the array of promises and populate
        promises = [];
        for(symbol in symbols){
            promises.push(ADSclient.readSymbol(symbols[symbol]));
        }
        Promise.all(promises).then((results) => {

            // When all those promised values return, create an array and send that back
            output = {};
            for(result in results){
                output[results[result].symbol.name] = results[result].value;
            }
            res.status(200).send(output);
        });
    });

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

    // Construct the output and catch errors
    output = {};
    console.log("Requesting symbol: '" + req.params.symbol + "'");
    ADSclient.readSymbol(req.params.symbol).then(result => {
        output[req.params.symbol] = result.value;
        console.log(output);
        res.status(200).send(output);
    }).catch(err => {
        console.log(err);
        res.status(400).send({message: err});
    });
    
};

// Write a symbols data to the ADS server
exports.writeOne = (req, res) => {
    // If symbol or value parameter not set then request was empty
    if(!req.body.symbol){
        res.status(400).send({message: "Request Symbol Empty"});
        return;
    }
    else if(req.body.value === undefined){
        res.status(400).send({message: "Request Value Empty"});
        return;
    }
    else{
        // Write the value to the ADS server, read it back if successful
        ADSclient.writeSymbol(req.body.symbol, req.body.value, true).then(result => {
            ADSclient.readSymbol(req.body.symbol).then(result => {
                output = {};
                output[req.body.symbol] = result.value;
                res.status(200).send(output);
            }).catch(err => {
                console.log(err);
                res.status(400).send({message: err});
            });
        }).catch(err => {
            console.log(err);
            res.status(400).send({message: err});
        });
    }
};