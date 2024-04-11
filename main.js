const api = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru"
const token = "08d3e936fa0386c9a35864eda8a7aa5f"
const container = document.querySelector('.container')

if(localStorage.getItem('weather')){
    container.innerHTML = localStorage.getItem('weather')
    update()
    DragDrop()
}

async function getWeather(city){
    /*let cityName = document.querySelector('.cityName')
    let weather = document.querySelector('.weather')
    let temp = document.querySelector('.temp')
    let feelsLike = document.querySelector('.feelsLike')
    let time = document.querySelector('.time')
    let speed = document.querySelector('.speed')
    let humidity = document.querySelector('.percents')*/
    let q=city.value
    const response = await fetch(`${api}&appid=${token}&q=${city.value}`)
    let data = await response.json()
    if (data.cod !== 200){
        city.value=""
        city.setAttribute('placeholder', 'Что-то пошло не так')
    }
    else {
        let cell = document.createElement('div')
        document.querySelector('.container').appendChild(cell)
        cell.classList.add('cell')
        let card = document.createElement('div')
        cell.appendChild(card)
        card.classList.add('city')
        let filter = document.createElement('div')
        card.appendChild(filter)
        filter.classList.add('filter')
        let btnDelete = document.createElement('div')
        card.appendChild(btnDelete)
        btnDelete.classList.add('btnDelete')
        btnDelete.innerHTML = "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" >\n" +
            "                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M30 15C30 23.2842 23.2842 30 15 30C6.71572 30 0 23.2842 0 15C0 6.71572 6.71572 0 15 0C23.2842 0 30 6.71572 30 15ZM10.4544 10.4545C10.8938 10.0151 11.6061 10.0151 12.0455 10.4545L15 13.4089L17.9544 10.4545C18.3937 10.0152 19.1061 10.0152 19.5455 10.4545C19.9848 10.8938 19.9848 11.6062 19.5455 12.0455L16.5909 15L19.5455 17.9544C19.9848 18.3937 19.9848 19.1061 19.5455 19.5455C19.1061 19.9848 18.3937 19.9848 17.9544 19.5455L15 16.5911L12.0455 19.5455C11.6061 19.9848 10.8938 19.9848 10.4545 19.5455C10.0151 19.1061 10.0151 18.3937 10.4545 17.9545L13.4089 15L10.4544 12.0455C10.0151 11.6061 10.0151 10.8938 10.4544 10.4545Z\" fill=\"#1C274C\"/>\n" +
            "            </svg>"
        let info = document.createElement('div')
        card.appendChild(info)
        info.classList.add('info')
        let top = document.createElement('div')
        info.appendChild(top)
        top.classList.add('top')
        let div = document.createElement('div')
        top.appendChild(div)
        let icon = document.createElement('div')
        icon.classList.add('icon')
        div.appendChild(icon)
        icon.innerHTML = getIcon(data.weather[0].main)
        let weather = document.createElement('p')
        div.appendChild(weather)
        weather.classList.add('weather')
        let cityName = document.createElement('p')
        top.appendChild(cityName)
        cityName.classList.add('cityName')
        let time = document.createElement('p')
        info.appendChild(time)
        time.classList.add('time')
        let center = document.createElement('div')
        info.appendChild(center)
        center.classList.add('center')
        let temp = document.createElement('p')
        center.appendChild(temp)
        temp.classList.add('temp')
        let feelsLike = document.createElement('p')
        center.appendChild(feelsLike)
        feelsLike.classList.add('feelsLike')
        let bottom = document.createElement('div')
        info.appendChild(bottom)
        bottom.classList.add('bottom')
        let wind = document.createElement('div')
        bottom.appendChild(wind)
        wind.classList.add('wind')
        let speed = document.createElement('p')
        wind.appendChild(speed)
        speed.classList.add('speed')
        speed.innerHTML = Math.round(data.wind.speed) + ' м/с'
        wind.innerHTML += 'Скорость ветра'
        let compass = document.createElement('div')
        bottom.appendChild(compass)
        compass.classList.add('compass')
        let div2 = document.createElement('div')
        compass.appendChild(div2)
        div2.innerHTML = "<svg width=\"76\" height=\"78\" viewBox=\"0 0 76 78\" fill=\"none\">\n" +
            "                            <path d=\"M41.0795 3H40.0227C39.9602 2.69602 39.8509 2.42898 39.6946 2.19886C39.5412 1.96875 39.3537 1.77557 39.1321 1.61932C38.9134 1.46023 38.6705 1.34091 38.4034 1.26136C38.1364 1.18182 37.858 1.14204 37.5682 1.14204C37.0398 1.14204 36.5611 1.27557 36.1321 1.54261C35.706 1.80966 35.3665 2.20312 35.1136 2.72301C34.8636 3.2429 34.7386 3.88068 34.7386 4.63636C34.7386 5.39204 34.8636 6.02983 35.1136 6.54972C35.3665 7.0696 35.706 7.46307 36.1321 7.73011C36.5611 7.99716 37.0398 8.13068 37.5682 8.13068C37.858 8.13068 38.1364 8.09091 38.4034 8.01136C38.6705 7.93182 38.9134 7.81392 39.1321 7.65767C39.3537 7.49858 39.5412 7.30398 39.6946 7.07386C39.8509 6.84091 39.9602 6.57386 40.0227 6.27273H41.0795C41 6.71875 40.8551 7.1179 40.6449 7.47017C40.4347 7.82244 40.1733 8.12216 39.8608 8.36932C39.5483 8.61364 39.1974 8.79972 38.8082 8.92756C38.4219 9.0554 38.0085 9.11932 37.5682 9.11932C36.8239 9.11932 36.1619 8.9375 35.5824 8.57386C35.0028 8.21023 34.5469 7.69318 34.2145 7.02273C33.8821 6.35227 33.7159 5.55682 33.7159 4.63636C33.7159 3.71591 33.8821 2.92045 34.2145 2.25C34.5469 1.57954 35.0028 1.0625 35.5824 0.698863C36.1619 0.335226 36.8239 0.153408 37.5682 0.153408C38.0085 0.153408 38.4219 0.217329 38.8082 0.34517C39.1974 0.473011 39.5483 0.660511 39.8608 0.90767C40.1733 1.15199 40.4347 1.45028 40.6449 1.80256C40.8551 2.15199 41 2.55114 41.0795 3Z\"/>\n" +
            "                            <path d=\"M69.0568 42V33.2727H72.108C72.7159 33.2727 73.2173 33.3778 73.6122 33.5881C74.0071 33.7955 74.3011 34.0753 74.4943 34.4276C74.6875 34.777 74.7841 35.1648 74.7841 35.5909C74.7841 35.9659 74.7173 36.2756 74.5838 36.5199C74.4531 36.7642 74.2798 36.9574 74.0639 37.0994C73.8509 37.2415 73.6193 37.3466 73.3693 37.4148V37.5C73.6364 37.517 73.9048 37.6108 74.1747 37.7812C74.4446 37.9517 74.6705 38.196 74.8523 38.5142C75.0341 38.8324 75.125 39.2216 75.125 39.6818C75.125 40.1193 75.0256 40.5128 74.8267 40.8622C74.6279 41.2116 74.3139 41.4886 73.8849 41.6932C73.456 41.8977 72.8977 42 72.2102 42H69.0568ZM70.1136 41.0625H72.2102C72.9006 41.0625 73.3906 40.929 73.6804 40.6619C73.973 40.392 74.1193 40.0653 74.1193 39.6818C74.1193 39.3864 74.044 39.1136 73.8935 38.8636C73.7429 38.6108 73.5284 38.4091 73.25 38.2585C72.9716 38.1051 72.642 38.0284 72.2614 38.0284H70.1136V41.0625ZM70.1136 37.108H72.0739C72.392 37.108 72.679 37.0455 72.9347 36.9205C73.1932 36.7955 73.3977 36.6193 73.5483 36.392C73.7017 36.1648 73.7784 35.8977 73.7784 35.5909C73.7784 35.2074 73.6449 34.8821 73.3778 34.6151C73.1108 34.3452 72.6875 34.2102 72.108 34.2102H70.1136V37.108Z\"/>\n" +
            "                            <path d=\"M34.1136 68.2727V77H33.0568V68.2727H34.1136ZM36.0185 72.2443V73.1818H33.3466V72.2443H36.0185ZM43.4205 72.6364C43.4205 73.5568 43.2543 74.3523 42.9219 75.0227C42.5895 75.6932 42.1335 76.2102 41.554 76.5739C40.9744 76.9375 40.3125 77.1193 39.5682 77.1193C38.8239 77.1193 38.1619 76.9375 37.5824 76.5739C37.0028 76.2102 36.5469 75.6932 36.2145 75.0227C35.8821 74.3523 35.7159 73.5568 35.7159 72.6364C35.7159 71.7159 35.8821 70.9205 36.2145 70.25C36.5469 69.5795 37.0028 69.0625 37.5824 68.6989C38.1619 68.3352 38.8239 68.1534 39.5682 68.1534C40.3125 68.1534 40.9744 68.3352 41.554 68.6989C42.1335 69.0625 42.5895 69.5795 42.9219 70.25C43.2543 70.9205 43.4205 71.7159 43.4205 72.6364ZM42.3977 72.6364C42.3977 71.8807 42.2713 71.2429 42.0185 70.723C41.7685 70.2031 41.429 69.8097 41 69.5426C40.5739 69.2756 40.0966 69.142 39.5682 69.142C39.0398 69.142 38.5611 69.2756 38.1321 69.5426C37.706 69.8097 37.3665 70.2031 37.1136 70.723C36.8636 71.2429 36.7386 71.8807 36.7386 72.6364C36.7386 73.392 36.8636 74.0298 37.1136 74.5497C37.3665 75.0696 37.706 75.4631 38.1321 75.7301C38.5611 75.9972 39.0398 76.1307 39.5682 76.1307C40.0966 76.1307 40.5739 75.9972 41 75.7301C41.429 75.4631 41.7685 75.0696 42.0185 74.5497C42.2713 74.0298 42.3977 73.392 42.3977 72.6364Z\" />\n" +
            "                            <path d=\"M3.85226 42.1193C3.28976 42.1193 2.78834 42.0227 2.348 41.8295C1.9105 41.6364 1.56249 41.3679 1.30397 41.0242C1.04828 40.6776 0.90908 40.2756 0.886353 39.8182H1.96022C1.98294 40.0994 2.07953 40.3423 2.24999 40.5469C2.42044 40.7486 2.64345 40.9048 2.91902 41.0156C3.19459 41.1264 3.49999 41.1818 3.83522 41.1818C4.21022 41.1818 4.5426 41.1165 4.83238 40.9858C5.12215 40.8551 5.34942 40.6733 5.51419 40.4403C5.67897 40.2074 5.76135 39.9375 5.76135 39.6307C5.76135 39.3097 5.68181 39.027 5.52272 38.7827C5.36363 38.5355 5.13067 38.3423 4.82385 38.2031C4.51703 38.0639 4.14203 37.9943 3.69885 37.9943H2.99999V37.0568H3.69885C4.04544 37.0568 4.34942 36.9943 4.61078 36.8693C4.87499 36.7443 5.08095 36.5682 5.22868 36.3409C5.37925 36.1136 5.45453 35.8466 5.45453 35.5398C5.45453 35.2443 5.38919 34.9872 5.25851 34.7685C5.12783 34.5497 4.94317 34.3793 4.70453 34.2571C4.46874 34.1349 4.19033 34.0739 3.86931 34.0739C3.56817 34.0739 3.28408 34.1293 3.01703 34.2401C2.75283 34.348 2.53692 34.5057 2.36931 34.7131C2.20169 34.9176 2.11078 35.1648 2.09658 35.4545H1.07385C1.0909 34.9972 1.22868 34.5966 1.4872 34.2528C1.74573 33.9063 2.0838 33.6364 2.50141 33.4432C2.92186 33.25 3.38351 33.1534 3.88635 33.1534C4.42613 33.1534 4.88919 33.2628 5.27556 33.4815C5.66192 33.6974 5.9588 33.983 6.16618 34.3381C6.37357 34.6932 6.47726 35.0767 6.47726 35.4886C6.47726 35.9801 6.348 36.3992 6.08948 36.7457C5.8338 37.0923 5.48579 37.3324 5.04544 37.4659V37.5341C5.59658 37.625 6.02698 37.8594 6.33664 38.2372C6.6463 38.6122 6.80113 39.0767 6.80113 39.6307C6.80113 40.1051 6.67186 40.5313 6.41334 40.9091C6.15766 41.2841 5.80823 41.5796 5.36505 41.7955C4.92186 42.0114 4.4176 42.1193 3.85226 42.1193Z\"/>\n" +
            "                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M45.2094 6.03124C45.2747 5.63336 45.3086 5.22494 45.3086 4.80859C45.3086 4.5354 45.294 4.26563 45.2655 4C58.6723 6.70381 69.3038 17.0691 72.3954 30.3312C72.2018 30.3162 72.0061 30.3086 71.8086 30.3086C71.3153 30.3086 70.8331 30.3562 70.3664 30.4471C67.3779 18.2183 57.5745 8.66202 45.2094 6.03124ZM30.4471 6.25076C18.5367 9.1615 9.1615 18.5367 6.25076 30.4471C5.78406 30.3562 5.30189 30.3086 4.80859 30.3086C4.61111 30.3086 4.41542 30.3162 4.22179 30.3312C7.2345 17.4074 17.4074 7.2345 30.3312 4.22179C30.3162 4.41542 30.3086 4.61111 30.3086 4.80859C30.3086 5.30189 30.3562 5.78406 30.4471 6.25076ZM6.03124 45.2094C5.63336 45.2747 5.22494 45.3086 4.80859 45.3086C4.5354 45.3086 4.26563 45.294 4 45.2655C6.70381 58.6723 17.0691 69.3038 30.3312 72.3954C30.3162 72.2017 30.3086 72.0061 30.3086 71.8086C30.3086 71.3153 30.3562 70.8331 30.4471 70.3664C18.2183 67.3779 8.66202 57.5745 6.03124 45.2094ZM72.6172 45.2655C69.8444 59.0142 59.0142 69.8444 45.2655 72.6172C45.294 72.3516 45.3086 72.0818 45.3086 71.8086C45.3086 71.3922 45.2747 70.9838 45.2094 70.5859C57.8965 67.8867 67.8867 57.8965 70.5859 45.2094C70.9838 45.2747 71.3923 45.3086 71.8086 45.3086C72.0818 45.3086 72.3516 45.294 72.6172 45.2655Z\"/>\n" +
            "                        </svg>\n" +
            "                        <svg class=\"degWind\" width=\"16\" height=\"51\" viewBox=\"0 0 16 51\" fill=\"none\" >\n" +
            "                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.0711 44.3431L8.7071 50.7071C8.31657 51.0976 7.68341 51.0976 7.29288 50.7071L0.928922 44.3431C0.538397 43.9526 0.538397 43.3195 0.928922 42.9289C1.31945 42.5384 1.95261 42.5384 2.34314 42.9289L6.99999 47.5858L6.99999 -3.656e-07L8.99999 -2.78178e-07L8.99999 47.5858L13.6568 42.9289C14.0474 42.5384 14.6805 42.5384 15.0711 42.9289C15.4616 43.3195 15.4616 43.9526 15.0711 44.3431Z\" />\n" +
            "                        </svg>"
        let p = document.createElement('p')
        compass.appendChild(p)
        p.innerHTML = 'Направление ветра'
        let humidity = document.createElement('div')
        bottom.appendChild(humidity)
        humidity.classList.add('humidity')
        let percents = document.createElement('p')
        humidity.appendChild(percents)
        percents.classList.add('percents')
        percents.innerHTML = data.main.humidity + '%'
        humidity.innerHTML += 'Влажность'
        
        
        console.log(data)
        cityName.innerHTML = data.name
        weather.innerHTML = data.weather[0].description
        temp.innerHTML = Math.round(data.main.temp) + '°'
        feelsLike.innerHTML = 'Ощущается как ' + Math.round(data.main.feels_like) + '°'
        curtime = new Date()
        localTime = new Date(curtime - -(data.timezone + curtime.getTimezoneOffset()*60)*1000 )
        time.innerHTML = `${localTime.getHours()}:${localTime.getMinutes().toString().padStart(2,"0")}`
        card.querySelector('.degWind').style.transform = `rotate(${data.wind.deg}deg)`
        city.value=""
        city.setAttribute('placeholder', 'Введите название города')
        getImg(q, card)
        DragDrop()
        localStorage.setItem('weather', container.innerHTML)
        let btnsDelete = document.querySelectorAll('.btnDelete')
        btnsDelete.forEach(btn=>{
            btn.addEventListener('click', function (){
                this.parentElement.parentElement.remove()
            })
        })
    }
}

document.querySelector('.searchBtn').addEventListener('click', function(){
    getWeather(document.querySelector('.search'))
    
})

document.querySelector('input').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        getWeather(this)
    }
})


function getIcon(weather){
    switch(weather){
        case 'Thunderstorm': return "<svg  width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\">\n" +
            "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.6645 2.09302C11.8271 2.09302 8.73754 5.16395 8.73754 8.92613C8.73754 9.571 8.82781 10.1937 8.99622 10.7834C9.68999 10.9836 10.3394 11.2868 10.9262 11.675C11.4083 11.9939 11.5405 12.6431 11.2217 13.1252C10.9028 13.6073 10.2535 13.7396 9.77146 13.4206C9.2401 13.0691 8.63605 12.817 7.986 12.6908C7.67647 12.6308 7.35579 12.5992 7.02657 12.5992C4.29014 12.5992 2.09302 14.7882 2.09302 17.4624C2.09302 18.9614 2.78015 20.3043 3.86965 21.1998C4.31616 21.5668 4.38064 22.2262 4.01367 22.6727C3.64667 23.1193 2.9872 23.1837 2.54069 22.8167C0.992261 21.5442 0 19.619 0 17.4624C0 13.6891 3.02773 10.6354 6.78629 10.5102C6.69311 9.99565 6.64451 9.46623 6.64451 8.92613C6.64451 3.98473 10.6946 0 15.6645 0C20.0711 0 23.7522 3.13073 24.5322 7.28549C27.7413 8.64769 30 11.8037 30 15.4924C30 18.5669 28.429 21.2738 26.0498 22.8762C25.5703 23.1991 24.92 23.0722 24.5971 22.5929C24.2742 22.1135 24.4012 21.4631 24.8805 21.1402C26.7127 19.9062 27.907 17.8346 27.907 15.4924C27.907 12.511 25.9684 9.96401 23.2499 9.03437C22.5402 8.7917 21.7769 8.65937 20.98 8.65937C20.1671 8.65937 19.3891 8.79709 18.6674 9.0492C18.1217 9.23979 17.5249 8.95196 17.3343 8.40632C17.1437 7.86067 17.4315 7.26384 17.9771 7.07325C18.918 6.74461 19.9292 6.56634 20.98 6.56634C21.3924 6.56634 21.7986 6.59379 22.1968 6.64698C21.247 3.9995 18.6868 2.09302 15.6645 2.09302ZM13.4008 17.1075C13.7781 17.5454 13.729 18.2062 13.2911 18.5835L9.44577 21.8966H12.608C13.0454 21.8966 13.4368 22.1687 13.589 22.5788C13.7413 22.9889 13.6225 23.4505 13.291 23.736L7.31097 28.888C6.8731 29.2653 6.2123 29.2162 5.83506 28.7784C5.45781 28.3404 5.50697 27.6797 5.94484 27.3024L9.78994 23.9897H6.62791C6.19047 23.9897 5.79917 23.7176 5.64687 23.3075C5.49456 22.8974 5.61341 22.436 5.9448 22.1503L11.9249 16.9979C12.3628 16.6206 13.0235 16.6697 13.4008 17.1075ZM19.926 17.7484C20.3347 18.1571 20.3347 18.8196 19.926 19.2283L17.1353 22.019C16.7266 22.4277 16.0641 22.4277 15.6554 22.019C15.2467 21.6103 15.2467 20.9478 15.6554 20.5391L18.4461 17.7484C18.8548 17.3397 19.5173 17.3397 19.926 17.7484ZM22.7167 22.6321C23.1254 23.0408 23.1254 23.7033 22.7167 24.112L19.926 26.9027C19.5173 27.3114 18.8548 27.3114 18.4461 26.9027C18.0374 26.494 18.0374 25.8315 18.4461 25.4228L21.2368 22.6321C21.6455 22.2234 22.308 22.2234 22.7167 22.6321ZM17.1353 24.0275C17.544 24.4362 17.544 25.0987 17.1353 25.5074L14.3446 28.2981C13.9359 28.7068 13.2734 28.7068 12.8647 28.2981C12.456 27.8894 12.456 27.2269 12.8647 26.8182L15.6554 24.0275C16.0641 23.6188 16.7266 23.6188 17.1353 24.0275Z\" />\n" +
            "<path d=\"M15.6645 2.09302C11.8271 2.09302 8.73754 5.16395 8.73754 8.92613C8.73754 9.571 8.82781 10.1937 8.99622 10.7834C9.68999 10.9836 10.3394 11.2868 10.9262 11.675C11.4083 11.9939 11.5405 12.6431 11.2217 13.1252C10.9028 13.6073 10.2535 13.7396 9.77146 13.4206C9.2401 13.0691 8.63605 12.817 7.986 12.6908C7.67647 12.6308 7.35579 12.5992 7.02657 12.5992C4.29014 12.5992 2.09302 14.7882 2.09302 17.4624C2.09302 18.9614 2.78015 20.3043 3.86965 21.1998C4.31616 21.5668 4.38064 22.2262 4.01367 22.6727C3.64667 23.1193 2.9872 23.1837 2.54069 22.8167C0.992261 21.5442 0 19.619 0 17.4624C0 13.6891 3.02773 10.6354 6.78629 10.5102C6.69311 9.99565 6.64451 9.46623 6.64451 8.92613C6.64451 3.98473 10.6946 0 15.6645 0C20.0711 0 23.7522 3.13073 24.5322 7.28549C27.7413 8.64769 30 11.8037 30 15.4924C30 18.5669 28.429 21.2738 26.0498 22.8762C25.5703 23.1991 24.92 23.0722 24.5971 22.5929C24.2742 22.1135 24.4012 21.4631 24.8805 21.1402C26.7127 19.9062 27.907 17.8346 27.907 15.4924C27.907 12.511 25.9684 9.96401 23.2499 9.03437C22.5402 8.7917 21.7769 8.65937 20.98 8.65937C20.1671 8.65937 19.3891 8.79709 18.6674 9.0492C18.1217 9.23979 17.5249 8.95196 17.3343 8.40632C17.1437 7.86067 17.4315 7.26384 17.9771 7.07325C18.918 6.74461 19.9292 6.56634 20.98 6.56634C21.3924 6.56634 21.7986 6.59379 22.1968 6.64698C21.247 3.9995 18.6868 2.09302 15.6645 2.09302Z\" />\n" +
            "</svg>";
        case 'Drizzle': return "<svg width=\"30\" height=\"27\" viewBox=\"0 0 30 27\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M23.5398 7.88719C22.8443 4.73228 21.1813 2.53928 19.0385 1.2762C16.7565 -0.0689603 14.0326 -0.299437 11.5764 0.344462C9.12023 0.988368 6.85706 2.52616 5.52026 4.81626C4.16901 7.13114 3.82377 10.1134 5.03858 13.4988C5.23519 14.0468 5.83876 14.3316 6.38668 14.1349C6.9346 13.9383 7.21939 13.3348 7.02278 12.7869C5.99601 9.92542 6.3359 7.60062 7.34086 5.87899C8.36028 4.13259 10.1244 2.90443 12.111 2.38363C14.0976 1.86283 16.2319 2.0689 17.968 3.09225C19.6793 4.10097 21.1064 5.96388 21.6023 8.97176C21.6783 9.43235 22.0481 9.78812 22.5113 9.84615C27.6627 10.4915 29.7823 17.4297 25.8694 20.852C25.8644 20.8565 25.8593 20.861 25.8543 20.8655C24.6565 21.9544 23.0986 22.5569 21.4837 22.5449C20.9016 22.5405 20.4262 23.0089 20.4219 23.591C20.4175 24.1731 20.8859 24.6486 21.468 24.6529C23.6162 24.6689 25.6811 23.8686 27.265 22.4321C32.335 17.9869 29.9319 9.31004 23.5398 7.88719Z\" />\n" +
            "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.94273 12.1032C6.94926 12.0861 7.94837 12.3246 8.84225 12.78C9.36095 13.0443 9.56723 13.679 9.30299 14.1977C9.03874 14.7164 8.40404 14.9226 7.88534 14.6584C7.29801 14.3592 6.64905 14.2043 6.00633 14.2106C0.807371 14.6065 0.80035 22.1902 6.03521 22.5617C6.61588 22.6029 7.05319 23.107 7.01199 23.6877C6.97078 24.2684 6.46665 24.7057 5.88598 24.6645C-1.93961 24.1091 -1.9844 12.663 5.88614 12.1056C5.90498 12.1043 5.92385 12.1035 5.94273 12.1032Z\" />\n" +
            "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M23.7526 8.79621C23.7626 9.37826 23.2989 9.85823 22.7169 9.86826C22.0627 9.87954 21.4302 10.0368 20.8371 10.3334C20.3165 10.5937 19.6833 10.3826 19.423 9.86197C19.1627 9.3413 19.3737 8.70817 19.8944 8.44783C20.7629 8.01356 21.7045 7.77733 22.6805 7.7605C23.2626 7.75047 23.7425 8.21417 23.7526 8.79621Z\" />\n" +
            "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.7651 22.8537C12.1767 23.2654 12.1767 23.9327 11.7651 24.3444L10.0786 26.0308C9.66701 26.4424 8.99963 26.4424 8.588 26.0308C8.17637 25.6192 8.17637 24.9518 8.588 24.5402L10.2745 22.8537C10.6861 22.4421 11.3535 22.4421 11.7651 22.8537Z\" />\n" +
            "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.3867 22.8537C17.7983 23.2654 17.7983 23.9327 17.3867 24.3444L15.7002 26.0308C15.2886 26.4424 14.6212 26.4424 14.2096 26.0308C13.7979 25.6192 13.7979 24.9518 14.2096 24.5402L15.896 22.8537C16.3077 22.4421 16.975 22.4421 17.3867 22.8537Z\" />\n" +
            "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.3867 17.2322C17.7983 17.6438 17.7983 18.3112 17.3867 18.7228L15.7002 20.4093C15.2886 20.8209 14.6212 20.8209 14.2096 20.4093C13.7979 19.9977 13.7979 19.3303 14.2096 18.9187L15.896 17.2322C16.3077 16.8206 16.975 16.8206 17.3867 17.2322Z\" />\n" +
            "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.7651 17.2322C12.1767 17.6438 12.1767 18.3112 11.7651 18.7228L10.0786 20.4093C9.66701 20.8209 8.99963 20.8209 8.588 20.4093C8.17637 19.9977 8.17637 19.3303 8.588 18.9187L10.2745 17.2322C10.6861 16.8206 11.3535 16.8206 11.7651 17.2322Z\" />\n" +
            "</svg>\n";
        case 'Rain': return "<svg width=\"30\" height=\"29\" viewBox=\"0 0 30 29\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.9159 2.18383C16.2108 1.91957 14.4664 2.23729 12.964 3.08576C11.7836 3.75239 10.8066 4.71612 10.1247 5.87295C10.8952 6.22551 11.6015 6.71496 12.2072 7.32294C12.6152 7.73243 12.6139 8.39511 12.2044 8.80307C11.7949 9.21103 11.1322 9.20978 10.7243 8.80028C10.0915 8.16508 9.30305 7.7131 8.44275 7.4863C8.43065 7.48365 8.41856 7.48079 8.40648 7.47769C7.18846 7.16586 5.89797 7.31879 4.78658 7.90667C3.67519 8.49455 2.82254 9.47524 2.39487 10.6576C1.9672 11.8399 1.99515 13.1391 2.47327 14.302C2.95139 15.4648 3.84541 16.4079 4.98106 16.9475C5.50316 17.1955 5.72533 17.8198 5.47728 18.3419C5.22923 18.864 4.6049 19.0862 4.0828 18.8381C2.47723 18.0753 1.21326 16.742 0.5373 15.098C-0.138664 13.4539 -0.178178 11.6171 0.426463 9.94555C1.0311 8.27399 2.23656 6.88749 3.80784 6.05636C5.11775 5.36347 6.60362 5.09795 8.05941 5.28421C8.9296 3.60095 10.2739 2.20097 11.9347 1.26309C13.8467 0.183336 16.0666 -0.220995 18.2365 0.115301C20.4064 0.451596 22.3998 1.50892 23.8952 3.11677C25.2329 4.55504 26.1025 6.35884 26.3987 8.28986C27.0148 8.54599 27.5841 8.90641 28.081 9.35693C28.7569 9.96978 29.28 10.7324 29.6083 11.5836C29.9367 12.4349 30.0612 13.3512 29.972 14.2592C29.8827 15.1672 29.5821 16.0417 29.0943 16.8127C28.7852 17.3012 28.1387 17.4466 27.6502 17.1375C27.1617 16.8285 27.0163 16.182 27.3254 15.6935C27.6385 15.1986 27.8315 14.6372 27.8888 14.0544C27.9461 13.4715 27.8661 12.8834 27.6554 12.3369C27.4446 11.7905 27.1088 11.301 26.675 10.9076C26.2411 10.5142 25.7212 10.2279 25.1568 10.0715C24.7337 9.95422 24.4288 9.58545 24.3931 9.14792C24.2529 7.42818 23.5376 5.80579 22.3625 4.54236C21.1874 3.27892 19.621 2.44809 17.9159 2.18383ZM10.7852 13.9576C11.3574 14.0393 11.755 14.5694 11.6733 15.1417L10.1784 25.6078C10.0966 26.18 9.56649 26.5776 8.99427 26.4959C8.42205 26.4142 8.02443 25.884 8.10616 25.3118L9.60108 14.8457C9.68281 14.2735 10.2129 13.8758 10.7852 13.9576ZM22.9957 13.9576C23.5679 14.0393 23.9655 14.5694 23.8838 15.1417L22.3889 25.6078C22.3071 26.18 21.777 26.5776 21.2048 26.4959C20.6325 26.4142 20.2349 25.884 20.3167 25.3118L21.8116 14.8457C21.8933 14.2735 22.4234 13.8758 22.9957 13.9576ZM16.641 15.7019C17.2132 15.7837 17.6108 16.3138 17.5291 16.886L16.0342 27.3522C15.9524 27.9244 15.4223 28.322 14.8501 28.2403C14.2779 28.1585 13.8802 27.6284 13.962 27.0562L15.4569 16.59C15.5386 16.0178 16.0687 15.6202 16.641 15.7019Z\" />\n" +
            "</svg>\n";
        case 'Snow': return "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14.9979 0C15.716 0 16.2982 0.548223 16.2982 1.22449V4.39076L18.9546 1.88926C19.4624 1.41106 20.2857 1.41106 20.7935 1.88926C21.3013 2.36745 21.3013 3.14275 20.7935 3.62095L16.2982 7.85414V12.8805L20.922 10.3666L22.5672 4.584C22.7531 3.93077 23.4661 3.54311 24.1598 3.71813C24.8534 3.89315 25.2651 4.56457 25.0792 5.2178L24.107 8.63496L27.0189 7.05179C27.6408 6.71366 28.4361 6.91432 28.7951 7.49998C29.1542 8.08565 28.9411 8.83454 28.3192 9.17267L25.4073 10.7558L29.0359 11.6715C29.7296 11.8465 30.1412 12.5179 29.9554 13.1712C29.7695 13.8244 29.0565 14.212 28.3628 14.037L22.2223 12.4875L17.6006 15.0002L22.2215 17.5125L28.3622 15.963C29.0558 15.788 29.7688 16.1756 29.9547 16.8288C30.1406 17.4821 29.7289 18.1535 29.0353 18.3285L25.4065 19.2442L28.3184 20.8273C28.9403 21.1655 29.1534 21.9143 28.7943 22.5C28.4353 23.0857 27.64 23.2863 27.0181 22.9482L24.1063 21.3651L25.0786 24.7822C25.2645 25.4354 24.8528 26.1069 24.1591 26.2819C23.4655 26.4569 22.7525 26.0693 22.5666 25.4161L20.9212 19.6334L16.2982 17.1199V22.1459L20.7935 26.3791C21.3013 26.8572 21.3013 27.6325 20.7935 28.1107C20.2857 28.5889 19.4624 28.5889 18.9546 28.1107L16.2982 25.6092V28.7755C16.2982 29.4518 15.716 30 14.9979 30C14.2798 30 13.6976 29.4518 13.6976 28.7755V25.6093L11.0413 28.1107C10.5335 28.5889 9.71017 28.5889 9.20237 28.1107C8.69457 27.6326 8.69457 26.8573 9.20236 26.3791L13.6976 22.1459V17.1222L9.07889 19.6334L7.43351 25.4161C7.24764 26.0693 6.53464 26.4569 5.84097 26.2819C5.1473 26.1069 4.73565 25.4354 4.92151 24.7822L5.89382 21.3651L2.98197 22.9482C2.36004 23.2863 1.56479 23.0857 1.20572 22.5C0.846651 21.9143 1.05974 21.1654 1.68166 20.8273L4.59353 19.2442L0.964824 18.3285C0.271157 18.1535 -0.140492 17.4821 0.0453793 16.8288C0.231251 16.1756 0.944258 15.788 1.63792 15.963L7.77859 17.5125L12.3994 15.0002L7.77784 12.4875L1.63718 14.037C0.943513 14.212 0.230505 13.8244 0.0446321 13.1712C-0.141241 12.5179 0.270407 11.8465 0.964073 11.6715L4.59279 10.7558L1.68092 9.17267C1.05899 8.83454 0.845904 8.08565 1.20497 7.49998C1.56404 6.91432 2.3593 6.71366 2.98122 7.05179L5.89307 8.63493L4.92077 5.2178C4.7349 4.56458 5.14656 3.89315 5.84022 3.71812C6.53389 3.54309 7.2469 3.93074 7.43276 4.58396L9.07814 10.3666L13.6976 12.8782V7.85414L9.20236 3.62094C8.69457 3.14275 8.69457 2.36744 9.20237 1.88925C9.71017 1.41106 10.5335 1.41107 11.0413 1.88926L13.6976 4.39074V1.22449C13.6976 0.548223 14.2798 0 14.9979 0Z\"/>\n" +
            "</svg>\n";
        case 'Smoke':
        case 'Haze':
        case 'Dust':
        case 'Sand':
        case 'Ash':
        case 'Fog':
        case 'Mist':
        case 'Squall':
        case 'Tornado': return "<svg width=\"30\" height=\"19\" viewBox=\"0 0 60 39\" fill=\"none\">\n" +
            "            <path d=\"M39.9569 2.06963C39.9569 0.926643 39.0302 0 37.8872 0H2.06963C0.926643 0 0 0.926643 0 2.06963C0 3.21262 0.926643 4.13926 2.06963 4.13926H37.8872C39.0302 4.13926 39.9569 3.21262 39.9569 2.06963Z\" />\n" +
            "            <path d=\"M57.9304 8.50205H16.1796C15.0366 8.50205 14.1099 9.42869 14.1099 10.5717C14.1099 11.7147 15.0366 12.6413 16.1796 12.6413H57.9304C59.0734 12.6413 60 11.7147 60 10.5717C60 9.42869 59.0734 8.50205 57.9304 8.50205Z\" />\n" +
            "            <path d=\"M48.1617 21.1431C49.3047 21.1431 50.2313 20.2164 50.2313 19.0734C50.2313 17.9305 49.3047 17.0038 48.1617 17.0038H6.19399C5.051 17.0038 4.12436 17.9305 4.12436 19.0734C4.12436 20.2164 5.051 21.1431 6.19399 21.1431H48.1617Z\" />\n" +
            "            <path d=\"M55.0359 25.5059H13.1405C11.9975 25.5059 11.0709 26.4325 11.0709 27.5755C11.0709 28.7185 11.9975 29.6451 13.1405 29.6451H55.0359C56.1789 29.6451 57.1055 28.7185 57.1055 27.5755C57.1055 26.4325 56.1789 25.5059 55.0359 25.5059Z\" />\n" +
            "            <path d=\"M34.7033 34.0082H6.91754C5.77455 34.0082 4.84791 34.9348 4.84791 36.0778C4.84791 37.2208 5.77455 38.1474 6.91754 38.1474H34.703C35.846 38.1474 36.7727 37.2208 36.7727 36.0778C36.7729 34.9348 35.8463 34.0082 34.7033 34.0082Z\" />\n" +
            "        </svg>"            ;
        case 'Clear': return "<svg width=\"30\" height=\"30\" viewBox=\"0 0 53 53\" fill=\"none\">\n" +
            "                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M26.25 9.375C27.375 9.375 28.125 8.625 28.125 7.5V1.875C28.125 0.75 27.375 0 26.25 0C25.125 0 24.375 0.75 24.375 1.875V7.5C24.375 8.625 25.125 9.375 26.25 9.375ZM26.25 11.25C18 11.25 11.25 18 11.25 26.25C11.25 34.5 18 41.25 26.25 41.25C34.5 41.25 41.25 34.5 41.25 26.25C41.25 18 34.5 11.25 26.25 11.25ZM12.9375 14.8125C12.5625 14.8125 12 14.625 11.625 14.25L7.6875 10.3125C6.9375 9.5625 6.9375 8.4375 7.6875 7.6875C8.4375 6.9375 9.5625 6.9375 10.3125 7.6875L14.25 11.625C15 12.375 15 13.5 14.25 14.25C13.875 14.625 13.3125 14.8125 12.9375 14.8125ZM9.375 26.25C9.375 25.125 8.625 24.375 7.5 24.375H1.875C0.75 24.375 0 25.125 0 26.25C0 27.375 0.75 28.125 1.875 28.125H7.5C8.625 28.125 9.375 27.375 9.375 26.25ZM7.6875 42.1875L11.625 38.25C12.375 37.5 13.5 37.5 14.25 38.25C15 39 15 40.125 14.25 40.875L10.3125 44.8125C9.9375 45.1875 9.375 45.375 9 45.375C8.625 45.375 8.0625 45.1875 7.6875 44.8125C6.9375 44.0625 6.9375 42.9375 7.6875 42.1875ZM26.25 43.125C25.125 43.125 24.375 43.875 24.375 45V50.625C24.375 51.75 25.125 52.5 26.25 52.5C27.375 52.5 28.125 51.75 28.125 50.625V45C28.125 43.875 27.375 43.125 26.25 43.125ZM38.25 40.875C37.5 40.125 37.5 39 38.25 38.25C39 37.5 40.125 37.5 40.875 38.25L44.8125 42.1875C45.5625 42.9375 45.5625 44.0625 44.8125 44.8125C44.4375 45.1875 43.875 45.375 43.5 45.375C43.125 45.375 42.5625 45.1875 42.1875 44.8125L38.25 40.875ZM50.625 24.375H45C43.875 24.375 43.125 25.125 43.125 26.25C43.125 27.375 43.875 28.125 45 28.125H50.625C51.75 28.125 52.5 27.375 52.5 26.25C52.5 25.125 51.75 24.375 50.625 24.375ZM40.875 14.25C40.5 14.625 40.125 14.8125 39.5625 14.8125C39 14.8125 38.625 14.625 38.25 14.25C37.5 13.5 37.5 12.375 38.25 11.625L42.1875 7.6875C42.9375 6.9375 44.0625 6.9375 44.8125 7.6875C45.5625 8.4375 45.5625 9.5625 44.8125 10.3125L40.875 14.25Z\"/>\n" +
            "                    </svg>";
        case 'Clouds': return "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.6645 2.09302C11.8271 2.09302 8.73754 5.16395 8.73754 8.92613C8.73754 9.571 8.82781 10.1937 8.99621 10.7834C9.68997 10.9837 10.3394 11.2868 10.9262 11.675C11.4083 11.9938 11.5405 12.6431 11.2217 13.1252C10.9028 13.6072 10.2535 13.7395 9.77148 13.4206C9.24011 13.0692 8.63606 12.817 7.986 12.6909L7.98596 12.6909C7.67648 12.6308 7.35579 12.5992 7.02657 12.5992C4.29014 12.5992 2.09302 14.7881 2.09302 17.4624C2.09302 20.1366 4.29014 22.3256 7.02657 22.3256C7.60454 22.3256 8.07308 22.7941 8.07308 23.3721C8.07308 23.9501 7.60454 24.4186 7.02657 24.4186C3.15762 24.4186 0 21.3158 0 17.4624C0 13.689 3.02773 10.6354 6.78629 10.5102C6.6931 9.99565 6.64451 9.46623 6.64451 8.92613C6.64451 3.98471 10.6946 0 15.6645 0C20.0711 0 23.7522 3.13075 24.5322 7.28549C27.7414 8.64768 30 11.8037 30 15.4924C30 16.0704 29.5315 16.5389 28.9535 16.5389C28.3755 16.5389 27.907 16.0704 27.907 15.4924C27.907 12.511 25.9685 9.96401 23.2499 9.03438C22.5402 8.79169 21.777 8.65937 20.98 8.65937C20.1671 8.65937 19.3891 8.79709 18.6675 9.04919C18.1218 9.2398 17.525 8.95199 17.3344 8.40636C17.1438 7.86072 17.4316 7.26387 17.9772 7.07326C18.918 6.74461 19.9291 6.56634 20.98 6.56634C21.3924 6.56634 21.7985 6.59379 22.1967 6.64698C21.247 3.99949 18.6867 2.09302 15.6645 2.09302ZM20.3156 16.0465C17.9803 16.0465 16.1793 17.8326 16.1793 19.9247C16.1793 20.2145 16.2131 20.4962 16.2771 20.7671C16.6847 20.899 17.069 21.0808 17.422 21.3052C17.9097 21.6153 18.0536 22.2621 17.7435 22.7498C17.4334 23.2375 16.7866 23.3815 16.2989 23.0714C15.9923 22.8764 15.6419 22.7353 15.2627 22.6644C15.0818 22.6307 14.894 22.6129 14.701 22.6129C13.0812 22.6129 11.8605 23.8477 11.8605 25.2599C11.8605 26.6722 13.0812 27.907 14.701 27.907H23.7707C26.1062 27.907 27.907 26.1209 27.907 24.0287C27.907 22.3669 26.7807 20.9073 25.1394 20.3678L25.1393 20.3677C24.7128 20.2274 24.2527 20.1505 23.7707 20.1505C23.2791 20.1505 22.8102 20.2305 22.3764 20.3762C21.8285 20.5603 21.2352 20.2653 21.0511 19.7174C20.8671 19.1695 21.162 18.5762 21.7099 18.3921C22.357 18.1748 23.0509 18.0575 23.7707 18.0575C23.8278 18.0575 23.8847 18.0582 23.9414 18.0597C23.2455 16.874 21.9018 16.0465 20.3156 16.0465ZM26.3938 18.6114C25.7638 15.9131 23.2489 13.9535 20.3156 13.9535C16.9263 13.9535 14.0863 16.5772 14.0863 19.9247C14.0863 20.1367 14.0979 20.3462 14.1204 20.5527C11.7081 20.8269 9.76744 22.7878 9.76744 25.2599C9.76744 27.9275 12.0272 30 14.701 30H23.7707C27.1602 30 30 27.3762 30 24.0287C30 21.6038 28.5015 19.5514 26.3938 18.6114Z\" />\n" +
            "</svg>\n";
    }
}

async function getImg(city, card) {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 07QWdHqEeolENxM5x5CzSfc1PvlecwBUr66oyfb04dtYkxmvFtKbTEJNPBqM");
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
        "data": {
            "q": city +' город',
            "domain": "google.com",
            "lang": "ru",
            "device": "desktop",
            "serp_type": "image",
            "loc": "Alba,Texas,United States",
            "loc_id": "1026201",
            "verbatim": "0",
            "gfilter": "0",
            "page": "0",
            "num_result": "10"
        }
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch("https://api.serphouse.com/serp/live", requestOptions)
    let data = await response.json()
    console.log(data)
    card.style.backgroundImage = `url(${data.results.results[Math.floor(Math.random() * 6)].original})`
}

setInterval(function (){
    update()
},10000)

function update(){
    let btnsDelete = document.querySelectorAll('.btnDelete')
    btnsDelete.forEach(btn=>{
        btn.addEventListener('click', function (){
            this.parentElement.parentElement.remove()
            localStorage.setItem('weather', container.innerHTML)
        })
    })
    document.querySelectorAll('.city').forEach(async card=>{
        let cityName = card.querySelector('.cityName').innerHTML
        let weather = card.querySelector('.weather')
        let temp = card.querySelector('.temp')
        let feelsLike = card.querySelector('.feelsLike')
        let icon = card.querySelector('.icon')
        let time = card.querySelector('.time')
        let speed = card.querySelector('.speed')
        let percents = card.querySelector('.percents')
        const response = await fetch(`${api}&appid=${token}&q=${cityName}`)
        let data = await response.json()
        if (data.cod!==200){
            city.value=""
            city.setAttribute('placeholder', 'Что-то пошло не так')
        }
        else{
            icon.innerHTML = getIcon(data.weather[0].main)
            weather.innerHTML = data.weather[0].description
            temp.innerHTML = Math.round(data.main.temp) + '°'
            feelsLike.innerHTML = 'Ощущается как ' + Math.round(data.main.feels_like) + '°'
            speed.innerHTML = Math.round(data.wind.speed) + ' м/с'
            percents.innerHTML = data.main.humidity + '%'
            curtime = new Date()
            localTime = new Date(curtime - -(data.timezone + curtime.getTimezoneOffset()*60)*1000 )
            time.innerHTML = `${localTime.getHours()}:${localTime.getMinutes().toString().padStart(2,"0")}`
            card.querySelector('.degWind').style.transform = `rotate(${data.wind.deg}deg)`
            localStorage.setItem('weather', container.innerHTML)
        }
    })
}


function DragDrop(){
    const draggables = document.querySelectorAll('.cell')
    draggables.forEach(draggable => {
        draggable.draggable = true
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        })

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
            localStorage.setItem('weather', container.innerHTML)
        })
    })
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientX, e.clientY)
        const draggable = container.querySelector('.dragging')
        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }
    })

    function getDragAfterElement(container, x, y) {
        const draggableElements = [...container.querySelectorAll('.cell')]
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offsetX = x - box.left - box.width/2
            const offsetY = y - box.top - box.height 
            if ( offsetY < 0 && offsetY > closest.offsetY && 
                 offsetX < 0 && offsetX > closest.offsetX 
            ) {
                return { offsetY: offsetY, offsetX: offsetX, element: child }
            } else {
                return closest
            }
        }, { offsetY: Number.NEGATIVE_INFINITY, offsetX: Number.NEGATIVE_INFINITY }).element
    }
}






