'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

const defaultAccessToken = 'VgWXWX4q7uA4WjGaZPM47YUDkABofwitC5b1aa0rGVw4F2YOdc7fS0Oy0bk8LDi88uuZVCHAR2kVWJ4rjYBcCZGarHx+yZQrdvIEJsp3wAdPYkydhDrm4YSFnPrse/wbJBZUXW/RqIZxbX55i+yWTAdB04t89/1O/w1cDnyilFU=';
const defaultSecret = 'b6657925a6344cdae0f0cd9263b16142';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || defaultAccessToken,
  channelSecret: process.env.CHANNEL_SECRET || defaultSecret,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});