# Telegram FOSS News Bot #

This bot, built over Telegram API is designed to test a subscriber, update model for replacing emails using Telegram.

## Setting up ##
```bash
git clone https://github.com/asdofindia/telegram-fossnewsbot.git
cd telegram-fossnewsbot
mv config.sample.json config.json
vim config.json
# put [bot token and timeout](https://github.com/dar5hak/bub#set) in config.json
# also set the admin id
npm install
mkdir subscribers
```

## Running ##
node index.js

## Commands on the bot ##
`/start` to subscribe
`/stop` to unsubscribe
`/update message` to send `message` to all subscribers (admin only)


