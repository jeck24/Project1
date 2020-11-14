let APIKey = "298ac576969a1ac55b166266aed2262a";
let usersInput;
let weatherInput;

renderLastBrowsed();

$("button").on("click", (event) => {
  event.preventDefault();
  usersTeamInputSearch = $(".searchBar").val().trim();
  weatherInput = $(".searchBar").val().trim();
  searchSoccerTeam(usersTeamInputSearch);
  searchWeather(weatherInput);
  localStorage.setItem("city", usersTeamInputSearch);
  hideImg();
});


function renderLastBrowsed() {
  var city = localStorage.getItem("city");
  if (!city) {
    return;
  }
  $(".actualPreviousCityText").text("Previous city: " + city);
}

function searchSoccerTeam(usersInput) {
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://api-football-v1.p.rapidapi.com/v2/teams/search/" + usersInput,
    method: "GET",
    headers: {
      "x-rapidapi-key": "b8ca7b92b3mshba41efe52c0ecb1p1a174cjsnb6d350ce8924",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    //console.log(response);

       let iconLinkOne = response.api.teams[0].logo;
       let imgTagOne = $("<img>")
       imgTagOne.attr("src", iconLinkOne);
       $(".iconOne").html(imgTagOne);
       $(".taemNameOne").text(response.api.teams[0].name);
       $("#stadiumOne").text("Stadium: "+response.api.teams[0].venue_name);
       $("#stadiumOne").text("Stadium: "+response.api.teams[0].venue_name);

       let iconLinkTwo = response.api.teams[1].logo;
       let imgTagTwo = $("<img>")
       imgTagTwo.attr("src", iconLinkTwo);
       $(".iconTwo").html(imgTagTwo);
       let iconLinkThree = response.api.teams[2].logo;
       let imgTagThree = $("<img>")
       imgTagThree.attr("src", iconLinkThree);
       $(".iconThree").html(imgTagThree);
       $(".taemNameOne").text(response.api.teams[0].name);
       $(".taemNameTwo").text(response.api.teams[1].name);
       $(".taemNameThree").text(response.api.teams[2].name);
       $(".teamIDOne").text(response.api.teams[0].team_id);
       $(".teamIDTwo").text(response.api.teams[1].team_id);
       $(".teamIDThree").text(response.api.teams[2].team_id);
       $(".teamCountryOne").text(response.api.teams[0].country);
       $(".teamCountryTwo").text(response.api.teams[1].country);
       $(".teamCountryThree").text(response.api.teams[2].country);
       $(".venueCityTeamNameOne").text(response.api.teams[0].venue_city);
       $(".venueCityTeamNameTwo").text(response.api.teams[1].venue_city);
       $(".venueCityTeamNameThree").text(response.api.teams[2].venue_city);
       $(".venueNameTeamOne").text(response.api.teams[0].venue_name);
       $(".venueNameTeamTwo").text(response.api.teams[1].venue_name);
       $(".venueNameTeamThree").text(response.api.teams[2].venue_name);
       $(".foundedTeamOne").text(response.api.teams[0].founded);
       $(".foundedTeamTwo").text(response.api.teams[1].founded);
       $(".foundedTeamThree").text(response.api.teams[2].founded);


    $(".iconOne").on("click", function(){
        console.log("click");
        var teamID ="";
        teamID = response.api.teams[0].team_id;
        console.log(teamID);
        getTeamData(teamID);
    });
    
    $(".iconTwo").on("click", function(){
        console.log("click");
        var teamID ="";
        teamID = response.api.teams[1].team_id;
        console.log(teamID);
        getTeamData(teamID);
    });
    
    $(".iconThree").on("click", function(){
        console.log("click");
        var teamID ="";
        teamID = response.api.teams[2].team_id;
        console.log(teamID);
        getTeamData(teamID);
    });

       function getTeamData(team) {
      
        // Next fixture

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api-football-v1.p.rapidapi.com/v2/fixtures/team/"+team+"/next/10?timezone=Europe%2FLondon",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "20e63e8764msh6e7705d43688309p1632f8jsnc72c7e215d66",
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
            }
        };
        
        $.ajax(settings).done(function (response) {
        //Next fixture data is here
        console.log(response);
   
        var index = 0;
        while (response.api.fixtures[index].homeTeam.team_id!=team) {
            index++;
        }
        console.log(response.api.fixtures[index]);

        var completeGameDate = response.api.fixtures[index].event_date
        var gameDate = response.api.fixtures[index].event_date.substr(0,10);

        if (response.api.fixtures[index].status === "Time to be defined") {
            var gameTime = "To be defined"
        }
        else {
            var gameTime =  completeGameDate.substr(completeGameDate.length - 14).substr(0,5);
        
        }

        var awayTeam = response.api.fixtures[index].awayTeam.team_name;
        var awayLogo = response.api.fixtures[index].awayTeam.logo;
        var homeTeam = response.api.fixtures[index].homeTeam.team_name;
        var homeLogo = response.api.fixtures[index].homeTeam.logo;
        var gameDate = response.api.fixtures[index].event_date.substr(0,10);

        console.log(awayLogo);
        console.log(homeLogo);

        $(".gameDate").text("Game Date: "+gameDate);
        $(".gameTime").text("Game Time: "+gameTime);

        $(".homeTeamName").text(homeTeam);
        $(".awayTeamName").text(awayTeam);

        $(".localTeamShield").attr("src", homeLogo);
        $(".awayTeamShield").attr("src", awayLogo);
        //Next fixture data is here

         var leagueID = response.api.fixtures[0].league_id; //grabbing league ID from here as it comes from the fixture
         console.log(response.api.fixtures[0].league_id); //grabbing league ID from here as it comes from the fixture

             // Coach for the Squad

            const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api-football-v1.p.rapidapi.com/v2/coachs/team/"+team+"",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "20e63e8764msh6e7705d43688309p1632f8jsnc72c7e215d66",
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
            }
            };
        
             $.ajax(settings).done(function (response) {
            //Coach data is here
            console.log(response);

            var coachName = response.api.coachs[0].name;
            $(".teamCoachCurrent").text(coachName);
            console.log(coachName);
            //Coach data is here


                 // Player from a Squad
                 const settings = {
                 "async": true,
                 "crossDomain": true,
                 "url": "https://api-football-v1.p.rapidapi.com/v2/players/squad/"+team+"/2020-2021",
                 "method": "GET",
                 "headers": {
                 "x-rapidapi-key": "20e63e8764msh6e7705d43688309p1632f8jsnc72c7e215d66",
                 "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
                 }
                 };
                 $.ajax(settings).done(function (response) {

                 // players arrays for each position are here   
                 console.log(response);

                 var goalkeepers = [];
                 var defenders = [];
                 var midfielders = [];
                 var attackers = [];
                 
                 var goalkeepersNat = [];
                 var defendersNat = [];
                 var midfieldersNat = [];
                 var attackersNat = [];

                 for (let i = 0; i < response.api.players.length; i++) {

                    if (response.api.players[i].position === "Goalkeeper") {
                        goalkeepers.push(response.api.players[i].player_name);
                        goalkeepersNat.push(response.api.players[i].nationality);
                    }
                    else if (response.api.players[i].position === "Attacker") {
                        attackers.push(response.api.players[i].player_name);
                        attackersNat.push(response.api.players[i].nationality);
                    }
                    else if (response.api.players[i].position === "Defender") {
                        defenders.push(response.api.players[i].player_name);
                        defendersNat.push(response.api.players[i].nationality);
                    }
                    else if (response.api.players[i].position === "Midfielder") {
                        midfielders.push(response.api.players[i].player_name);
                        midfieldersNat.push(response.api.players[i].nationality);
                    }
                 }
                 console.log(goalkeepers);
                 console.log(defenders);
                 console.log(midfielders);
                 console.log(attackers);

                 console.log(goalkeepersNat);
                 console.log(defendersNat);
                 console.log(midfieldersNat);
                 console.log(attackersNat);

                 // players arrays for each position are here


                 var random1 = Math.floor(Math.random()*goalkeepers.length);
                 var playerOne = goalkeepers[random1];
                 var NatOne = goalkeepersNat[random1]
                 $(".playerOne").text(playerOne);
                 $(".nationalityOne").text(NatOne);

                 var random2 = Math.floor(Math.random()*defenders.length);
                 var playerTwo = defenders[random2];
                 var NatTwo = defendersNat[random2]
                 $(".playerTwo").text(playerTwo);
                 $(".nationalityTwo").text(NatTwo);

                 var random3 = Math.floor(Math.random()*defenders.length);
                 var playerThree = defenders[random3];
                 var NatThree = defendersNat[random3]
                 $(".playerThree").text(playerThree);
                 $(".nationalityThree").text(NatThree);

                 var random4 = Math.floor(Math.random()*defenders.length);
                 var playerFour = defenders[random4];
                 var NatFour = defendersNat[random4]
                 $(".playerFour").text(playerFour);
                 $(".nationalityFour").text(NatFour);

                 var random5 = Math.floor(Math.random()*midfielders.length);
                 var playerFive = midfielders[random5];
                 var NatFive = midfieldersNat[random5]
                 $(".playerFive").text(playerFive);
                 $(".nationalityFive").text(NatFive);
                 
                 var random6 = Math.floor(Math.random()*midfielders.length);
                 var playerSix = midfielders[random6];
                 var NatSix = midfieldersNat[random6]
                 $(".playerSix").text(playerSix);
                 $(".nationalitySix").text(NatSix);
                 
                 var random7 = Math.floor(Math.random()*midfielders.length);
                 var playerSeven = midfielders[random7];
                 var NatSeven = midfieldersNat[random7]
                 $(".playerSeven").text(playerSeven);
                 $(".nationalitySeven").text(NatSeven);

                 var random8 = Math.floor(Math.random()*attackers.length);
                 var playerEight = attackers[random8];
                 var NatEight = attackersNat[random8]
                 $(".playerEight").text(playerEight);
                 $(".nationalityEight").text(NatEight);

                 var random9 = Math.floor(Math.random()*attackers.length);
                 var playerNine = attackers[random9];
                 var NatNine = attackersNat[random9]
                 $(".playerNine").text(playerNine);
                 $(".nationalityNine").text(NatNine);

                 var random10 = Math.floor(Math.random()*attackers.length);
                 var playerTen = attackers[random10];
                 var NatTen = attackersNat[random10]
                 $(".playerTen").text(playerTen);
                 $(".nationalityTen").text(NatTen);

                    //Standings for the ligue

                    const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://api-football-v1.p.rapidapi.com/v2/leagueTable/"+leagueID+"",
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "20e63e8764msh6e7705d43688309p1632f8jsnc72c7e215d66",
                        "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
                    }
                    };
                
                     $.ajax(settings).done(function (response) {
                    
                    //standings from the chosen team are here
                    console.log(response);
                    console.log(response.api.standings[0].length);

                    var teamIndex ="";

                    var teamRank = "";
                    var teamPoints = "";

                    for (let i = 0; i < response.api.standings[0].length; i++) {
                       if (response.api.standings[0][i].team_id===team) {
                         teamIndex=i;
                       }
                        
                    }

                    teamRank = response.api.standings[0][teamIndex].rank;
                    teamPoints = response.api.standings[0][teamIndex].points;

                    console.log(teamRank);
                    console.log(teamPoints);

                    var first10name = [];
                    var first10rank = [];
                    var first10points = [];

                    for (let i = 0; i < 10; i++) {
                        first10name.push(response.api.standings[0][i].teamName);
                        first10rank.push(response.api.standings[0][i].rank);
                        first10points.push(response.api.standings[0][i].points);    
                     }

                     console.log(first10name);
                     console.log(first10rank);
                     console.log(first10points);
                    //standings from the chosen team are here

                    var teamOne = first10name[0];
                    var teamOnePoints = first10points[0];
                    $(".teamOne").text(teamOne);
                    $(".teamPointsOne").text(teamOnePoints);

                    var teamTwo = first10name[1];
                    var teamTwoPoints = first10points[1];
                    $(".teamTwo").text(teamTwo);
                    $(".teamPointsTwo").text(teamTwoPoints);

                    var teamThree = first10name[2];
                    var teamThreePoints = first10points[2];
                    $(".teamThree").text(teamThree);
                    $(".teamPointsThree").text(teamThreePoints);

                    var teamFour = first10name[3];
                    var teamFourPoints = first10points[3];
                    $(".teamFour").text(teamFour);
                    $(".teamPointsFour").text(teamFourPoints);

                    var teamFive = first10name[4];
                    var teamFivePoints = first10points[4];
                    $(".teamFive").text(teamFive);
                    $(".teamPointsFive").text(teamFivePoints);

                    var teamSix = first10name[5];
                    var teamSixPoints = first10points[5];
                    $(".teamSix").text(teamSix);
                    $(".teamPointsSix").text(teamSixPoints);

                    var teamSeven = first10name[6];
                    var teamSevenPoints = first10points[6];
                    $(".teamSeven").text(teamSeven);
                    $(".teamPointsSeven").text(teamSevenPoints);

                    var teamEight = first10name[7];
                    var teamEightPoints = first10points[7];
                    $(".teamEight").text(teamEight);
                    $(".teamPointsEight").text(teamEightPoints);

                    var teamNine = first10name[8];
                    var teamNinePoints = first10points[8];
                    $(".teamNine").text(teamNine);
                    $(".teamPointsNine").text(teamNinePoints);

                        //TopScorers information

                        const settings = {
                         "async": true,
                         "crossDomain": true,
                         "url": "https://api-football-v1.p.rapidapi.com/v2/topscorers/"+leagueID+"",
                         "method": "GET",
                         "headers": {
                                "x-rapidapi-key": "20e63e8764msh6e7705d43688309p1632f8jsnc72c7e215d66",
                                "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
                        }
                        };
                        
                        $.ajax(settings).done(function (response) {
                            console.log(response);
                            var index = 0;
                            while (response.api.topscorers[index].team_id!=team) {
                                index++;
                            }
                            var teamTopScorer = response.api.topscorers[index].player_name;
                            var teamTopScorerGoals = response.api.topscorers[index].goals.total;
                            console.log(teamTopScorer);
                            console.log(teamTopScorerGoals);

                            var first10topScorers = [];
                            var first10topScorersRank = [];
                            var first10topScorerGoals = [];

                            for (let i = 0; i < 10; i++) {
                              first10topScorers.push(response.api.topscorers[i].player_name);
                              first10topScorersRank.push(i+1);
                              first10topScorerGoals.push(response.api.topscorers[i].goals.total);    
                           }

                            console.log(first10topScorers);
                            console.log(first10topScorersRank);
                            console.log(first10topScorerGoals);

                            var goalscorerOne = first10topScorers[0];
                            var goalscorerGoalsOne = first10topScorerGoals[0];
                            $(".goalscorerOne").text(goalscorerOne);
                            $(".goalsOne").text(goalscorerGoalsOne);

                            var goalscorerTwo = first10topScorers[1];
                            var goalscorerGoalsTwo = first10topScorerGoals[1];
                            $(".goalscorerTwo").text(goalscorerTwo);
                            $(".goalsTwo").text(goalscorerGoalsTwo);

                            var goalscorerThree = first10topScorers[2];
                            var goalscorerGoalsThree = first10topScorerGoals[2];
                            $(".goalscorerThree").text(goalscorerThree);
                            $(".goalsThree").text(goalscorerGoalsThree);

                            var goalscorerFour = first10topScorers[3];
                            var goalscorerGoalsFour = first10topScorerGoals[3];
                            $(".goalscorerFour").text(goalscorerFour);
                            $(".goalsFour").text(goalscorerGoalsFour);

                            var goalscorerFive = first10topScorers[4];
                            var goalscorerGoalsFive = first10topScorerGoals[4];
                            $(".goalscorerFive").text(goalscorerFive);
                            $(".goalsFive").text(goalscorerGoalsFive);

                            var goalscorerSix = first10topScorers[5];
                            var goalscorerGoalsSix = first10topScorerGoals[5];
                            $(".goalscorerSix").text(goalscorerSix);
                            $(".goalsSix").text(goalscorerGoalsSix);

                            var goalscorerSeven = first10topScorers[6];
                            var goalscorerGoalsSeven = first10topScorerGoals[6];
                            $(".goalscorerSeven").text(goalscorerSeven);
                            $(".goalsSeven").text(goalscorerGoalsSeven);

                            var goalscorerEight = first10topScorers[7];
                            var goalscorerGoalsEight = first10topScorerGoals[7];
                            $(".goalscorerEight").text(goalscorerEight);
                            $(".goalsEight").text(goalscorerGoalsEight);

                            var goalscorerNine = first10topScorers[8];
                            var goalscorerGoalsNine = first10topScorerGoals[8];
                            $(".goalscorerNine").text(goalscorerNine);
                            $(".goalsNine").text(goalscorerGoalsNine);

                        });
                     });
                 });
            });
        });
       }

    }); //Ajax for team id


}
function searchWeather(usersInput) {
  //let usersInput = "";
  APIKey = "298ac576969a1ac55b166266aed2262a";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    usersInput +
    "&appid=" +
    APIKey;
  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      // Log the queryURL
      console.log(queryURL);
      // Log the resulting object
      console.log(response);
      // Transfer content to HTML
      $(".city").html("<h3>Current Weather " + "" + response.name + "</h3>");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);
      // Convert the temp to fahrenheit
      let tempF = (response.main.temp - 273.15) * 1.8 + 32;
      // add temp content to html
      $(".temp").text("Temperature (K) " + response.main.temp);
      $(".tempF").text("    Temperature (F) " + tempF.toFixed(2));
      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + tempF);
      let iconLink =
        "http://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png";
      let imgTag = $("<img>");
      imgTag.attr("src", iconLink);
      $(".icon").html(imgTag);
    });
}

function hideImg() {
  $("img").hide();
  $("img").hide();
  $("img").hide();
}