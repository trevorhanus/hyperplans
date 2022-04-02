import { getDb } from 'conn/db';
import { DataSource } from 'typeorm';

type Action = (...args: any[]) => Promise<void>;
type ActionWithDb = (db: DataSource, ...args: any[]) => Promise<void>;
type ActionSync = (...args: any[]) => void;

export const withDb = (action: ActionWithDb) => {
    return async (...args: any[]) => {
        const db = getDb();

        try {
            await action(db, ...args);
            // await db.destroy();
            process.exit(0);
        } catch (e) {
            console.log(e);
            // await db.destroy();
            process.exit(1);
        }
    }
};

export const tryCatch = (action: Action) => {
    return async (...args: any[]) => {
        try {
            await action(...args);
        } catch (e) {
            console.log(e);
        }

        process.exit(0);
    }
}

export const tryCatchSync = (action: ActionSync) => {
    return (...args: any[]) => {
        try {
            action(...args);
        } catch (e) {
            console.log(e);
        }

        process.exit(0);
    }
}
