import { SlashCommandBuilder } from "discord.js"
import { useAppStore } from "../../store/app"

export const command = new SlashCommandBuilder().setName("ping").setDescription("ping command")

export const action = async(interaction) =>{



    try{
      
        interaction.reply({content:`<@${interaction.user.id}> `,allowed_mentions: {
            "parse": []
          }})

    }catch (error) {
        console.error(error);
        await interaction.reply({ content: '無法辨別指令', ephemeral: true });
    }

}