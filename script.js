let usersInput;


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
   

       $("#firstCardHolderImg").append("<img>" + response.api.teams[0].logo + "</img>");










});

}



$("button").on("click", (event) => {
    event.preventDefault();
       console.log("click")
       console.log(usersInput)

       usersTeamInputSearch = $(".searchBar").val().trim();

       searchSoccerTeam(usersTeamInputSearch)


});