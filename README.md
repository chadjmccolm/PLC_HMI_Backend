# PLC_HMI_Backend
This is the backend of a node.js application which will serve a client with data via TwinCAT ADS. 

# Methods

## Connect
A GET request to `/controller/api/connect` will return a JSON object `{connected: ADSclient.connection.connected}`. The response code will dictate the result as well: Response Status 200 for a successful connection, Response Status 400 for an unsucessful one. 

## Read All
A GET request to `/controller/api/` will return all of the values with Response Status 200. If an error occurs, it will return the JSON object: `{message: "Error Grabbing Data"}` with Response Status 400. 

## Read One
A GET request to `/controller/api/symbol` will return the value of just that symbol with Response Status 200. If no symbol is requested, it will return the JSON object: `{message: "Error Grabbing Data"}` with Response Status 400. 

## Write One
A POST request to `/controller/api/` with a body composed of JSON containing elements `symbol` and `value` such as `{"symbol" : "bStartButton", "value": "0"}` will update the data structure and return the result of the "Read All" method with Response Status 200. If either value is missing it will return Response Status 400 and JSON body: `{message: "Request Symbol/Value Empty"}`. If an internal error occurs it will return JSON body `{message: "Error Writing Data"}` with Response Status 500. 