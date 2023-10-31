import { SlashCommandBuilder } from "discord.js"


export const command = new SlashCommandBuilder().setName("ping").setDescription("ping command")

export const action = async(ctx) =>{
    try{
        ctx.reply("pong")
    }catch (error) {
        console.error(error);
        await interaction.reply({ content: '無法辨別指令', ephemeral: true });
    }

}