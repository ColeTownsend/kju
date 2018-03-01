const chalk = require('chalk');
const cp = require('copy-paste');

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

class Logger {

	constructor() {

		this.showLogs = false;
		this.clipboard = {
			toggle: false,
			gceeqs: '',
			userAgent: ''
		};

		let _this = this;
		process.stdin.on('keypress', function (char, key) {
			if (key && key.ctrl && key.name == 'c') {
				process.stdin.setRawMode(false);
				console.log(chalk.blue('Press Ctrl+C again to exit.'));
			} else if (key && key.name == 'l') {
				_this.toggle();
				console.log(key);
			} else if (key && key.name == 'c') {
				_this.copy();
			}
		});

	}

	toggle() {
		this.showLogs = !this.showLogs;
		console.log(chalk.blue(this.showLogs ? 'Showing Logs...' : 'Hiding logs.'));
	}

	intro(instances) {
		console.log('');
		console.log(chalk.bgBlue.white(' ❯❯❯_ '), chalk.bold('Kju v0.3.0'));
		console.log(chalk.blue(`Loading ${instances} instances...`));
		console.log('');
	}

	info(instance, message) {
		if (this.showLogs) console.log(chalk.bgBlackBright.white(` Instance ${instance} `), chalk.dim(message));
	}

	error(instance, error) {
		if (this.showLogs) console.log(chalk.bgRed.white(` Instance ${instance} `), error);
	}

	success(instance, gceeqs, userAgent) {
		this.clipboard.gceeqs = gceeqs;
		this.clipboard.userAgent = userAgent;
		console.log(chalk.bgGreen.white(' ❯❯❯_ '), chalk.green(`Through Splash on Instance ${instance}!`));
		console.log(gceeqs || 'Unknown cookie.');
		console.log(userAgent);
		console.log('');
	}

	copy() {
		this.clipboard.toggle = !this.clipboard.toggle;
		cp.copy(this.clipboard.toggle ? this.clipboard.gceeqs : this.clipboard.userAgent);
		console.log(chalk.blue('Copied last', this.clipboard.toggle ? 'HMAC Cookie.' : 'UserAgent.'));
	}

}

module.exports = Logger;