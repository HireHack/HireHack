const apiUrl = 'https://www.themuse.com/api/public/jobs?page=1'
  
const getDataInfo = (url) => {
    axios
        .get(url)
        .then((response) => {
            //console.log(response.data.results)
            const generalData = response.data
            console.log(generalData.results)

            //LOCATION
            const location = Object.values(generalData['results']).map((jobLocation) => jobLocation['locations'])
            //console.log (location)
            const defLocations = location.map((jl) => jl['0'])
            //console.log(defLocations)
            const xAxis = defLocations.map((jl) => jl['name'])
            console.log(xAxis)

            const remoteLength = xAxis.filter(place => place === 'Flexible / Remote').length
            console.log (remoteLength)
            
            
            //CATEGORIES
            const yAxis = Object.values(generalData['results']).map((jobName) => jobName['name'])
            console.log(yAxis)


            paintData(remoteLength, xAxis.length-remoteLength)

        })
        .catch((e)=> console.log(e))
}

const paintData = (remoteLength, noRemoteLength) => {
    const ctx = document.getElementById('circleGraphic').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Remote', 'No remote'], 
            datasets: [{
                data: [remoteLength, noRemoteLength],
                backgroundColor: ['red', 'blue'],
            }]
        }, 
    })
}

getDataInfo(apiUrl)
