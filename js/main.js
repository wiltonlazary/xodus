SyntaxHighlighter.all();

$(function () {
    $('#performancechart').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Comparison of Xodus, Oracle Berkeley DB JE and MapDB'
        },
        xAxis: {
            categories: ['Successive write', 'Random Write', 'Successive read', 'Random read'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Seconds to Pass Test'
            },
            labels: {
                enabled: false
            },
            gridLineColor: 'white'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: 35,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        colors: ['red', '#434348', 'lightgray', '#f7a35c', '#8085e9',
            '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
        series: [{
            name: 'Xodus BTree',
            data: [0.797, 2.275, 0.128, 2.625]
        }, {
            name: 'Xodus Patricia',
            data: [0.801, 1.666, 0.307, 1.319]
        }, {
            name: 'Berkeley DB JE BTree',
            data: [3.942, 6.544, 1.728, 3.411]
        }, {
            name: 'MapDB TreeMap',
            data: [27.019, 22.159, 0.293, 6.897]
        }]
    });
});
