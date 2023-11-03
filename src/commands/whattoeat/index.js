import { SlashCommandBuilder } from "discord.js"
const xlsx = require('xlsx');

export const command = new SlashCommandBuilder()
.setName('吃什麼')
.setDescription('隨機抽食物')
.addStringOption(option =>
   option.setName('添加食物')
      .setDescription('加入食物到抽選名單(如果只是要抽的話不用選填)'))

        


export const action = async(interaction) =>{
   const addfood = interaction.options.getString('添加食物') ?? '沒有添加任何東西'
   const foodmenu = xlsx.readFile(process.env.EATMENU_PLACE)
   const sheetNames = foodmenu.SheetNames;
   const food = foodmenu.Sheets[sheetNames[0]];
   const range = xlsx.utils.decode_range(food['!ref'])
   if (addfood !== '沒有添加任何東西'){
      xlsx.utils.sheet_add_aoa(food, [[addfood,interaction.user.tag]], {origin: -1})
      xlsx.writeFile(foodmenu,process.env.EATMENU_PLACE)
      interaction.reply(addfood + interaction.user.tag)
   }else{
   const food_address = {c: 0, r: Math.floor(Math.random() * (range.e.r + 1))};
   const choose = xlsx.utils.encode_cell(food_address)
   interaction.reply(food[choose].v)
   }

}


