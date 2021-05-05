

let place = document.querySelector('.main__wrapper__city')
let sunny = document.querySelector('.sunn')
let snow = document.querySelector('.snow')
let storm = document.querySelector('.storm')
let moon = document.querySelector('.moon')
let cloud = document.querySelector('.cloud')
let temperture = document.querySelector('.main__content__temperature')
let des = document.querySelector('.main__content__descrtiption')
let visibility = document.querySelector('.main__content__visibility')
let human = document.querySelector('.main__content__humanility')
let wind_speed = document.querySelector('.main__content__wind')
let form = document.querySelector('.header__form')
let loading = document.querySelector('.loadingio-spinner-spin-dumguqu049')
var latitude = 0
var longitude = 0
let visibility_label = document.querySelector('.main__content__visibility__label')
let human_label = document.querySelector('.main__content__humanility__label')
let wind_label = document.querySelector('.main__content__wind__label')
let wind_unit = document.querySelector('.main__content__wind__unit')
let visibility_unit = document.querySelector('.main__content__visibility__unit')
let input


temperture.innerHTML = 'MY NAME IS KHIEM'
des.innerHTML = 'WELLCOME TO MY APPLICATION'
visibility.innerHTML ='HOPE YOU WILL ENJOY MY APPLICATION'
sunny.classList.toggle('hide')
form.addEventListener('submit', (e)=>{
    input  = document.querySelector('.header__input').value
    e.preventDefault()
    temperture.innerHTML = ''
    des.innerHTML = ''
    visibility.innerHTML =''
    sunny.classList.toggle('hide')
    moon.classList.toggle('hide')
    snow.classList.toggle('hide')
    storm.classList.toggle('hide')
    cloud.classList.toggle('hide')

    fetch('/in?address='+encodeURIComponent(input)+'').then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                des.innerHTML = data.error
            }else{
                loading.classList.toggle('hide')
                temperture.innerHTML = data.city.temperature + "&#8728;" +"C"
                wind_unit.innerHTML = "KM/H"
                visibility_unit.innerHTML = "KM"
                place.innerHTML = data.location
                wind_speed.innerHTML = data.city.wind_speed
                human.innerHTML = data.city.humidity
                visibility.innerHTML = data.city.visibility
                des.innerHTML = data.city.description
                if(data.temperture > 25){
                    sunny.classList.toggle('display')
                }
            }
        })
    })
})