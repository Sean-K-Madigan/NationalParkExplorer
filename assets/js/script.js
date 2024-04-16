const parksArray = ['Acadia', 'Arches', 'Badlands', 'Big Bend', 'Biscayne', 'Black Canyon', 'Bryce Canyon', 'Canyonlands', 'Capitol Reef', 'Carlsbad', 'Channel Islands', 'Congaree', 'Crater Lake', 'Cuyahoga Valley', 'Death Valley', 'Denali', 'Dry Tortugas', 'Everglades', 'Gates of the Arctic', 'Gateway Arch', 'Glacier Bay', 'Grand Canyon', 'Grand Teton', 'Great Basin', 'Great Sand Dunes', 'Great Smokey Mountains', 'Guadalupe Mountains', 'Haleakalā', 'Hawaiʻi volcanoes', 'Hot Springs', 'Indiana Dunes', 'Isle Royale', 'Joshua Tree', 'Katmai', 'Kenai Fjords', 'Kings Canyon', 'Kobuk Valley', 'Lake Clark', 'Lassen Volcanic', 'Mammoth Cave', 'Mesa Verde', 'Mount Rainier', 'New River Gorge', 'North Cascades', 'Olympic', 'Petrified Forest', 'Pinnacles', 'Redwood', 'Rocky Mountain', 'Saguaro', 'Sequoia', 'Shenandoah', 'Theodore Roosevelt', 'Virgin Islands', 'Voyageurs', 'White Sands', 'Wind Cave', 'Elias', 'Yellowstone', 'Yosemite', 'Zion']

const parkNameEl = document.getElementById('park-name');
const parkDescriptionEl = document.getElementById('description');
const parkWeatherEl = document.getElementById('weather');
const parkActivitiesEl = document.getElementById('activities')
const searchTerm = getRandomPark();
const addToFavorites = document.getElementById('add-to-favorites')

let favoriteApiURl;

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
        favoriteApiURl = fetchUrl
        
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
  // Clear existing content
  parkNameEl.innerHTML = '';
  parkDescriptionEl.innerHTML = '';
  parkWeatherEl.innerHTML = '';
  parkActivitiesEl.innerHTML = '';

  const newHeader = document.createElement('h1');
  newHeader.classList.add('park-name')
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
  const parks = searchInput.value + ' National Park';
  const fetchPics = `${apiUrl}?query=${parks}&per_page=4`;
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
          // Clear existing content
          gallery.innerHTML = '';
          data.photos.forEach(photo => {
            const img = document.createElement('img');
            const imgContainer = document.createElement('div')
            imgContainer.classList.add('img-container');
            img.src = photo.src.medium;
            const photographer = document.createElement('p');
            photographer.classList.add('citing');
            imgContainer.classList.add('img-container');
            photographer.textContent = `Photo by: ${photo.photographer} on Pexels`;
            gallery.appendChild(imgContainer);
            imgContainer.appendChild(photographer);            
            imgContainer.appendChild(img);
      });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

function populateDatalist() {
  const datalist = document.getElementById('parks-list');
  
  parksArray.forEach(park => {
    const option = document.createElement('option');
    option.value = park;
    datalist.appendChild(option);
  });
}

// Call the function when the page loads
populateDatalist()

function getRandomPark() {
  const randomIndex = Math.floor(Math.random() * parksArray.length);
  return parksArray[randomIndex];
}

openPage();

searchButton.addEventListener('click', getParkPhotos);

  document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        closeAllModals();
      }
    });
  });
  function getRandomPark() {
    const randomIndex = Math.floor(Math.random() * parksArray.length);
    return parksArray[randomIndex];
}
  function openPage() {
    const apiUrl = 'https://developer.nps.gov/api/v1/parks';
    
    // Define your API key (replace 'YOUR_API_KEY' with your actual API key)
    const apiKey = 'zsg1JUezGGMHKiM4K9RLRe95wfbFzkZKZx5wr4V4';
    
    // Define the search term for Yellowstone National Park
    
    
    // Construct the fetch URL with the search term and API key
    const fetchUrl = `${apiUrl}?q=${searchTerm}&api_key=${apiKey}`;

    console.log(searchTerm);

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
        favoriteApiURl = fetchUrl
        
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

      const imageApiUrl = `https://api.pexels.com/v1/search`
      const imageSearchTerm = searchTerm + ' National Park';
  const fetchPics = `${imageApiUrl}?query=${imageSearchTerm}&per_page=4`;
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
          // Clear existing content
          gallery.innerHTML = '';
          data.photos.forEach(photo => {
            const img = document.createElement('img');
            const imgContainer = document.createElement('div')
            imgContainer.classList.add('img-container');
            img.src = photo.src.medium;
            const photographer = document.createElement('p');
            photographer.classList.add('citing');
            imgContainer.classList.add('img-container');
            photographer.textContent = `Photo by: ${photo.photographer} on Pexels`;
            gallery.appendChild(imgContainer);
            imgContainer.appendChild(photographer);            
            imgContainer.appendChild(img);
      });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }

addToFavorites.addEventListener('click', function() {

    const fetchUrl = favoriteApiURl

    let savedUrls = JSON.parse(localStorage.getItem('savedUrls')) || [];

    savedUrls.push(fetchUrl);
    localStorage.setItem('savedUrls', JSON.stringify(savedUrls))
    
    console.log(savedUrls)
})

  openPage();