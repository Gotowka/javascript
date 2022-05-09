const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'osoba2', // Nazwa slashu
	description: "Poznawanie informacji o danej osobie", // Opis slashu
	type: 1, // Type 1 = zwykły slash
	options: [ // Opcje
		{
			name: 'user', // Nazwa opcji
			description: 'Osoba o której chcesz poznać informacje', // Opis
			type: 6, // Type: 6 = Oznacz osobe
			required: true,
		},
	],

	run: async (interaction, client) => {
		let osoba = interaction.options.getUser('user');
		const user = await client.users.cache.get(osoba.id);
		const datadstworzenia = user.createdAt; // Data stworzenia konta
		const datadolaczenia = interaction.member.joinedAt; // Dołączenia
		const ranga = interaction.member.roles.highest // Najwysza ranga
		const stworzyl = Math.round(datadstworzenia.getTime() / 1000) // Data stworzenia (UNIX)
		const dolaczyl = Math.round(datadolaczenia.getTime() / 1000) // Data dołączenia (UNIX)
		await user.fetch(); 
		if (!user.banner) { //Sprawdzanie czy osoba ma banner
			const embed = new MessageEmbed() // Embed bez banneru
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: `${interaction.member.user.displayAvatarURL({ dynamic: true })}`})
			.setDescription(`

			**Konto:**

			**Id:** \`${user.id}\`
			**Avatar:** [Kliknij](${user.displayAvatarURL({ dynamic: true })}})
			**Badges:** ${user?.flags?.toArray() ?? (await member.user?.fetchFlags())?.toArray()}
			**Stworzenie:** <t:${stworzyl}:R>
			
			**Serwerowy:**

			**Member:** ${user}
			**Ranga:** ${ranga}
			**Dołączenie:** <t:${dolaczyl}:R>
			`)
			.setColor(interaction.guild.me.displayColor);
            interaction.reply({ embeds: [embed], ephemeral: false, allowedMentions: { repliedUser: false } });
		}

		const embed = new MessageEmbed() // Embed z bannerem
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: `${interaction.member.user.displayAvatarURL({ dynamic: true })}`})
			.setDescription(`

			**Konto:**

			**Id:** \`${user.id}\`
			**Avatar:** [Kliknij](${user.displayAvatarURL({ dynamic: true })}})
			**Banner:** [Kliknij](${user.bannerURL({ dynamic: true, format: 'png', size: 4096 })})
			**Badges:** ${user?.flags?.toArray() ?? (await member.user?.fetchFlags())?.toArray()}
			**Stworzenie:** <t:${stworzyl}:R>
			
			**Serwerowy:**

			**Member:** ${user}
			**Ranga:** ${ranga}
			**Dołączenie:** <t:${dolaczyl}:R>
			`)
			.setImage(user.bannerURL({ dynamic: true, format: 'png', size: 4096 }))
			.setColor(interaction.guild.me.displayColor);
            interaction.reply({ embeds: [embed], ephemeral: false, allowedMentions: { repliedUser: false } });
	},
};
