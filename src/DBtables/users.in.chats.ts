import { UserRole } from 'src/enum/enum.user';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Messages } from './messages';
import { User } from './user';
import { Chats } from './chats';

@Entity()
export class UsersInChats {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;
    
    @ManyToOne(() => Chats)
    @JoinColumn({ name: "chatId" })
    chats: Chats;

    @Column()
    userId: number;

    @Column()
    chatId: number;
}
