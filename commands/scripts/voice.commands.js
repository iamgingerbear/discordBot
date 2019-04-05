const { RichEmbed } = require("discord.js");
const playlists = require("./playlists.json");
const ytdl = require("ytdl-core");
const fs = require("fs");
const config = require("../../config.json");

const voice = {};

voice.setVolume = 10; // change this to adjust default volume
voice.Queue = [];
voice.QueueList = [];
voice.songLink = "";
voice.server = "";
voice.dispatcher = "";
voice.connection = "";

voice.join = async (msg, args) => {
  // check the user is in a voice channel before joining
  if (msg.member.voiceChannel) {
    msg.member.voiceChannel.join().then(connection => {
      voice.connection = connection;
      msg.reply(`I'm here!`);

      // check if the user wanted to start a broadcast
      if (args[0] == "play") {
        if (args[1]) {
          // check if the 'link' was a playlist
          if (Object.keys(playlists).indexOf(args[1]) != -1) {
            // push the playlist links to the queue, and push the titles to the queue list
            try {
              voice.Queue = playlists[args[1]].links.slice(0);
              let arr = playlists[args[1]].titles;
              voice.QueueList = voice.QueueList.concat(arr);
            } catch (err) {
              console.error(err);
            }
            // else check that the 'link' is a valid youtube url
          } else if (ytdl.validateURL(args[1])) {
            // add it to the queue and push it's title to the queue list
            voice.Queue.push(args[1]);
            ytdl.getBasicInfo(args[1], (err, info) => {
              if (err) {
                console.error(err);
              }
              if (info != undefined) {
                voice.QueueList.push(info.title);
              }
            });
          } else {
            msg.reply("did you type it in properly?");
            return;
          }
          // start the broadcast
          voice.play(msg);
        } else {
          msg.reply("Please tell me what you want to be played");
        }
      }
    });
  } else {
    msg.reply("Please join a channel first");
  }
};

voice.play = async msg => {
  voice.server = msg.guild.id;
  // check that there is a song in the voice queue
  if (voice.Queue[0]) {
    try {
      // start the dispatcher using ytdl to stream a youtube video/stream
      voice.dispatcher = voice.server.dispatcher = await voice.connection.playStream(
        ytdl(voice.Queue[0], {
          quality: "lowestvideo",
          filter: "audio",
          liveBuffer: 60000
        })
      );
    } catch (error) {
      console.error(error);
    }
    // set playing to the queue's link, to cycle the queue to be ready for the next song
    voice.songLink = await voice.Queue.shift();

    // get the info of the song that is currently playing
    ytdl.getBasicInfo(voice.songLink, (err, info) => {
      if (err) {
        console.error(err);
      }
      if (info != undefined) {
        voice.title = info.title;
      }
    });

    // set the volume for the dispatcher to the default
    voice.dispatcher.setVolume(voice.setVolume / 100);
  } else {
    // if there's notingthing in the queue then stop the broadcast
    voice.dispatcher.end();
  }

  // when a song finishes it'll trigger an 'end' event.
  voice.dispatcher.on("end", () => {
    // remove the song title from the queue list
    voice.QueueList.shift();
    try {
      // check if there's a song in the queue
      if (voice.Queue[0]) {
        // play it
        voice.play(msg);
      } else {
        // end the broadcast
        msg.channel.send("Ending the broadcast");
        voice.dispatcher = "";
      }
    } catch (err) {
      console.error(err);
      voice.connection.disconnect();
    }
  });
};

// replies with the song link ad title that is playing
voice.playing = msg => {
  msg.reply(`currently playing:\n${voice.title}\n<${voice.songLink}>`);
};

// updates the default volume, then sets that to the broadcast volume
voice.volume = (msg, args) => {
  voice.setVolume = parseInt(args[0]);
  voice.dispatcher.setVolume(voice.setVolume / 100);
  msg.reply("volume is now set to: " + args[0]);
};

// pauses a broadcast
voice.pause = msg => {
  // if there is a dispatcher in progress then pause the broadcast
  if (voice.dispatcher == "") {
    msg.reply(`I'm not playing anything`);
  } else {
    voice.dispatcher.pause();
  }
};

// resumes a broadcast
voice.resume = msg => {
  // if there is a dispatcher in progress then resume the broadcast
  if (voice.dispatcher == "") {
    msg.reply(`I've got nothing to play...`);
  } else {
    voice.dispatcher.resume();
  }
};

// skip to next song in queue
voice.skip = msg => {
  if (voice.dispatcher == "") {
    msg.reply(`I'm not playing anything`);
  } else {
    // trigger the end envent to cycle to next song
    voice.dispatcher.end();
  }
};
// leave a voice connection
voice.leave = msg => {
  // if there is a dispatcher in progress then disconnect and reset the queue
  if (voice.dispatcher == "") {
    msg.reply(`I'm not in a channel`);
  } else {
    voice.Queue = [];
    voice.QueueList = [];
    msg.guild.voiceConnection.disconnect();
  }
};
// stop a broadcast
voice.stop = msg => {
  // if there is a dispatcher in progress then stop it and reset the queue
  if (voice.dispatcher == "") {
    msg.reply(`I'm not playing anything...`);
  } else {
    voice.Queue = [];
    voice.QueueList = [];
    voice.dispatcher.end();
  }
};
// playlist
voice.playlist = async (msg, args) => {
  // check that there are arguments
  if (args.length != 0) {
    let pName = args[0];
    if (args[1]) {
      // if theres more than one argument
      let song = args[1]; // check that the playlist exists then add it. create the playlist if it doesn't exist.
      if (playlists[pName]) {
        playlists[pName].links.push(song);
      } else {
        playlists[pName] = {};
        playlists[pName].links = [song];

        playlists[pName].titles = [];
      }

      // get the title of the song and add it to the playlist's titles array
      ytdl.getBasicInfo(args[1], (err, info) => {
        if (err) throw err;
        Vtitle = info.title;
        playlists[pName].titles.push(info.title);
        msg.reply(`\nadded: ${Vtitle}\nto the playlist: ${pName}`);
      });
    } else {
      if (playlists[pName]) {
        // send an embed containing the first 10 titles of the playlist
        let text = playlists[pName].titles.slice(0, 10).join("\n\n");

        const embed = new RichEmbed()
          .setTitle("Playlist: " + pName)
          .setColor(0xff0000)
          .setDescription(text);
        msg.channel.send(embed);
      }
    }
  } else {
    // if there are no arguments then send a message containing all the playlist names
    let text = Object.keys(playlists).join(" \n");
    let embed = new RichEmbed()
      .setTitle("Playlists")
      .setColor(0xff0000)
      .setDescription(text);
    msg.reply(embed);
  }
};
// queue song/playlist
voice.queue = async (msg, args) => {
  let pName = args[0];
  if (pName === "list") {
    // lists the first five songs in the queue
    let text = "";
    if (voice.QueueList.length != 0) {
      text = "\n" + voice.QueueList.slice(0, 5).join(`\n\n`);
      msg.reply(text);
    } else {
      msg.reply(`there isn't anything in the list`);
    }
  } else if (Object.keys(playlists).indexOf(pName) != -1) {
    // check if pName is a playlist, if so queue it
    voice.Queue.concat(playlists[pName].links.slice(0));
    voice.QueueList.concat(playlists[pName].titles.slice(0));
    msg.reply(`added ${pName} to the queue`);
  } else if (ytdl.validateURL(pName)) {
    // check if pName is a youtube url, if so queue it
    if (voice.dispatcher == "") {
      // check if there is a dipatcher active, if not then play the song instead
      args.unshift("play");
      voice.join(msg, args);
    } else {
      // add the song to the queue and add the title to the queue list
      voice.Queue.push(pName.slice(0));
      await ytdl.getBasicInfo(pName, (err, info) => {
        if (err) {
          console.error(err);
        }
        voice.QueueList.push(info.title);
        msg.reply(`added ${info.title} to the queue`);
      });
    }
  } else {
    msg.reply("did you type it in correctly?");
  }
};
module.exports = voice;

// save playlists every playlists.saveTimer
setInterval(() => {
  console.log("saving playlists");
  fs.writeFile(
    "./commands/scripts/playlists.json",
    JSON.stringify(playlists),
    err => {
      if (err) throw err;
    }
  );
}, config.saveTimer * 60 * 1000);
