const Note = require("../database/models/note.model");
const { RichEmbed } = require("discord.js");

//Simple version, without validation or sanitation
noteDb = {};

noteDb.create = function(msg, args, res) {
  args = args.join(" ").split(", ");
  let note = new Note({
    title: args[0],
    text: args[1],
    postedBy: msg.author.username
  });

  note.save(function(err) {
    if (err) {
      console.log(err);
    }
    msg.reply("note created successfully");
  });
};

noteDb.read = function(msg, args, res) {
  let findObj = {
    title: args.slice(1).join(" "),
    postedBy: msg.author.username
  };
  Note.findOne(findObj, function(err, note) {
    if (err) throw err;
    if (note) {
      try {
        const embed = new RichEmbed()
          .setTitle(note.title)
          .setColor(0xf26baa)
          .setDescription(note.text);
        msg.channel.send(embed);
      } catch (error) {
        console.warn(`readNote, failed to find ${title}`);
      }
    } else {
      msg.reply("That note doesn't exist");
    }
  });
};

noteDb.edit = function(msg, args, res) {
  args = args.join(" ").split(", ");
  let findObj = { title: args[0], postedBy: msg.author.username };
  try {
    Note.findOneAndUpdate(findObj, { text: args[1] }, function(err, note) {
      if (err) return null;
      msg.reply("note udpated.");
    });
  } catch (error) {
    console.error(error);
  }
};

noteDb.delete = function(msg, args, res) {
  let findObj = {
    title: args.slice(1).join(" "),
    postedBy: msg.author.username
  };
  try {
    Note.findOneAndDelete(findObj, function(err) {
      if (err) return err;
      msg.reply("Deleted successfully!");
    });
  } catch (error) {
    console.error(error);
  }
};

noteDb.list = function(msg, args, res) {
  let findObj = { postedBy: msg.author.username };
  Note.find(findObj, function(err, note) {
    if (err) return err;
    let titles = [];
    for (x in note) {
      titles.push(note[x].title);
    }
    if (titles.length == 0) {
      msg.reply("Can't find any notes");
    } else {
      try {
        const embed = new RichEmbed()
          .setTitle("Note list")
          .setColor(0xf26baa)
          .setDescription(titles.join("\n"));
        msg.channel.send(embed);
      } catch (error) {
        msg.reply("Can't find any notes");
        console.warn(
          `list, failed to find any notes for ${msg.author.username}`
        );
      }
    }
  });
};

module.exports = noteDb;
