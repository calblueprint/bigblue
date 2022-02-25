
handleReaction = (res) ->
  message = res.message

  if (message.rawMessage.channel != "C0XD6UEGH") {
    return false
  }

  item = message.item
  type = message.type
  console.log(message)
  user = "#{message.user.real_name} (@#{message.user.name})"
  reaction = message.reaction

  res.reply "#{user} #{type} a *#{reaction}*."

module.exports = (robot) ->
  robot.react handleReaction
  robot.logger.info 'Listening for reaction_added, reaction_removed events'