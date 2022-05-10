module.exports = {
    name: 'youtube',
	description: 'Zagraj w youtube together',
    type: 1,

    run: async (interaction, client) => {
const Discord = require('discord.js');
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);
const { channel } = interaction.member.voice;
if(!channel) {
    const embederror = new Discord.MessageEmbed()
            .setAuthor({ name: 'Błąd!'})
			.setColor(`RED`)
			.setTimestamp()
			.setDescription(`
				
            Dołącz na kanał głosowy!

			`)
            .setFooter({ text: `${interaction.member.user.username} (${interaction.member.user.id})`, iconURL: `${interaction.member.user.displayAvatarURL({ dynamic: true })}`})
		interaction.reply({ embeds: [embederror], ephemeral: true});
}
else if(channel) {

    const embed = new Discord.MessageEmbed()
            .setAuthor({ name: 'Sukces!'})
			.setColor(`RED`)
			.setTimestamp()
			.setDescription(`
				
            Aby oglądać youtube z kolegami, Klikaj w przycisk!

			`)
            .setFooter({ text: `${interaction.member.user.username} (${interaction.member.user.id})`, iconURL: `${interaction.member.user.displayAvatarURL({ dynamic: true })}`})
    client.discordTogether.createTogetherCode(channel.id, 'youtube').then(invite => {
    const button = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
        .setLabel(`Dolacz`)
        .setStyle(`LINK`)
        .setURL(`${invite.code}`)
        )
    interaction.reply({ embeds: [embed], components: [button], allowedMentions: { repliedUser: false } })
   
})}}};
