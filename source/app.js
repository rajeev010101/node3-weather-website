const path = require('path')
const express = require('express')
const hbs = require('hbs')
 


const app = express()

// Define path for Express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlerbar engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


//Setup static directory to serve

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rajeev Dahiya'

    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me and FOOTBALL',
        name: 'Rajeev dahiya'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        helpText: 'This is some helpful text.',
        title:'Help Me',
        name: 'Rajeev dahiya'
    }) 
})
// Goal is to update weather endpoint to accept address
// No address?sends back an error message
// Address? send back the static JSON
//add address property onto JSON which retrun the provided theaddress
//Test /weather and /weather ?address=philadelphia

app.get('/Weather', (req, res) =>{
if (!req.query.address){
    return res.send({
        error: 'You must provided an address!'
    })
}

 


res.send({                           
     forecast: 'It is snowing',
     location: 'Indore',
     address: req.query.address



    })

})



app.get('/products', (req, res) =>{
if(!req.query.search){
     return res.send({
        error: 'You must provide a search term'
      })
} 

 console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
       res.render('404', {
        title: '404',
        name: ' Rajeev dahiya ',
        errorMessage: 'Page not found'
       })
})

//goal create and render a 404 page with handlerbars
// 1.Setup the template to render the headerand the footer
//2.setup the template to render an error message in a paragraph
//3.render the template for both 404 route
//- page not found.
// Help article not found
 
app.get('*', (req, res) => {
      res.render('404', {
        title: '404',
        name: 'Rajeev dahiya',
        errorMessage: 'Page not found.'

      })
})
 

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})