 const request = require('request')

const geocode = (address,callback) =>{
    mapurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiY2FraGlsIiwiYSI6ImNrcnFsNW44MDVjM3EyenA4eHR4YTlzZ2kifQ.e4MvoKkFpDGaVt1BaRSLEg&limit=1'    

    request({url : mapurl,json : true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }
        else if(response.body.features.length===0){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode