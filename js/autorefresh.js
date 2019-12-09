let timerId = setInterval(() => {

//Update Live Stock Price every 5 min
requestLiveData('GET', 'https://api-v2.intrinio.com/securities/' + currentStock + '/prices/realtime?api_key={' + api_key.key + '}')
    .then((response) => {
        const data = JSON.parse(response.target.responseText);
        stockPrice = data.last_price;
        stockLive = stockPrice;

        let displayPrice = stockLive;
        let displayChange = (stockLive - stockPrev).toFixed(2) + '(' + ((stockLive - stockPrev) / stockPrev).toFixed(4) + ' % ' + ')';
        document.getElementById('price').innerHTML = displayPrice;
        if ((stockLive - stockPrev) < 0) { 
            removeClass('priceChange', 'green');
            addClass('priceChange', 'red');
            elem("priceChange").innerHTML = displayChange;
            elem('arrow').innerHTML = '<img src="img/red.png" height="15" width="15"></img>';
        } else { 
            removeClass('priceChange', 'red');
            addClass('priceChange', 'green')
            elem("priceChange").innerHTML = '+' + displayChange;
            elem('arrow').innerHTML = '<img src="img/green.png" height="15" width="15"></img>';
        };
        localStorage.setItem('stockPrice', JSON.stringify(displayPrice));
        localStorage.setItem('stockChange', JSON.stringify(displayChange));
        console.log(displayChange);

    }).catch()

function requestLiveData(method, url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();

    });

}
}, 300000); // 5 minutes