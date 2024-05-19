module.exports.config = {
	name: "logs",
	eventType: ["log:unsubscribe","log:subscribe","log:thread-name"],
	version: "1.0.0",
	credits: "ryuko",
	description: "record bot activity notifications",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function({ api, event, Threads }) {
    const logger = require("../../ryuko/catalogs/ryukoc.js");
    if (!global.configModule[this.config.name].enable) return;
    var formReport =  "=== إشعار من البوت ===" +
                        "\n\n» آيدي المجموعة: " + event.threadID +
                        "\n» الحدث: {task}" +
                        "\n» تم القيام بهذا الحدث من طرف المستخدم صاحب الآيدي: " + event.author +
                        "\n» " + Date.now() +" «",
        task = ""; 
    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name || " هذا الاسم غير موجود",
                    newName = event.logMessageData.name || "هذا الإسم غير موجود";
            task = "قام المستخدم بتغيير إسم المجموعة: '" + oldName + "' إلى '" + newName + "'";
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) task = "تم اضافة لبوت";
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId== api.getCurrentUserID()) task = "تم طرد لبوت"
            break;
        }
        default: 
            break;
    }

    if (task.length == 0) return;

    formReport = formReport
    .replace(/\{task}/g, task);

    return api.sendMessage(formReport, global.config.ADMINBOT[0], (error, info) => {
        if (error) return logger("", "");
    });
  return api.sendMessage(formReport, global.config.ADMINBOT[0]);
}

