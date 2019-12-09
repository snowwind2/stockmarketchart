/* Line Charts */
//getelementbyID functions
const elem = (i) => document.getElementById(i);
const addEvent = (i, ac, funcID) => elem(i).addEventListener(ac, funcID);
const addClass = (i, className) => elem(i).classList.add(className);
const removeClass = (i, className) => elem(i).classList.remove(className);

const salesData = JSON.parse(localStorage.getItem('salesData'));
const incomeData = JSON.parse(localStorage.getItem('incomeData'));
const epsData = JSON.parse(localStorage.getItem('epsData'));
const assetsData = JSON.parse(localStorage.getItem('assetsData'));
const liabilitiesData = JSON.parse(localStorage.getItem('liabilitiesData'));
let stockPrice = JSON.parse(localStorage.getItem('stockPrice'));
const securityTicker = JSON.parse(localStorage.getItem('securityTicker'));
const securityName = JSON.parse(localStorage.getItem('securityName'));
const stockPrev = JSON.parse(localStorage.getItem('stockHist'));
const currentStock = JSON.parse(localStorage.getItem('currentStock'));
const stockChange = JSON.parse(localStorage.getItem('stockChange'));
const lastUpdate = JSON.parse(localStorage.getItem('lastUpdate'));
let stockLive;
let api_key = {
    key: "OjUyZTBmZTY0MzJkYjQ2ZDdiZDNmY2NlZTYyOTI2M2U4"
}

let dataBinds = [salesData, incomeData, epsData, assetsData, liabilitiesData];
let labels = ['Sales', 'Income', 'EPS', 'Assets', 'Liabilities'];
let renderBinds = ['chart1', 'chart2', 'chart3', 'chart4', 'chart5'];
let titleBinds = ['title1', 'title2', 'title3', 'title4', 'title5'];

var options = {
    chart: {
        height: 250,
        width: 400,
        type: 'line'
    },
    stroke: {
        curve: 'smooth'
    },
    colors: ['#00b8e6'],
    dataLabels: {
        enabled: true,
        textAnchor: 'start',
        position: 'top',
        formatter: function (y) {
            return (y / 1000000000).toFixed(2);
        },
        style: {
            colors: ['#000000'],
            margin: {
                left: 0,
                right: 100,
                top: 0,
                bottom: 0
            }
        }
    },
    series: [{
        name: 'Value',
        data: [1.45, 5.42, 5.9, 0.42, 0.6]
    }],

    yaxis: {
        title: {
            text: '',
        },
        labels: {
            formatter: function (y) {
                return (y / 1000000000).toFixed(2);
            }
        }

    },
    xaxis: {
        // TODO: uncomment below and fix the error
        // type: 'datetime',
        categories: [
            '2015','2016', '2017', '2018', '2019'],
        labels: {
            rotate: -90
        }
    },
    markers: {
        size: 5
    },
    tooltip: {
    }
}

for(let i=0; i<5; i++){

    options.series = [{
        name: 'Value',
        data: dataBinds[i]
    }];
    if (i == 2) {
        let epsSeries = [...epsData];
        epsSeries = epsSeries.map((x) => x * 1000000000);
        options.series = [{
            name: 'Value',
            data: epsSeries
        }];
    }
    renderBinds[i] = new ApexCharts(document.querySelector('#' + renderBinds[i]), options);
    if (i == 2) {
        elem(titleBinds[i]).innerHTML = labels[i];
    } else {
        elem(titleBinds[i]).innerHTML = labels[i] + ' ' + '($bln)';
    }
    renderBinds[i].render();
    console.log(dataBinds[i]);
}

function clicked() {

    window.location.href = "index.html";
}

document.getElementById('barChart').addEventListener('click', clicked);
if ((stockPrice - stockPrev) < 0) {
    removeClass('priceChange', 'green');
    addClass('priceChange', 'red');
    elem("priceChange").innerHTML = stockChange;
    elem('arrow').innerHTML = '<img src="img/red.png" height="15" width="15"></img>';
} else {
    removeClass('priceChange', 'red');
    addClass('priceChange', 'green');
    elem("priceChange").innerHTML = '+'+stockChange;
    elem('arrow').innerHTML = '<img src="img/green.png" height="15" width="15"></img>';
};
//Append stock prices
elem('price').innerHTML = stockPrice;
elem("ticker").innerHTML = securityTicker;
elem("name").innerHTML = securityName;
elem("date").innerHTML = lastUpdate;

