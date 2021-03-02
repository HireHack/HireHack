google.load('visualization', '1', {'packages': ['geochart']});
     google.setOnLoadCallback(drawMarkersMap);

    function drawMarkersMap() {
      var data = google.visualization.arrayToDataTable([
        ["Provincia", "TasaDeParo"],
        [{v: "ES-GA", f: "Galicia"}, 12], [{v: "ES-AS", f: "Asturias"}, 14], [{v: "ES-CB", f: "Cantabria"}, 12], [{v: "ES-PV", f: "País Vasco"}, 10],
        [{v: "ES-RI", f: "La Rioja"}, 10], [{v: "ES-NC", f: "Navarra"}, 12], [{v: "ES-AR", f: "Aragón"}, 12], [{v: "ES-CT", f: "Cataluña"}, 14],
        [{v: "ES-CL", f: "Castilla y León"}, 12], [{v: "ES-MD", f: "Madrid"}, 14], [{v: "ES-CM", f: "Castilla y la Mancha"}, 17], [{v: "ES-VC", f: "Valencia"}, 16],
        [{v: "ES-EX", f: "Extremadura"}, 21], [{v: "ES-MC", f: "Murcia"}, 15], [{v: "ES-AN", f: "Andalucía"}, 23], [{v: "ES-CN", f: "Islas Canarias"}, 26], [{v: "ES-IB", f: "Islas Baleares"}, 17]
     ]);
        

      var options = {
        region: 'ES',
        resolution: 'provinces',
        enableRegionInteractivity: 'true',
        colorAxis: {
          values: [10, 12, 14, 15, 16, 17, 21, 23, 25],
          colors: ['#6A20EC', '#2045EC', '#20BBEC', '#20ECD0', '#20EC95', '#5BEC20', '#DDEC20', '#ECB120', '#e31b23'],
        },
        // backgroundColor: '#81d4fa',
        // datalessRegionColor: '#BBB9B2',
        // defaultColor: '#f5f5f5',
    };

      var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
  chart.draw(data, options);
};