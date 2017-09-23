class Command {
  constructor(client, {
    name = null,
    description = 'No description provided.',
    category = 'General',
    usage = 'No usage provided.',
    extended = 'No information provided.',
    cost = 0,
    hidden = false,
    guildOnly = false,
    aliases = [],
    botPerms = [],
    permLevel = 'User'
  }) {
    this.client = client;
    this.conf = {
      hidden,
      guildOnly,
      aliases,
      botPerms,
      permLevel
    };
    this.help = {
      name,
      description,
      category,
      usage,
      extended,
      cost
    };
  }

  async verifyUser(user) {
    try {
      const match = /(?:<@!?)?([0-9]{17,20})>?/gi.exec(user);
      if (!match) throw 'Invalid user';
      const id = match[1];
      const check = await this.client.fetchUser(id);
      if (check.username !== undefined) return id;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Command;