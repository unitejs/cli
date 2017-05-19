#!/usr/bin/env node
'use strict';

process.title = 'unite';

const cliMod = require('../dist/unitejs-cli');

const cli = new cliMod.CLI();
cli.run(process);

