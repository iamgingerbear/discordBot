const Discord = require("discord.js");

const aah =
  "https://media1.tenor.com/images/cd5ee7f75777c5483cdbd403c97c7405/tenor.gif";
const ame =
  "https://i.pinimg.com/originals/4a/51/53/4a5153bc2167f2150c3f9dcff7edc632.gif";
const sleepy =
  "https://steamuserimages-a.akamaihd.net/ugc/159155650902044290/9ED16A3C6C201FC08347BBCD3AF08A11124483AD/";
const headPat =
  "https://bigmemes.funnyjunk.com/gifs/Cute+kanna+gif+comp+large+mentionlist+thelunchtablehttpsfunnyjunkcomchannelanimemangacute+kanna+comp+2rxorlekhttpsfunnyjunkcomchannelanimemangakanna+comp+3ydsrllqhttpsfunnyjunkcomchannelanimemangakanna+comp+4kexslxrhttpsfunnyjunkcomchannelanimemangacute+kanna+compcporlpc_5f293f_6424003.gif";
const cute = "https://media0.giphy.com/media/vwFJbT5uIBNja/source.gif";
const pumped = "https://media.giphy.com/media/Q2DabV4eRh160/giphy.gif";
const yay =
  "https://semblanceofsanity.org/wp-content/uploads/2018/01/Kanna-Raising-Her-Arms.gif";
const sip =
  "http://pa1.narvii.com/6784/af724c0b9a24a87478e64aee055d4f16162aafa6_00.gif";
const depressed =
  "https://media1.tenor.com/images/efca6ac695440470c306e6ea127d783a/tenor.gif?itemid=9920982";
const react = {};
const gifs = [aah, ame, sleepy, headPat, cute, pumped, yay, sip, depressed];
let maxNum = 30;
react.random = function(msg) {
  let num = Math.floor(Math.random() * (maxNum - 1 + 1)) + 0;
  // also adjust this for the frequency
  if (num >= maxNum - 1) {
    num = Math.floor(Math.random() * (gifs.length - 0 + 1)) + 0;
    const embed = new Discord.RichEmbed().setImage(gifs[num]);
    msg.channel.send(embed);
    console.log("sent a reaction to: " + msg.author.username);
  }
};
module.exports = react;
