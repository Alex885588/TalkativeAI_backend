import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { AI } from './ai';
import { Chats } from './chats';
import { User } from './user';

@Entity()
export class Messages {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(() => Chats)
    @JoinColumn({ name: "chatId" })
    chats: Chats;

    @ManyToOne(() => AI, { nullable: true })
    @JoinColumn({ name: "aiId" })
    ai: AI ;

    @Column( { nullable: true })
    userId: number;

    @Column()
    chatId: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Column( { nullable: true })
    aiId: number;
}