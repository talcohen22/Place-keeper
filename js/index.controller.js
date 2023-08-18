'use strict'

function onInit(){
    const user = getUser()
    if(!user || user.length !== 0){
        document.querySelector('body').style.backgroundColor = user.bgColor
        document.querySelector('body').style.color = user.txtColor
        document.querySelector('.email').innerText = user.email
        document.querySelector('.age').innerText = user.age
        document.querySelector('.birth-Time').innerText = user.birthTime
        document.querySelector('.birth-Time').innerText = user.birthTime
        document.querySelector('.details').style.borderColor = user.txtColor
    }
}