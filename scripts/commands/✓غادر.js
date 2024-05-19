module.exports.config = {
  name: "غادر",
  version: "1.0.0",
  permission: 2,
  credits: "ryuko",
  prefix: false,
  premium: false,
  description: "الخروج من المجموعة",
  category: "آلُـِـِِـِِِـِِـِـمـْـْْـْطُـٌـٌٌـٌوُࢪ",
  usages: "ايدي",
  cooldowns: 0
};  

module.exports.run = async function({ api, event, args }) {
    const permission = [`100013384479798`, `100065302673515`,"100044725279836" ];

    if (!permission.includes(event.senderID)) return api.sendMessage("مش لك", event.threadID, event.messageID);

    if (!args[0]) {
        // إضافة رسالة قبل الخروج
        await api.sendMessage("ليس بارادتي أن أغادر أصدقائي، ولكن المطور أمرني بالخروج. سأفتقدكم إلى لقاء 🥀🧸.", event.threadID);

        // الخروج من المجموعة بعد إرسال الرسالة
        api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
    }

    if (!isNaN(args[0])) {
        // الخروج من المجموعة باستخدام الأيدي المحدد
        api.removeUserFromGroup(api.getCurrentUserID(), args.join(" "));
    }
}
