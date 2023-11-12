import { REST, Routes,Collection } from "discord.js"
import fg from "fast-glob"
import { useAppStore} from "@/store/app"

export const updateoneSlashCommands = async(commands) =>{

    const rest = new REST({version:10}).setToken(process.env.TOKEN)
    await rest.patch(
        Routes.applicationCommands(
            process.env.APPLICATOIN_ID,
        ),
        {
            body:commands
        },

    )

}


const updateSlashCommands = async(commands) =>{

    const rest = new REST({version:10}).setToken(process.env.TOKEN)
    await rest.put(
        Routes.applicationCommands(
            process.env.APPLICATOIN_ID,
        ),
        {
            body:commands
        },

    )

}


export const loadCommands = async() =>{
    const appStore = useAppStore()
    const commands = []
    const actions = new Collection()
    const autocom = new Collection()
    const files = await fg("./src/commands/**/index.js")
    for (const file of files){
        const cmd = await import(file)
        commands.push(cmd.command)

        if(cmd.command.name === '學生'||cmd.command.name === '名言'){
            autocom.set(cmd.command.name,cmd.autocomplete)
            actions.set(cmd.command.name,cmd.action)
        }else{
            actions.set(cmd.command.name,cmd.action)
        }
    }
    await updateSlashCommands(commands)
    appStore.commandsActionMap = actions
    appStore.autocom = autocom
    console.log(appStore.commandsActionMap)
    console.log(appStore.autocom)
    console.log("完成!");
}


export const loadEvents = async() =>{
    const appStore = useAppStore()
    const client = appStore.client
    const files = await fg("./src/events/**/index.js")
    for (const file of files){
        const eventFile = await import(file)

        if(eventFile.once){
            client.once(
                eventFile.event.name,
                eventFile.action
            )
        }
        else if(eventFile.auto){
            client.on(
                eventFile.event.name,
                eventFile.action
            )
        }
        else{
            client.on(
                eventFile.event.name,
                eventFile.action
            )
        }
    }
}