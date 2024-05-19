const fs = require('fs');
const axios = require("axios");
module.exports.config = {
  name: "توضيح",
  version: "1.0.0",
  permission: 0,
  credits: "ryuko",
  prefix: false,
  premium: false,
  description: "🥷توضيح صورة🥷",
  category: "ڏكُـُآء آصُــطُـٌـٌٌـٌنـِِـِـآعٌـِـِِـِـي🤖",
  usages: "[ رد على رسالة ]",
  cooldowns: 0
};
module.exports.run = async({ api, event }) => {

 

if (event.type !== "message_reply" || !["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
  return api.sendMessage("رد على صورة يا عاق", event.threadID);
}
 


const so = encodeURIComponent(event.messageReply.attachments[0].url);
const rr = await axios.get(`https://app-malakups-049252e78dd3.herokuapp.com/caera?url=${so}&apikey=ayoubgay`);






const resss = await axios.get(rr.data.im, {responseType:"stream"});

const impath =__dirname + "/cache/ccuy.png";
const writer = fs.createWriteStream(impath);
resss.data.pipe(writer);
writer.on("finish", () => {
api.sendMessage({
 body:"تفضل عزيزي",
 attachment : fs.createReadStream(impath)
              }, event.threadID, event.messageID )})

  
}