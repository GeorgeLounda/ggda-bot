import { Events } from "discord.js"
import { ActivityType } from "discord.js";
export const event = {
    name:Events.ClientReady,
    once:true,
}

export const action = async(c) => {
    console.log(`Logged in as ${c.user.tag}`);
    const status = await c.user.setActivity({
        type:ActivityType.Custom,
        name:"customstatus",
        state:"勝ち取りたい ものもない"

    })
}