import { SlashCommandBuilder } from "discord.js"
import { useAppStore } from "../../store/app"
import * as ping from '../ping/index'
export const command = new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads a command.')
    .addStringOption(option =>
        option.setName('command')
            .setDescription('The command to reload.')
            .setRequired(true))

export const action = async(interaction) =>{
    if(interaction.user.id !== process.env.ADMIN_ID){
        interaction.reply("此指令開發者才能使用")
        return
    }
    /** 
    const appStore = useAppStore()
    const commandName = interaction.options.getString('command', true)
    appStore.commandsActionMap.delete(commandName)
	appStore.commandsActionMap.set(ping.command.name, ping.action)
	await interaction.reply(`Command ${ping.command.name} was reloaded!`)
    */
    interaction.reply("未完成")
}