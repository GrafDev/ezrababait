import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { GoodDeed } from '../../good-deeds/entities/good-deed.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: true })
    friendTag: string;

    @OneToMany(() => GoodDeed, goodDeed => goodDeed.user)
    goodDeeds: GoodDeed[];

    @ManyToMany(() => User, user => user.friends)
    @JoinTable()
    friends: User[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
