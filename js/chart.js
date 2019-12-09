let formatUnit = 'B';
let formatUnitLabel = '($bln)';
let formatYLabel = 1000000000;

var options = {
    chart: {
        height: 250,
        width: 400,
        type: 'bar',
    },
    colors: ['#00b8e6'],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '85%',
            endingShape: 'flat',
            dataLabels: {
                position: 'top'
            },
            colors: {
                ranges: [
                    {
                        from: -999999999999,
                        to: 0,
                        color: '#F15B46'
                    },
                    {
                        from: 0,
                        to: 999999999999,
                        color: '#00b8e6'
                    }
                ]
            },
        }
    },
    dataLabels: {
        enabled: true,
        position: 'top',
        formatter: function (y) {
            return (y / formatYLabel).toFixed(2) + formatUnit;
        },
        textAnchor: 'middle',
        offsetX: 0,
        offsetY: 0,
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
                return (y/formatYLabel).toFixed(2) + formatUnit;
            }
        }

    },
    xaxis: {
        // TODO: uncomment below and fix the error
       // type: 'datetime',
        categories: [
            '2015', '2016', '2017', '2018', '2019'],
        labels: {
            rotate: -90
        }
    },
    tooltip: {
    }
}

function clickedLine() {
    window.location.href = "line_chart.html";
}

document.getElementById('lineChart').addEventListener('click', clickedLine);