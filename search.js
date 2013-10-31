#!/usr/local/bin/node

var github = require("github");

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
    console.log( res) ;
});

gh.repos.getFromUser({
    user: "algui91",
    type: "owner",
    sort: "created"
}, function(err, res){
    if (err) {
        return console.log(err);
    };
    console.log(res);
});