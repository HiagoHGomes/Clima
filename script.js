document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault(); //Previnir que o formulario seja enviado(Previne o comportamento padrão.)
    let input = document.querySelector('#searchInput').value; //Pegar o que foi digitado no input.
    if(input !== "") {
        limparInfo();
        showWarning('Buscando...')
        let URL = (`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=3ea7f27dabd8992c9e087d6950bd5a84`); //Consumir a API para pegar o clima.
        let results = await fetch(URL);
        let json = await results.json(); //Transforma o resultado em um JSON.
        console.log(json);
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                tempSen: json.main.feels_like,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                wind: json.wind.speed,
                angle: json.wind.deg,
                hora: json.timezone
            });
        }else {
            limparInfo();
            showWarning('Cidade não ecnontrada.');
        }
    }else{
        limparInfo();
    }

}); //Adiciona um evento que irá ficar de olho no que acontece.

function showInfo(json) {
    showWarning(''); //Tirar o aviso de carregando.
    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;
    document.querySelector('.tempSen').innerHTML = `${json.tempSen}<sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.wind}<span>km/h</span>`;
    document.querySelector('.tempMax').innerHTML = `${json.tempMax}<sup>ºC</sup>`;
    document.querySelector('.tempMin').innerHTML = `${json.tempMin}<sup>ºC</sup>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.angle-90}deg)`;
    function countryTime() {
        const data = { timezone: json.hora};
        document.querySelector('.time').innerHTML = moment().utcOffset(data.timezone / 60).format('HH:mm:ss');
    }
    countryTime();
    setInterval(countryTime, 1000);
};



function limparInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
};

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
};


let now = new Date(); //Pegar data completa
let hour = now.getHours(); //Pegar as horas

if (hour >=6 && hour <18) {
    //DIA
    document.querySelector('body').style.background = '#0d0e12'
    document.querySelector('body').style.backgroundImage = 'url(images/DIA1.jpg)'

}else{
    //NOITE
    document.querySelector('body').style.backgroundColor = '#000000'
    document.querySelector('body').style.backgroundImage = 'url(images/noite.jpg)'
}