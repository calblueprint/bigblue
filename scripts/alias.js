// Description:
//   Set aliases for people's names.
//
// Dependencies:
//
// Configuration:
//
// Commands:
//   @<alias>
//   hubot alias set <alias> <mention>
//   hubot alias set <alias> [[<mention>, ]*<mention>]
//   hubot alias get <alias>
//
// Author:
//   aykamko

class AliasStore {
  constructor(robot) {
    this.robot = robot;
    this.brainLoaded = false;

    this.cache = {
      aliasToNames: {},
      namesToAliases: {}
    }

    this.robot.brain.on('loaded', () => {
      this.robot.brain.data.aliasToNames = this.robot.brain.data.aliasToNames || {};
      this.robot.brain.data.namesToAliases = this.robot.brain.data.namesToAliases || {};
      this.brainLoaded = true;
      this.cache.aliasToNames = this.robot.brain.data.aliasToNames;
      this.cache.namesToAliases = this.robot.brain.data.namesToAliases;
    });
  }

  getNamesForAlias(alias) {
    return this.cache.aliasToNames[alias.replace(/[@:]/g, '')];
  }

  saveAlias(alias, names) {
    if (!this.brainLoaded) {
      let self = this;
      setTimeout((() => self.saveAlias(alias, names)), 1000);
      return;
    }
    this.robot.brain.data.aliasToNames[alias] = names;
    for (let n in names) {
      this.robot.brain.data.namesToAliases[n] = this.robot.brain.data.namesToAliases[n] || [];
      this.robot.brain.data.namesToAliases[n].push(alias);
    }
    return this.robot.brain.emit('save', this.robot.brain.data);
  }

  addAlias(alias, names) {
    this.cache.aliasToNames[alias] = names;
    for (let n in names) {
      this.cache.namesToAliases[n] = this.cache.namesToAliases[n] || [];
      this.cache.namesToAliases[n].push(alias);
    }
    // asynchonously save to brain
    let self = this
    return setTimeout((() => self.saveAlias(alias, names)), 0);
  }

  getAliases(name) {
    return this.cache.namesToAliases[name];
  }
}


module.exports = function(robot) {
  let aliasStore = new AliasStore(robot);

  robot.respond(/(?:alias set|set alias) @?([\w\-]+) @?([\w\-]+)$/i, function(msg) {
    let alias = msg.match[1];
    let names = [msg.match[2]];
    aliasStore.addAlias(alias, names);
    return msg.send("Set alias from `@" + alias + "` to `@" + names + "`");
  });

  robot.respond(/(?:alias set|set alias) @?([\w\-]+) \[@?((?:[\w\-]+,\s+@?)*[\w\-]+)\]$/i, function(msg) {
    let alias = msg.match[1];
    let names = msg.match[2].split(/, ?@?/);
    aliasStore.addAlias(alias, names);
    return msg.send("Set alias from `@" + alias + "` to `@" + (names.join(' @')) + "`");
  });

  robot.respond(/(?:alias get|get alias) @?([\w\-]+)$/i, function(msg) {
    let name = msg.match[1];
    let aliases = aliasStore.getAliases(name);
    if (aliases) {
      return msg.send("Aliases for `" + name + "`: `" + (aliases.join(' ')) + "`");
    } else {
      return msg.send("No aliases for `" + name + "`.");
    }
  });

  return robot.hear(/(@[\w\-]+)/g, function(msg) {
    if (msg.message.text.match(/((s|g)et alias|alias (s|g)et)/)) {
      return;
    }
    let mentions = [];
    let ref = msg.match;
    for (let i = 0; i < ref.length; i++) {
      let alias = ref[i];
      let names = aliasStore.getNamesForAlias(alias);
      if (names) {
        for (let j = 0; j < names.length; j++) {
          mentions.push("@" + names[j]);
        }
      }
    }
    if (mentions.length === 0) {
      return;
    }
    return msg.send((mentions.join(' ')) + ": ↑↑↑");
  });
};
