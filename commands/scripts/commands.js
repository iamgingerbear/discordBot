const utility = require('./utility.commands')
const voice = require('./voice.commands')
const note = require('./note.controller')
const pin = require('./pin.controller')
const reminder = require('./reminder.controller')
const help = require('./help')
const config = require('../../config.json')
const db = require('../database/db-base')
const fs = require('fs')

//start db
db()

let commands = {}
commands.config = config
commands.utility = utility
commands.voice = voice
commands.note = note
commands.pin = pin
commands.reminder = reminder
commands.help = help
commands.commandList = []
    .concat(Object.keys(utility))
    .concat(Object.keys(voice))
    .concat(Object.keys(note))
    .concat(Object.keys(pin))
    .concat(Object.keys(reminder))
    .concat(Object.keys(help))

module.exports = commands

// save config file every config.saveTimer minutes
setInterval(() => {
    console.log('saving config')
    fs.writeFile('../config.json', JSON.stringify(config), err => {
        if (err) throw err
    })
}, config.saveTimer * 60 * 1000)
