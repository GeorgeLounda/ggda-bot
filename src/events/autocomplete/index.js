import { Events } from "discord.js"
import { useAppStore } from "../../store/app"

export const event = {
    name:Events.InteractionCreate,
    auto:true

}

export const action = async(interaction) => {
    if(!interaction.isAutocomplete()){return}
    const appStore = useAppStore()
    const autocomplete = appStore.autocom.get(interaction.commandName)
    await autocomplete(interaction);
  

}