const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'osoba', // Nazwa slashu
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

	run: async (interaction) => {
		const member = interaction.options.getUser('user');
		const guild = interaction.guild
		const { user } = member;
		const memberguild = guild.members.cache.get(member.id); 
		const dateCreated = member?.createdAt; // Data stworzenia konta
		const dateJoined = memberguild.joinedAt; // Data dołączenia na serwer
		const highestrole = interaction.member.roles.highest // Najwysza ranga
		const usercreatedHEX = Math.round(dateCreated.getTime() / 1000) // Data stworzenia (UNIX)
		const userjoinedserverHEX = Math.round(dateJoined.getTime() / 1000) // Data dolaczenia (UNIX)
		await member.fetch(); 
		if (!member.banner) { //Sprawdzanie czy osoba ma banner
			const embed = new MessageEmbed() // Embed bez banneru
			.setAuthor({ name: `${interaction.member.user.tag}`, iconURL: `${interaction.member.user.displayAvatarURL({ dynamic: true })}`})
			.setDescription(`

			**Konto:**

			**Id:** \`${member.id}\`
			**Avatar:** [Kliknij](${member.displayAvatarURL({ dynamic: true })}})
			**Badges:** ${member?.flags?.toArray() ?? (await member.user?.fetchFlags())?.toArray()}
			**Stworzenie:** <t:${usercreatedHEX}:R>
			
			**Serwerowy:**

			**Member:** ${member}
			**Ranga:** ${highestrole}
			**Dołączenie:** <t:${userjoinedserverHEX}:R>
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
			**Stworzenie:** <t:${usercreatedHEX}:R>
			
			**Serwerowy:**

			**Member:** ${member}
			**Ranga:** ${highestrole}
			**Dołączenie:** <t:${userjoinedserverHEX}:R>
			`)
			.setImage(member.bannerURL({ dynamic: true, format: 'png', size: 4096 }))
			.setColor(interaction.guild.me.displayColor);
            interaction.reply({ embeds: [embed], ephemeral: false, allowedMentions: { repliedUser: false } });
	},
};
