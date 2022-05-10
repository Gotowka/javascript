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
		const osoba = interaction.options.getUser('user');
		const guild = interaction.guild
		const member = await client.users.cache.get(osoba.id); 
		const memberguild = await guild.members.cache.get(osoba.id); 
		const datadstworzenia = member?.createdAt; // Data stworzenia konta
		const datadolaczenie = memberguild.joinedAt; // Data dołączenia na serwer
		const ranga = interaction.member.roles.highest // Najwysza ranga
		const stworzyl = Math.round(datadstworzenia.getTime() / 1000) // Data stworzenia (UNIX)
		const dolaczyl = Math.round(datadolaczenie.getTime() / 1000) // Data dolaczenia (UNIX)
		await member.fetch(); 
		if (!member.banner) { //Sprawdzanie czy osoba ma banner
			const embed = new MessageEmbed() // Embed bez banneru
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: `${interaction.member.user.displayAvatarURL({ dynamic: true })}`})
			.setDescription(`

			**Konto:**

			**Id:** \`${member.id}\`
			**Avatar:** [Kliknij](${member.displayAvatarURL({ dynamic: true })}})
			**Badges:** ${member?.flags?.toArray() ?? (await member.user?.fetchFlags())?.toArray()}
			**Stworzenie:** <t:${stworzyl}:R>
			
			**Serwerowy:**

			**Member:** ${member}
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

			**Id:** \`${member.id}\`
			**Avatar:** [Kliknij](${member.displayAvatarURL({ dynamic: true })}})
			**Banner:** [Kliknij](${member.bannerURL({ dynamic: true, format: 'png', size: 4096 })})
			**Badges:** ${member?.flags?.toArray() ?? (await member.user?.fetchFlags())?.toArray()}
			**Stworzenie:** <t:${stworzyl}:R>
			
			**Serwerowy:**

			**Member:** ${member}
			**Ranga:** ${ranga}
			**Dołączenie:** <t:${dolaczyl}:R>
			`)
			.setImage(member.bannerURL({ dynamic: true, format: 'png', size: 4096 }))
			.setColor(interaction.guild.me.displayColor);
            interaction.reply({ embeds: [embed], ephemeral: false, allowedMentions: { repliedUser: false } });
	},
};
