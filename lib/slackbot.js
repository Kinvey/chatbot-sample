const Botkit = require('botkit');
const kinvey = require ('./kinvey');
var os = require('os');
const token = 'xoxb-65016411681-ZCF4vjvcr9W99fQsgqc6HaRb';

var controller = Botkit.slackbot();

controller.spawn({
  token: token
}).startRTM();

controller.hears(['get.*tasks'], 'direct_message,direct_mention,mention', function(bot, message) {
  kinvey.collection('Task').getAll(function(err, result) {
    if (err) {
      bot.reply(message, "I'm sorry, I can't do that right now.");
      bot.botkit.log("Failed to retrieve tasks", err);
    } else {
      bot.reply(message, "OK, here you go");
      bot.reply(message, processTaskResults(JSON.parse(result)));
    }
  });
});


controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {

  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'robot_face',
  }, function(err, res) {
    if (err) {
      bot.botkit.log('Failed to add emoji reaction :(', err);
    }
  });


  controller.storage.users.get(message.user, function(err, user) {
    if (user && user.name) {
      bot.reply(message, 'Hello ' + user.name + '!!');
    } else {
      bot.reply(message, 'Hello.');
    }
  });
});

function processTaskResults(results) {
  console.log('here');
  let resultString = '';
  console.log(results);
  results.forEach(function(item) {
    let itemString = '';
    itemString += 'Title: ' + item.Title + '\n';
    itemString += 'Action: ' + item.action + '\n';
    itemString += '\n';
    resultString += itemString;
  });
  console.log(resultString);
  return resultString;
}

module.exports = controller;