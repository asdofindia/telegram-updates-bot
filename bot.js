var config = require('./config.json');
var Bub = require('bub');
var bot = new Bub(config);

var fs = require('fs');
var path = require('path');

// create folder structure
if (!fs.existsSync('subscribers')){
  console.log('creating the directory subscribers');
  fs.makedirSync('subscribers');
}

var subscribe = function (id) {
  console.log('subscribe ' + id);
  filepath = path.join('subscribers', id.toString());
  fs.closeSync(fs.openSync(filepath, 'w'));
};

var unsubscribe = function (id) {
  console.log('unsubscribe ' + id);
  filepath = path.join('subscribers', id.toString());
  fs.unlinkSync(filepath);
};

var messageAdmin = function (message) {
  bot.sendMessage({
    "chat_id": config.admin,
    "text": message
  });
};

var sendupdate = function (message) {
  if (message.from.id == config.admin && message.from.id == message.chat.id) {
    message = message.text.slice(message.text.indexOf(' ') + 1);
    console.log('update is ' + message);
    fs.readdir('subscribers', function (err, subscribers) {
      for (var i = 0; i < subscribers.length; i++) {
        bot.sendMessage({
          "chat_id": subscribers[i],
          "text": message
        });
      };
      messageAdmin('finished sending');
    });
  }
};

var stats = function (message) {
  if (message.from.id == config.admin){
    fs.readdir('subscribers', function(err, subscribers) {
      messageAdmin('Subscriber count is ' + subscribers.length.toString());
    });
  }
};

// User commands are handled with `on()`
bot.on('/start', function (update) {
  if (message.from.id == message.chat.id){
    subscribe(update.message.from.id);
    update.respond('Hello, ' + update.message.from.first_name + '! You are now subscribed to receive updates from me. Use /stop to unsubscribe.');
  }
});

bot.on('/stop', function (update) {
  if (message.from.id == message.chat.id) {
    unsubscribe(update.message.from.id);
    update.respond('You have been unsubscribed. If you want to subscribe again, just send /start');
  }
});

bot.on('/start@' + config.username, function (update) {
  subscribe(update.message.chat.id);
  update.respond('I will send updates to this group too. Anyone can send /stop@' + config.username + ' to make me stop');
});

bot.on('/stop@' + config.username, function (update){
  unsubscribe(update.message.chat.id);
  update.respond('That\'s it. I\'m done. Send /start@' + config.username + ' if you feel like you need me again.');
});

bot.on('/update', function (update) {
  sendupdate(update.message);
});

bot.on('/stats', function (update) {
  stats(update.message);
  console.log('sending stats');
});

// Anything without handlers goes here
bot.on('_default', console.log);

// Start checking for updates and handle them
bot.init();
