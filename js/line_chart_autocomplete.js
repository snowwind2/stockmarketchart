let list = JSON.parse(localStorage.getItem('list'));;
let n = list.length;

//autocomplete func adapted from: https://www.geeksforgeeks.org/javascript-auto-complete-suggestion-feature/
function autoComplete(value) {
    document.getElementById('datalist').innerHTML = '';
    //setting datalist empty at the start of function 

    //input query length 
    for (let i = 0; i < n; i++) {
        if (((list[i].toLowerCase()).indexOf(value.toLowerCase())) > -1) {
            //if input string in list[i] string 

            const node = document.createElement("option");
            const val = document.createTextNode(list[i]);
            node.appendChild(val);

            document.getElementById("datalist").appendChild(node);
            //create and append new elements from list 
        }
    }
} 

//selected from search input
let inputStock;

function clickedInput() {
    inputStock = document.getElementById('inputStock').value.toUpperCase();
    console.log(inputStock);
    localStorage.setItem('stock', JSON.stringify(inputStock));
    window.location.href = "index.html";
}

document.getElementById('searchSubmit').addEventListener('click', clickedInput);

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