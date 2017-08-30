const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const path = require('path');

const { run: reboot } = require('./reboot');

module.exports = class {
  constructor(client) {
    this.client = client;

    this.conf = {
      hidden: false,
      guildOnly: false,
      aliases: ['git', 'pull'],
      permLevel: 10
    };

    this.help = {
      name: 'update',
      description: 'This updates the bot from its git repo.',
      usage: 'update',
      category: 'System',
      extended: 'This command is designed to update the bot from it\'s own repository, then reboots the bot for the changes to take effect.'
    };
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    const { stdout, stderr, err } = await exec(`git pull ${require('../package.json').repository.url.split('+')[1]}`, { cwd: path.join(__dirname, '../') }).catch(err => ({ err }));
    if (err) return console.error(err);
    const out = [];
    if (stdout) out.push(stdout);
    if (stderr) out.push(stderr);
    await message.channel.send(out.join('---\n'), { code: true });
    if (!stdout.toString().includes('Already up-to-date.')) {
      return reboot(message, args, level);
    }
  }
};
