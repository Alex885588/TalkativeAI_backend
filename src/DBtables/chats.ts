import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Chats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatName: string;
}