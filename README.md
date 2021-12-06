# PLC_HMI_Backend
This is the backend of a node.js application which will serve a client with data via TwinCAT ADS. 

# Methods
## Read All
A GET request to `/` will return all of the values with Response Status 200. If an error occurs, it will return the JSON object: `{message: "Error Grabbing Data"}` with Response Status 400. 

## Read One
A GET request to `/symbol` will return the value of just that symbol with Response Status 200. If no symbol is requested, it will return the JSON object: `{message: "Error Grabbing Data"}` with Response Status 400. 

## Write One
A POST request to `/` with a body composed of JSON containing elements `symbol` and `value` such as `{"symbol" : "bStartButton", "value": "0"}` will update the data structure and return the result of the "Read All" method with Response Status 200. If either value is missing it will return Response Status 400 and JSON body: `{message: "Request Symbol/Value Empty"}`. If an internal error occurs it will return JSON body `{message: "Error Writing Data"}` with Response Status 500. 