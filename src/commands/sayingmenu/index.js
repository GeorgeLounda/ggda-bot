import { SlashCommandBuilder,EmbedBuilder, ModalBuilder, CommandInteraction } from "discord.js"
const xlsx = require('xlsx');
export const command = new SlashCommandBuilder()
.setName('語錄')
.setDescription('輸入名言')
.addStringOption(option =>
    option.setName('選擇名言')
        .setDescription('填入名言')
        .setRequired(true)
        .setAutocomplete(true))
        

export const autocomplete = async(interaction) =>{
    const focusedOption = interaction.options.getFocused(true);
    let choices;
    const path = "C:\\Users\\糾舉浪打\\Desktop\\discord gg人\\ggda-bot\\src\\events\\recordreply\\saying.xlsx"
    const saying = xlsx.readFile(path)
    const sheetNames = saying.SheetNames;
    const sayingsheet = saying.Sheets[sheetNames[0]];
    var range = xlsx.utils.decode_range(sayingsheet['!ref'])
    var saying_name = []
    try{
        for(var saying_index = range.s.r;saying_index <= range.e.r;saying_index++){
            const saying_adder = sayingsheet[xlsx.utils.encode_cell({c: 0, r:saying_index})]
            saying_name.push(saying_adder.v)   
        }
    }catch(error){
        console.log(error)
    }
    if (focusedOption.name === '選擇名言') {
        choices = saying_name
     }
    const filtered = choices.filter(choice => choice.includes(focusedOption.value));

    let options;
    if (filtered.length > 25) {
        options = filtered.slice(0, 25);
    } else {
        options = filtered;
    }

    await interaction.respond(
        options.map(choice => ({ name: choice, value: choice })),
    );
}
/**
     * @param {CommandInteraction} interaction
     */
export const action = async(interaction) =>{
        const sayingpick = interaction.options.getString('選擇名言')
    try{
        const path = "C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/recordreply/saying.xlsx"
        const saying = xlsx.readFile(path)
        const sheetNames = saying.SheetNames;
        const sayingsheet = saying.Sheets[sheetNames[0]];
        var range = xlsx.utils.decode_range(sayingsheet['!ref'])
        for(var saying_index = range.s.r;saying_index <= range.e.r;saying_index++){
            if(sayingsheet[xlsx.utils.encode_cell({c: 0, r:saying_index})].v === sayingpick){
                const saying_name = sayingsheet[xlsx.utils.encode_cell({c: 0, r:saying_index})].v
                const saying_authorid = sayingsheet[xlsx.utils.encode_cell({c: 1, r:saying_index})].v
                const saying_content = sayingsheet[xlsx.utils.encode_cell({c: 2, r:saying_index})].v
                const saying_time = sayingsheet[xlsx.utils.encode_cell({c: 3, r:saying_index})].v
                const member = interaction.guild.members.cache.get(saying_authorid)
                if (!member){
                    const sayingEmbed = new EmbedBuilder()
                    .setTitle(`「**${saying_content}**」`)
                    .setAuthor({ name: saying_name})
                    .setDescription(`\u200B`)
                    .addFields(
                        { name: `\u200B` , value:`-----------------------by <@${saying_authorid}>`,inline: true},
                    )
                    .setFooter({ text: `Said at ${new Date(saying_time).toString()}`});
                    interaction.reply({
                        content:`**${saying_name} 是 <@${saying_authorid}> 的名言**`,
                        allowedMentions: {
                            "parse": []
                        },
                        embeds: [sayingEmbed]
                    })
       
                   return;
                }
                const sayingEmbed = new EmbedBuilder()
                .setTitle(`「**${saying_content}**」`)
                .setAuthor({ name: saying_name})
                .setDescription(`\u200B`)
                .addFields(
                    { name: `\u200B` , value:`-----------------------by <@${saying_authorid}>`,inline: true},
                )
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: `Said at ${new Date(saying_time).toString()}`});
                interaction.reply({
                    content:`**${saying_name} 是 <@${saying_authorid}> 的名言**`,
                    allowedMentions: {
                        "parse": []
                    },
                    embeds: [sayingEmbed]
                })
   
               return;
            }
         }
         interaction.reply(`名單中找不到 ${sayingpick} `)
    }catch (error) {
        
            await interaction.reply({ content: '無法辨別指令抑或是成員不在此伺服器', ephemeral: true })
            console.log(error)
            console.log(`${interaction.user.displayName} 在用 ${interaction.commandName}.${sayingpick}`)

    }
}
