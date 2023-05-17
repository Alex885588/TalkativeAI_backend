import { UserRole } from 'src/enum/enum.user';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Messages } from './messages';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    type: UserRole;
}