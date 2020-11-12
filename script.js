let APIKey = "298ac576969a1ac55b166266aed2262a";
let usersInput;
let weatherInput;

renderLastBrowsed();

$("button").on("click", (event) => {
  event.preventDefault();
  console.log("click");
  usersTeamInputSearch = $(".searchBar").val().trim();
  weatherInput = $(".searchBar").val().trim();
  console.log(usersTeamInputSearch);
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
  console.log(city);
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
    console.log(response);

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
        var teamID = response.api.teams[0].team_id;
        getTeamData(teamID);
    });
    
    $(".iconTwo").on("click", function(){
        console.log("click");
        var teamID = response.api.teams[1].team_id;
        getTeamData(teamID);
    });
    
    $(".iconThree").on("click", function(){
        console.log("click");
        var teamID = response.api.teams[2].team_id;
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
        console.log(response);
   
        var index = 0;
        while (response.api.fixtures[index].homeTeam.team_id!=team) {
            index++;
        }
        console.log(response.api.fixtures[index]);




         // Fixture data will be manipulated here

         var leagueID = response.api.fixtures[0].league_id;
         console.log(response.api.fixtures[0].league_id);

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
            console.log(response);

            //Coach data will be manipulated here

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
                 console.log(response);

                 // Squad data will be manipulated here

                    //Standig for the ligue

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
                    console.log(response);

                    // Standing data will be manipulated here

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