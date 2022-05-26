import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity('users', { schema: 'public' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column('bigint', { name: 'batchid' })
    public batchId?: number;
}
