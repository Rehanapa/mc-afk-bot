const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 1. Keep-Alive Web Server
app.get('/', (req, res) => res.send('Bot is Awake!'));
app.listen(3000, () => console.log('Web server heartbeat started.'));

// 2. Bot Setup
const botArgs = {
    host: 'mobstealsmp.mcsh.io', // e.g., 'myserver.aternos.me'
    port: 25565,                // Your server port
    username: 'AFK_Bot_247',
    version: '1.20.1'           // Change to your server version
};

function startBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log('Bot is in the server!');
        // Anti-AFK: Jump every 60 seconds
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 60000);
    });

    bot.on('end', () => {
        console.log('Disconnected. Reconnecting in 15 seconds...');
        setTimeout(startBot, 15000);
    });

    bot.on('error', (err) => console.error('Error:', err));
}

startBot();
                                                 
