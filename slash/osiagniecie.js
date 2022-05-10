const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {

	name: 'osiagniecia', // Nazwa slashu
	description: "Osiągnij osiągnięcie", // Opis slashu
	options: [ // Opcje
		{
			name: 'tresc', // Nazwa opcji
			description: 'Podaj jakie osiągnięcie zdobywasz', // Opis opcji
		    type: '3', // Type 3 = text
            required: true // Wymagane 
		},
	],
run: async (interaction) => {
	const content = interaction.options.getString('tresc'); // Pobieranie tresci
    const random = Math.round(Math.random()* 100 + 1) // Losowy nummer od 1 do 100 żeby był inny obrazek
    const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setImage(`https://minecraftskinstealer.com/achievement/${random}/Osiagniecie+Zdobyte/${content}`)
        interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    }
} 
