import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity as TypeormBaseEntity,
} from 'typeorm';

export abstract class BaseEntityNoId extends TypeormBaseEntity {
    @CreateDateColumn()
    createdOn!: Date;

    @DeleteDateColumn()
    deletedOn?: Date;

    @UpdateDateColumn()
    updatedOn!: Date;
}

export abstract class BaseEntity extends BaseEntityNoId {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}
