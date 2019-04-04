const Discord = require('discord.js')
const commands = require('./commands/scripts/commands')
const config = commands.config
const fs = require('fs')

const client = new Discord.Client()

// console log that the bot logged in
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    // discard any message that is from the bot
    if (msg.author.id != client.user.id) {
        // react.random(msg)

        // split the message up into an array of strings so it's easier to deal with
        let args = msg.content.split(' ')

        // converting the prefix to lower case so that phone users don't get annoyed by the auto capitilsation, shifting here to remove the prefix from args
        let prefix = args.shift().toLowerCase()

        // if message doesn't start with the prefix ignore it
        if (prefix != config.prefix) return

        // doing the same with commands, just in case. shifting here to remove the command from args
        let command = args.shift().toLowerCase()

        // check to see if the command is valid
        if (commands.commandList.indexOf(command) == -1) {
            msg.reply(`Sorry, thats not a command.`)
        }

        // this will add a channel for commands to be called in, this is saved in the config file so can be edited manually
        // admins require manual adding of the admin id
        if (
            command === 'addchannel' &&
            config.admin.indexOf(msg.author.id) != -1
        ) {
            // check that the channel isn't already approved
            if (config.approvedChannels.indexOf(msg.channel.id) != -1) {
                // push the channel id to the approvedChannels array
                config.approvedChannels.push(msg.channel.id)

                // save the config file
                fs.writeFile('./config.json', JSON.stringify(config), err => {
                    if (err) throw err
                })
                msg.reply('Channel added')
            } else {
                msg.reply(`I'm already allowed in here!`)
            }
        }

        // ignore any message that isn't in the approvedChannels array
        if (config.approvedChannels.indexOf(msg.channel.id) === -1) return

        switch (command) {
            case 'ping':
                commands.utility.ping(msg)
                break

            case 'translate':
                commands.utility.translate(msg, args)
                break

            case 'play':
                args.unshift('play')

            case 'join':
                commands.voice.join(msg, args)
                break

            case 'playing':
                commands.voice.playing(msg)
                break

            case 'pause':
                commands.voice.pause(msg)
                break

            case 'skip':
                commands.voice.skip(msg)
                break

            case 'resume':
                commands.voice.resume(msg)
                break

            case 'playing':
                commands.voice.playing(msg)
                break

            case 'volume':
                commands.voice.volume(msg, args)
                break

            case 'stop':
                commands.voice.stop(msg)
                break

            case 'leave':
                commands.voice.leave(msg)
                break

            case 'queue':
                commands.voice.queue(msg, args)
                break

            case 'playlist':
                commands.voice.playlist(msg, args)
                break

            case 'create':
                commands.note.create(msg, args)
                break

            case 'delete':
                if (args[0] == 'note') {
                    commands.note.delete(msg, args)
                } else if (args[0] === 'pin') {
                    commands.pin.delete(msg, args)
                } else {
                    msg.reply('did you type that in correctly?')
                }
                break

            case 'edit':
                commands.note.edit(msg, args)
                break

            case 'list':
                commands.note.list(msg, args)
                break

            case 'read':
                if (args[0] == 'note') {
                    commands.note.read(msg, args)
                } else if (args[0] === 'pin') {
                    commands.pin.read(msg, args)
                } else {
                    msg.reply('did you type that in correctly?')
                }
                break

            case 'pin':
                commands.pin.pin(msg, args)
                break

            case 'pins':
                commands.pin.pins(msg, args)
                break

            case 'reminder':
                commands.reminder.reminder(msg, args)
                break

            case 'help':
                commands.help.help(msg)
                break
        }
    }
})

client.login(config.token)
