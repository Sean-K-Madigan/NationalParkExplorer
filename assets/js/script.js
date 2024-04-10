const parkNameEl = document.getElementById('park-name');
const parkDescriptionEl = document.getElementById('description');
const parkWeatherEl = document.getElementById('weather');
const parkActivitiesEl = document.getElementById('activities')

// Define the URL of the NPS API endpoint
const apiUrl = 'https://developer.nps.gov/api/v1/parks';

// Define your API key (replace 'YOUR_API_KEY' with your actual API key)
const apiKey = 'zsg1JUezGGMHKiM4K9RLRe95wfbFzkZKZx5wr4V4';

// Define the search term for Yellowstone National Park
const searchTerm = 'redwood';

// Construct the fetch URL with the search term and API key
const fetchUrl = `${apiUrl}?q=${searchTerm}&api_key=${apiKey}`;

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
searchButton.addEventListener('click', function() {
});

// Make the fetch request
fetch(fetchUrl)
  .then(response => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    const park = data.data.find(park => park.fullName.toLowerCase().includes(searchTerm.toLowerCase()));

    
    // Check if the park was found
    if (park) {

        const activityNames = park.activities.map(activity => activity.name)
        // Display information about the park
        const parkData = {
            park: park.fullName,
            description: park.description,
            fees: park.weatherInfo,
            activities: activityNames
        }

        createParkCard(parkData);
      console.log(parkData);
    } else {
      console.log('Park not found');
    }
  })
  .catch(error => {
    // Handle errors
    console.error('Error fetching data:', error);
  });

  function createParkCard (data) {
    parkNameEl.appendChild(createHTMLElement('h2', data.park));
    park
  }