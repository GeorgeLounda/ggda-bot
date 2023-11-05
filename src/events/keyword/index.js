import { Events } from "discord.js"

export const event = {
    name:Events.MessageCreate,

}

export const action = async(message) => {
    if(message.author.bot){return}
    if (message.content.includes("幹你娘")){
        await message.reply("你娘卡好");
    }
    if (message.content === "你好"){
        await message.channel.send("你卡好")
    }
    if (message.content === "你GG大"){
        await message.channel.send({content:`<@${message.author.id}>`,allowedMentions: {
        parse: []
      }})
    }
}