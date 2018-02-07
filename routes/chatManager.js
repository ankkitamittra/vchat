var chatHistory = require('./chatHistory');

exports.findChatHistoryPartners = function(data) {
    var count = 0;
    var res = [];
    res.index = chatHistory.length;
    res.status = "New";
    res.data = data;

    for (var i = 0; i < chatHistory.length; i++) {
        count = 0;
        if (chatHistory[i].chatPartners != undefined || chatHistory[i].chatPartners != null) {
            for (var j = 0; j < chatHistory[i].chatPartners.length; j++) {
                if (chatHistory[i].chatPartners[j].username == data.user || chatHistory[i].chatPartners[j].username == data.friend) {
                    count++;
                }
            }
        }
        if (count == 2) {
            res.index = i;
            res.status = "Update";
            break;
        }
    }

    return res;
}

exports.storeChatHistory = function(res) {
    var index = res.index;
    var status = res.status;
    var data = res.data;
    if (status == "New") {
        var chatPartners = [{ username: data.user }, { username: data.friend }];
        var userdata = [{ username: data.user, messages: data.messages }];
        var chatData = { chatPartners: chatPartners, chats: userdata };
        chatHistory.push(chatData);
    } else {
        chatHistory[index].chats.push({ username: data.user, messages: data.messages });
    }

    return chatHistory;
}