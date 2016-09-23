// Description:
//   Get free advice from http://adviceslip.com/
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot what should I do about (.*)
//   hubot what do you think about (.*)
//   hubot how do you handle (.*)
//   hubot I need some advice
//
// Author:
//   pengwynn
//
function getAdvice(msg, query) {
  return msg.http("http://api.adviceslip.com/advice/search/" + query).get()(function(err, res, body) {
    let results = JSON.parse(body);
    if (results.message != null) {
      return randomAdvice(msg);
    } else {
      return msg.send(msg.random(results.slips).advice);
    }
  });
};

function randomAdvice(msg) {
  return msg.http("http://api.adviceslip.com/advice").get()(function(err, res, body) {
    let results = JSON.parse(body);
    let advice = err ? "You're on your own, bud" : results.slip.advice;
    return msg.send(advice);
  });
};

module.exports = function(robot) {
  robot.respond(/what (do you|should I) do (when|about) (.*)/i, function(msg) {
    return getAdvice(msg, msg.match[3]);
  });
  robot.respond(/how do you handle (.*)/i, function(msg) {
    return getAdvice(msg, msg.match[1]);
  });
  robot.respond(/(.*) some advice about (.*)/i, function(msg) {
    return getAdvice(msg, msg.match[2]);
  });
  robot.respond(/(.*) think about (.*)/i, function(msg) {
    return getAdvice(msg, msg.match[2]);
  });
  return robot.respond(/(.*) advice$/i, function(msg) {
    return randomAdvice(msg);
  });
};
