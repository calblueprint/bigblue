let booty = [
  "I don't think you're ready for this jelly",
  "I don't think you're ready for this jelly",
  "I don't think you're ready for this jelly",
  "I don't think you're ready for this jelly",
  "I think you're ready for this jelly"
];

module.exports = function(robot) {
  return robot.hear(/am i ready/i, function(msg) {
    return msg.send(msg.random(booty));
  });
};
