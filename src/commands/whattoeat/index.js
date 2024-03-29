import { EmbedBuilder, SlashCommandBuilder } from "discord.js"
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
   .addSubcommand(subcommand =>
      subcommand
         .setName("列出名單")
         .setDescription('列出名單中的食物')
      )
        


export const action = async(interaction) =>{
   const foodmenu = xlsx.readFile(process.env.EATMENU_PLACE)
   const sheetNames = foodmenu.SheetNames;
   const food = foodmenu.Sheets[sheetNames[0]];
   var range = xlsx.utils.decode_range(food['!ref'])

   if (interaction.options.getSubcommand('食物名單') === '添加食物'){
      const addfood = interaction.options.getString('加入')
      xlsx.utils.sheet_add_aoa(food, [[addfood,interaction.user.tag,interaction.user.id]], {origin: -1})
      xlsx.writeFile(foodmenu,process.env.EATMENU_PLACE)
      interaction.reply({content:`<@${interaction.user.id}> 添加 ${addfood} 成功!! `,allowedMentions: {
         "parse": []
       }})
      
   }else if (interaction.options.getSubcommand('食物名單') === '刪除食物'){
      if(range.e.r === 0){
         interaction.reply("名單內應至少保持一項食物")
         return
      }
      const deletefood = interaction.options.getString('刪除')
      for(var food_index = range.s.r;food_index <= range.e.r;food_index++){
         if(food[xlsx.utils.encode_cell({c: 0, r:food_index})].v === deletefood){
            for (var replace_index = food_index;replace_index <=range.e.r;replace_index++){
               food[xlsx.utils.encode_cell({c: 0, r:replace_index})] = food[xlsx.utils.encode_cell({c: 0, r:replace_index+1})]
               food[xlsx.utils.encode_cell({c: 1, r:replace_index})] = food[xlsx.utils.encode_cell({c: 1, r:replace_index+1})]
               food[xlsx.utils.encode_cell({c: 2, r:replace_index})] = food[xlsx.utils.encode_cell({c: 2, r:replace_index+1})]
            }
            range.e.r -= 1
            food["!ref"] = xlsx.utils.encode_range(range)
            xlsx.writeFile(foodmenu,process.env.EATMENU_PLACE)
            interaction.reply({content:`<@${interaction.user.id}> 刪除 ${deletefood} 成功!! `,allowedMentions: {
               "parse": []
             }})
            return;
         }
       
      }
      interaction.reply(`名單中找不到 ${deletefood} `)
   }else if (interaction.options.getSubcommand('食物名單') === '查詢食物'){
      const searchfood = interaction.options.getString('查詢')
      for(var food_index = range.s.r;food_index <= range.e.r;food_index++){
         if(food[xlsx.utils.encode_cell({c: 0, r:food_index})].v === searchfood){
            const food_adder = food[xlsx.utils.encode_cell({c: 2, r:food_index})]
            interaction.reply({content:`${searchfood} 是由 <@${food_adder.v}> 添加!! `,allowedMentions: {
               "parse": []
             }})

            return;
         }
      }
      interaction.reply(`名單中找不到 ${searchfood} `)
   }else if (interaction.options.getSubcommand('食物名單') === '列出名單'){
      var fooditem = ""
      for(var fooditem_index = range.s.r;(fooditem_index <= range.e.r) && (fooditem_index <= 46);fooditem_index++){
         fooditem+=food[xlsx.utils.encode_cell({c: 0, r:fooditem_index})].v
         fooditem+="\n"
      }
      if(range.e.r > 46){
         fooditem+=`...還有 ${range.e.r - 46} 個食物等等`
         const embed = new EmbedBuilder()
         .setTitle(`食物名單`)
         .setDescription(`${fooditem}`)
         .setColor(0x48d8d8)
      interaction.reply({embeds:[embed]})
      }else{
      const embed = new EmbedBuilder()
         .setTitle(`食物名單`)
         .setDescription(`${fooditem}`)
         .setColor(0x48d8d8)
      interaction.reply({embeds:[embed]})}
    
   }

}


