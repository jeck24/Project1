
$.ajax({
    headers: { 'X-Auth-Token': '9bcb297f76e444a6926ba9eae377962b' },
    url: "https://api.football-data.org/v2/players/44/matches",
    dataType: 'json',
    type: 'GET',
}).done(function(response) {


// do something with the response, e.g. isolate the id of a linked resource   
    console.log(response);
});