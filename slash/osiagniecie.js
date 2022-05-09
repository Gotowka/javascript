const { MessageEmbed, Client, CommandInteraction } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {

	name: 'osiagniecia',
	description: "Osiągnij osiągnięcie",
	options: [
		{
			name: 'tresc',
			description: 'Podaj jakie osiągnięcie zdobywasz',
		    type: '3',
            required: true
		},
	],
run: async (interaction) => {
	const tresc = interaction.options.getString('tresc');
    const random = Math.round(Math.random()* 100 + 1)
    const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setImage(`https://minecraftskinstealer.com/achievement/${random}/Osiagniecie+Zdobyte/${tresc}`)
        interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    }
} 
