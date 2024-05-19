const chalk = require('chalk');
module.exports.config = {
    name: "انضمام",
    version: "1.0.1",
    permission: 2,
    credits: "ryuko",
    prefix: false,
    description: "join the bot groups are in",
    category: "آلُـِـِِـِِِـِِـِـمـْـْْـْطُـٌـٌٌـٌوُࢪ",
    premium: false,
    usages: "",
    cooldowns: 5
};
module.exports.handleReply = async function({ api, event, handleReply, Threads }) {
  var { threadID, messageID, senderID, body } = event;
  var { ID } = handleReply;
  console.log(ID)
  if (!body || !parseInt(body)) return api.sendMessage('يجب أن يكون اختيارك رقمًا.', threadID, messageID);
  if ((parseInt(body) - 1) > ID.length) return api.sendMessage("اختيارك ليس في القائمة", threadID, messageID);
  try {
    var threadInfo = await Threads.getInfo(ID[body - 1]);
    var { participantIDs, approvalMode, adminIDs } = threadInfo;
    if (participantIDs.includes(senderID)) return api.sendMessage(`أنت بالفعل في هذه المجموعة.`, threadID, messageID);
    api.addUserToGroup(senderID, ID[body - 1]);
    if (approvalMode == true && !adminIDs.some(item => item.id) == api.getCurrentUserID()) return api.sendMessage("لقد أضفتك إلى قائمة الموافقة الخاصة بالمجموعة بنفسك.", threadID, messageID);
    else return api.sendMessage(`you have joined to ${threadInfo.threadName}.لقد انضممت للتحقق من طلب الرسالة أو الرسالة غير المرغوب فيها، إذا لم تكن المجموعة موجودة في مربع الرسالة الخاصة بك، فربما قاموا بتشغيل موافقة المشرف.`, threadID, messageID);
  } catch (error) {
    return api.sendMessage(`i can't add you to that group\nerror : ${error}`, threadID, messageID);
  }
}

module.exports.run = async function({ api, event, Threads }) {
  var { threadID, messageID, senderID } = event;
  var msg = `كل المجموعات\n\n`, number = 0, ID = [];
  var allThreads = await Threads.getAll();
  for (var i of allThreads) {
    number++;
    msg += `${number}. ${i.threadInfo.threadName}\n`;
    ID.push(i.threadID)
  }
  msg += `\nقم بالرد على هذه الرسالة بالرقم إذا كنت تريد الانضمام من تلك المجموعة`
  return api.sendMessage(msg, threadID, (error, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      author: senderID,
     messageID: info.messageID,
      ID: ID      
    })
  }, messageID)
}
