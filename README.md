# Telegram Updates Bot #

This bot, built over Telegram API is designed to allow people to subscribe to updates using Telegram (like email newsletters).

## Setting up ##
```bash
git clone https://github.com/asdofindia/telegram-updates-bot.git
cd telegram-updates-bot
mv config.sample.json config.json
vim config.json
# put [bot token and timeout](https://github.com/dar5hak/bub#set) in config.json
# also set the admin id
npm install
mkdir subscribers
```

## Running ##
`node bot.js`

Alternatively, consider installing pm2

## Commands on the bot ##
* `/start` to subscribe
* `/stop` to unsubscribe
* `/update message` to send `message` to all subscribers (admin only)
* `/stats` for subscriber count (admin only)

## Demo ##
Some bots running this code are:

* [@fossnewsbot](https://telegram.me/fossnewsbot)
