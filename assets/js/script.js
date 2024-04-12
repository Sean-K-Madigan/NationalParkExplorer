const parkNameEl = document.getElementById('park-name');
const parkDescriptionEl = document.getElementById('description');
const parkWeatherEl = document.getElementById('weather');
const parkActivitiesEl = document.getElementById('activities')


const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click', function(event) {
    event.preventDefault();
    // Define the URL of the NPS API endpoint
    const apiUrl = 'https://developer.nps.gov/api/v1/parks';
    
    // Define your API key (replace 'YOUR_API_KEY' with your actual API key)
    const apiKey = 'zsg1JUezGGMHKiM4K9RLRe95wfbFzkZKZx5wr4V4';
    
    // Define the search term for Yellowstone National Park
    const searchTerm = searchInput.value;
    
    // Construct the fetch URL with the search term and API key
    const fetchUrl = `${apiUrl}?q=${searchTerm}&api_key=${apiKey}`;

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
                weather: park.weatherInfo,
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
});

// Make the fetch request

function createParkCard (data) {
console.log(data.description);
console.log(parkDescriptionEl);

    const newHeader = document.createElement('h2');
    const descriptionParagraph = document.createElement('p');
    const weatherParagraph = document.createElement('p');
    parkNameEl.appendChild(newHeader).textContent = data.park;
    parkDescriptionEl.appendChild(descriptionParagraph).textContent = data.description;
    parkWeatherEl.appendChild(weatherParagraph).textContent = data.weather;

    const activitiesList = document.createElement('ul')

    data.activities.forEach(activity => {
        const activityItem = document.createElement('li')
        activitiesList.appendChild(activityItem).textContent = activity
    })
    parkActivitiesEl.appendChild(activitiesList);

  }


const gallery = document.getElementById('gallery')
function getParkPhotos(event){
    event.preventDefault();
    const apiUrl = `https://api.pexels.com/v1/search`
    const parks = "Zion";
    const fetchPics = `${apiUrl}?query=${parks}&per_page=6`;
    fetch(fetchPics, {
        headers: {
            Authorization: "YHJTxEYXr7hGIeSQrGhw7Q5cjhlXubPRmgYVQUK7PXD6ZBhd3sjszejz"
        }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch images")
            }
            return response.json();
        })
        .then (data => {
            console.log(data)
            gallery.innerHTML = '';
            data.photos.forEach(photo => {
              const img = document.createElement('img');
              img.src = photo.src.medium;
              gallery.appendChild(img);
        });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}
searchButton.addEventListener('click', getParkPhotos);
