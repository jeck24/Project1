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
  }
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
       let iconLinkTwo = response.api.teams[1].logo;
       let imgTagTwo = $("<img>")
       imgTagTwo.attr("src", iconLinkTwo);
       $(".iconTwo").html(imgTagTwo);
       let iconLinkThree = response.api.teams[3].logo;
       let imgTagThree = $("<img>")
       imgTagThree.attr("src", iconLinkThree);
       $(".iconThree").html(imgTagThree);
       let iconLinkFour = response.api.teams[6].logo;
       let imgTagFour = $("<img>")
       imgTagFour.attr("src", iconLinkFour);
       $(".iconFour").html(imgTagFour);
       let iconLinkFive = response.api.teams[9].logo;
       let imgTagFive = $("<img>")
       imgTagFive.attr("src", iconLinkFive);
       $(".iconFive").html(imgTagFive);
       $(".taemNameOne").text(response.api.teams[0].name);
       $(".taemNameTwo").text(response.api.teams[1].name);
       $(".taemNameThree").text(response.api.teams[3].name);
       $(".taemNameFour").text(response.api.teams[6].name);
       $(".taemNameFive").text(response.api.teams[9].name);
       $(".teamIDOne").text(response.api.teams[0].team_id);
       $(".teamIDTwo").text(response.api.teams[1].team_id);
       $(".teamIDThree").text(response.api.teams[3].team_id);
       $(".teamIDFour").text(response.api.teams[6].team_id);
       $(".teamIDFive").text(response.api.teams[9].team_id);

       var teamID1 = response.api.teams[0].team_id;
       console.log(teamID1);
       const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api-football-v1.p.rapidapi.com/v2/fixtures/league/"+teamID1+"/last/10?timezone=Europe%2FLondon",
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
        $(".city").html("<h3>" + response.name + " Weather Details</h3>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        // Convert the temp to fahrenheit
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
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


