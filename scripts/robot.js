module.exports = function(robot) {
  return robot.hear(/hi @bigblue (.*)$/i, function(msg) {
    let from = msg.message.user.name;
    return msg.send("hi " + from);
  });
};
