import { CommandInteraction, REST, SlashCommandBuilder } from "discord.js"
import {useAppStore} from'../../store/app.js'
import * as ping from "../ping/index.js"
export const command = new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads a command.')
    .addStringOption(option =>
        option.setName('command')
            .setDescription('The command to reload.')
            .setRequired(true))
   /**
     * @param {CommandInteraction} interaction
     */
export const action = async(interaction) =>{
    if(interaction.user.id !== process.env.ADMIN_ID){
        interaction.reply("此指令開發者才能使用")
        return
    }
    const appStore = useAppStore()
    const commandName = interaction.options.getString('command', true)
    const command = appStore.commandsActionMap.get(commandName)
		if (!command) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		}
    console.log(command)
    try {
        appStore.commandsActionMap.delete(commandName)
        console.log(appStore.commandsActionMap)
        appStore.commandsActionMap.set(ping.command.name, ping.action);
        console.log(appStore.commandsActionMap)
        await interaction.reply(`Command \`${commandName}\` was reloaded!`);
    } catch (error) {
        console.error(error);
        await interaction.reply(`There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``);
    }
}