module.exports = function(robot) { 
  return robot.hear(/up!/i, function(msg) { 
    return msg.send("I'm BACK, what did I miss?");
  });
};
