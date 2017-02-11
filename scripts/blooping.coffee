# Description:
#   Pairs members of #blooping and sets a theme
#
# Dependencies:
#   Cron
#
# Configuration:
#   None
#
# Commands:
#   None

module.exports = (robot) ->
    runBloops = ->
        console.log(robot.brain.data.users)
        robot.messageRoom 'Shell', 'Poop'

    cronJob = require('cron').CronJob
    tz = 'America/Los_Angeles'
    job = new cronJob('* * * * * *', runBloops, null, true, tz)
