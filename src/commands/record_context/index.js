import {ContextMenuCommandBuilder, ApplicationCommandType } from "discord.js"
const xlsx = require('xlsx');

export const command = 
    new ContextMenuCommandBuilder()
        .setName("語錄記錄")
        .setType(ApplicationCommandType.Message)

export const action = async(interaction) =>{
    try{
        const repliedTo = await interaction.targetMessage
        const path = "C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/recordreply/saying.xlsx"
        const saying = xlsx.readFile(path)
        const sheetNames = saying.SheetNames;
        const sayingsheet = saying.Sheets[sheetNames[0]];
        xlsx.utils.sheet_add_aoa(sayingsheet, [[`${repliedTo.author.displayName}:${repliedTo.content.slice(0,5)}`,repliedTo.author.id,repliedTo.content,repliedTo.createdTimestamp]], {origin: -1})
        xlsx.writeFile(saying,path)

        await interaction.reply({content:`語錄 "**${repliedTo.author.displayName}:${repliedTo.content.slice(0,5)}**" by <@${repliedTo.author.id}> 記錄完成於 ${Date()}`,allowed_mentions: {
            "parse": []
          }})
    }catch(error){
        console.log(error)
        await interaction.reply({ content: '無法辨別指令', ephemeral: true })
    }

}