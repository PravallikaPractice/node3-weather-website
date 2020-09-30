const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))
const publicDirectoryPath = path.join(__dirname, '../public')

//Register Partials
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

//By deafult view refer to VIEWS folder if the name is different it will not able to fetch the views
//To make it work we have to add the below
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

//setup handler bars
app.set('view engine', 'hbs')

//setup static directory to set
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Pravallika Bathala"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Pravallika Bathala"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helptext: "How an I help you...",
        name: "Pravallika Bathala"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address is not provided............."
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send(error)
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send(error)
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })

})

    /*res.send({
        forecast :"It is raining",
        location:"Philadelpia",
        address : req.query.address
    })*/


app.get("/help/*", (req, res) => {
    res.render('404', {
        title: "Weather App",
        name: "Pravallika Bathala"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Weather App",
        name: "Pravallika Bathala"
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})