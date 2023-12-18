import { ChatInputCommandInteraction, Events} from "discord.js"
import { useAppStore } from "../../store/app"

export const event = {
    name:Events.InteractionCreate,

}
/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 * 
 */
export const action = async(interaction) => {
    if(!interaction.isChatInputCommand()){return}
    const appStore = useAppStore()
    const action = appStore.commandsActionMap.get(interaction.commandName)
    if(process.env.MAINTAINCE === "true" && interaction.user.id !== process.env.ADMIN_ID)
    {
        interaction.reply("系統維護中")
        console.log(`${interaction.guildId} 的 ${interaction.user.tag} 嘗試使用指令 ${interaction.commandName}`)
        console.log("若要更改狀態 請至.env將MAINTAINCE改為 'false' ")
        
    }
    else{
        try{
            await action(interaction)
        }catch(error){
            console.error(error);
            await interaction.reply({ content: '發生不明錯誤', ephemeral: true })
        } 
    }
}