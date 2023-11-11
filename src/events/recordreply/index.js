import { Events } from "discord.js"
const xlsx = require('xlsx');
export const event = {
    name:Events.MessageCreate,

}
/**
 * 
 * @param {MessageEvent} message 
 * 
 */
export const action = async(message) => {
    if(message.author.bot){return}
    if (message.content.includes("/名言記錄 ")){
        try{
            const repliedTo = await message.channel.messages.fetch(message.reference.messageId)
            const path = "C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/recordreply/saying.xlsx"
            const saying = xlsx.readFile(path)
            const sheetNames = saying.SheetNames;
            const sayingsheet = saying.Sheets[sheetNames[0]];
            xlsx.utils.sheet_add_aoa(sayingsheet, [[message.content.slice(6),repliedTo.author.id,repliedTo.content,repliedTo.createdAt]], {origin: -1})
            xlsx.writeFile(saying,path)
 
            await message.reply({content:`${repliedTo.content} <@${repliedTo.author.id}> ${repliedTo.createdAt}`,allowed_mentions: {
                "parse": []
              }})
        }catch(error){
            console.log(error)
            await message.reply({ content: '無法辨別指令', ephemeral: true })
        }
    }
}