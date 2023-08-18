'use strict'



function OnShowAge(value) {
    document.querySelector('.curr-age').innerText = value
}

function onUpdateUser(ev) { //update
    ev.preventDefault()
    // const elForm = ev.target 
    // const formData = new FormData(elForm)
    // const userMap = Object.fromEntries(formData)


    const email = document.querySelector('#email').value
    const age = document.querySelector('#age').value
    const bgColor = document.querySelector('#bgr-color').value
    const txtColor = document.querySelector('#txt-color').value
    const birthDate = document.querySelector('#birth-date').value
    const birthTime = document.querySelector('#birth-time').value

    updateUser({ email, age, bgColor, txtColor, birthDate, birthTime })
    window.location = 'index.html'
}
