SyntaxHighlighter.all();

$(function () {
    $('#performancechart').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Comparison of Xodus, Oracle Berkeley DB JE, MapDb, Chronicle Map and H2 MVStore'
        },
        xAxis: {
            categories: ['Random read', 'Successive read', 'Random Write', 'Successive write'],
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
            name: 'Xodus Patricia',
            data: [1.151, 0.273, 1.573, 0.670]
        }, {
            name: 'Xodus BTree',
            data: [2.200, 0.098, 2.009, 0.542]
        }, {
            name: 'Berkeley DB JE BTree',
            data: [3.288, 1.251, 5.937, 3.416]
        }, {
            name: 'MapDB TreeMap',
            data: [7.162, 0.121, 9.252, 11.357]
        }, {
            name: "Chronicle Map",
            data: [0.536, 0.093, 0.807, 0.705]
        }, {
            name: "H2 MVStore Map",
            data: [13.140, 0.105, 1.831, 0.479]
        }]
    });
});
