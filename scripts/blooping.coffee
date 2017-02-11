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
        robot.messageRoom 'Shell', 'Poop'

    cronJob = require('cron').CronJob
    tz = 'America/Los_Angeles'
    job = new cronJob('* * * * * *', runBloops, null, true, tz)

    #robot.respond /set next blooping date (0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/i, (res) ->
