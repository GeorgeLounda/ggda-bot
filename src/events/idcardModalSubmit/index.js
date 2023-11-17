import { 
    Events,
    AttachmentBuilder,
    ModalSubmitInteraction,
} from "discord.js";
import  Canvas from'@napi-rs/canvas'

export const event = {
    name:Events.InteractionCreate,

}
/**
 * 
 * @param {ModalSubmitInteraction} interaction 
 * @param {Canvas} Canvas
 */
export const action = async(interaction) => {
    if(!interaction.isModalSubmit()){return}
    if(interaction.customId !==`id-<@${interaction.user.id}>`){return}
    try{
        Canvas.GlobalFonts.registerFromPath("C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/idcardModalSubmit/GlowSansTC-Normal-v0.93/GlowSansTC-Normal-Heavy.otf",'GlowSansTC' )
        Canvas.GlobalFonts.registerFromPath("C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/idcardModalSubmit/RoGSanSrfStd-Bd.otf",'RoGSanSrfStd-Bd' )
        Canvas.GlobalFonts.registerFromPath("C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/idcardModalSubmit/GlowSansTC-Extended-Bold.otf",'GlowSansTC-Extended-Bold' )

    const idText = interaction.fields.getTextInputValue("id")
    const typeText = interaction.fields.getTextInputValue("type")
    const monthText = interaction.fields.getTextInputValue("month")
    const dayText = interaction.fields.getTextInputValue("day")
    const nameText = interaction.fields.getTextInputValue("name")


    const canvas = Canvas.createCanvas(860, 540);
    const context = canvas.getContext('2d');

	const background = await Canvas.loadImage("C:/Users/糾舉浪打/Desktop/discord gg人/ggda-bot/src/events/idcardModalSubmit/background.png")

    context.drawImage(background, 0,0,canvas.width,canvas.height);
    context.strokeRect(0, 0, canvas.width, canvas.height);

	const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ extension: 'jpg' }))

    context.drawImage(avatar, 60, 180, 250, 250);

	context.font = "40px GlowSansTC"

	context.fillStyle = 'black';
   


    context.fillText(typeText, 450, 270)
    context.font = "50px GlowSansTC-Extended-Bold"
    context.fillStyle = 'black';
    context.fillText(nameText, 450, 400)
    context.font = "35px RoGSanSrfStd-Bd"
    context.fillStyle = 'black';
    context.fillText(idText, 450, 210)

    context.font = "18px RoGSanSrfStd-Bd"
    context.fillText(monthText, 463-(context.measureText(monthText).width/2), 322)
    context.fillText(dayText, 513-(context.measureText(dayText).width/2), 322)



  





	const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

	interaction.reply({ content: `<@${interaction.user.id}>`,files: [attachment] });

    
   
    }catch(error){
        console.log(error)
    }
    
  

}