const request = require('request')

const key = '85acc8619f90ceb325a97bc415ca8927'

// const latitude = 21.027763
// const longitude = 105.834160
// const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid='+key
// request({url:url, json:true}, (error, body)=>{
//     if(error){
//         console.log(error)
//     }else{
//         console.log(body)
//     }
// })
const geo2 = (latitude, longitude, callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid='+key
    request({url:url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to find the location', undefined)
        }else{
            callback(undefined,{
                description: body.weather[0].description,
                temp: body.main.temp,
                humidity: body.main.humidity,
                visibility: body.visibility,
                country: body.sys.country,
                city: body.name
            })
        }
    })
}
module.exports = geo2