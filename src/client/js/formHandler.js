// Utility to close sections
export function closeButton(outputSelector, buttonSelector) {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, and Opera

    const outputOuter = document.querySelector(outputSelector);
    const closeButton = document.querySelector(buttonSelector);

    outputOuter.style.display = 'none';
    closeButton.style.display = 'none';
}

// Get current date in YYYY-MM-DD format
export function currentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Calculate day difference between two dates
export function dayDiffCheck(d1, d2) {
    const dayInMs = 24 * 60 * 60 * 1000;
    const diffInMs = new Date(d2).getTime() - new Date(d1).getTime();
    return Math.floor(diffInMs / dayInMs);
}

// Validate minimum date
export function minDate(dateInput) {
    return dateInput >= currentDate();
}

// Print section
export function printButton(printAreaSelector) {
    const printArea = document.querySelector(printAreaSelector).innerHTML;
    const originalBody = document.body.innerHTML;

    document.body.innerHTML = printArea;
    window.print();
    document.body.innerHTML = originalBody;
}
const handleSubmitButton = document.querySelector('.generate-button');
const departDateInputField = document.querySelector('#depart-date-input');
const returnDateInputField = document.querySelector('#return-date-input');
const destinationInputField = document.querySelector('#destination-input');
const remarksInputField = document.querySelector('#remarks-input');
const processMsg = document.querySelector('.process-message');

export async function processForm(event) {
    event.preventDefault();

    const departDateInput = departDateInputField.value;
    console.log(departDateInput);
    const returnDateInput = returnDateInputField.value;
    console.log(returnDateInput);
    const destinationInput = destinationInputField.value;
    console.log("destrepution input"+ destinationInput);
    const remarksInput = remarksInputField.value;
    console.log(remarksInput);

    if (!departDateInput || !returnDateInput || !destinationInput) {
        alert('Date and destination fields are required.');
        return;
    }

    if (!minDate(departDateInput) || !minDate(returnDateInput)) {
        alert('The minimum date is today.');
        return;
    }

    processMsg.innerHTML = 'Processing...';

    try {
        const response = await fetch('/all-apis', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destinationInput, remarksInput })
        });

        if (!response.ok) throw new Error('Failed to fetch data from the server.');

        const data = await response.json();
        if (data.locValidation) {
            alert(data.locValidation);
            processMsg.innerHTML = '';
            return;
        }

        console.log('Response data:', data);
        processMsg.innerHTML = '';

        // Extract necessary information for rendering trip details
        const geoCoordinates = data.geonamesData.geonames[0];
        console.log("geoCoordinates "+  geoCoordinates  + " points" + geoCoordinates.countryName  );
        const weatherForecast = data.weatherbitData;
        console.log("weatherForecast "+ weatherForecast);
        const locationImage = data.pixabayData.hits ;
        console.log("locationImage  "+ locationImage);
        const tripLength = dayDiffCheck(departDateInput, returnDateInput);
        console.log("tripLength  "+ departDateInput  + " " + returnDateInput  + " " + tripLength);
        const daysUntilTrip = dayDiffCheck(currentDate(), departDateInput);
        console.log("daysUntilTrip "+ daysUntilTrip);
        const tripDetailsContainer = document.getElementById('trip-info');
        console.log("tripDetailsContainer "+ tripDetailsContainer);
        // Call renderTripDetails with appropriate arguments
        renderTripDetails(geoCoordinates, weatherForecast, locationImage, departDateInput, returnDateInput, tripLength);
           
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while processing your request. Please try again.');
        processMsg.innerHTML = '';
    }
}



const renderTripDetails = (geoCoordinates, weatherForecast, locationImage, start, end, tripLength) => {

    const tripDetailsContainer = document.getElementById('trip-info');
    const daysUntilTrip = dayDiffCheck(currentDate(), start);

    tripDetailsContainer.innerHTML = `
        <div id="data">
        <h2>Journey to ${geoCoordinates.countryName}</h2>
        ${
                locationImage.map((e)=>{
                    return `<img src="${e.webformatURL}" alt="${geoCoordinates.countryName}" class="trip-img">`;
                })
            }
        <div>
        <p>Departure Date: ${start}</p>
        <p>Return Date: ${end}</p>
        <p>Days until departure: ${daysUntilTrip}</p>
        <p>Trip Length: ${tripLength} days</p>
        <p>Weather Forecast: ${weatherForecast.data[0].temp}°C, ${weatherForecast.data[0].weather.description}</p>
       </div>
       </div>
        `;
};

// Attach event listener to the button
handleSubmitButton.addEventListener('click', processForm);

export default processForm;
