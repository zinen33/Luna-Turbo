module.exports.config = {
  name: "حماية_اسم_لبوت",
  eventType: ["log:user-nickname" ],
  version: "1.0.1",
  credits: "く愛↬ 𝗠𝗢𝗛𝗔𝗠𝗘𝗗 𝗔𝗡𝗗 𝗭𝗔𝗞𝗜↫⚠️☠️🇩🇿",
  description: "Group Information Update",
  envConfig: {
    autoUnsend: true,
    sendNoti: true,
    timeToUnsend: 10
  }
};
module.exports.run = async function({ api, event, Users, Threads }) {
    var { logMessageData, threadID, author } = event;
    var botID = api.getCurrentUserID();
    var { BOTNAME, ADMINBOT } = global.config;
    var { nickname } = await Threads.getData(threadID, botID);
    var nickname = nickname ? nickname : BOTNAME;
    if (logMessageData.participant_id == botID && author != botID && !ADMINBOT.includes(author) && logMessageData.nickname != nickname) {
        api.changeNickname(nickname, threadID, botID)
        var info = await Users.getData(author);
       return api.sendMessage({ body: `هاذا خونا لحمار لي مسمي روحو ☜${info.name} يو غير لمطورين لي يبدلو اسمي متفهمش`}, threadID);
    }  
}