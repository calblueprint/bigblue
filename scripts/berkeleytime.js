// Description:
//   sends URL to Berkeley Time
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   bigblue what time is it

module.exports = function(robot) {
  return robot.hear(/what time is it/i, function(msg) {
    return msg.send("http://berkeleytime.com/");
  });
};
