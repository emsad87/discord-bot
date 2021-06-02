const { prefix, token } = require('./config.json');
// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.channel.send('Pong.');
  } else if (command === 'beep') {
    message.channel.send('Boop.');
  } else if (command === 'server') {
    message.channel.send(`This server's name is: ${message.guild.name}`);
  } else if (command === 'serverStats') {
    message.channel.send(
      `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`,
    );
  } else if (command === 'user-info') {
    message.channel.send(
      `Your username: ${message.author.username}\nYour ID: ${message.author.id}`,
    );
  } else if (command === 'args-info') {
    if (!args.length) {
      return message.channel.send(
        `You didn't provide any arguments, ${message.author}!`,
      );
    } else if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    message.channel.send(`First argument: ${args[0]}`);
  } else if (command === 'kick') {
    // Grab the "first" mentioned user from the message
    // This will return a `User` object, just like `message.author`
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to kick them!');
    }

    const taggedUser = message.mentions.users.first();

    message.channel.send(`You wanted to kick: ${taggedUser.username}`);
  } else if (command === 'avatar') {
    if (!message.mentions.users.size) {
      return message.channel.send(
        `Your avatar: <${message.author.displayAvatarURL({
          format: 'png',
          dynamic: true,
        })}>`,
      );
    }

    const avatarList = message.mentions.users.map((user) => {
      return `${user.username}'s avatar: <${user.displayAvatarURL({
        format: 'png',
        dynamic: true,
      })}>`;
    });

    // Send the entire array of strings as a message
    // By default, discord.js will `.join()` the array with `\n`
    message.channel.send(avatarList);
  } else if (command === 'prune') {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply("that doesn't seem to be a valid number.");
    } else if (amount < 2 || amount > 100) {
      return message.reply('you need to input a number between 2 and 100.');
    }

    message.channel.bulkDelete(amount, true).catch((err) => {
      console.error(err);
      message.channel.send(
        'there was an error trying to prune messages in this channel!',
      );
    });
  }
});

// login to Discord with your app's token
client.login(token);
