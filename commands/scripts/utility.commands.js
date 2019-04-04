const { RichEmbed } = require('discord.js') // import rich embed
const config = require('../../config.json') //
const { Translate } = require('@google-cloud/translate')

const projectId = config.googleApiProjectId
const utility = {}

// test command
utility.ping = msg => {
    msg.reply(`I'm alive!`)
}

// translate command, uses the google cloud translation api
utility.translate = async (msg, args) => {
    const translate = new Translate({ projectId })
    const target = args[0]
    const text = args.slice(1).join(' ')

    // translate
    let [translation] = await translate.translate(text, target)
    let desc = `\n${text}\n\n${translation}`

    // detect language
    let [detection] = await translate.detect(text)
    let detect = detection.language

    try {
        const embed = new RichEmbed()
            .setTitle(`${detect} > ${target}`)
            .setColor(0xff0000)
            .setDescription(desc)
        msg.channel.send(embed)
    } catch (error) {
        msg.reply('sorry, there was an error embeding the translation')
        console.error(
            `Failed to embed the translation:\ntext: ${text}\ntarget: ${target}\ndetection: ${detect}\ntranslation: ${translation}`
        )
    }
}

module.exports = utility
