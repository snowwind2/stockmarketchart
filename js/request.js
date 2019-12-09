//getelementbyID functions
const elem = (i) => document.getElementById(i);
const addEvent = (i, ac, funcID) => elem(i).addEventListener(ac, funcID);
const addClass = (i, className) => elem(i).classList.add(className);
const removeClass = (i, className) => elem(i).classList.remove(className);

let tag = ['totalrevenue', 'netincome', 'adjbasiceps', 'totalassets', 'totalliabilities'];
let labels = ['Sales', 'Income', 'EPS', 'Assets', 'Liabilities'];
let renderBinds = ['chart1', 'chart2', 'chart3', 'chart4', 'chart5'];
let titleBinds = ['title1', 'title2', 'title3', 'title4', 'title5'];
let storedData = [];
let counter = 0;
let stockPrev, stockLive, lastUpdate, firstColumnCheck, secondColumnCheck, thirdColumnCheck, fourthColumnCheck, fifthColumnCheck;
let chart2 = new ApexCharts(elem('#chart2'), options);

let data1 =[1, 5, -3, 7, 6];
let data2 = [4, -2 ,11, 8, -2];
let api_key ={
    key: "OjUyZTBmZTY0MzJkYjQ2ZDdiZDNmY2NlZTYyOTI2M2U4"
}
let currentStock = JSON.parse(localStorage.getItem('stock'))||'AAPL';

const request = new XMLHttpRequest();
let url = "https://api-v2.intrinio.com/companies/AAPL/historical_data/totalrevenue?api_key={"+api_key.key+"}";
//Fetching fundamentals with a loop request
(function loop(i, length) {
    if (i>= length) {
        return;
    }

    url = "https://api-v2.intrinio.com/companies/" + currentStock + "/historical_data/" + tag[i] + "?api_key={" + api_key.key + "}";
    
    
    request.open("GET", url);
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) { //so we can get the elements in order
            const data = JSON.parse(request.responseText);
            const historicalData = data.historical_data;
            console.log(historicalData);
            if(historicalData[0] == undefined || null){alert('No historical ' + labels[i] + ' data available for the time being.')}
            let firstColumn = historicalData.find(element => element.date.includes('2015'));//first match return last result for each year
            if (firstColumn == null || undefined || firstColumn['value']==null){
                firstColumn = {value:0};
                firstColumnCheck = undefined;
            } else { firstColumnCheck = firstColumn['value'];}; //to prevent error when rendering if there's no data for that year
            let secondColumn = historicalData.find(element => element.date.includes('2016'));
            if (secondColumn == null || undefined || secondColumn['value'] == null) { 
                secondColumn = { value: 0 }; 
                secondColumnCheck = undefined;
            } else { secondColumnCheck = secondColumn['value'];};
            let thirdColumn = historicalData.find(element => element.date.includes('2017'));
            if (thirdColumn == null || undefined || thirdColumn['value'] == null) { 
                thirdColumn = { value: 0 }; 
                thirdColumnCheck = undefined;
            }else{thirdColumnCheck = thirdColumn['value']};
            let fourthColumn = historicalData.find(element => element.date.includes('2018'));
            if (fourthColumn == null || undefined || fourthColumn['value'] == null) {
                fourthColumn = { value: 0 }; 
                fourthColumnCheck = undefined;
            } else { fourthColumnCheck = fourthColumn['value'];};
            let fifthColumn = historicalData.find(element => element.date.includes('2019'));
            if (fifthColumn == null || undefined || fifthColumn['value'] == null) { 
                fifthColumn = { value: 0 }; 
                fifthColumnCheck = undefined;
            } else { fifthColumnCheck = fifthColumn['value'];};
            let currentData = [firstColumn['value'], secondColumn['value'], thirdColumn['value']
                , fourthColumn['value'], fifthColumn['value']];
                
  
            if(firstColumnCheck == undefined) {firstColumnCheck = secondColumnCheck || fourthColumnCheck || fifthColumnCheck || thirdColumnCheck};
            if(secondColumnCheck == undefined) { secondColumnCheck = firstColumnCheck || fourthColumnCheck || fifthColumnCheck || thirdColumnCheck};
            if (thirdColumnCheck == undefined) { thirdColumnCheck = firstColumnCheck || fourthColumnCheck || fifthColumnCheck || secondColumnCheck };
            if(fourthColumnCheck == undefined) { fourthColumnCheck = secondColumnCheck || fifthColumnCheck || firstColumnCheck || thirdColumnCheck };
            if(fifthColumnCheck == undefined) { fifthtColumnCheck = secondColumnCheck || firstColumnCheck || fourthColumnCheck || thirdColumnCheck};
            if(firstColumnCheck && secondColumnCheck && thirdColumnCheck && fourthColumnCheck && fifthColumnCheck < 1000000000) {
                formatUnit = 'M'
                formatUnitLabel = '($mln)'
                formatYLabel = 1000000
            }else{
                formatUnit = 'B'
                formatUnitLabel = '($bln)'
                formatYLabel = 1000000000 
            }
            options.series = [{
                name: 'Value',
                data: currentData
            }];
            if(i==2){
                let epsSeries = [...currentData];
                if (firstColumnCheck && secondColumnCheck && thirdColumnCheck && fourthColumnCheck && fifthColumnCheck < 1000000000) {
                epsSeries = epsSeries.map((x) => x * 1000000);
                } else { epsSeries = epsSeries.map((x) => x * 1000000000)}
                options.series = [{
                    name: 'Value',
                    data: epsSeries
                }];
                formatUnit = '';
                formatUnitLabel='';
            }
            
            renderBinds[i] = new ApexCharts(document.querySelector('#' + renderBinds[i]), options);
            if(i==2){
                elem(titleBinds[i]).innerHTML = labels[i] +' (basic)';
            }else{
                elem(titleBinds[i]).innerHTML = labels[i]+' '+formatUnitLabel;
            }
            renderBinds[i].render();
            
            console.log(data.company.name);
            if(i==0){
                localStorage.setItem('salesData', JSON.stringify(currentData));
            }
            if(i==1){
                localStorage.setItem('incomeData', JSON.stringify(currentData));
            }
            if(i==2){
                localStorage.setItem('epsData', JSON.stringify(currentData));
            }
            if(i==3){
                localStorage.setItem('assetsData', JSON.stringify(currentData));
            }
            if(i==4){
                localStorage.setItem('liabilitiesData', JSON.stringify(currentData));
                localStorage.setItem('currentStock', JSON.stringify(currentStock));
                localStorage.setItem('lastUpdate', JSON.stringify(lastUpdate));
            }
            loop(i + 1, length);
        }
    }
    request.send();
})(0, tag.length);


//Fetching real time stock price
requestData('GET', 'https://api-v2.intrinio.com/securities/' + currentStock + '/prices/realtime?api_key={' + api_key.key + '}')
    .then((response) => {
        const data = JSON.parse(response.target.responseText);
        const stockPrice = data.last_price;
        const lastTime = data.last_time;
        const date = new Date(lastTime);
        console.log(date);
        const parseDate = d3.timeFormat("%b %d, %H:%M, %Z");
        lastUpdate = parseDate(date);
        console.log(stockPrice);
        stockLive = stockPrice;
        counter++;
        
        if (counter > 1) {
            let displayPrice = stockLive;
            let displayChange = (stockLive - stockPrev).toFixed(2) + '(' + ((stockLive - stockPrev) / stockPrev).toFixed(4) + ' % ' + ')';
            if ((stockLive - stockPrev)<0){
                addClass('priceChange', 'red')
                elem("priceChange").innerHTML = displayChange;
                elem('arrow').innerHTML = '<img src="img/red.png" height="15" width="15"></img>';
                }else{
                addClass('priceChange', 'green')
                elem("priceChange").innerHTML = '+'+displayChange;
                elem('arrow').innerHTML = '<img src="img/green.png" height="15" width="15"></img>';
            };
            elem('price').innerHTML = displayPrice;
            elem('date').innerHTML = lastUpdate;
            localStorage.setItem('stockPrice', JSON.stringify(displayPrice));
            localStorage.setItem('stockChange', JSON.stringify(displayChange));
            localStorage.setItem('lastUpdate', JSON.stringify(lastUpdate));
        }

}).catch()

//Fetching historical stock price
requestData('GET', 'https://api-v2.intrinio.com/securities/'+currentStock+'/prices?api_key={'+ api_key.key + '}')
    .then((response) => {
        const data = JSON.parse(response.target.responseText);
        const stockHist = data.stock_prices[0]['adj_close'];
        console.log(data.security.ticker);
        counter++;
        stockPrev = stockHist;
        let securityTicker = data.security.ticker;
        let securityName = data.security.name;
        localStorage.setItem('securityTicker', JSON.stringify(securityTicker));
        localStorage.setItem('securityName', JSON.stringify(securityName));
        localStorage.setItem('stockHist', JSON.stringify(stockHist));
        elem("ticker").innerHTML = data.security.ticker;
        elem("name").innerHTML = data.security.name;
        
        if(counter > 1){
            let displayPrice = stockLive;
            let displayChange = (stockLive - stockPrev).toFixed(2) + '(' + ((stockLive - stockPrev) / stockPrev).toFixed(4) + ' % ' + ')';
            if ((stockLive - stockPrev) < 0) {
                addClass('priceChange', 'red')
                elem("priceChange").innerHTML = displayChange;
                elem('arrow').innerHTML = '<img src="img/red.png" height="15" width="15"></img>';
            } else {
                addClass('priceChange', 'green')
                elem("priceChange").innerHTML = '+' + displayChange;
                elem('arrow').innerHTML = '<img src="img/green.png" height="15" width="15"></img>';
            };
            elem('price').innerHTML = displayPrice;
            elem('date').innerHTML = lastUpdate;
            localStorage.setItem('stockPrice', JSON.stringify(displayPrice));
            localStorage.setItem('stockChange', JSON.stringify(displayChange));
        }
        

}).catch()


function requestData(method, url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();

    });

}