module.exports = function(robot) { 
  return robot.hear(/bigblue up!/i, function(msg) { 
    return msg.send("I'm BACK, what did I miss?");
  });
};
