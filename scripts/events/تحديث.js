module.exports.config = {
  name: "adminNoti",
  eventType: [
    "log:thread-admins",
    "log:thread-name",
    "log:user-nickname",
    "log:thread-call",
    "log:thread-icon",
    "log:thread-color",
    "log:link-status",
    "log:magic-words",
    "log:thread-approval-mode",
    "log:thread-poll"
  ],
  version: "1.0.1",
  credits: "く愛↬ 𝗠𝗢𝗛𝗔𝗠𝗘𝗗 𝗔𝗡𝗗 𝗭𝗔𝗞𝗜↫⚠️☠️🇩🇿",
  description: "Group Information Update",
  envConfig: {
    autoUnsend: true,
    sendNoti: true,
    timeToUnsend: 10
  }
};

module.exports.run = async function({ event, api, Threads, Users }) {
  const { author, threadID, logMessageType, logMessageData, logMessageBody } = event;
  const { setData, getData } = Threads;
  const fs = require("fs");
  const iconPath = __dirname + "/cache/emoji.json";
  if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));
  if (author === threadID) return;

  try {
    let dataThread = (await getData(threadID)).threadInfo;

    switch (logMessageType) {
      case "log:thread-admins": {
        if (logMessageData.ADMIN_EVENT === "add_admin") {
          dataThread.adminIDs.push({ id: logMessageData.TARGET_ID });
          api.sendMessage(`[ تحديث المجموعة ]\n❯ تحديث المستخدم ${Users.getNameUser(id)} أصبح مسؤول المجموعة`, threadID);
        } else if (logMessageData.ADMIN_EVENT === "remove_admin") {
          dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id !== logMessageData.TARGET_ID);
          api.sendMessage(`[ تحديث المجموعة ]\n❯ إزالة منصب المسؤول للمستخدم ${logMessageData.TARGET_ID}`, threadID);
        }
        break;
      }
      case "log:user-nickname": {
        const { participant_id, nickname } = logMessageData;
        if (participant_id && nickname) {
          dataThread.nicknames = dataThread.nicknames || {};
          dataThread.nicknames[participant_id] = nickname;
          const participantName = await Users.getNameUser(participant_id);
          const formattedNickname = nickname || "اللقب المحذوف";
          api.sendMessage(`[ مجموعة ]\n❯ تم تحديث اللقب ل ${participantName}: ${formattedNickname}.`, threadID);
        }
        break;
      }
      case "log:thread-name": {
        dataThread.threadName = logMessageData.name || null;
        api.sendMessage(`[ تحديث المجموعة ]\n❯ ${(dataThread.threadName) ? `تم تحديث اسم المجموعة إلى: ${dataThread.threadName}` : 'مسح اسم المجموعة'}.`, threadID);
        break;
      }
      case "log:thread-icon": {
        const preIcon = JSON.parse(fs.readFileSync(iconPath));
        dataThread.threadIcon = logMessageData.thread_icon || "👍";
        if (global.configModule[this.config.name].sendNoti) {
          api.sendMessage(`[ تحديث المجموعة ]\n❯ ${logMessageBody.replace("emoji", "icon")}\n❯ الإيموجي الأصلي: ${preIcon[threadID] || "unknown"}`, threadID, async (error, info) => {
            preIcon[threadID] = dataThread.threadIcon;
            fs.writeFileSync(iconPath, JSON.stringify(preIcon));
            if (global.configModule[this.config.name].autoUnsend) {
              await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
              return api.unsendMessage(info.messageID);
            }
          });
        }
        break;
      }
      case "log:thread-call": {
        if (logMessageData.event === "بدأت المكالمة الجماعية") {
          const name = await Users.getNameUser(logMessageData.caller_id);
          api.sendMessage(`[ تحديث المجموعة ]\n❯ ${name} بدأ أ ${(logMessageData.video) ? 'ڤيديو ' : ''} إتصال.`, threadID);
        } else if (logMessageData.event === "انتهت المكالمة الجماعية") {
          const callDuration = logMessageData.call_duration;
          const hours = Math.floor(callDuration / 3600);
          const minutes = Math.floor((callDuration - (hours * 3600)) / 60);
          const seconds = callDuration - (hours * 3600) - (minutes * 60);
          const timeFormat = `${hours}:${minutes}:${seconds}`;
          api.sendMessage(`[ تحديث المجموعة ]\n❯ ${(logMessageData.video) ? 'فيديو' : ''} انتهت المكالمة.\n❯ مدة المكالمة: ${timeFormat}`, threadID);
        } else if (logMessageData.joining_user) {
          const name = await Users.getNameUser(logMessageData.joining_user);
          api.sendMessage(`❯ [ تحديث المجموعة ]\n❯ ${name} انضم إلى ${(logMessageData.group_call_type == '1') ? 'فيديو' : ''} يتصل.`, threadID);
        }
        break;
      }
      case "log:link-status": {
        api.sendMessage(logMessageBody, threadID);
        break;
      }
      case "log:magic-words": {
        api.sendMessage(`» [ تحديث المجموعة ] سمة ${logMessageData.magic_word} تأثير إضافي : ${logMessageData.theme_name}\nإيموجي: ${logMessageData.emoji_effect || "لا إيموجي "}\nTotal ${logMessageData.new_magic_word_count} تمت إضافة تأثير الكلمة`, threadID)
        break;
      }
      case "log:thread-poll": {
        const obj = JSON.parse(logMessageData.question_json);
        if (logMessageData.event_type === "question_creation" || logMessageData.event_type === "update_vote") {
          api.sendMessage(logMessageBody, threadID);
        }
        break;
      }
      case "log:thread-approval-mode": {
        api.sendMessage(logMessageBody, threadID);
        break;
      }
      case "log:thread-color": {
        dataThread.threadColor = logMessageData.thread_color || "🌤";
        if (global.configModule[this.config.name].sendNoti) {
          api.sendMessage(`[ تحديث المجموعة ]\n❯ ${logMessageBody.replace("سمة", "لون")}`, threadID, async (error, info) => {
            if (global.configModule[this.config.name].autoUnsend) {
              await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
              return api.unsendMessage(info.messageID);
            }
          });
        }
        break;
      }
    }

    await setData(threadID, { threadInfo: dataThread });
  } catch (error) {
    console.log(error);
  }
};
