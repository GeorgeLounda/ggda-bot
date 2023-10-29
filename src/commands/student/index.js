import { SlashCommandBuilder } from "discord.js"

export const command = new SlashCommandBuilder()
    .setName("學生")
    .setDescription("學生資訊")
    .addStringOption(option =>
        option.setName('選擇學生')
            .setDescription('哪位學生')
            .setRequired(true)
            .addChoices(
                { name: "大野 月夜", value: "大野 月夜" },
                { name: "桑上 佳穗", value: "桑上 佳穗" },
                { name: "棗 伊呂波", value: "棗 伊呂波" },        
            ))

export const action = async(ctx) =>{
    const student = ctx.options.getString('選擇學生');
    await ctx.channel.send({files: [process.env.STUDENT_IMAGE_PLACE + student + ".png"]})
}