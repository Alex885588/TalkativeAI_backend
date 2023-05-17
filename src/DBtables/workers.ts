import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';
import { WorkersType } from './workers.type';

@Entity()
export class Workers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "jsonb" })
    data: Record<any, any>;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(() => WorkersType)
    @JoinColumn({ name: "workerTypeId" })
    workerType: WorkersType;

    @Column()
    userId: number;

    @Column()
    workerTypeId: number;
}