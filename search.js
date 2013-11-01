#!/usr/local/bin/node

var github = require("github");
var path = require('path');

/**
 * Check if user pass the right params
 */
if ( process.argv.length <= 3 ) {
       return console.log("Usage: " + path.basename(process.argv[1]) + " <location> " + "<user_token>");
};

var loc = "location:";
var arg = process.argv[2] ? process.argv[2] : "Granada";
var location = loc + arg;
var token = process.argv[3];

var gh = new github({
    // required
    version: "3.0.0",
    // optional
    timeout: 5000
});

// OAuth 2
gh.authenticate({
    type: "oauth",
    token: token
});

gh.search.users({
    keyword: location
}, function(err, res) {
    console.log("#################################################\n" +
                "#################################################");
    console.log("Usuarios de " + arg + " y sus repositorios");
    console.log("#################################################\n" +
                "#################################################");
    for (i = 0 ; i < res.users.length; i++){
        
        gh.repos.getFromUser({
            user: res.users[i].username,
            type: "owner",
            sort: "created"
        }, function(err, response){
            if (response[0] != undefined 
                && response[0].hasOwnProperty("owner") 
                && response[0].owner.hasOwnProperty("login")){
                    console.log("------------------------------------------");
                    console.log(response[0].owner.login + " ( " + response[0].owner.html_url + " )" );
                }
            for ( k = 0 ; k < response.length ;k++){
                var lenguaje = response[k].language === "null" ? "No definido" : response[k].language;
                console.log("\t" + response[k].name + "\n" +
                    "\t\tLenguaje:" + lenguaje + "\n" + 
                    "\t\tNúmero de forks:" + response[k].forks_count + "\n" +
                    "\t\tSeguido por:" + response[k].watchers + " Personas\n");
            }
       });
    }
});

