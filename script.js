let searchButton = document.querySelector("#search");
let codeInput = document.querySelector("#code");
let contentDiv = document.querySelector("#content");

searchButton.addEventListener("click", () => {
    console.log("button pressed");
    console.log(`${codeInput.value}`);
    sendApiRequest();
});

async function sendApiRequest() {
    try {
        let response = await fetch(`https://www.georisques.gouv.fr/api/v1/gaspar/risques?code_insee=${codeInput.value}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log( data);
        useApiData(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function useApiData(data){
    contentDiv.innerHTML += `<p>Code Insee : ${data.data[0].code_insee}</p>`
    contentDiv.innerHTML += `<p>Commune : ${data.data[0].libelle_commune}</p>`
    let risquesDetailsArray = data.data[0].risques_detail;
    risquesDetailsArray.forEach(risqueDetail => {
        let libelleRisqueLong = risqueDetail.libelle_risque_long;
        
        // Display or do something with libelleRisqueLong
        contentDiv.innerHTML += `<p>${libelleRisqueLong}</p>`;
    });
}

// Assuming 'data' is the response data structure

// Assuming 'contentDiv' is the HTML element where you want to display the results

// Clear the contentDiv before displaying new data
contentDiv.innerHTML = "";

// Iterate over the array and display libelle_risque_long values
