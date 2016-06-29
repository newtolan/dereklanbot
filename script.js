'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('屌~~ 甘客气啊!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('你叫米Q名啊?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`讲真，你条名都几普通下! 不过尊重你老豆，我就叫你 ${name}
OK唔ok? %[Yes](回复:yes) %[No](回复:no)`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, 我老细无教我点复你呢个问题喔 ` +
                        '有本事，你教下我咯!'))
                .then(() => 'finish');
        }
    }
});
