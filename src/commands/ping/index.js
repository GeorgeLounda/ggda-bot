import { SlashCommandBuilder } from "discord.js"
import { useAppStore } from "../../store/app"

export const command = new SlashCommandBuilder().setName("ping").setDescription("ping command")

export const action = async(interaction) =>{
    const appStore = useAppStore()
    try{
      
        interaction.reply({content:`<@${interaction.user.id}>`,allowedMentions: {
            "parse": []
          }})
    }catch (error) {
        console.error(error);
        await interaction.reply({ content: '無法辨別指令', ephemeral: true });
    }

}