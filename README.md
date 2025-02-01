# Udacity Front End Nanodegree - Travel App Project

This **Travel App Project** source code is submitted to [Udacity](https://www.udacity.com/ "Udacity") for reviewing purposes.
## Prerequisites
- Node.js v22.13.1 (or later)
- npm (compatible with Node.js v22.13.1)


## 1. Project Summary

This project aims to give you the opportunity to put all of the skills you have learned into one project to build your own custom travel app. Due to the nature of this course, it is very JavaScript heavy, but it is still expected you create clean and appealing HTML/CSS. You will also be targeting the DOM, working with objects, and retrieving data from 3 APIs in which one of those is reliant on another to work. Finally, this is all going to be done in a Webpack environment, using an express server, and wrapped up with service workers.

## 2. Extra Project Efforts

* Add end date and display length of trip.
* Pull in an image for the country from Pixabay API when the entered location brings
up no results (good for obscure localities).
* Instead of just pulling a single day forecast, pull the forecast for multiple days.
* Incorporate icons into forecast.
* Allow the user to add travel remarks.
* Allow user to print their trip and/or export to PDF.
* Validation: Required fields, minimum date input and location.
* Processing message: Display a processing message after passing the basic validations.
* Custom date format: Customize the default date format.
* Close button: to close output pop-up screen.

## 3. API Credentials

* Create an user account at [Geonames](https://www.geonames.org/ "Geonames"), [WeatherBit](https://www.weatherbit.io/ "WeatherBit") and [Pixabay](https://pixabay.com/ "Pixabay") respectively to obtain the API keys.
* Create a file named `.env` with the following code and your API credentials.
```
GEONAMES_USER=your Geonames username
WEATHERBIT_KEY=your WeatherBit API key
PIXABAY_KEY=your Pixabay API key
```

## 4. Installation Guide

* Download the app zip file
* Unzip it from the desktop
* Move the newly created .env file to the root directory of this app folder
* Install node.js - https://nodejs.org/
* Install all modules listed as dependencies in package.json; terminal command line - `npm install`
* Run JEST testing; terminal command line - `npm test`
* Run production environment and build/update dist folder; terminal command line - `npm run build-prod`
* Run local server (http://localhost:8081/); terminal command line - `npm run start`

## 5. Author

* [Susan Siow](https://www.susansiow.com "Susan Siow")