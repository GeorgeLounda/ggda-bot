import { SlashCommandBuilder,AttachmentBuilder } from "discord.js"
import  Canvas from'@napi-rs/canvas'
export const command = new SlashCommandBuilder()
    .setName("logo")
    .setDescription("生成logo")
    .addStringOption(option =>
        option.setName('左邊的內容')
            .setDescription('填左邊的內容')
            .setRequired(true)
            )
    .addStringOption(option =>
        option.setName('右邊的內容')
            .setDescription('填右邊的內容')
            .setRequired(true)
            )


/**
 * 
 * @param {Canvas} Canvas
 */
export const action = async(interaction) =>{
    Canvas.GlobalFonts.registerFromPath("C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/idcardModalSubmit/GlowSansTC-Normal-v0.93/GlowSansTC-Normal-Bold.otf",'GlowSansTC' )
    Canvas.GlobalFonts.registerFromPath("C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/idcardModalSubmit/RoGSanSrfStd-Bd.otf",'RoGSanSrfStd-Bd' )
    const content_left = interaction.options.getString('左邊的內容')
    const content_right = interaction.options.getString('右邊的內容')
    const canvas = Canvas.createCanvas(900, 250);
    const context = canvas.getContext('2d');

	const background = await Canvas.loadImage('C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/commands/logo_generate/wallpaper.png')
    const logo_cross = await Canvas.loadImage('C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/commands/logo_generate/cross.png')
    const logo_halo = await Canvas.loadImage('C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/commands/logo_generate/halo.png')
    context.drawImage(background, 0,0,canvas.width,canvas.height);
    context.strokeRect(0, 0, canvas.width, canvas.height);

	// Select the font size and type from one of the natively available fonts



    context.setTransform(1, 0, 0, 1, 0, 0)
   


    context.drawImage(logo_halo, 300,0,250,250);
    context.strokeRect(0, 0, canvas.width, canvas.height);

	// Select the font size and type from one of the natively available fonts

	context.font = "84px RoGSanSrfStd-Bd, GlowSansTC"
	// Select the style that will be used to fill the text in
	context.fillStyle = "#128AFA"
    context.setTransform(1, 0, -0.4, 1, 0, 0)
    const left = canvas.width / 2 - context.measureText(content_left).width
	// Actually fill the text with a solid color
	context.fillText(content_left, left, (canvas.height / 2) + 42)

    context.font = "84px RoGSanSrfStd-Bd, GlowSansTC"
	// Select the style that will be used to fill the text in
	context.fillStyle = 'black';
    context.setTransform(1, 0, -0.4, 1, 0, 0)
    context.lineWidth = 12;
    context.strokeStyle = "white"
    context.strokeText(content_right, (canvas.width / 2), (canvas.height / 2) + 42)
   
	// Actually fill the text with a solid color
	context.fillText(content_right, (canvas.width / 2), (canvas.height / 2) + 42)

    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.setTransform(1, 0, 0, 1, 0, 0)
   
    context.drawImage(logo_cross, 300, 0,250,250);




	const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

	interaction.reply({ content: `${content_left} + ${content_right}`,files: [attachment] });
}



