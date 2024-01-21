let searchButton = document.querySelector("#search");
let codeInput = document.querySelector("#code");

searchButton.addEventListener("click", () => {
    console.log("button pressed");
    console.log(`${codeInput.value}`);
    // sendApiRequest();
});
