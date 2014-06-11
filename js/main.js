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
        text: 'Keys per Second'
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
      data: [Math.round(1000000/0.645), Math.round(1000000/2.47), Math.round(1000000/0.347), Math.round(1000000/5.229)]
    }, {
      name: 'Xodus Patricia',
      data: [Math.round(1000000/1.855), Math.round(1000000/2.29), Math.round(1000000/0.745), Math.round(1000000/2.628)]
    }, {
      name: 'Berkeley DB JE BTree',
      data: [Math.round(1000000/5.246), Math.round(1000000/8.336), Math.round(1000000/1.027), Math.round(1000000/3.689)]
    }]
  });
});
