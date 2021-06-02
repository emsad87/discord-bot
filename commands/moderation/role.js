module.exports = {
	name: 'role',
	args: true,
	usage: '<user> <role>',
	execute(message, args) {
		message.channel.send('User set role command!');
	},
};