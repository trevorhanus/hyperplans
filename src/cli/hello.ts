import { Command } from 'commander';
import { withDb } from './cli-utils';

const program = new Command();

program
    .action(withDb(async (db, args) => {
        console.log('Hello, there!');
    }));

program.parseAsync(process.argv);
