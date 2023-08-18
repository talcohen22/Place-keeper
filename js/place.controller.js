'use strict'

var gMap
var gMarkers

function initMap(lat = 32.0749831, lng = 34.9120554) {
    var elMap = document.querySelector('.map')
    var options = {
        center: { lat, lng },
        zoom: 15
    }

    gMap = new google.maps.Map(
        elMap,
        options
    )

    var marker = new google.maps.Marker({
        position: { lat, lng },
        map: gMap,
        title: 'Hello World!'
    })

    gMap.addListener('click', ev => {
        const name = prompt('Place name?')
        const lat = ev.latLng.lat()
        const lng = ev.latLng.lng()
        // gMap.options.zoom = gMap.getZoom()
        // console.log('map.getZoom():', gMap.getZoom())
        addPlace(name, lat, lng, gMap.getZoom()) //create //FIXME: לעשות את זה בדרך הקצרה שהם לימדו אותנו היום
        renderPlaces()
    })

}

function onInit() {
    renderPlaces()
}

function renderPlaces() {
    const places = getPlaces()
    const strHTMLs = places.map(place =>
        `<tr>
            <td>${place.name}</td>
            <td><button onclick="onRemovePlace('${place.id}')">X</button></td>
            <td><button onclick="onPanToPlace('${place.id}')">Go</button></td>
        </tr>`
    )
    document.querySelector('.places-table').innerHTML = strHTMLs.join('')
    renderMarkers()
}

function onRemovePlace(placeId) { //remove
    removePlace(placeId)
    renderPlaces()
}

function onPanToPlace(placeId) {
    const place = getPlaceById(placeId)
    gMap.setCenter({ lat: place.lat, lng: place.lng })
    gMap.setZoom(place.zoom)
}

function renderMarkers() {
    const places = getPlaces()
    if ( gMarkers !== undefined ){ // remove previous markers
        gMarkers.forEach(marker => marker.setMap(null))
    } 
    gMarkers = places.map(place => { // every place is creating a marker
        return new google.maps.Marker({
            position: place,
            map: gMap,
            title: place.name
        })
    })
}

function onDownloadCSV(){
    var csvStr = 'Id, latitude, Longitude, Name, \n'
    gPlaces.forEach((place,i) => { 
        for (const key in place){
            csvStr += place[key]+','
        }
        csvStr += '\n'
    })
    downloadCSVFile(csvStr)
}

function downloadCSVFile(csv_data) {
 
    var CSVFile = new Blob([csv_data], { type: "text/csv" }); // Create CSV file object and feed our csv_data into it

    var temp_link = document.createElement('a'); // Create to temporary link to initiate download process
 
    temp_link.download = "Places.csv"; // Download csv file
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
 
    temp_link.style.display = "none"; // This link should not be displayed
    document.body.appendChild(temp_link);

    temp_link.click(); // Automatically click the link to trigger download
    document.body.removeChild(temp_link);
}

function onGetLocation() {
    getPosition()
}

function getPosition() {
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser')
        return
    }
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
}

function showLocation({ coords }) {
    const { latitude: lat, longitude: lng } = coords
    initMap(lat, lng)
}

function handleLocationError(err) {
    var errMsg = ''
    switch (err.code) {
        case 1:
            errMsg = 'The user didn\'t allow this page to retrieve a location.'
            break
        case 2:
            errMsg = 'Unable to determine your location: ' + err.message
            break
        case 3:
            errMsg = 'Timed out before retrieving the location.'
            break
    }
    const elMsg = document.querySelector('.err-msg')
    elMsg.innerHTML = errMsg
}