/* auto complete */
let allCompanies;
let list;
let n;

//Fetching companies list
requestCompanies('GET', '/data/sample.json')
    .then((response) => {
        const data = JSON.parse(response.target.responseText);
        allCompanies = data.companies;
        //All companies
        list = allCompanies.map(function (obj) {
            if(obj.ticker != null || undefined){return obj.ticker;}else{return ''}
        });
        localStorage.setItem('list', JSON.stringify(list));
        n = list.length;
        console.log(list);
        $(function () {
            var availableTags = [...list];
            $("#inputStock").autocomplete({
                source: availableTags
                
            });
        });
    }).catch()


function requestCompanies(method, url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();

    });

}
