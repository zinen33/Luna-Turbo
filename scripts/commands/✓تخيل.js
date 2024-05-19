const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
module.exports.config = {
  name: "تخيل",
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

module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body.indexOf("تخيل") === 0 || event.body.indexOf(".تخيل") === 0)) return;
  const args = event.body.split(/\s+/);
  args.shift();

    if (args.length < 2) {
        api.sendMessage("جرب [ماذا تريد تخيله] [رقم الأسلوب] [حجم الصورة (rto)]", event.threadID, event.messageID);
        return;
    }

    try {
        const ayoub = args.slice(0, -1).join(" ");
        const translateURL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(ayoub)}`;
  
        try {
            const translationResponse = await axios.get(translateURL);
            const ayoubzx = translationResponse.data[0][0][0];
            const style = args[args.length - 2];
            let rto = args[args.length - 1];
        
            if (!rto || isNaN(rto)) {
                rto = 1; 
            } else {
                rto = parseInt(rto);
            }

            const sex = {
                prompt: ayoubzx,
                sty: style,
                rto: rto
            };

            api.sendMessage("🕟 | يـرجـى الانـتـظـار", event.threadID, event.messageID);

            const ninoo = await axios.post("https://app-dodogen-835c6bdca048.herokuapp.com/gen", sex);
            const generatedImages = ninoo.data.url;

            const imgData = [];

            for (let i = 0; i < generatedImages.length; i++) {
                const imgUrl = generatedImages[i];
                const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
                const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
                await fs.outputFile(imgPath, imgResponse.data);
                imgData.push(fs.createReadStream(imgPath));
            }

            await api.sendMessage({
                body: `🖼️ | إليك الصور الناتجة عن النص "${ayoub}" بأسلوب رقم ${style} وحجم الصورة ${rto} مع ${sex}:`,
                attachment: imgData
            }, event.threadID, event.messageID);

        } catch (error) {
            console.error(error);
            await api.sendMessage(`❌ حدث خطأ\n\nخطأ: ${error.message}`, event.threadID);
        }
    } catch (error) {
        console.error(error);
        await api.sendMessage(`❌ حدث خطأ\n\nخطأ: ${error.message}`, event.threadID);
    }
};

module.exports.run = async function({api, event, nino}) {};