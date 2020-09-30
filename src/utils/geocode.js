const request = require('request')
/*
const geoCode = (address,callback)=>{
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/+'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJhdmFsbGlrYWJhdGhhbGEiLCJhIjoiY2tmbnAwbjA3MDE0bTJ4bzA2Y2Fna2RmbSJ9.4Cez2DPoHbw0pFsmi2n5Mw&limit=1'
    request({url:geoCodeUrl,json :true},(error,response)=>{
        
        if(error){
            callback("Unable to connect to GeoLocation Service")
        }
        else if(response.body.error){
            callback("Unable to find the Geo location")
        }
        else if(response.body.features.length === 0){
            callback("Unable to find the Geo location")
        }else{
            callback(undefined,{
                latitude : response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
                place : response.body.features[0].place_name
            })
        }
    })
}
*/
//Code modifications using Object Destructuring and PropertyShorthand 
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJhdmFsbGlrYWJhdGhhbGEiLCJhIjoiY2tmbnAwbjA3MDE0bTJ4bzA2Y2Fna2RmbSJ9.4Cez2DPoHbw0pFsmi2n5Mw&limit=1'
    request({url,json :true},(error,{body}={})=>{
        if(error){
            callback("Unable to connect to GeoLocation Service",undefined)
        }
        else if(body.error){
             callback("Unable to find the Geo location",undefined)
        }
        else if(body.features.length === 0){
             callback("Unable to find the Geo location",undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}



module.exports = geocode

