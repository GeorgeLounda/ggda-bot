import { Interaction,Events, ButtonInteraction } from "discord.js";
import fs from "fs"
export const event = {
    name:Events.InteractionCreate,

}
import formatResults from "../voteModalSubmit/voteline"

/**
 * @param {ButtonInteraction} interaction
 * 
 */

export const action = async(interaction) => {
    if(!interaction.isButton() || !interaction.customId){return}
    try{
        const[type, pollId,action] = interaction.customId.split(".")
        if(!type || !pollId || !action){return}
        if(type !== "poll"){return}

        await fs.readFile('C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/voteModalSubmit/modal.json', function (err, data) {
            const polldata = JSON.parse(data);

            const targetPollindex = polldata.findIndex(INDEX => INDEX.pollId === pollId)
            const targetMessage = interaction.channel.messages.cache.get(polldata[targetPollindex].messageId)
            const targetMessageEmbed = targetMessage.embeds[0]
        if (action === "end"){
            if((interaction.user.id !== polldata[targetPollindex].authorId ) && (!interaction.memberPermissions.has("Administrator"))){
                interaction.reply({ content: "只有發起人跟伺服器管理員能執行這操作", ephemeral: true })
                return
            }
            polldata[targetPollindex].status = "投票結束"
            targetMessageEmbed.data.color = 0xff6161
            targetMessageEmbed.fields[1].value = "投票結束"
            var upvote_num = polldata[targetPollindex].upvote.length
            var downvote_num = polldata[targetPollindex].downvote.length
            interaction.reply(`<@${interaction.user.id}> 結束了這場投票\n共有 **${upvote_num + downvote_num}** 人投票\n **${upvote_num}** 人贊成  **${downvote_num}** 人反對`)
            targetMessage.edit({
                embeds:[targetMessageEmbed],
                components: [],
            })
            fs.writeFile('C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/voteModalSubmit/modal.json', JSON.stringify(polldata, null, 2), function(err){
                if (err) throw err;
                console.log('投票結束');
              })
            return
        }
        if (action === "rejected"){
            if((interaction.user.id !== polldata[targetPollindex].authorId ) && (!interaction.memberPermissions.has("Administrator"))){
                interaction.reply({ content: "只有發起人跟伺服器管理員能執行這操作", ephemeral: true })
                return
            }
            polldata[targetPollindex].status = "投票作廢"
            targetMessageEmbed.data.color = 0xff6161
            targetMessageEmbed.fields[1].value = "投票作廢"
            targetMessageEmbed.fields[2].value = "\u200B"
            interaction.reply(`<@${interaction.user.id}> 作廢了這場投票`)
            targetMessage.edit({
                embeds:[targetMessageEmbed],
                components: [],
            })
            fs.writeFile('C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/voteModalSubmit/modal.json', JSON.stringify(polldata, null, 2), function(err){
                if (err) throw err;
                console.log('投票作廢');
              })
            return

        }
        if (action === "upvote"){
            if (polldata[targetPollindex].upvote.includes(interaction.user.id)){
                const up_delete_index = polldata[targetPollindex].upvote.indexOf(interaction.user.id)
                if (up_delete_index > -1) {
                    polldata[targetPollindex].upvote.splice(up_delete_index, 1);
                  }
                interaction.reply({ content: '已取消贊成票', ephemeral: true })
            }else if (polldata[targetPollindex].downvote.includes(interaction.user.id)){
                interaction.reply({ content: '已經投了反對票，若要取消投票請再點一次反對', ephemeral: true })
                return
            }else if((polldata[targetPollindex].upvote.includes(interaction.user.id) === false)){
                polldata[targetPollindex].upvote.push(interaction.user.id)
                interaction.reply({ content: '投贊成票成功', ephemeral: true })
            }
            targetMessageEmbed.fields[2].value = formatResults(polldata[targetPollindex].upvote,polldata[targetPollindex].downvote)
            targetMessage.edit({
                embeds:[targetMessageEmbed],
                components: [targetMessage.components[0],targetMessage.components[1]],
            })
            fs.writeFile('C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/voteModalSubmit/modal.json', JSON.stringify(polldata, null, 2), function(err){
                if (err) throw err;
                console.log('投贊成票成功');
              })
            return
        }
        if (action === "downvote"){
            if (polldata[targetPollindex].upvote.includes(interaction.user.id)){
                interaction.reply({ content: '已經投了贊成票，若要取消投票請再點一次贊成', ephemeral: true })
                return
            }else if (polldata[targetPollindex].downvote.includes(interaction.user.id)){
                interaction.reply({ content: '已取消反對票', ephemeral: true })
                const down_delete_index = polldata[targetPollindex].downvote.indexOf(interaction.user.id)
                if (down_delete_index > -1) {
                    polldata[targetPollindex].downvote.splice(down_delete_index, 1);
                }
            }else if((polldata[targetPollindex].downvote.includes(interaction.user.id) === false)){
                polldata[targetPollindex].downvote.push(interaction.user.id)
                interaction.reply({ content: '投反對票成功', ephemeral: true })
            }
            targetMessageEmbed.fields[2].value = formatResults(polldata[targetPollindex].upvote,polldata[targetPollindex].downvote)
            targetMessage.edit({
                embeds:[targetMessageEmbed],
                components: [targetMessage.components[0],targetMessage.components[1]],
            })
            fs.writeFile('C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/voteModalSubmit/modal.json', JSON.stringify(polldata, null, 2), function(err){
                if (err) throw err;
                console.log('投反對票成功');
              })
            return
        }
        if (err) throw err;
        })
        
    }catch(error){
        console.log(error)
    }
    
}