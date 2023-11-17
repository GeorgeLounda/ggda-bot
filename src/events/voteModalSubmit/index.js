import { 
    Events,
    ActionRowBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    InteractionCollector,
} from "discord.js";
import { randomUUID } from "crypto";
import fs from "fs"
import formatResults from "./voteline"
export const event = {
    name:Events.InteractionCreate,

}
/**
 * 
 * @param {InteractionCollector} interaction 
 * @returns 
 */
export const action = async(interaction) => {
    if(!interaction.isModalSubmit()){return}
    if(interaction.customId !==`poll-<@${interaction.user.id}>`){return}
    try{
        /**interaction.awaitModalSubmit({
            time: 1000 * 60 * 3,
            filter: i => i.user.id === interaction.user.id,
        }).catch(error => {
                console.error(error)
                interaction.channel.send("超過提交期限")
                return
            })
        */
        let pollMessage
        await interaction.deferReply({ephemeral:true})
        try{
            pollMessage = await interaction.channel.send("發起投票中, 請稍後...")
        }catch(error){
            interaction.editReply("創建投票活動失敗")
        }
  
 
    const pollText = interaction.fields.getTextInputValue("poll-input")


    
    const newPoll = {
        pollId:randomUUID(),
        authorId: interaction.user.id,
        guildId: interaction.guildId,
        messageId: pollMessage.id,
        content: pollText,
        status: "投票中",
        upvote:[],
        downvote:[]
    }
    fs.readFile('C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/voteModalSubmit/modal.json', function (err, data) {
        if (err) throw err;
        var json = JSON.parse(data);
        json.push(newPoll);    
        fs.writeFile('C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/voteModalSubmit/modal.json', JSON.stringify(json, null, 2), function(err){
          if (err) throw err;
          console.log('添加投票檔案成功');
        });
    })
    interaction.editReply("創建投票活動成功")
    
    const pollEmbed = new EmbedBuilder()
        .setAuthor({
            name: interaction.user.globalName,
            iconURL: interaction.user.displayAvatarURL({size:256}),
        })
        .addFields([
            {name: "投票主題",value:pollText},
            {name: "狀態",value:"投票中"},
            {name: "投票",value:formatResults(newPoll.upvote,newPoll.downvote)},
        ])
        .setColor("Yellow")


    const upvoteButton = new ButtonBuilder()
        .setEmoji("👍")
        .setLabel("贊成")
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`poll.${newPoll.pollId}.upvote`)

    const downvoteButton = new ButtonBuilder()
        .setEmoji("👎")
        .setLabel("反對")
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`poll.${newPoll.pollId}.downvote`)

    const approveButton = new ButtonBuilder()
        .setEmoji("✔️")
        .setLabel("結束投票")
        .setStyle(ButtonStyle.Success)
        .setCustomId(`poll.${newPoll.pollId}.end`)

    const rejectButton = new ButtonBuilder()
        .setEmoji("🚮")
        .setLabel("結果作廢")
        .setStyle(ButtonStyle.Success)
        .setCustomId(`poll.${newPoll.pollId}.rejected`)

    const firstRow = new ActionRowBuilder().addComponents(upvoteButton,downvoteButton)
    const secondRow = new ActionRowBuilder().addComponents(approveButton,rejectButton)

    
    pollMessage.edit({
        content: `${interaction.user} 投票已建立`,
        embeds:[pollEmbed],
        components: [firstRow,secondRow],
    })
    }catch(error){
        console.log(error)
    }
    
  

}