module.exports.config = {
  name: "ادارة",
  version: "1.0.0",
  permission: 2,
  credits: "ryuko",
  prefix: true,
  premium: false,
  description: "ادارة المجموعة من المطور",
  category: "آلُـِـِِـِِِـِِـِـمـْـْْـْطُـٌـٌٌـٌوُࢪ",
  usages: "معلومات",
  cooldowns: 0
};
const { MessengerClient } = require('messaging-api-messenger');

const ACCESS_TOKEN = 'YOUR_FACEBOOK_PAGE_ACCESS_TOKEN';
const VERIFY_TOKEN = 'YOUR_VERIFY_TOKEN';
const TARGET_NUMBER = Math.floor(Math.random() * 100) + 1;

const client = new MessengerClient({
  accessToken: ACCESS_TOKEN,
  appId: 'YOUR_APP_ID',
  appSecret: 'YOUR_APP_SECRET',
});

function handleMessage(senderId, messageText) {
  let response;

  if (isNaN(messageText)) {
    response = 'الرجاء إدخال رقم صحيح.';
  } else {
    const userGuess = parseInt(messageText, 10);

    if (userGuess === TARGET_NUMBER) {
      response = `ألف مبروك! لقد حزرت الرقم بدقة.`;
    } else if (userGuess < TARGET_NUMBER) {
      response = 'صغير جدًا، جرب رقمًا أكبر.';
    } else {
      response = 'كبير جدًا، جرب رقمًا أصغر.';
    }
  }

  client.sendText(senderId, response);
}

function handleWebhook(req, res) {
  const { object, entry } = req.body;

  if (object === 'page') {
    entry.forEach((pageEntry) => {
      pageEntry.messaging.forEach((event) => {
        const senderId = event.sender.id;

        if (event.message && event.message.text) {
          handleMessage(senderId, event.message.text);
        }
      });
    });

    res.status(200).end();
  } else {
    res.status(404).end();
  }
}

// قم بتشغيل السيرفر
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

app.post('/webhook', (req, res) => {
  handleWebhook(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
