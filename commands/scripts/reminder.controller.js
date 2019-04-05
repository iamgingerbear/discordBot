const Reminder = require("../database/models/reminder.model");

reminderDb = {};

reminderDb.daysInMonth = {
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
  Dec: 31
};
reminderDb.months = [];
for (m in reminderDb.daysInMonth) {
  reminderDb.months.push(m);
}

reminderDb.reminder = function(msg, args, res) {
  // kanna reminder please remind me to do stuff tomorrow 13:20
  let remindTime = args[1];
  let remindDay = args[0];

  let DATE = new Date();
  let month = reminderDb.months[DATE.getMonth()];
  let date = parseInt(DATE.getDate()) + parseInt(remindDay);

  if (date > reminderDb.daysInMonth[month]) {
    if (month === "Dec") {
      date -= reminderDb.daysInMonth[reminderDb.months[DATE.getMonth()]];
      month = reminderDb.months[0];
    } else {
      date -= reminderDb.daysInMonth[reminderDb.months[DATE.getMonth()]];
      month = reminderDb.months[reminderDb.months.indexOf(month) + 1];
    }
  }

  remindTime = remindTime.split(":");
  remindTime[0] = parseInt(remindTime[0]);
  remindTime[1] = parseInt(remindTime[1]);
  let remindDate = [month, date, remindTime[0], remindTime[1]];

  let reminder = new Reminder({
    text: args.slice(2).join(" "),
    remindOn: remindDate,
    postedBy: msg.author.id
  });

  reminder.save(function(err) {
    if (err) {
      console.error(err);
    }
    msg.reply("reminder created successfully");
  });
};

module.exports = reminderDb;
