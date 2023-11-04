import { SlashCommandBuilder } from "discord.js"
const xlsx = require('xlsx');

export const command = new SlashCommandBuilder()
.setName('食物名單')
.setDescription('隨機抽食物(只有要抽的話不用加東西)')
.addSubcommand(subcommand =>
   subcommand
      .setName('添加食物')
      .setDescription('加入食物到抽選名單')
      .addStringOption((option)=>
         option.setName("加入")
         .setDescription('加入食物到抽選名單')
         .setRequired(true)
      ))
.addSubcommand(subcommand =>
   subcommand
      .setName('刪除食物')
      .setDescription('將食物從抽選名單刪除')
      .addStringOption((option)=>
         option.setName("刪除")
         .setDescription('將食物從抽選名單刪除')
         .setRequired(true)
      ))

        


export const action = async(interaction) =>{
   const foodmenu = xlsx.readFile(process.env.EATMENU_PLACE)
   const sheetNames = foodmenu.SheetNames;
   const food = foodmenu.Sheets[sheetNames[0]];
   const range = xlsx.utils.decode_range(food['!ref'])

   if (interaction.options.getSubcommand('食物名單') === '添加食物'){
      const addfood = interaction.options.getString('加入')
      xlsx.utils.sheet_add_aoa(food, [[addfood,interaction.user.tag]], {origin: -1})
      xlsx.writeFile(foodmenu,process.env.EATMENU_PLACE)
      interaction.reply(`${interaction.user.tag} 添加 ${addfood} 成功!! `)
   }else if (interaction.options.getSubcommand('食物名單') === '刪除食物'){
      interaction.reply("沒做")
   }else if (interaction.options.getSubcommand('食物名單') === '查詢食物'){
   const food_address = {c: 0, r: Math.floor(Math.random() * (range.e.r + 1))};
   const choose = xlsx.utils.encode_cell(food_address)
   interaction.reply(food[choose].v)
   }

}


