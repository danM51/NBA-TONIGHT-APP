// import top20players from './data'
// import {top20players} from "./data";
// named imports are the way, here is how you do it! just also make sure it matches a named export 
import {top20players} from "./data.mjs";
//  const topPlayer = import ('./data');
// first input 
// import { } from "./data";

const singlePlayerStatInput = document.getElementById('playerSort');
const singlePlayerStatInputOptions = document.getElementById('playersSort');
// second input {comparison} 
const firstPComparisonStatInput = document.getElementById('playerSort1');
const secondPComparisonStatInput = document.getElementById('playerSort2');

// Inputs changes/updates these things >>
// player Details Name/Number/Team
const playerFirstName = document.getElementById('playerFname');
const playerLastName = document.getElementById('playerLname');
const playerPosition = document.getElementById('playerPosition');
const playerTeam = document.getElementById('playerTeam');

// the players stats 
const pts = document.getElementById('pts');
const reb = document.getElementById('reb');
const fgPercentage = document.getElementById('fg%');
const threePointPercentage = document.getElementById('3p%');
const ftPercentage= document.getElementById('ft%');
const minPlayed = document.getElementById('minPlayed');
// the chart

// retrieve data from APi 

// console.log(playerData);

// figured out that on an eventlistener 

 const singleInput = singlePlayerStatInput.addEventListener('change', ()=>{
    //  singlePlayerStatInput.value

    // we can filter through the players via the search parameter ... where the input value 
     const playerData = `https://www.balldontlie.io/api/v1/players/?search=${singlePlayerStatInput.value}`;
    
        const   getPlayerData = async ()=>{
            try {
                console.log('trying to retrieve data')

                const response = await fetch(playerData) ;
                const player = await  response.json();
                //    saving player information/data in accessible variable 
                const firstName = player.data[0].first_name;
                const lastName = player.data[0].last_name;
                const position = player.data[0].position;
                const team = player.data[0].team.abbreviation;
                // displaying accessible data to the DOM/frontend/user
                playerFirstName.textContent = `${firstName.toUpperCase()}`;
                playerLastName.textContent = `${lastName.toUpperCase()}`;
                playerPosition.textContent = `${position.toUpperCase()}`;
                playerTeam.textContent = `${team.toUpperCase()}`;
                console.log(player);
                try{
                    
                    const playerStatData = `https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${player.data[0].id}`
                    // add beginning season quesry search parrameter becuase it is currently giving me every game stats
                    // https://www.balldontlie.io/api/v1/stats?player_ids[]=237&per_page=5   <--this is the correct stats from specific season 
                    // "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=237"  <--this is the season average for player id; return one object for up to date average 
                    const getPlayerStatData = async ()=>{
                        try {
                            console.log('trying to retrieve player stat data')
                    
                            const response = await fetch(playerStatData);
                            const stats = await response.json();
                            
                            console.log(stats)
                            //    saving player stat/data in accessible variable 
                            const stat_pts = stats.data[0].pts;
                            const stat_reb = stats.data[0].reb;
                            const stat_fgPct = stats.data[0].fg_pct;
                            const stat_3ptPct = stats.data[0].fg3m;
                            const stat_ftPct = stats.data[0].ft_pct;
                            const minPlayedStat = stats.data[0].min;
                            // displaying accessible stat-data to the DOM/frontend/user
                            pts.textContent = stat_pts;
                            reb.textContent = stat_reb;
                            fgPercentage.textContent = stat_fgPct;
                            threePointPercentage.textContent = stat_3ptPct;
                            ftPercentage.textContent = stat_ftPct;
                            minPlayed.textContent = minPlayedStat;
                            try {
                                 const chartIt = async () =>{
                                await getPlayerData();
                                const ctx = document.getElementById('myChart');
                                    
                                const myChart = new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels: ['PTS', 'REB', 'FG%', '3P%', 'FT%'],
                                    datasets: [{
                                        label: `season stats of ${firstName}, ${lastName}`,
                                        data: [stat_pts, stat_reb, stat_fgPct, stat_3ptPct, stat_ftPct],
                                        backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                        ],
                                        borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                        ],
                                        borderWidth: 1
                                    }]
                                },
                                options: {
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    }
                                }
                                
                                
                            });
                        
                          return  myChart;
                        
    }
    chartIt();
                            } catch (error) {
                                console.log("ooh,oh can't find new chart data")
                            }
                        } catch (error) {
                            console.log('cant retrieve stat DATA!')
                        }
                    }
                    console.log(getPlayerStatData());

                }catch{
                    console.log('cant access/connect player STATs API')
                }
                
            } catch (error) {
                console.log('error 404, can not find data');
            }

        }   
        
    console.log(getPlayerData());
})





const player1FName = document.getElementById('player1FName');
const player1LName = document.getElementById('player1LName');
const Player1Position = document.getElementById('player1Position');
const player1Team = document.getElementById('player1Team');
// player 2
const player2FName = document.getElementById('player2FName');
const player2LName = document.getElementById('player2LName');
const Player2Position = document.getElementById('player2Position');
const player2Team = document.getElementById('player2Team');

 const firstComparisonInputs = firstPComparisonStatInput.addEventListener('change', ()=>{
    //  singlePlayerStatInput.value

    // we can filter through the players via the search parameter ... where the input value 
     const playerData = `https://www.balldontlie.io/api/v1/players/?search=${firstPComparisonStatInput.value}`;
    
        const   getPlayerData = async ()=>{
            try {
                console.log('trying to retrieve data')

                const response = await fetch(playerData);
                const playerOne = await  response.json();
                //    saving player information/data in accessible variable 
                const firstName = playerOne.data[0].first_name;
                const lastName = playerOne.data[0].last_name;
                const position = playerOne.data[0].position;
                const team = playerOne.data[0].team.abbreviation;
                // displaying accessible data to the DOM/frontend/user
                player1FName.textContent = `${firstName.toUpperCase()}`;
                player1LName.textContent = `${lastName.toUpperCase()}`;
                Player1Position.textContent = `${position.toUpperCase()}`;
                player1Team.textContent = `${team.toUpperCase()}`;
                console.log(playerOne);
                try{
                    
                    const playerStatData = `https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${player.data[0].id}`
                    // add beginning season quesry search parrameter becuase it is currently giving me every game stats
                    // https://www.balldontlie.io/api/v1/stats?player_ids[]=237&per_page=5   <--this is the correct stats from specific season 
                    // "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=237"  <--this is the season average for player id; return one object for up to date average 
                    const getPlayerStatData = async ()=>{
                        try {
                            console.log('trying to retrieve player stat data')
                    
                            const response = await fetch(playerStatData);
                            const stats = await response.json();
                            
                            console.log(stats)
                            //    saving player stat/data in accessible variable 
                            const stat_pts = stats.data[0].pts;
                            const stat_reb = stats.data[0].reb;
                            const stat_fgPct = stats.data[0].fg_pct;
                            const stat_3ptPct = stats.data[0].fg3m;
                            const stat_ftPct = stats.data[0].ft_pct;
                            const minPlayedStat = stats.data[0].min;
                            // displaying accessible stat-data to the DOM/frontend/user
                            
                    //         try {
                    //              const chartIt = async () =>{
                    //             await getPlayerData();
                    //             const ctx = document.getElementById('myChart');
                                    
                    //             const myChart = new Chart(ctx, {
                    //             type: 'line',
                    //             data: {
                    //                 labels: ['PTS', 'REB', 'FG%', '3P%', 'FT%'],
                    //                 datasets: [{
                    //                     label: `season stats of ${firstName}, ${lastName}`,
                    //                     data: [stat_pts, stat_reb, stat_fgPct, stat_3ptPct, stat_ftPct],
                    //                     backgroundColor: [
                    //                     'rgba(255, 99, 132, 0.2)',
                    //                     'rgba(54, 162, 235, 0.2)',
                    //                     'rgba(255, 206, 86, 0.2)',
                    //                     'rgba(75, 192, 192, 0.2)',
                    //                     'rgba(153, 102, 255, 0.2)',
                    //                     'rgba(255, 159, 64, 0.2)'
                    //                     ],
                    //                     borderColor: [
                    //                     'rgba(255, 99, 132, 1)',
                    //                     'rgba(54, 162, 235, 1)',
                    //                     'rgba(255, 206, 86, 1)',
                    //                     'rgba(75, 192, 192, 1)',
                    //                     'rgba(153, 102, 255, 1)',
                    //                     'rgba(255, 159, 64, 1)'
                    //                     ],
                    //                     borderWidth: 1
                    //                 }]
                    //             },
                    //             options: {
                    //                 scales: {
                    //                     y: {
                    //                         beginAtZero: true
                    //                     }
                    //                 }
                    //             }
                                
                                
                    //         });
                    //         myChart;
                    // }
                    // return chartIt();
                    //         } catch (error) {
                    //             console.log("ooh,oh can't find new chart data")
                    //         }
                        } catch (error) {
                            console.log('cant retrieve stat DATA!')
                        }
                    }
                    console.log(getPlayerStatData());

                }catch{
                    console.log('cant access/connect player STATs API')
                }
                
            } catch (error) {
                console.log('error 404, can not find data');
            }

        }   
        
    console.log(getPlayerData());
})
 const secondComparisonInputs = secondPComparisonStatInput.addEventListener('change', ()=>{
    //  singlePlayerStatInput.value

    // we can filter through the players via the search parameter ... where the input value 
     const playerData = `https://www.balldontlie.io/api/v1/players/?search=${secondPComparisonStatInput.value}`;
    
        const   getPlayerData = async ()=>{
            try {
                console.log('trying to retrieve data')

                const response = await fetch(playerData);
                const playerTwo = await  response.json();
                //    saving player information/data in accessible variable 
                const firstName = playerTwo.data[0].first_name;
                const lastName = playerTwo.data[0].last_name;
                const position = playerTwo.data[0].position;
                const team = playerTwo.data[0].team.abbreviation;
                // displaying accessible data to the DOM/frontend/user
                player2FName.textContent = `${firstName.toUpperCase()}`;
                player2LName.textContent = `${lastName.toUpperCase()}`;
                Player2Position.textContent = `${position.toUpperCase()}`;
                player2Team.textContent = `${team.toUpperCase()}`;
                console.log(playerTwo);
                try{
                    
                    const playerStatData = `https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${player.data[0].id}`
                    // add beginning season quesry search parrameter becuase it is currently giving me every game stats
                    // https://www.balldontlie.io/api/v1/stats?player_ids[]=237&per_page=5   <--this is the correct stats from specific season 
                    // "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=237"  <--this is the season average for player id; return one object for up to date average 
                    const getPlayerStatData = async ()=>{
                        try {
                            console.log('trying to retrieve player stat data')
                    
                            const response = await fetch(playerStatData);
                            const stats = await response.json();
                            
                            console.log(stats)
                            //    saving player stat/data in accessible variable 
                            const stat_pts = stats.data[0].pts;
                            const stat_reb = stats.data[0].reb;
                            const stat_fgPct = stats.data[0].fg_pct;
                            const stat_3ptPct = stats.data[0].fg3m;
                            const stat_ftPct = stats.data[0].ft_pct;
                            const minPlayedStat = stats.data[0].min;
                            // displaying accessible stat-data to the DOM/frontend/user
                            
                    //         try {
                    //              const chartIt = async () =>{
                    //             await getPlayerData();
                    //             const ctx = document.getElementById('myChart');
                                    
                    //             const myChart = new Chart(ctx, {
                    //             type: 'line',
                    //             data: {
                    //                 labels: ['PTS', 'REB', 'FG%', '3P%', 'FT%'],
                    //                 datasets: [{
                    //                     label: `season stats of ${firstName}, ${lastName}`,
                    //                     data: [stat_pts, stat_reb, stat_fgPct, stat_3ptPct, stat_ftPct],
                    //                     backgroundColor: [
                    //                     'rgba(255, 99, 132, 0.2)',
                    //                     'rgba(54, 162, 235, 0.2)',
                    //                     'rgba(255, 206, 86, 0.2)',
                    //                     'rgba(75, 192, 192, 0.2)',
                    //                     'rgba(153, 102, 255, 0.2)',
                    //                     'rgba(255, 159, 64, 0.2)'
                    //                     ],
                    //                     borderColor: [
                    //                     'rgba(255, 99, 132, 1)',
                    //                     'rgba(54, 162, 235, 1)',
                    //                     'rgba(255, 206, 86, 1)',
                    //                     'rgba(75, 192, 192, 1)',
                    //                     'rgba(153, 102, 255, 1)',
                    //                     'rgba(255, 159, 64, 1)'
                    //                     ],
                    //                     borderWidth: 1
                    //                 }]
                    //             },
                    //             options: {
                    //                 scales: {
                    //                     y: {
                    //                         beginAtZero: true
                    //                     }
                    //                 }
                    //             }
                                
                                
                    //         });
                    //         myChart;
                    // }
                    // return chartIt();
                    //         } catch (error) {
                    //             console.log("ooh,oh can't find new chart data")
                    //         }
                        } catch (error) {
                            console.log('cant retrieve stat DATA!')
                        }
                    }
                    console.log(getPlayerStatData());

                }catch{
                    console.log('cant access/connect player STATs API')
                }
                
            } catch (error) {
                console.log('error 404, can not find data');
            }

        }   
        
    console.log(getPlayerData());
})
// each sort input is complete, just work on the graph comparison if both inputs are entered, where we take in the input value as the query search parameter and get the data save it in two variables then access that data in the corresponding chart line


// beginning of logic 
