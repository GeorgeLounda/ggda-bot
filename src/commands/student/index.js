import { SlashCommandBuilder } from "discord.js"
import { useAppStore } from "../../store/app"
export const command = new SlashCommandBuilder()
.setName('student')
.setDescription('輸入學生')
.addStringOption(option =>
    option.setName('選擇學生')
        .setDescription('填入名字')
        .setAutocomplete(true))

export const autocomplete = async(interaction) =>{
    const appStore = useAppStore()
    const focusedOption = interaction.options.getFocused(true);
    let choices;

    if (focusedOption.name === '選擇學生') {
        choices = appStore.student_name
     }
    const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));

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

export const action = async(interaction) =>{
    try{
        const student = interaction.options.getString('選擇學生');
        await interaction.channel.send({files: [process.env.STUDENT_IMAGE_PLACE + student + ".png"]})
    }catch (error) {
        try{
            const student = interaction.options.getString('選擇學生');
            await interaction.channel.send({files: [process.env.STUDENT_IMAGE_PLACE + student + ".jpg"]})
        }catch (error){        
            console.error(error);
            await interaction.reply({ content: '無法辨別學生名字', ephemeral: true });
        }

    }
}
