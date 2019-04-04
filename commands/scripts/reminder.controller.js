const Reminder = require('../database/models/reminder.model')
const { RichEmbed } = require('discord.js')

reminderDb = {}

const daysInMonth = {
    Jan: 31,
    Feb: 28,
    Mar: 31,
    Apr: 30,
    May: 31,
    Jun: 30,
    Jul: 31,
    Aug: 31,
    Sep: 30,
    Oct: 31,
    Nov: 30,
    Dec: 31,
}
let months = []
for (m in daysInMonth) {
    months.push(m)
}

reminderDb.createReminder = function(msg, args, res) {
    // kanna reminder please remind me to do stuff tomorrow 13:20
    let remindTime = args[1]
    let remindDay = args[0]

    let DATE = new Date()
    let month = months[DATE.getMonth()]
    let date = parseInt(DATE.getDate()) + parseInt(remindDay)

    if (date > daysInMonth[month]) {
        if (month === 'Dec') {
            date -= daysInMonth[months[DATE.getMonth()]]
            month = months[0]
        } else {
            date -= daysInMonth[months[DATE.getMonth()]]
            month = months[months.indexOf(month) + 1]
        }
    }

    remindTime = remindTime.split(':')
    remindTime[0] = parseInt(remindTime[0])
    remindTime[1] = parseInt(remindTime[1])
    let remindDate = [month, date, remindTime[0], remindTime[1]]

    let reminder = new Reminder({
        text: args.slice(2).join(' '),
        remindOn: remindDate,
        postedBy: msg.author.id,
    })

    reminder.save(function(err) {
        if (err) {
            console.error(err)
        }
        msg.reply('reminder created successfully')
    })
}

module.exports = reminderDb

setInterval(() => {
    x = new Date()
    let checkDate = [
        months[x.getMonth()],
        x.getDate(),
        x.getHours(),
        x.getMinutes(),
    ]
    let h = x.getHours() + ':' + x.getMinutes()
    console.log('checking reminders... ' + h)
    let findObj = { remindOn: checkDate }

    Reminder.findOne(findObj, (err, rem) => {
        if (err) return err

        try {
            if (rem) {
                const embed = new RichEmbed()
                    .setTitle('Reminder')
                    .setColor(0xf26baa)
                    .setDescription(rem.text)
                client.users.get(rem.postedBy).send(embed)

                // delete found reminder
                Reminder.findOneAndDelete(findObj, err => {
                    if (err) {
                        console.error(err)
                    }
                })
            }
        } catch (error) {
            console.error(error)
        }
    })
}, 1 * 60 * 1000)
