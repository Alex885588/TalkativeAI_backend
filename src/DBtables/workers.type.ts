import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class WorkersType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    position: string;

    @Column()
    description: string;

    @Column()
    iconPath: string;

    @Column()
    iconURL: string;
}