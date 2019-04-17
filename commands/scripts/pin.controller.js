const Pin = require("../database/models/pin.model");
const { RichEmbed } = require("discord.js");

const pinDB = {};

pinDB.pin = function(msg, args, res) {
  args = args.join(" ").split(", ");
  let pin = new Pin({
    title: args[0],
    text: args[1],
    postedIn: msg.channel.id
  });

  pin.save(err => {
    if (err) throw err;
    msg.reply("I've pinned it");
  });
};

pinDB.read = (msg, args, res) => {
  let findObj = { title: args.slice(1).join(" "), postedIn: msg.channel.id };
  Pin.findOne(findObj, function(err, pin) {
    if (err) throw err;
    try {
      const embed = new RichEmbed()
        .setTitle(pin.title)
        .setColor(0xf26baa)
        .setDescription(pin.text);
      msg.channel.send(embed);
    } catch (error) {
      msg.reply(`Can't find that pin`);
      console.warn(`readPin, failed to find ${args.join(" ")}`);
    }
  });
};

pinDB.pins = (msg, args, res) => {
  let findObj = { postedIn: msg.channel.id };
  Pin.find(findObj, function(err, pin) {
    if (err) return err;
    let titles = [];
    for (x in pin) {
      titles.push(pin[x].title);
    }
    if (titles.length == 0) {
      msg.reply("Can't find any pins");
    } else {
      try {
        const embed = new RichEmbed()
          .setTitle("Pinned")
          .setColor(0xf26baa)
          .setDescription(titles.join("\n"));
        msg.channel.send(embed);
      } catch (error) {
        msg.reply("Can't find any pins");
        console.warn(`list, failed to find any pins for ${msg.channel.id}`);
      }
    }
  });
};

pinDB.delete = (msg, args, res) => {
  let findObj = { title: args.slice(1).join(" "), postedIn: msg.channel.id };
  try {
    Pin.findOneAndDelete(findObj, function(err) {
      if (err) return err;
      msg.reply("Deleted successfully!");
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = pinDB;
