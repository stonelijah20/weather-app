let print = document.querySelector('#prt');
let weatherBtn = document.querySelector('#weatherbtn');
let tempLocation = document.querySelector('.temp-location');
let degree = document.querySelector('.degree')
let description = document.querySelector('.description')
let getImg = document.querySelector('img')



let geoLocation = () => {
    if(navigator.geolocation){
        navigator.geolocation.watchPosition(showPosition)
    }else{
        print.textContent = 'Brower not supported'
    }
}

let showPosition = (position) => {
    let lat= position.coords.latitude
    let long= position.coords.longitude
    let apiKey = '8203f019295871c12ad82636338b2ade'
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`)
    .then(response => response.json()).then(data => {
        console.log(data)
        const {temp} = data.main
        tempLocation.innerHTML = `${data.sys.country}/${data.name}`;
        degree.innerHTML = temp;
        let capitalize = data.weather[0].main.split(' ')
        let dArr = []
        for (let i = 0; i < capitalize.length; i++){
            let cap = capitalize[i].charAt(0).toUpperCase() + capitalize[i].slice(1)
            dArr.push(cap)
        }
        let weatherDescription = dArr.join(' ')
        description.innerHTML = weatherDescription
        switch (description.innerHTML) {
            case 'Clouds':
                getImg.src='clouds-removebg-preview.png'
                break;
            case 'Clear':
                getImg.src='clear-removebg-preview.png'
                break;
            case 'Rain':
                getImg.src='rainm-removebg-preview.png'
                break;
            case 'Drizzle':
                getImg.src='drizzle-removebg-preview.png'
                break;
            case 'Thunderstorm':
                getImg.src='thunderstorm-removebg-preview.png'
                break;
            default:
                getImg.src='atmosphere-removebg-preview.png'
                break;
        }
        
    })
}
window.addEventListener('load', geoLocation)


let today = new Date();
let time = `${today.getHours()}:${today.getMinutes()}`

if (today.getHours() >= 18 && today.getHours() < 6){
    document.body.style.background = 'linear-gradient(rgb(41, 44, 44), rgb(48, 62,143))'
}else if (today.getHours() < 18){
    document.body.style.background = 'linear-gradient(rgb(47, 150, 163), rgb(48, 62,143))'
}