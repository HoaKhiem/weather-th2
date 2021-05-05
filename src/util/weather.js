const request = require('request')

const weather = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=8def27616d50b4fc59eb5a5e13a84bba&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
    request({url: url, json: true}, (error, {body})=>{
        if(error){
            callback('No internet connection', undefined)
        }else if (body.error){
            callback('Unable to find location, try another one', undefined)
        }else{
            callback(undefined, {
                city: body.location.name,
                country: body.location.country,
                temperature: body.current.temperature,
                wind_speed: body.current.wind_speed,
                humidity: body.current.humidity,
                visibility: body.current.visibility,
                is_day: body.current.is_day,
                description: body.current.weather_descriptions[0]
                
            })
        }
    })
}


module.exports = weather