const request = require('request')

const forecast = (lat,long,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=fa9c0f027eb0c28b45dab5aa3e5b0384&query='+lat+','+long
    request({url : url,json : true},(error,response) =>{
        if(error){
            callback('Unable to connect',undefined)
        }
        else if(response.body.error){
            callback('Could not found the location',undefined)
        }   
        else{
            callback(undefined,response.body)
        }
    })
}


module.exports = forecast