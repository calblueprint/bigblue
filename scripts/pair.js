// Description:
//   For testing purposes
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot pair <slack channel>
//
// Author:
//   jiefu + milman
//
class RobotPairer {
  constructor(robot) {
    this.robot = robot;
    this.cache = {
      pairs: {}
    }
    
    this.robot.brain.on('loaded', () => {
      this.robot.brain.data.pairs = this.robot.brain.data.pairs || {};
      this.cache.pairs = this.robot.brain.data.pairs;
    });
  }

  pairUsers(msg, robot, slackChannel) {
    let allUsers = robot.brain.data.users;
    let userKeys = Object.keys(allUsers);
    let response =  "";
  
    /* Names of all the users in a channel */
    let usersInChannel = this._getAllUsersInChannel(msg, robot, slackChannel);
  
    /* Randomized pairs of all the users */
    let allPairs = this._pairUpAllUsers(usersInChannel);

    /* Generate and respond with all the pairs */
    for (let i = 0; i < allPairs.length; i++) {
      response += "Pair " + (i + 1) + ": "
  
      let currPair = allPairs[i];
      for (let numIndividuals = 0; numIndividuals < currPair.length; numIndividuals++) {
        response += currPair[numIndividuals] + " ";
      }
      response += "\n";
    }
  
    if (response === "") {
      return "No pairs found -- did you enter a correct channel name?";  
    }
    
    return response;
  }
  
  _pairUpAllUsers(usersInChannel) {
    // Ideas:
    // 1. Robot brain retains a dictionary of people -> array of people that they've already interviewed
    // 2. Generate pairs and check if any of them violate the constraints held by the brain
    this._shuffleUsers(usersInChannel);
  
    let pairs = [];
    let pair = [];
    let numUsers = usersInChannel.length;
  
    /* If there are no users in the channel, return nothing */
    if (numUsers == 0) {
      return pairs;
    }
  
    /* If there are less than 3 users in the channel, just add all of them */
    if (numUsers <= 3) {
      pairs.push(usersInChannel);
      return pairs;
    }
  
    /* Pair up all the users */
    for (let i = 0; i < numUsers; i += 2) {
      pair = [];
      pair.push(usersInChannel[i]);
      pair.push(usersInChannel[i + 1]);
      pairs.push(pair);
    }
  
    /* Create group of three if number of users in channel is odd */
    if (numUsers % 2 == 1) {
      pairs[0].push(usersInChannel[numUsers - 1]);
    }
  
    return pairs;
  }
  
  _getAllUsersInChannel(msg, robot, channelName) {
    /* All the slack channel objects in this slack */
    let allSlackChannels = robot.adapter.client.channels;
    /* All the user objects in this slack */
    let allSlackUsers = robot.adapter.client.users;
    /* Keys of all the channels, unique ID for each channel */
    let channelKeys = Object.keys(allSlackChannels);
    /* Keys of all the users, unique ID for each user */
    let userKeys = Object.keys(allSlackUsers);
  
    /* ID of the channel matching channelName, if it exists */
    let thisChannelMembers = null;
    /* List of all members belonging to this channel */
    let thisChannelMemberNames = [];
  
    channelKeys.forEach(function(channelID) {
        let currChannel = allSlackChannels[channelID];
        if (currChannel.name === channelName) {
          thisChannelMembers = currChannel.members;
        }
    });
  
    if (thisChannelMembers !== null) {
      for (let i = 0; i < thisChannelMembers.length; i++) {
        let memberID = thisChannelMembers[i];
        let memberObject = allSlackUsers[memberID];
        thisChannelMemberNames.push(memberObject.name);
      }
    }
  
    return thisChannelMemberNames;
  }
  
  _shuffleUsers(usersInChannel) {
    // Uses the Fisher-Yates shuffle to randomly sort the list
    var m = usersInChannel.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = usersInChannel[m];
      usersInChannel[m] = usersInChannel[i];
      usersInChannel[i] = t;
    }
  
    return usersInChannel;
  }
}

module.exports = function(robot) {
  let pairer = new RobotPairer(robot);
  
  robot.respond(/pair (.*)/i, function(msg) {
    let slackChannel = msg.match[1];
    return msg.send(pairer.pairUsers(msg, robot, slackChannel));
  });
};