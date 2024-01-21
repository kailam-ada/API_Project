let searchButton = document.querySelector("#search");
// let codeInput = document.querySelector("#code");
let postCodeInput = document.querySelector("#postCode");
let contentDiv = document.querySelector("#content");

searchButton.addEventListener("click", () => {
    // console.log("button pressed");
    // console.log(`${codeInput.value}`);
    console.log(`${postCodeInput.value}`);
    // sendApiRequest();
    postCodeToInsee();
});


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

