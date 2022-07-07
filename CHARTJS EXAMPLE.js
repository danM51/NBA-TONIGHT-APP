const getData = async ()=>{
  let response = await fetch('data.csv');
  let data = await response.text();
//   console.log(data);
  const table = data.split('\n').slice(1);

    table.forEach(row =>{
        let column = row.split(',');
        let year = column[0];
        xLabels.push(year);
        let temp = column[1];
        yTemp.push(temp);
        console.log(year,temp);
        year;
        temp; 
    });

 }

 let xLabels = [];
 let yTemp = [];

async function chartIt() {
await getData();
const ctx = document.getElementById('chart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xLabels,
        datasets: [{
            label: 'Global Temperature since 2003',
            data: yTemp,
            // data:getData(),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks:{
                    callback:function(value, index, ticks){
                        return value + '˚';
                    }
                }
            }
        }
    }
});
}
 chartIt();

