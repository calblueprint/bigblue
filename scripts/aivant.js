module.exports = function(robot) {
  return robot.hear(/aivantisbad/i, function(msg) {
    return msg.send("@Aivant--");
  });
};
