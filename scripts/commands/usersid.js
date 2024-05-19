module.exports.config = {
	name: "uid",
	version: "1.0.0",
	permission: 0,
	credits: "ryuko",
  premium: false,
	prefix: false,
	description: "get user id.",
	category: "without prefix",
	cooldowns: 5
};

module.exports.run = function({ api, event }) {
	if (Object.keys(event.mentions) == 0) return api.sendMessage(`[ ✓ ]--------🔮معلوماتك🔮-------[ ✓ ]\n[ ✓ ]---------🔮الرابط🔮----------[ ✓ ]\nhttps://www.facebook.com/profile.php?id=${event.senderID}\n[ ✓ ]---------🔮 بريفي🔮---------[ ✓ ]\n m.me/${event.senderID}\n[ ✓ ]---------🔮 قروب🔮----------[ ✓ ]\n${event.threadID}\n\n`, event.threadID, event.messageID);
	else {
		for (var i = 0; i < Object.keys(event.mentions).length; i++) api.sendMessage(`${Object.values(event.mentions)[i].replace('@', '')}: ${Object.keys(event.mentions)[i]}`, event.threadID);
		return;
	}
}