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


});

}



$("button").on("click", (event) => {
    event.preventDefault();
       console.log("click")
       console.log(usersInput)

       usersTeamInputSearch = $(".searchBar").val().trim();

       searchSoccerTeam(usersTeamInputSearch)


});