var express = require('express');
var mongoose = require('mongoose');

var userAccountDetails = require('./models/userDetails');
//mlab mongodb 
var db = "mongodb://ankita:ankita123@ds139446.mlab.com:39446/gwgvchatdb";

//local mongodb setup
//var db = 'mongodb://localhost:27017/vchatdb';
mongoose.Promise = global.Promise;
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true });
var conn = mongoose.connection;



var loggedInUsers = require('./loggedUsers');

exports.loginToVChat = function(req, res) {
    var requestData = req.body;
    var authorization = false;
    userAccountDetails.find().exec(function(error, docs) {
        docs.forEach(function(doc) {
            if ((doc.username == requestData.username) && (doc.pwd == requestData.pwd)) {
                authorization = true;
            }
        });

        if (authorization) {
            loggedInUsers.push({ username: requestData.username });
            res.send({ status: 'Success' });
        } else
            res.send({ status: 'Failed' });
    });
};

exports.registerToVChat = function(req, res) {
    var requestData = req.body;
    var userPresent = false;
    userAccountDetails.find().exec(function(error, docs) {
        docs.forEach(function(doc) {
            if ((doc.username == requestData.user)) {
                userPresent = true;
            }
        });
        if (!userPresent) {
            conn.collection('userAccountDetails').insert(requestData, function(error, result) {
                res.send({ status: 'Success' });
            });
        } else {
            res.send({ status: 'Failed' });
        }
    });
};
