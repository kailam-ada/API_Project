let searchButton = document.querySelector("#search");
// let codeInsee = document.querySelector("#code");
let postCodeInput = document.querySelector("#postCode");
let contentDiv = document.querySelector("#content");
let latitude = document.querySelector("#latitude");
let longitude = document.querySelector("#longitude");
let searchByLatLon = document.querySelector("#searchByLatLon");

searchButton.addEventListener("click", () => {
    console.log(`${postCodeInput.value}`);
    // sendApiRequest();
    postCodeToInsee();
});

searchByLatLon.addEventListener("click", () => {
    // alert(`${latitude.value}, ${longitude.value}`);
    fetchDataFromLatLon();
});

// Map functions

let map = L.map('map').setView([47.428, 3.757], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker = null;
map.on('click', (event)=> {

    if(marker !== null){
        map.removeLayer(marker);
    }

    marker = L.marker([event.latlng.lat , event.latlng.lng]).addTo(map);

    document.getElementById('latitude').value = event.latlng.lat;
    document.getElementById('longitude').value = event.latlng.lng;
    
})

// API functions

async function postCodeToInsee() {
    try {
        let response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${postCodeInput.value}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        let data = await response.json();
        console.log(data[0].code);
        sendApiRequest(data);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function sendApiRequest(data) {
    try {
        let response = await fetch(`https://www.georisques.gouv.fr/api/v1/gaspar/risques?code_insee=${data[0].code}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        let riskData = await response.json();
        console.log(riskData);
        useApiData(riskData, data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchDataFromLatLon() {
    try {
        let response = await fetch(`https://www.georisques.gouv.fr/api/v1/gaspar/risques?latlon=${longitude.value},${latitude.value}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let riskData = await response.json();
        console.log(riskData);
        useDataFromLatLon(riskData);
    } catch (error) {
        console.error('Error:', error);
    }
}

function useApiData(data, secondData){
    contentDiv.innerHTML = "";
    contentDiv.innerHTML += `<p>Code Insee : <span class="result">${data.data[0].code_insee}</span></p>`
    contentDiv.innerHTML += `<p>Commune : <span class="result">${data.data[0].libelle_commune}</span></p>`
    contentDiv.innerHTML += `<p>Population : <span class="result">${secondData[0].population}</span></p>`
    contentDiv.innerHTML += `<p>Risques :</p>`

    let risquesDetailsArray = data.data[0].risques_detail;

    risquesDetailsArray.forEach(risqueDetail => {
        let libelleRisqueLong = risqueDetail.libelle_risque_long;
        contentDiv.innerHTML += `<p class="result">${libelleRisqueLong}</p>`;
    });
}

function useDataFromLatLon(data){
    contentDiv.innerHTML = "";
    contentDiv.innerHTML += `<p>Code Insee : <span class="result">${data.data[0].code_insee}</span></p>`
    contentDiv.innerHTML += `<p>Commune : <span class="result">${data.data[0].libelle_commune}</span></p>`
    // contentDiv.innerHTML += `<p>Population : <span class="result">${secondData[0].population}</span></p>`
    contentDiv.innerHTML += `<p>Risques :</p>`

    let risquesDetailsArray = data.data[0].risques_detail;

    risquesDetailsArray.forEach(risqueDetail => {
        let libelleRisqueLong = risqueDetail.libelle_risque_long;
        contentDiv.innerHTML += `<p class="result">${libelleRisqueLong}</p>`;
    });
}

