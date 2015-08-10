var config = require('./config.json');
var Bub = require('bub');
var bot = new Bub(config);

var fs = require('fs');
var path = require('path');

var subscribe = function (message) {
  console.log('subscribe ' + message.from.id);
  filepath = path.join('subscribers', message.from.id.toString());
  fs.closeSync(fs.openSync(filepath, 'w'));
};

var unsubscribe = function (message) {
  console.log('unsubscribe ' + message.from.id);
  filepath = path.join('subscribers', message.from.id.toString());
  fs.unlinkSync(filepath);
};

var messageAdmin = function (message) {
  bot.sendMessage({
    "chat_id": config.admin,
    "text": message
  });
};

var sendupdate = function (message) {
  if (message.from.id == config.admin) {
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
  subscribe(update.message);
  update.respond('Hello, ' + update.message.from.first_name + '! You are now subscribed to receive FOSS news. Use /stop to unsubscribe.');
});

bot.on('/stop', function (update) {
  unsubscribe(update.message);
  update.respond('You have been unsubscribed. If you want to subscribe again, just send /start');
});

bot.on('/update', function (update) {
  sendupdate(update.message);
  update.respond('Began sending that');
});

bot.on('/stats', function (update) {
  stats(update.message);
  console.log('sending stats');
});

// Anything without handlers goes here
bot.on('_default', console.log);

// Start checking for updates and handle them
bot.init();
