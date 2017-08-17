#!/usr/bin/env node
'use strict';

process.title = 'unite';

const cliMod = require('../dist/cli');

const cli = new cliMod.CLI();
cli.run(process)
    .then((result) => {
        process.exit(result);
    });
