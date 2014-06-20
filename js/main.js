SyntaxHighlighter.all();

$(function () {
  $('#performancechart').highcharts({
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Xodus vs Oracle Berkeley DB JE'
    },
    xAxis: {
      categories: [ 'Successive write', 'Random Write', 'Successive read', 'Random read' ],
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
      data: [1.463, 3.270, 0.397, 8.096]
    }, {
      name: 'Xodus Patricia',
      data: [1.528, 2.701, 0.732, 3.625]
    }, {
      name: 'Berkeley DB JE BTree',
      data: [6.994, 9.910, 1.988, 5.551]
    }]
  });
});
