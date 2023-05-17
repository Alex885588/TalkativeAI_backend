import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Messages } from './messages';
 
@Entity()
export class AI {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    aiName: string;
    
    @Column()
    slug: string;
}