'use strict'

const STORAGE_KEY = 'placesDB'

var gPlaces

_createPlaces()


function _createPlaces() {

    const places = loadFromStorage(STORAGE_KEY)
    if (!places || !places.length) {
        gPlaces = [
            createPlace(25.761681, -80.191788, 'Miami'),
            createPlace(29.55805, 34.951925, 'Eilat'),
            createPlace(-14.235004, -51.925282, 'Brazil'),
            createPlace(-6.181240, 35.748161, 'Tanzaniz')
        ]
        savePlacesToLocalStorage()
    }
    else gPlaces = places
}

// _createPlaces(place)
// const {name, id} = place // { id, lat, lng, name}
// const [firstItem, secondItem ] = nums 

function createPlace(  lat, lng, name, id = makeId(), zoom = 15) { //FIXME: לעשות את זה בדרך הקצרה שהם לימדו אותנו היום
    return {
        id,
        lat,
        lng,
        name,
        zoom
    }
}

function savePlacesToLocalStorage() {
    saveToStorage(STORAGE_KEY, gPlaces)
}

function getPlaces() {
    return gPlaces
}

function removePlace(placeId) { //remove
    const placeIdx = gPlaces.findIndex(place => place.id === placeId)
    gPlaces.splice(placeIdx, 1)
    savePlacesToLocalStorage()
}

function getPlaceById(placeId){
    return gPlaces.find(place => place.id === placeId)
}

function addPlace(name, lat, lng, mapZoom) {//TODO: להשתמש בזום!!!!!!!!!!
    const place = createPlace(lat, lng, name , mapZoom)
    gPlaces.unshift(place)
    savePlacesToLocalStorage()
}