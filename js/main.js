SyntaxHighlighter.all();

$(function () {
    $('#performancechart').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Comparison of Xodus, Oracle Berkeley DB JE, MapDB and Chronicle Map'
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
            data: [0.691, 2.208, 0.087, 2.301]
        }, {
            name: 'Xodus Patricia',
            data: [0.769, 1.667, 0.271, 1.189]
        }, {
            name: 'Berkeley DB JE BTree',
            data: [3.441, 5.844, 1.252, 3.208]
        }, {
            name: 'MapDB TreeMap',
            data: [26.588, 21.822, 0.274, 6.705]
        }, {
            name: "Chronicle Map",
            data: [1.184, 1.238, 0.098, 0.829]
        }]
    });
});
