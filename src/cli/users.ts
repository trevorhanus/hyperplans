import { Command } from 'commander';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const program = new Command();

program
    .command('list')
    .action(async (args) => {
        try {
            const allUsers = await prisma.user.findMany();
            console.log(allUsers);
        } catch (e) {
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    });

program.parseAsync(process.argv);
