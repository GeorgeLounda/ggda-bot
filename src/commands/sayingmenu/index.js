import { SlashCommandBuilder } from "discord.js"
import { useAppStore } from "../../store/app"
const xlsx = require('xlsx');
export const command = new SlashCommandBuilder()
.setName('名言')
.setDescription('輸入名言')
.addStringOption(option =>
    option.setName('選擇名言')
        .setDescription('填入名言')
        .setRequired(true)
        .setAutocomplete(true))
        

export const autocomplete = async(interaction) =>{
    const appStore = useAppStore()
    const focusedOption = interaction.options.getFocused(true);
    let choices;
    const path = "C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/recordreply/saying.xlsx"
    const saying = xlsx.readFile(path)
    const sheetNames = saying.SheetNames;
    const sayingsheet = saying.Sheets[sheetNames[0]];
    var range = xlsx.utils.decode_range(sayingsheet['!ref'])
    var saying_name = []
    console.log(range)
    try{
        for(var saying_index = range.s.r;saying_index <= range.e.r;saying_index++){
            const saying_adder = sayingsheet[xlsx.utils.encode_cell({c: 0, r:saying_index})]
            saying_name.push(saying_adder.v)   
            console.log(saying_adder.v)
        }
    }catch(error){
        console.log(error)
    }
     console.log(saying_name)
    if (focusedOption.name === '選擇名言') {
        choices = saying_name
     }
    const filtered = choices.filter(choice => choice.includes(focusedOption.value));

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
        const saying = interaction.options.getString('選擇名言');
        await interaction.reply(saying)
    }catch (error) {
        
            await interaction.reply({ content: '無法辨別學生名字', ephemeral: true });
        

    }
}