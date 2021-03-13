const { Chat } = require('twitch-toolkit')

const twitchChat = new Chat({
  debug:true,
  username: "bot-name",
  password: "password",
  channels: ['#channel-name'],
  triggers: [
    // {
    //     //Discord command in chat. Will auto respond with a configured message
    //     name: 'discord',
    //     type: 'command',
    //     channel: process.env.CHANNEL,
    //     chatTrigger: true,
    //     responseText: 'Join our discord server at ***',
    //     minDelay: 10000
    // },
    // {
    //     //Uptime command. Will trigger an event to send the bot uptime in chat.
    //     name: 'uptime',
    //     type: 'command',
    //     channel: process.env.CHANNEL,
    //     chatTrigger: true,
    //     eventName: 'uptime_event'
    // },
    {
        //Hello message. Will send a response when someone says hello.
        name: 'hello',
        type: 'word',
        channel: 'channel-name',
        chatTrigger: true,
        responseText: 'Hello, welcome to the chat!'
    }
  ],
  //The timed messages
  timedMessages: [
    {
        message:
            'Hello, do you like the stream? Dont forget to hit the follow button!',
        channel: 'channel-name',
        minDelay: 10,
        minChatMessages: 2
    },
    {
        message:
            'Hello. Visit our website at https://github.com/chriteixeira/twitch-toolkit',
        channel: 'channel-name',
        minDelay: 20
    }
  ]
})

// twitchChat.connect()