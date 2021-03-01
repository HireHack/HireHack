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

            
            //CATEGORIES
            // const yAxis = Object.values(generalData['results']).map((jobName) => jobName['name'])
            // console.log(yAxis)
            
            const yAxis = [1, 2, 4, 1, 1, 2, 4, 1, 1, 2, 4, 1, 1, 2, 4, 1, 1, 2, 4, 1, 1, 2, 4, 1]

            paintData(/*xAxis,*/ yAxis)

            // const xAxis = Object.keys(data["Time Series (Daily)"]);
            // const close = Object.values(data["Time Series (Daily)"]).map(
            // (dayData) => dayData["4. close"]
            // );
            


            // console.log(yAxis)
            // if (location.name == 'Flexible / Remote') {
            //     location.name = 'Flexible / Remote'
            //     const count = location.name
            //     //console.log(count)
            //     const xAxisData = count
            //     console.log (xAxisData)
            //     const xAxis = xAxisData.split(',')
            //     console.log (xAxis)

            //     const category = element.name
            //     //console.log (category)
            //     const yAxisData = category
            //     console.log (yAxisData)
            //     const yAxis = yAxisData.split(',')
            //     console.log (yAxis)
    
            //     paintData(xAxis, yAxis)
            // }
            //paintData(xAxis, yAxis)
        })
        .catch((e)=> console.log(e))
}

const paintData = (yAxis) => {
    const ctx = document.getElementById('circleGraphic').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bubble',
        data: {
            labels: 'Data', 
            datasets: [{
                data: yAxis,
                label: 'Jobs',
                borderColor: "green",
                backgroundColor: "transparent"
            }]
        }, 
    })
}

getDataInfo(apiUrl)
