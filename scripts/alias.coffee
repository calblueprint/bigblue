# Description:
#   Set aliases for people's names.
#
# Dependencies:
#
# Configuration:
#
# Commands:
#   @<alias>
#   hubot alias set <alias> <mention>
#   hubot alias set <alias> [[<mention>, ]*<mention>]
#   hubot alias get <alias>
#
# Author:
#   aykamko

class AliasStore
  constructor: (@robot) ->
    @brainLoaded = false

    @cache =
      aliasToNames: {}
      namesToAliases: {}

    @robot.brain.on 'loaded', =>
      @robot.brain.data.aliasToNames ||= {}
      @robot.brain.data.namesToAliases ||= {}
      @brainLoaded = true
      @cache.aliasToNames = @robot.brain.data.aliasToNames
      @cache.namesToAliases = @robot.brain.data.namesToAliases

  getNamesForAlias: (alias) ->
    return @cache.aliasToNames[alias.replace(/@/g, '')]

  saveAlias: (alias, names) ->
    if !@brainLoaded
      self = this
      setTimeout((-> self.saveAlias(alias, names)), 1000)
      return
    @robot.brain.data.aliasToNames[alias] = names
    for n in names
      @robot.brain.data.namesToAliases[n] ||= []
      @robot.brain.data.namesToAliases[n].push alias
    @robot.brain.emit('save', @robot.brain.data)

  addAlias: (alias, names) ->
    @cache.aliasToNames[alias] = names
    for n in names
      @cache.namesToAliases[n] ||= []
      @cache.namesToAliases[n].push alias
    # asynchonously save to brain
    self = this
    setTimeout((-> self.saveAlias(alias, names)), 0)

  getAliases: (alias) ->
    return @cache.namesToAliases[alias]

module.exports = (robot) ->
  aliasStore = new AliasStore(robot)

  robot.respond /(?:alias set|set alias) @?(\S+) @?(\S+)$/i, (msg) ->
    alias = msg.match[1]
    names = [msg.match[2]]
    aliasStore.addAlias(alias, names)

    msg.send "Set alias from `@#{alias}` to `@#{names}`"

  robot.respond /(?:alias set|set alias) @?(\S+) \[@?((?:\S+,\s+@?)*\S+)\]$/i, (msg) ->
    alias = msg.match[1]
    names = msg.match[2].split(/, ?@?/)
    aliasStore.addAlias(alias, names)

    msg.send "Set alias from `@#{alias}` to `@#{names.join(' @')}`"

  robot.respond /(?:alias get|get alias) @?(\S+)$/i, (msg) ->
    name = msg.match[1]
    aliases = aliasStore.getAliases(names) || []

    msg.send "Aliases for `@#{name}`: `@#{aliases.join(' @')}`"

  robot.hear /(@\S+)/g, (msg) ->
    if msg.message.text.match(/((s|g)et alias|alias (s|g)et)/)
      return
    mentions = []
    for alias in msg.match
      names = aliasStore.getNamesForAlias(alias)
      if names
        for n in names
          mentions.push "@#{n}"

    if mentions.length == 0
      return
    msg.send "#{mentions.join(' ')}: ^^^"
