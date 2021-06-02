module.exports = {
  name: 'server-stats',
  description: 'Server stats!',
  execute(message, args) {
    message.channel.send(
      `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`,
    );
  },
};
