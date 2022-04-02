import { dataSource } from 'conn/db';
import { User } from 'entities/User';

export const UserRepo = dataSource.getRepository(User).extend({

});
