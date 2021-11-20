
// grabbing containers
const NBAContainer = document.querySelector(".ContainerNba")
const searchBar = document.querySelector(".form-control")
const statsCard = document.querySelector(".statCards")
const url = 'https://www.youtube.com/embed/'
const youtube = document.querySelector("iframe")
const tableclass = document.querySelector(".tableclass")
const button = document.querySelector(".btn")


async function getData (){
NBAContainer.innerHTML=""   
const nbaData = await fetch (`https://www.balldontlie.io/api/v1/players/?search=${searchBar.value}`)
const jsonnbaData = await nbaData.json();
const playerID= jsonnbaData.data[0].id
const nbaStats = await fetch (`https://www.balldontlie.io/api/v1/season_averages?season=2020&player_ids[]=${playerID}`)
const jsonnbaStats = await nbaStats.json();
const youtubeVideo = await fetch (`https://youtube.googleapis.com/youtube/v3/search?q=${searchBar.value} Higlights 2021&key=AIzaSyBOseenYRlQVfkAaW18Xq2GXWYdwX8E8Lw`)
const jsonyoutubeVideo = await youtubeVideo.json()
const videoid = jsonyoutubeVideo.items[1].id.videoId

// get Youtube Videos

const url = `https://www.youtube.com/embed/${videoid}?start=3`
youtube.src=url


//makes the stat cards

const playerCard = document.createElement("div")
const data = jsonnbaData.data[0]
playerCard.className = "playerCards"
const headName = document.createElement("h1")
headName.innerHTML = (jsonnbaData.data[0].first_name + " " + jsonnbaData.data[0].last_name)
headName.className= "headName"
const text = document.createElement("h2")
text.innerHTML = "Height: " + jsonnbaData.data[0].height_feet+ " ' " +jsonnbaData.data[0].height_inches+ "\n " +" | " + "Position: "+ data.position + " \n"+" | " + "Team: " + data.team.city+" "+data.team.name 
text.className= "playerText"


//creates table with data

const table = document.querySelector(".table")
const tableHeader = document.createElement("h4")
tableHeader.className = "tableheader"
table.innerHTML=""
const row1 = table.insertRow();
const cell8 = row1.insertCell();
const cell9 = row1.insertCell();
const cell10 = row1.insertCell();
const cell11 = row1.insertCell();
const cell12 = row1.insertCell();
const cell13 = row1.insertCell();
const cell14= row1.insertCell();
cell8.innerHTML = "PPG"
cell9.innerHTML = "APG"
cell10.innerHTML = "RPB"
cell11.innerHTML = "FG%"
cell12.innerHTML = "3PT%"
cell13.innerHTML = "FGM"
cell14.innerHTML = "FGA"
const row = table.insertRow();
const cell1 = row.insertCell();
const cell2 = row.insertCell();
const cell3 = row.insertCell();
const cell4 = row.insertCell();
const cell5 = row.insertCell();
const cell6 = row.insertCell();
const cell7= row.insertCell();
cell1.innerHTML=" "
cell1.innerHTML = jsonnbaStats.data[0].pts
cell2.innerHTML = jsonnbaStats.data[0].ast
cell3.innerHTML = jsonnbaStats.data[0].reb
cell4.innerHTML = jsonnbaStats.data[0].fg_pct
cell5.innerHTML = jsonnbaStats.data[0].fg3_pct
cell6.innerHTML = jsonnbaStats.data[0].fgm
cell7.innerHTML = jsonnbaStats.data[0].fga


// appends data

console.log(text)
playerCard.append(headName)
playerCard.append(text)
NBAContainer.append(playerCard)
NBAContainer.append(highlights)



};
button.addEventListener("click", () => getData());

