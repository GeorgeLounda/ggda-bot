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
.addSubcommand(subcommand =>
   subcommand
      .setName('查詢食物')
      .setDescription('查詢名單中的食物跟添加者')
      .addStringOption((option)=>
         option.setName("查詢")
         .setDescription('查詢名單中的食物跟添加者')
         .setRequired(true)
      ))

        


export const action = async(interaction) =>{
   const foodmenu = xlsx.readFile(process.env.EATMENU_PLACE)
   const sheetNames = foodmenu.SheetNames;
   const food = foodmenu.Sheets[sheetNames[0]];
   var range = xlsx.utils.decode_range(food['!ref'])

   if (interaction.options.getSubcommand('食物名單') === '添加食物'){
      const addfood = interaction.options.getString('加入')
      xlsx.utils.sheet_add_aoa(food, [[addfood,interaction.user.tag]], {origin: -1})
      xlsx.writeFile(foodmenu,process.env.EATMENU_PLACE)
      interaction.reply(`${interaction.user.tag} 添加 ${addfood} 成功!! `)
   }else if (interaction.options.getSubcommand('食物名單') === '刪除食物'){
      const deletefood = interaction.options.getString('刪除')
      for(var food_index = range.s.r;food_index <= range.e.r;food_index++){
         if(food[xlsx.utils.encode_cell({c: 0, r:food_index})].v === deletefood){
            for (var replace_index = food_index;replace_index <=range.e.r;replace_index++){
               food[xlsx.utils.encode_cell({c: 0, r:replace_index})] = food[xlsx.utils.encode_cell({c: 0, r:replace_index+1})]
               food[xlsx.utils.encode_cell({c: 1, r:replace_index})] = food[xlsx.utils.encode_cell({c: 1, r:replace_index+1})]
            }
            range.e.r -= 1
            food["!ref"] = xlsx.utils.encode_range(range)
            xlsx.writeFile(foodmenu,process.env.EATMENU_PLACE)
            interaction.reply(`${interaction.user.tag} 刪除 ${deletefood} 成功!! `)
            return;
         }
       
      }
      interaction.reply(`名單中找不到 ${deletefood} `)
   }else if (interaction.options.getSubcommand('食物名單') === '查詢食物'){
      const searchfood = interaction.options.getString('查詢')
      for(var food_index = range.s.r;food_index <= range.e.r;food_index++){

         if(food[xlsx.utils.encode_cell({c: 0, r:food_index})].v === searchfood){
            const food_adder = food[xlsx.utils.encode_cell({c: 1, r:food_index})]
            interaction.reply(`${searchfood} 是由 ${food_adder.v} 添加!! `)
            return;
         }
      }
      interaction.reply(`名單中找不到 ${searchfood} `)
   }

}


