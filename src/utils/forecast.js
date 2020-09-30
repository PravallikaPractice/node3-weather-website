const request = require('request')

//Code modifications using Object Destructuring and PropertyShorthand 
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=6399053636e692675caa0c31b92fcf84&query='+latitude+','+longitude
    request({url,json:true},(error,{body} ={})=>{
        if(error){
            callback("Unable to connect to Weather Service")
        }
        else if(body.error){
            callback("Unable to find the location")
        }
        else{
            callback(undefined,body.current.weather_descriptions[0] +". It is currently "+ body.current.temperature +" degress out .There is "+ body.current.precip+" % chance of rain ")
        }
    })
}

module.exports = forecast