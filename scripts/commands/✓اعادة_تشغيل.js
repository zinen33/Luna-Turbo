module.exports.config = {
	name: "اعادة_تشغيل",
	version: "7.0.0",
	permission: 2,
	credits: "ryuko",
	prefix: false,
  premium: false,
	description: "😅اعادة تحميل لملفات",
	category: "آلُـِـِِـِِِـِِـِـمـْـْْـْطُـٌـٌٌـٌوُࢪ" ,
	usages: "فقط",
	cooldowns: 0,
	dependencies: {
		"process": ""
	}
};
module.exports.run = async function({ api, event, args, Threads, Users, Currencies, models }) {
  const process = require("process");
  const { threadID, messageID } = event;
  api.sendMessage(`📜جاري من اعادة تشغيل.....🗞`, threadID, ()=> process.exit(1));
}
