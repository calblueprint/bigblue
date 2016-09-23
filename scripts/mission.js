// Description:
//   Make sure that big blue knows our mission.
//
// Dependencies:
//
//
// Configuration:
//
// Commands:
//   bigblue the mission - Make sure big blue knows the mission
//
// Notes:
//   DON'T DELETE THIS SCRIPT! ALL ROBAWTS MUST KNOW THE MISSION
//
// Author:
//   jayyr

let mission = "To make beautiful engineering accessible and useful for those who create communities and promote public welfare.";

let vision = "A world where the good, passionate, and visionary have the biggest impact on our communities and society.";

module.exports = function(robot) {
  robot.respond(/(what is )?the (vision)/i, function(msg) {
    var text;
    text = msg.message.text;
    return msg.send(vision);
  });

  return robot.respond(/(what is )?the (mission)/i, function(msg) {
    var text;
    text = msg.message.text;
    return msg.send(mission);
  });
};
