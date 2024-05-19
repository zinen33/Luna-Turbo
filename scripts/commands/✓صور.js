module.exports.config = {
	name: "صور",
	version: "1.0.1",
	permission: 0,
	credits: "ryuko",
  prefix: false,
  premium: false,
	description: "☺️جلب صورة ",
	category: "ڏكُـُآء آصُــطُـٌـٌٌـٌنـِِـِـآعٌـِـِِـِـي",
	usages: "[صورة لتبغي]",
	cooldowns: 5,
	dependencies: {
    "axios": "",
    "fs-extra": "",
    "googlethis": "",
    "cloudscraper": ""
  }
};

module.exports.run = async ({ matches, event, api, extra, args }) => {

  const axios = global.nodemodule['axios'];
  const google = global.nodemodule["googlethis"];
  const cloudscraper = global.nodemodule["cloudscraper"];
  const fs = global.nodemodule["fs"];

  var query = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
  api.sendMessage(`🔎 جاري البحث عن كلمة ${query}...`, event.threadID, event.messageID);

  let result = await google.image(query, { safe: false });
  if (result.length === 0) {
    api.sendMessage(`الصورة التي تبحث عنها لم تأتي بأي نتيجة.`, event.threadID, event.messageID)
    return;
  }

  let streams = [];
  let counter = 0;

  for (let image of result) {
    // زينو عدد صورة 6 
    if (counter >= 6)
      break;
    let url = image.url;
    if (!url.endsWith(".jpg") && !url.endsWith(".png"))
      continue;

    let path = __dirname + `/cache/search-image-${counter}.jpg`;
    let hasError = false;
    await cloudscraper.get({ uri: url, encoding: null })
      .then((buffer) => fs.writeFileSync(path, buffer))
      .catch((error) => {
        console.log(error)
        hasError = true;
      });

    if (hasError)
      continue;    streams.push(fs.createReadStream(path).on("end", async () => {
      if (fs.existsSync(path)) {
        fs.unlink(path, (err) => {
          if (err) return console.log(err);
        });
      }
    }));

    counter += 1;
  }

  api.sendMessage("جاري إرسال الصور...☑✓", event.threadID, event.messageID)

  let msg = {
    body: `نتائج البحث عن صور ل\n"${query}"\n\nالموجودة: ${result.length} صورة.`,
    attachment: streams
  };
  api.sendMessage(msg, event.threadID, event.messageID);
};