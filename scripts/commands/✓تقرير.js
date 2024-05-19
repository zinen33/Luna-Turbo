module.exports.config = {
  name: "تقرير",
  version: "1.0.0",
  permission: 0,
  credits: "ryuko",
  prefix: false,
  premium: false,
  description: " تواصل معا مطورين لبوت",
  category: "خدمات",
  usages: "[ رسالت فيها المشكل ]",
  cooldowns: 0
};
  
module.exports.handleReply = async function({
	api: e,
	args: n,
	event: a,
	Users: s,
	handleReply: o
}) {
	var i = await s.getNameUser(a.senderID);
	switch (o.type) {
		case "reply":
			var t = global.config.ADMINBOT;
			for (let n of t) e.sendMessage({
				body: "📄تـٌـٌٌـعٌـِـِِـِـلُـِـِِـِِِـِِـِـيقٌـ,ـ مـْـْْـْنـِِـِـ طُـٌـٌٌـٌرفُـ,ـ " + i + ":\n" + a.body,
				mentions: [{
					id: a.senderID,
					tag: i
				}]
			}, n, ((e, n) => global.client.handleReply.push({
				name: this.config.name,
				messageID: n.messageID,
				messID: a.messageID,
				author: a.senderID,
				id: a.threadID,
				type: "نداء المشرف"
			})));
			break;
		case "نداء المشرف":
			e.sendMessage({
				body: `📌رسالة من الہآدمن ${i} إلہيہكُہ:\n--------\n${a.body}\n--------\n»💬قن بالرد على هذه الہرسہالہه. من أجہلہ الہمتہابعہة فُہيہ متابعة إرسال الرسائل إلہي الہمشہرفُہ`,
				mentions: [{
					tag: i,
					id: a.senderID
				}]
			}, o.id, ((e, n) => global.client.handleReply.push({
				name: this.config.name,
				author: a.senderID,
				messageID: n.messageID,
				type: "reply"
			})), o.messID)
	}
}, module.exports.run = async function({
	api: e,
	event: n,
	args: a,
	Users: s,
	Threads: o
}) {
	if (!a[0]) return e.sendMessage("لم تدخل المحتوى للإبلاغ", n.threadID, n.messageID);
	let i = await s.getNameUser(n.senderID);
	var t = n.senderID,
		d = n.threadID;
	let r = (await o.getData(n.threadID)).threadInfo;
	var l = require("moment-timezone").tz("Asia/Manila").format("HH:mm:ss D/MM/YYYY");
	e.sendMessage(`At: ${l}\nتم إرسال تقريرك إلى مسؤول البوت`, n.threadID, (() => {
		var s = global.config.ADMINBOT;
		for (let o of s) {
			let s = r.threadName;
			e.sendMessage(`👤تہقريہر من طہرفُہ: ${i}\n👨‍👩‍👧‍👧صہنہدوقہ: ${s}\n🔰 آيہديہ ألصہنہدوقہ: ${d}\n🔷 آيہديہ الہمسہتہخہدم: ${t}\n-----------------\n⚠️ځـٌٌـٌٌطُـٌـٌٌـٌأ: ${a.join(" ")}\n-----------------\n: ${l}`, o, ((e, a) => global.client.handleReply.push({
				name: this.config.name,
				messageID: a.messageID,
				author: n.senderID,
				messID: n.messageID,
				id: d,
				type: "calladmin"
			})))
		}
	}))
};