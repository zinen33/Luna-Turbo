module.exports.config = {
	name: "المطور",
	version: "1.0.1", 
	permission: 0,
	credits: "ryuko",
prefix: false,
premium: false,	
description: "معلومات",
  category:"خدمات",
  usages: "فقط",
  cooldowns: 0
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Manila").format("『D/MM/YYYY』 【HH:mm:ss】");
var link = ["https://i.imgur.com/lb801Xn.jpg",
];
var callback = () => api.sendMessage({body:`🗞🔮-------آلُـِـِِـِِِـِِـِـمـْـْْـْطُـٌـٌٌـٌوُࢪ-------🔮🗞\n\n❶ ZINO く愛  ₮↬https://www.facebook.com/mokh.tar.186590\n🗞🔮-----------------------------🔮🗞\n❷ ᎷᏫᎻᎯᎷᎯᎠ ₮↬https://www.facebook.com/profile.php?id=100044725279836\n🗞🔮-----------------------------🔮🗞\n⚠️ اذا حدث مشكل فتواصل مها لمطورين وشكرا لكم على استخدام بوتنا`,attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };
   