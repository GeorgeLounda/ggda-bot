import { SlashCommandBuilder } from "discord.js"
const xlsx = require('xlsx');

export const command = new SlashCommandBuilder()
.setName('eat')
.setDescription('隨機抽食物')

        


export const action = async(interaction) =>{
   const foodmenu = xlsx.readFile(process.env.EATMENU_PLACE)
   const sheetNames = foodmenu.SheetNames;
   const food = foodmenu.Sheets[sheetNames[0]];
   const range = xlsx.utils.decode_range(food['!ref'])
   const food_address = {c: 0, r: Math.floor(Math.random() * (range.e.c + 1))};
   const choose = xlsx.utils.encode_cell(food_address)
   await interaction.reply(food[choose].v)

}


