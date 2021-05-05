const request = require('request')
const express = require('express')
const path = require('path')
const geocode = require('./util/geocode')
const weather = require('./util/weather')
const chalk = require('chalk')
const hbs = require('hbs')
const { query } = require('express')

//define pathe for process
const publicDir = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'./template/partials')
const viewPath = path.join(__dirname, './template/views')
//use express as app
const app = express();
const port = process.env.PORT || 3002

//set up hander bar engine view location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDir))

app.get('',(req, res)=>{
    res.render('index',{
        mess: 'ok'
    })
})
app.get('/in', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You have to provide your address'
        })
    }
    const location = req.query.address
    geocode(location, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        weather(latitude, longitude,(error, city,country,temperature,wind_speed,humidity,visibility,is_day,description)=>{
            if(error){
                return res.send({
                    error: error
                })
            }else{
                res.send({
                    location: location,
                   city:city,
                   country:country,
                   temperature:temperature,
                   wind_speed:wind_speed, 
                   humidity:humidity,
                   visibility:visibility,
                   is_day:is_day,
                   description:description

                })
            }
        })
    })
})
app.get('/*', (req, res)=>{
    res.render('404', {
        mess: 'No page found'
    })
})

app.listen(port, ()=>{
    console.log(chalk.white.bgGreen.bold("Sever started at port "+port))
})