
import { Client, Events, GatewayIntentBits } from "discord.js"
import dotenv from "dotenv"
import vueInit from "@/core/vue"
import { loadCommands,loadEvents} from "@/core/loader"
import { useAppStore } from "./store/app"
vueInit()
dotenv.config()
loadCommands()

// Create a new client instance
const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,

	],
})
const appStore = useAppStore()
appStore.client = client
loadEvents()







// Log in to Discord with your client's token
client.login(process.env.TOKEN);