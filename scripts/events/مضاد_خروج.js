module.exports.config = {
  name: "مضاد_خروج",
  eventType: ["log:unsubscribe"],
  version: "1.0.1",
  credits: "く愛↬ 𝗠𝗢𝗛𝗔𝗠𝗘𝗗 𝗔𝗡𝗗 𝗭𝗔𝗞𝗜↫⚠️☠️🇩🇿",
  description: "Group Information Update",
  envConfig: {
    autoUnsend: true,
    sendNoti: true,
    timeToUnsend: 10
  }
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "هل طردني شخص ما ?";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`لا يمكن اضافة ${name} الى المجموعة مجددا :( `, event.threadID)
   } else api.sendMessage(`${name} لا يمكنك المغادرة، المجموعة في وضع القفـــــــــل`, event.threadID);
  })
 }
}
