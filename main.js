let data;

function selectteam(id) {
  renderPlayersForTeam(id,data.elements);
}

function selectplayer(player) {
  renderPlayerInfo(player,data.elements);
}

function renderTeams(teams) {
  console.log(teams)
  let teamsstr = "";
  teams.forEach(team => {
    teamsstr += `<li><a href="javascript:void(0);" onclick="selectteam('${team.code}')"><img src="https://platform-static-files.s3.amazonaws.com/premierleague/badges/t${team.code}.png"><span>${team.name}<i class="fas fa-arrow-right"></i></span></a></li>`;
  });

  console.log(teamsstr);
  document.getElementById("teambox").innerHTML = teamsstr;
}

function renderPlayersForTeam(teamid,players) {
  console.log(teamid)
  let playerstr = "";
  players.forEach(player => {
    if(player.team_code == teamid){
      playerstr += `<li><a href="javascript:void(0);" onclick="selectplayer(${player.code})"><img src="https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p${player.code}.png"><span>${player.first_name} ${player.second_name}<i class="fas fa-arrow-right"></i></span></a></li>`;
    }
  });

  console.log(playerstr);
  document.getElementById("playerbox").innerHTML = playerstr;
}

function renderPlayerInfo(playerid,players) {
  console.log(playerid)
  let playerstr = "";
  players.forEach(player => {
    
    if(player.code == playerid){
      console.log(player)
      playerstr += 
      `<section>
      <div><img  src="https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p${player.code}.png"></div>
      <div>
        <h1>Name: ${player.first_name} ${player.second_name}</h1>
        <h3>Number: ${player.squad_number}</h3>
        <h3>Cost: ${player.now_cost}</h3>
        <h3>Goals: ${player.goals_scored}</h3>
        <h3>Assists: ${player.assists}</h3>
        <h3>Clean-Sheet:${player.clean_sheets}</h3>
        <h3>Yellow Card(s): ${player.yellow_cards}</h3>
        <h3>Red Card(s): ${player.red_cards}</h3>
        <h3>Minutes: ${player.minutes}</h3>
      </div>
    </section>`;
    }
  });

  console.log(playerstr);
  document.getElementById("playerinfo").innerHTML = playerstr;
}

function loadXMLDoc() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for older browsers
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // document.getElementById("demo").innerHTML =
      // this.responseText;

      data = JSON.parse(this.responseText)
      // console.log(data)
      renderTeams(data.teams);
      // document.getElementById("ingredient").src = a.product.image_nutrition_url;

    }
  };
  xmlhttp.open("GET", "https://fplapi-demo.herokuapp.com/drf/bootstrap-static", true);
  // request.setRequestHeader('Accept', 'application/json');
  xmlhttp.send();
}
loadXMLDoc()