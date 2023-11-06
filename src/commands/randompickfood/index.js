import { EmbedBuilder,SlashCommandBuilder } from "discord.js"
const xlsx = require('xlsx');

export const command = new SlashCommandBuilder()
.setName('吃什麼')
.setDescription('隨機抽食物(只有要抽的話不用加東西)')

        


export const action = async(interaction) =>{
   const foodmenu = xlsx.readFile(process.env.EATMENU_PLACE)
   const sheetNames = foodmenu.SheetNames;
   const food = foodmenu.Sheets[sheetNames[0]];
   const range = xlsx.utils.decode_range(food['!ref'])
   const food_address = {c: 0, r: Math.floor(Math.random() * (range.e.r + 1))};
   const choose = xlsx.utils.encode_cell(food_address)
   const embed = new EmbedBuilder()
         .setTitle(`${food[choose].v}`)
         .setColor("Random")
   interaction.reply({content:`<@${interaction.user.id}> 最想要吃的是...`,embeds:[embed]})
   

}