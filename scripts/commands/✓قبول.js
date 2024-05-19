module.exports.config = {
  name: "approve",
  version: "2.0.0",
  permission: 2,
  credits: "ryuko",
  description: "الموافقة على مجموعات",
  prefix: false,
  category: "آلُـِـِِـِِِـِِـِـمـْـْْـْطُـٌـٌٌـٌوُࢪ",
  premium: false,
  usages: "موافقة [group/remove] [threadid]",
  cooldowns: 5,
};

module.exports.languages = {
    "vi": {
        "listAdmin": 'Danh sách toàn bộ người điều hành bot: \n\n%1',
        "notHavePermssion": 'Bạn không đủ quyền hạn để có thể sử dụng chức năng "%1"',
        "addedNewAdmin": 'Đã thêm %1 người dùng trở thành người điều hành bot:\n\n%2',
        "removedAdmin": 'Đã gỡ bỏ %1 người điều hành bot:\n\n%2'
    },
    "en": {
        "listAdmin": 'approved list : \n\n%1',
        "notHavePermssion": 'you have no permission to use "%1"',
        "addedNewAdmin": 'approved %1 box :\n\n%2',
        "removedAdmin": 'remove %1 box in approve lists :\n\n%2'
    }
}

module.exports.run = async function ({ api, event, args, Threads, Users, permssion, getText }) {
    const content = args.slice(1, args.length);
    const { threadID, messageID, mentions } = event;
    const { approvedListsPath } = global.client;
    const { APPROVED } = global.approved;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);
    delete require.cache[require.resolve(approvedListsPath)];
    var config = require(approvedListsPath);
    
       
    switch (args[0]) {
        case "list":
        case "all":
        case "-a": {
            const listAdmin = APPROVED || config.APPROVED || [];
            var msg = [];

            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                  let boxname;
                  try {
        const groupName = await global.data.threadInfo.get(idAdmin).threadName || "name does not exist"
        boxname = `group name : ${groupName}\ngroup id : ${idAdmin}`;
      } catch (error) {
        const userName = await Users.getNameUser(idAdmin);
        boxname = `user name : ${userName}\nuser id : ${idAdmin}`;
      }
                  msg.push(`\n${boxname}`);
                }
            };

            return api.sendMessage(`approved users and groups :\n${msg.join('\n')}`, threadID, messageID);
        }

        case "box": {
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
          

          
            if (mention.length != 0 && isNaN(content[0])) {
              
                var listAdd = [];

                for (const id of mention) {
                  
                    APPROVED.push(id);
                    config.APPROVED.push(id);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(approvedListsPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                APPROVED.push(content[0]);
                config.APPROVED.push(content[0]);
                
                  let boxname;
                  try {
        const groupname = await global.data.threadInfo.get(content[0]).threadName || "name does not exist";
        boxname = `group name : ${groupname}\ngroup id : ${content[0]}`;
      } catch (error) {
        const username = await Users.getNameUser(content[0]);
        boxname = `user name : ${username}\nuser id : ${content[0]}`;
      }
                writeFileSync(approvedListsPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage('ⓞ↫₮ اشعار من المطور ₮↬ⓞ\n❶  مبروك المطور قبل مجموعتكم ويمكن استخدام لبوت بدون مشاكل🤭\n❷  يلا نتعرف انا لونا بوت لعرض خدماتي اكتب اوامر بدئة تشغيلي [ . ] لتحدث معي اكتب لونا + [ اي شي تبغيه]\n❸ ⚠️ اذا حدث خطا اكتب تقرير او المطور لتواصل معنا وشكرا لكم على استخدام بوتنا 🤭', content[0], () => {
                return api.sendMessage(getText("addedNewAdmin", 1, `${boxname}`), threadID, messageID);
                });
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
        

        case "remove":
        case "rm":
        case "delete": {
            if (permssion != 3) return api.sendMessage(getText("notHavePermssion", "delete"), threadID, messageID);
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.APPROVED.findIndex(item => item == id);
                    APPROVED.splice(index, 1);
                    config.APPROVED.splice(index, 1);
                    listAdd.push(`${id} - ${event.mentions[id]}`);
                };

                writeFileSync(approvedListsPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.APPROVED.findIndex(item => item.toString() == content[0]);
                APPROVED.splice(index, 1);
                config.APPROVED.splice(index, 1);
                
                  let boxname;
                  try {
        const groupname = await global.data.threadInfo.get(content[0]).threadName || "name does not exist";
        boxname = `group name : ${groupname}\ngroup id : ${content[0]}`;
      } catch (error) {
        const username = await Users.getNameUser(content[0]);
        boxname = `user name : ${username}\nuser id : ${content[0]}`
      }
                writeFileSync(approvedListsPath, JSON.stringify(config, null, 2), 'utf8');
                return api.sendMessage('this box has been removed from approved list', content[0], () => {
                return api.sendMessage(getText("removedAdmin", 1, `${boxname}`), threadID, messageID);
                });
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }

        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
}
