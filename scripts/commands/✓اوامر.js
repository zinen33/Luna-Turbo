module.exports.config = {
  name: "الاوامر",
  version: "1.0.0",
  credits: "ZINO and moha",
  permission: 0,
  description: "قائمة اوامر",
  category: "خدمات",
  usages: "طلب الاوامر",
  prefix: false,
  premium: false,
  cooldown: 1,
  envConfig: {
    autoUnsend: false,
    delayUnsend: 300
  }
};

module.exports.languages = {
  "en": {
    "معلومات الامر": "✿━━━━━━[ %1 ]━━━━━━✿\n\nالاستخدام: %3\nالفئات: %4\nوقت الانتضار: %5 ثانية\nالصلاحيات: %6\nالوصف: %2\n\nModule coded by 𝗟𝘂𝗻𝗮%7",
    "helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
    "user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports. run = function({ api, event, args, getText }) {
  const axios = require("axios");
  const request = require('request');
  const fs = require("fs-extra");
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
if (args[0] == "all") {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg += `â˜‚ï¸Ž ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} \n${commandGroup.cmds.join(' â€¢ ')}\n\n`);

    return axios.get('https://apikanna.maduka9.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
      let admID = "100013384479798";

      api.getUserInfo(parseInt(admID), (err, data) => {
      if(err){ return console.log(err)}
     var obj = Object.keys(data);
    var firstname = data[obj].name.replace("@", "");
    let callback = function () {
        api.sendMessage({ body:`قائمة الاوا
        مر📖\n\n` + msg + `\nيمنع منعا باتا إرسال الرسائل العشوائية إلى البوت❎\n\nاجمالي الاوامر🗂️: ${commands.size}\n\nالمطور🕊️:\n${firstname}`, mentions: [{
                           tag: firstname,
                           id: admID,
                           fromIndex: 0,
                 }],
            attachment: fs.createReadStream(__dirname + `/cache/472.${ext}`)
        }, event.threadID, (err, info) => {
        fs.unlinkSync(__dirname + `/cache/472.${ext}`);
        if (autoUnsend == false) {
            setTimeout(() => { 
                return api.unsendMessage(info.messageID);
            }, delayUnsend * 1000);
        }
        else return;
    }, event.messageID);
        }
         request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/472.${ext}`)).on("close", callback);
     })
      })
};
  if (!command) {
    const arrayInfo = [];
    const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 10;
    let i = 0;
    let msg = "";

    for (var [name, value] of (commands)) {
      name += ``;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);

const first = numberOfOnePage * page - numberOfOnePage;
    i = first;
    const helpView = arrayInfo.slice(first, first + numberOfOnePage);


    for (let cmds of helpView) msg += `${global.config.PREFIX}${cmds}\n`;

    const siu = `❒『📖 𝙗𝙤𝙩 𝗟𝘂𝗻𝗮3> ✰📖』❒`;

 const text = `${global.config.BOTNAME} بوت | لونا \n❈:عدد الاوامر📖:كيان بززاف مي محسبتهمش \n✥:اسم البوت📜 :<3 ${global.config.BOTNAME}\n❅:البادئة: ${global.config.PREFIX}`;
    var link = [
"https://i.postimg.cc/zG0pv9Br/45ed900cac1c27323393c057dfcd5ad8.jpg",
"https://i.postimg.cc/s2Lc977H/1ef52533da371f783338dff828cfefcd.jpg",
"https://i.postimg.cc/3JhZBK0h/1f6ad4ced1b04a59dcb85ce74bfbc730.jpg",
"https://i.postimg.cc/0j0D3wKs/55bf47e7d8a8d4f9edffc7a42d8f97ef.jpg",
"https://i.postimg.cc/TYQnJnXj/edfcdddfac3e068779ca46f0e67d4685.jpg",
"https://i.postimg.cc/jSmwMX3f/364b42fed930357e1d0a790badbc58a9.jpg",
"https://i.postimg.cc/TwGPsHVK/5861d47092aa84a6903b28ff86832473.jpg",
"https://i.postimg.cc/Jzk4zWKy/bea40d753ee62e5ad8b45d41d29f8726.jpg",
      ]
     var callback = () => api.sendMessage({ body: siu + "\n\n" + msg  + text, attachment: fs.createReadStream(__dirname + "/cache/leiamnashelp.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/leiamnashelp.jpg"), event.messageID);
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/leiamnashelp.jpg")).on("close", () => callback());
  } 
const leiamname = getText("moduleInfo", command.config.name, command.config.description, `${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits);

  var link = [ 
"https://i.imgur.com/6V3PJdT.gif",
"",
"",
"",
  ]
    var callback = () => api.sendMessage({ body: leiamname, attachment: fs.createReadStream(__dirname + "/cache/leiamnashelp.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/leiamnashelp.jpg"), event.messageID);
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/leiamnashelp.jpg")).on("close", () => callback());
};