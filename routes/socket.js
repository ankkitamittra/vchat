var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(4000);

var loggedInUsers = require('./loggedUsers');
var chatHistory = require('./chatHistory');
var chatManager = require('./chatManager');
// socket io

io.on('connection', function(socket) {
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
    socket.on('getUserList', function(data) {
        console.log("Logged In User ---------" + JSON.stringify(loggedInUsers));
        io.emit('userListUpdated', loggedInUsers);
    });
    socket.on('UserLoggedOut', function(data) {
        loggedInUsers.splice(loggedInUsers.indexOf(data), 1);
        console.log("Logged Out User  ---------" + JSON.stringify(loggedInUsers));
        io.emit('userListUpdated', loggedInUsers);
    });
    socket.on('sentMessage', function(data) {
        var chats = chatManager.storeChatHistory(chatManager.findChatHistoryPartners(data));
        console.log("chat history ---------" + JSON.stringify(chats));
        io.emit('newMessage', { user: data.user, friend: data.friend, chats: chats });
    });

});