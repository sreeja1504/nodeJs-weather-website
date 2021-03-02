const express = require('express');
const path = require('path');
const hbs = require('hbs');  //for partial templates
const app = express();
const gc = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js')

// console.log(__dirname);  //till src 
// console.log(path.join(__dirname,'../public'));
// console.log(__filename);

const port = process.env.PORT || 3000


//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');    //to see hbs file in views folder bydefault
app.set('views', viewsPath);      // to tell express to see hbs files in customised folder
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "sreeja"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "sreeja"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is some helpful text",
        title: 'help',
        name: "sreeja"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address term'
        })
    }
//if we use url as /weather?address=! because of  line 58 we get chrome error refused to connect
//bcz cannot destructure lattitude of undefined bcz in geocode , in callback ,setting error but not body becuase it is not success
//   gc(req.query.address, (error, { latitude, longitude, location }) => {

    gc(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })

        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    // res.send('Help article not found');
    res.render('404', {
        title: '404',
        name: sreeja,
        errorMessage: 'Help article not found'
    })
})


//* matches with everything when /me url is hit it searches from top first in publicDirectoryPath not found ,next in index , next about ,next help but no match ,ultimately * matches me and execute that route

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'sreeja',
        errorMessage: "Page not found"
    })
})
//send is used for static files like index.html present in public 
//render is used for dunamic content files like index.hbs present in views s

// app.get('',(req,res)=>{
// //    res.send('Hello express!');
// res.send('<h1>Weather</h1>')
// })


// app.get('/help',(req,res)=>{
//     // res.send('Help page!')
//     res.send({
//         name : 'sreeja',
//         age : 27

//     })
// })

// app.get('/about',(req,res)=>{
//     // res.send('Help page!')
//     res.send('about');
// })

app.listen(port, () => {
    console.log('server started on port '+port);
})