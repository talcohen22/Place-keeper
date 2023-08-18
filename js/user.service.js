'use strict'

const STORAGE_KEY = 'user'
var gUser

function updateUser(user){ //update
    gUser = user
    saveUserToLocalStorage()
}

function saveUserToLocalStorage(){
    saveToStorage(STORAGE_KEY, gUser)
}

function getUser(){ //list
    return loadFromStorage(STORAGE_KEY)
}