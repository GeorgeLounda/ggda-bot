import { 
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
 
} from "discord.js";

export const command = new SlashCommandBuilder().setName("自製id卡").setDescription("ba學生證")
/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 * 
 */

export const action = async(interaction) =>{
try{
    const modal = new ModalBuilder()
        .setTitle("自製學生證")
        .setCustomId(`id-<@${interaction.user.id}>`)

    const studentid = new TextInputBuilder()
        .setCustomId("id")
        .setLabel("學生id")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(30)
        .setMinLength(1)

    const studenttype = new TextInputBuilder()
        .setCustomId("type")
        .setLabel("學生種族")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(10)
        .setMinLength(1)
    const studentbirthmonth = new TextInputBuilder()
        .setCustomId("month")
        .setLabel("出生月份(xx月oo日的xx)")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(2)
        .setMinLength(1)
    const studentbirthday = new TextInputBuilder()
        .setCustomId("day")
        .setLabel("出生日(xx月oo日的oo)")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(2)
        .setMinLength(1)
    const studentname = new TextInputBuilder()
        .setCustomId("name")
        .setLabel("學生名字")
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(30)
        .setMinLength(1)
    const No_one = new ActionRowBuilder().addComponents(studentid)
    const No_two = new ActionRowBuilder().addComponents(studenttype)
    const No_three = new ActionRowBuilder().addComponents(studentbirthmonth)
    const No_four = new ActionRowBuilder().addComponents(studentbirthday)
    const No_five = new ActionRowBuilder().addComponents(studentname)
    modal.addComponents(No_one,No_two,No_three,No_four,No_five)
    await interaction.showModal(modal)
}catch(error){
    console.log(error)
    await interaction.reply("出錯")
}
}
