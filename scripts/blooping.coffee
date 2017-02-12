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

BLOOPING_CHANNEL = 'blooping'
BLOOPING_START_HOUR = '10'

module.exports = (robot) ->
    # TODO (jgong): Implement blooping pairs
    runBloops = ->
        robot.messageRoom 'Shell', 'Poop'

    cronJob = require('cron').CronJob
    tz = 'America/Los_Angeles'
    #job = new cronJob('* * * * * *', runBloops, null, true, tz)

    robot.respond /set next blooping date ((0)?[1-9]|1[012])[- \/.]((0)?[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/i, (res) ->
        date_string = res.message.text.split(' ')[5]
        date_array = date_string.split '/'
        year = date_array[2]
        month = date_array[0] - 1
        day = date_array[1]
        date_object = new Date year, month, day, BLOOPING_START_HOUR 
        now = new Date()
        if date_object < now
            res.send 'Pick a date in the future.'
            return
        # TODO (amillman): Save the future date

    # TODO (amillman): Prevent next bloop from happening
    robot.respond /stop blooping/i, (res) ->
        res.send 'Done. Use `set next blooping date mm/dd/yyyy` to set the next blooping date.'

    # TODO (amillman): Set blooping theme
    robot.respond /set next blooping theme [blooping]/i, (res) ->
        res.send 'Done. Use `set next blooping date mm/dd/yyyy` to set the next blooping date.'
