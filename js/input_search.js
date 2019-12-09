//selected from search input
let inputStock;

function clicked() {
    inputStock = document.getElementById('inputStock').value.toUpperCase();
    console.log(inputStock);
    localStorage.setItem('stock', JSON.stringify(inputStock));
    window.location.href = "index.html";
}

document.getElementById('searchSubmit').addEventListener('click', clicked);

let input = document.getElementById("inputStock");
// trigger submit button when pressing enter key
input.addEventListener("keyup", function (event) {
    // 13 = enter key
    if (event.keyCode === 13) {
        // cancel default action
        event.preventDefault();
        // trigger button element
        document.getElementById("searchSubmit").click();
    }
});