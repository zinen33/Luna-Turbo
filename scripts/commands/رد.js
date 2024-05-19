module.exports.config = {
  name: "ردود_مطور",
  version: "1.0.0",
  permission: 0,
  credits: "ryuko",
  prefix: true,
  premium: false,
  description: "البوت سوف يرد إذا تم ذكر المالك أو البوت عن طريق المنشن",
  category: "المطور",
  usages: "uid",
  cooldowns: 0
};

module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "") {
    var aid = ["100013384479798"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["توقف عن عمل منشن لمطوري، فهو مشغول 😗", "مطوري غير متصل حاليا 😢","منشن آخر على مالكي و, سوف أقوم بلكمك على وجهك 🙂","مشغول ألا تفهم 😒","آسف، اكن لان أسمح لأي أحد أن يقوم بإزعاجه 🙄","هل تحب مطوري ولهذا السبب قمت بعمل منشن عليه? لماذا لا ترسل له طلب صداقة  https://www.facebook.com/mokh.tar.186590 😏"," منشن أخرى على مطوري، وسوف أركل مؤخرتك اللعينة"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
}