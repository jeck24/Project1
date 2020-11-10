let APIKey = "298ac576969a1ac55b166266aed2262a";
let usersInput ;
let weatherInput ;


renderLastBrowsed();

$("button").on("click", (event) => {
    event.preventDefault();
       console.log("click")

       usersTeamInputSearch = $(".searchBar").val().trim();
       weatherInput = $(".searchBar").val().trim();
        console.log(usersTeamInputSearch);
       searchSoccerTeam(usersTeamInputSearch);
       searchWeather(weatherInput);
      localStorage.setItem("city",usersTeamInputSearch);
});
function renderLastBrowsed() {
    var city = localStorage.getItem("city");
    if (!city) {
      return;
    }
    console.log(city);
    $('.actualPreviousCityText').text("Previous city: "+ city);
  }

//Start calling different Football API's  
function searchSoccerTeam(usersInput) {
   const settings = {
       "async": true,
       "crossDomain": true,
       "url": "https://api-football-v1.p.rapidapi.com/v2/teams/search/" + usersInput,
       "method": "GET",
       "headers": {
           "x-rapidapi-key": "b8ca7b92b3mshba41efe52c0ecb1p1a174cjsnb6d350ce8924",
           "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    }
   };
   $.ajax(settings).done(function (response) {
    console.log(response);

       let iconLinkOne = response.api.teams[0].logo;
       let imgTagOne = $("<img>")
       imgTagOne.attr("src", iconLinkOne);
       $(".iconOne").html(imgTagOne);
       $(".taemNameOne").text(response.api.teams[0].name);
       $("#stadiumOne").text("Stadium: "+response.api.teams[0].venue_name);
       $("#addressOne").text("Adress: "+response.api.teams[0].venue_address);

       let iconLinkTwo = response.api.teams[1].logo;
       let imgTagTwo = $("<img>")
       imgTagTwo.attr("src", iconLinkTwo);
       $(".iconTwo").html(imgTagTwo);
       $(".taemNameTwo").text(response.api.teams[1].name);
       $("#stadiumTwo").text("Stadium: "+response.api.teams[1].venue_name);
       $("#addressTwo").text("Adress: "+response.api.teams[1].venue_address);

       let iconLinkThree = response.api.teams[2].logo;
       let imgTagThree = $("<img>")
       imgTagThree.attr("src", iconLinkThree);
       $(".iconThree").html(imgTagThree);
       $(".taemNameThree").text(response.api.teams[2].name);
       $("#stadiumThree").text("Stadium: "+response.api.teams[2].venue_name);
       $("#addressThree").text("Adress: "+response.api.teams[2].venue_address);

       
       var teamID1 = response.api.teams[1].team_id;
      
        // Next 10 fixtures

        const settings2 = {
            "async": true,
            "crossDomain": true,
            "url": "https://api-football-v1.p.rapidapi.com/v2/fixtures/team/"+teamID1+"/next/1?timezone=Europe%2FLondon",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "20e63e8764msh6e7705d43688309p1632f8jsnc72c7e215d66",
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
            }
        };
        
        $.ajax(settings2).done(function (response) {
        console.log(response);

         // Fixture data will be manipulated here

         var leagueID1 = response.api.fixtures[0].league_id;
         console.log(response.api.fixtures[0].league_id);

             // Coach for the Squad

            const settings4 = {
            "async": true,
            "crossDomain": true,
            "url": "https://api-football-v1.p.rapidapi.com/v2/coachs/team/"+teamID1+"",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "20e63e8764msh6e7705d43688309p1632f8jsnc72c7e215d66",
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
            }
            };
        
             $.ajax(settings4).done(function (response) {
            console.log(response);

            //Coach data will be manipulated here

                 // Player from a Squad

                 const settings3 = {
                 "async": true,
                 "crossDomain": true,
                 "url": "https://api-football-v1.p.rapidapi.com/v2/players/squad/"+teamID1+"/2020-2021",
                 "method": "GET",
                 "headers": {
                 "x-rapidapi-key": "20e63e8764msh6e7705d43688309p1632f8jsnc72c7e215d66",
                 "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
                 }
                 };
                 $.ajax(settings3).done(function (response) {
                 console.log(response);

                 // Squad data will be manipulated here

                    //Standig for the ligue

                    const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://api-football-v1.p.rapidapi.com/v2/leagueTable/"+leagueID1+"",
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
                            "url": "https://api-football-v1.p.rapidapi.com/v2/topscorers/"+leagueID1+"",
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
    }); //Ajax for team id
}
function searchWeather(usersInput) {
    //let usersInput = "";
    APIKey = "298ac576969a1ac55b166266aed2262a";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + usersInput + "&appid=" + APIKey;
// Here we run our AJAX call to the OpenWeatherMap API
   $.ajax({
    url: queryURL,
    method: "GET"
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
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("    Temperature (F) " + tempF.toFixed(2));
        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
        let iconLink = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        let imgTag = $("<img>")
        imgTag.attr("src", iconLink);
        $(".icon").html(imgTag)
    });
};


