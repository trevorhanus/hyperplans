import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {

    @Column()
    email: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    image: string;

}
