// Bring window.fetch to Node.js
const fetch = require('node-fetch');


// Main Server Packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// Dotenv Package (to setup environment variables)
const dotenv = require('dotenv');
dotenv.config();


// App instance
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));


// Server Setup and Routes
const port = 2050;
if(process.env.PIXABAY_KEY){
    console.log(`Pixabay API Key: ${process.env.PIXABAY_KEY}`);
    console.log(`Geonames User: ${process.env.GEONAMES_USER}`);
}
else{
    console.error("Error: Pixabay API Key and Geonames User are not set in the environment variables.");
}
app.listen(port, function () {
    console.log(`Congratulations, your server is running at port ${port}!`);
    console.log(`http://localhost:${port}`);
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});


// Server Test and Troubleshooting
const mockAPIResponse = require('./mockAPI.js');

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});


// APIs
app.post('/all-apis', (req, res) => {
    // User Input Variable
    let appInputData = {
        input: req.body
    };

    // Log: User Location Input
    console.log(`user destination input: ${req.body.destinationInput}`);

    // Geonames API Variable
    // const geonamesAPI = `http://api.geonames.org/searchJSON?name=${req.body.destinationInput}&maxRows=1&username=${process.env.GEONAMES_USER}`;
    const geonamesAPI = `http://api.geonames.org/searchJSON?q=${req.body.destinationInput}&maxRows=1&username=tasbeehnaser`
    console.log(geonamesAPI);

    // Get Geonames Data
    fetch(geonamesAPI)
        .then(res => res.json())
        .then(geonamesData => {
            console.log('Geonames Data:', geonamesData); // Debugging statement

            // Validation: Location
            if (!geonamesData.geonames || geonamesData.geonames.length === 0) {
                res.status(404).json({ locValidation: 'Invalid location name, please re-enter.' });
                return;
            }

            // Weatherbit API Variable
            const weatherbitAPI = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${geonamesData.geonames[0].lat}&lon=${geonamesData.geonames[0].lng}&key=${process.env.WEATHERBIT_KEY}`;

            // Get Weatherbit Data
            fetch(weatherbitAPI)
                .then(res => res.json())
                .then(weatherbitData => {

                    // Pixabay Dynamic Data API Variable
                    const pixabayAPI = `https://pixabay.com/api/?key=48484272-17d937dbb29b0c3df832d0c96&q=${req.body.destinationInput}&image_type=photo&editors_choice=true&per_page=3`;

                    // Get Pixabay Dynamic Data
                    fetch(pixabayAPI)
                        .then(res => res.json())
                        .then(pixabayData => {

                            // Pixabay Default Data API Variable
                            const pixabayDefaultAPI = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=travel&image_type=photo&editors_choice=true&per_page=3`;

                            // Get Pixabay Default Data
                            fetch(pixabayDefaultAPI)
                                .then(res => res.json())
                                .then(pixabayDefaultData => {
                                 console.log(appInputData , geonamesData , weatherbitData  , pixabayData , pixabayDefaultData)
                                    // Send All Data
                                    res.send({ appInputData, geonamesData, weatherbitData, pixabayData, pixabayDefaultData });
                                })
                        })
                })
        })
        .catch(err => {
            console.error('Error:', err.message);
            res.status(500).send('An error occurred while processing your request.');
        });
});


