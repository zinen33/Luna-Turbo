module.exports.config = {
  name: "ترحيب_تلقائي",
  version: "1.0.0",
  permission: 2,
  credits: "ryuko",
  prefix: true,
  premium: false,
  description: "ترحيب",
  category: "آلُـِـِِـِِِـِِـِـمـْـْْـْطُـٌـٌٌـٌوُࢪ",
  usages: "رسالة",
  cooldowns: 1
};
module.exports.handleEvent = async ({ event, api, Users }) => {
  let KEY = [ 
    "أهلا",
    "مرحبا",
    "ه‍لا",
    "هاي",
    "هلو",
    "صباح الخير",
    "اهلا",
    "low",
    "lo",
    "hey",
    "heyy",
    "loe po",
    "low po",
    "hai",
    "chào",
    "chao",
    "hí",
    "híí",
    "hì",
    "hìì",
    "lô",
    "helo",
    "hê nhô",
    "goodevening",
    "good evening",
    "goodeve",
    "gn",
    "eve",
    "evening",
    "good afternoon",
    "good aftie",
    "aftie",
    "afternoon",
    "Hello",
    "Hi",
    "Hello po",
    "Hi po",
    "Hiii",
    "Helloo",
    "Loe",
    "Low",
    "Lo",
    "Hey",
    "Heyy",
    "Loe po",
    "Low po",
    "Hai",
    "chào",
    "chao",
    "Hí",
    "Híí",
    "Hì",
    "Hìì",
    "lô",
    "Helo",
    "hê nhô",
    "Goodevening",
    "Good evening",
    "Goodeve",
    "Fn",
    "Eve",
    "Evening",
    "Good afternoon",
    "Good aftie",
    "Aftie",
    "Afternoon"
  ];
  let thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["Hi"] == "undefined", thread["hi"] == false) return
  else {
  if (KEY.includes(event.body) !== false) {
    let data = [
      "1747083968936188", "1747090242268894", "1747089445602307", "1747085962269322", "1747084572269461", "1747092188935366", "1747088982269020", "2041012539459553", "2041015422792598", "2041021119458695", "2041022286125245",
"2041022029458604",
"2041012539459553",
"2041012692792871",
"2041011836126290",
"2041012262792914", "2041015329459274"
    ];
    let sticker = data[Math.floor(Math.random() * data.length)];
let juswa = ["هل أكلت شيئا ؟", "ماذا تفعل؟", "كيف حالك؟", "أنا لونا البوت، تشرفت بلقائك", "أقوم بتحديث أوامري، ماذا تفعل؟", "هل يمكنك التفاعل معي باستخدام أمر لونا ؟","أنت جميلة جدا /   أنت وسيم يا سيدتي/ يا سيدي", "أحبك مواححح */قبلة على جبهتك.","هل أنت تشعر بالملل؟ تحدث مع المطور الخاص بي", "كيف حالك عزيزي", "تناول بعض الحلويات", "هل أنت بخير؟", "كن آمنا", "كن جيد"];
 let juswa1 = juswa[Math.floor(Math.random() * juswa.length)];

    let moment = require("moment-timezone");
    let hours = moment.tz('Africa/Casablanca').format('HHmm');
    let session = (
    hours > 0001 && hours <= 400 ? "صباح مشرق سعيد" : 
    hours > 401 && hours <= 700 ? "صباح سعيد" :
    hours > 701 && hours <= 1000 ? "صباح سعيد" :
    hours > 1001 && hours <= 1100 ? "صباح سعيد" : 
    hours > 1100 && hours <= 1500 ? "مابعد ظهر سعيد" : 
    hours > 1501 && hours <= 1800 ? "مساء سعيد" : 
    hours > 1801 && hours <= 2100 ? "مساء سعيد" : 
    hours > 2101 && hours <= 2400 ? "نوم هانئ و خفيف و بدون كوابيس 😌" : 
    "error");
    let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
    let msg = {body: `أهلا يا ${name}, أتمنى لك ${session}, ${juswa1}`, mentions}
    api.sendMessage(msg, event.threadID, (e, info) => {
      setTimeout(() => {
        api.sendMessage({sticker: sticker}, event.threadID);
      }, 100)
    }, event.messageID)
  }
  }
}

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
		"successText": `${this.config.name} thành công`,
	},
	"en": {
		"on": "تم تشغيل",
		"off": "تم إيقاف",
		"successText": `التحية التلقائية بنجاح ✅!`,
	}
}

module.exports.run = async ({ event, api, Threads, getText }) => {
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
	if (typeof data["Hi"] == "undefined" || data["hi"] == true) data["hi"] = false;
	else data["hi"] = true;
	await Threads.setData(threadID, {
		data
	});
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["hi"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
    }