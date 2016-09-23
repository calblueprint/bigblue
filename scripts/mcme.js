// Description:
//   MCme is the least important thing in your life
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   bigblue mc me - Receive a grotesque human being, err I mean a MC.

module.exports = function(robot) {
  return robot.respond(/mc me/i, function(msg) {
    return msg.http("http://mcme.herokuapp.com/random").get(function(err, res, body) {
      return msg.send(JSON.parse(body).mc);
    });
  });
};
