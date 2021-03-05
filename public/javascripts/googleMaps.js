function initMap() {
  const defaultPosition = { lat: 40.4146500, lng: -3.7004000 };
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: marker || defaultPosition
  });

  const locationForm = document.getElementById('location-form');
  
  locationForm.addEventListener('submit', geocode);


  function geocode(e) {
    e.preventDefault();
    let location = document.getElementById('location-input').value;
    console.log('location', location);
    
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: 'AIzaSyDsseampqhnvWjM8sIiTYkNEm5GcEoIo8w',
      }
    })
    .then((response) => {
      
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      document.getElementById('lat').value = lat
      document.getElementById('lng').value = lng
      let latLng = new google.maps.LatLng(lat, lng); //Makes a latlng
      mapMarker = new google.maps.Marker({
            position: {
              lat,
              lng
            }, 
            map: map
          })
  
      map.panTo(latLng);
          
      // // Log full response
      console.log(response);
  
      // // Formatted Address
      // const formattedAddress = response.data.results[0].formatted_address;
      // const formattedAddresOutput = `
      //   <ul class="list-group">
      //     <li class="list-group-item">${formattedAddress}</li>
      //   </ul>
      // `;
  
      // // Address components
      // const addressComponents = response.data.results[0].address_components;
      // let addressComponentsOutput = '<ul class="list-group>';
      // addressComponents.forEach(addressComponent => {
      //   addressComponentsOutput += `
      //     <li class="list-group-item"><strong>${addressComponent.types}</strong> : ${addressComponent.long_name}</li>
      //   `;
      // })
      // addressComponentsOutput += '</ul>'
  
      // // Geometry
      // const lat = response.data.results[0].geometry.location.lat;
      // const lng = response.data.results[0].geometry.location.lng;
      // const geometryOutput = `
      //   <ul class="list-group">
      //     <li class="list-group-item"><strong>Latitude</strong>${lat}</li>
      //     <li class="list-group-item"><strong>Longitude</strong>${lng}</li>
      //   </ul>
      // `;
  
      // // Output to app
      // document.getElementById('formatted-address').innerHTML = formattedAddresOutput;
      // document.getElementById('address-components').innerHTML = addressComponentsOutput;
      // document.getElementById('geometry').innerHTML = geometryOutput;
    })
    .catch((err) => console.log(err))
  }
}

// Get location form

// Listen for submit
//locationForm.addEventListener('submit', geocode);

// geocode();
// GEOCODER
