// Description:
//   How full the RSF tho?
//
// Dependencies:
//
// Configuration:
//  Need to reference the workflow provided by Paragon to fetch the RSF API info.
// Commands:
//   mention 'rsf' in any channel where hubot is listening
//
// Author:
//   nick

module.exports = function(robot) {
  robot.hear(/(rsf)/i, function(msg) {

    var url = "https://hermes.useparagon.com/triggers/16625983-ef9f-4523-8417-ed10600a0031"
    new Promise((resolve, reject) =>
        robot.http(url)
            .header('Content-Type', 'application/json')
            .post(JSON.stringify({ "slack_user": msg.message.user.id }))((err, response, body) =>
            err ? reject(err) : resolve(body)
        )
    )
    .then(body => JSON.parse(body))
    return msg
  });
};
