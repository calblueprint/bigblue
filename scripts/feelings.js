module.exports = function(robot) { 
  return robot.hear(/how do you feel?/i, function(msg) { 
    return msg.send("AHHHHHH *cough* I'm good!");
  });
};
