import { 
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
 
} from "discord.js";

export const command = new SlashCommandBuilder().setName("投票").setDescription("發起投票")
/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 * 
 */

export const action = async(interaction) =>{
try{
    const modal = new ModalBuilder()
        .setTitle("創立投票")
        .setCustomId(`poll-<@${interaction.user.id}>`)

    const TextInput = new TextInputBuilder()
        .setCustomId("poll-input")
        .setLabel("投票主題")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setMaxLength(1000)
        .setMinLength(1)

    const actionRow = new ActionRowBuilder().addComponents(TextInput)
    modal.addComponents(actionRow)
    await interaction.showModal(modal)




  

    
}catch(error){
    console.log(error)
}
}

