import { Events } from "discord.js"

export const event = {
    name:Events.MessageCreate,

}

export const action = async(message) => {
    if(message.author.bot){return}
    if (message.content === "你好"){
        await message.reply("你娘卡好");
    }
}