import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository, Like, Not} from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        await this.checkUserExists(createUserDto.username, createUserDto.email);

        const hashedPassword = await this.hashPassword(createUserDto.password);
        const friendTag = await this.generateUniqueFriendTag(createUserDto.username);

        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
            friendTag,
        });

        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        if (typeof id !== 'number' || isNaN(id)) {
            throw new BadRequestException('Invalid user ID');
        }
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['friends', 'goodDeeds']
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);

        if (updateUserDto.password) {
            updateUserDto.password = await this.hashPassword(updateUserDto.password);
        }

        if (updateUserDto.email && updateUserDto.email !== user.email) {
            await this.checkEmailExists(updateUserDto.email);
        }

        if (updateUserDto.username && updateUserDto.username !== user.username) {
            await this.checkUsernameExists(updateUserDto.username);
            updateUserDto.friendTag = await this.generateUniqueFriendTag(updateUserDto.username);
        }

        Object.assign(user, updateUserDto);
        return this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);

        // Remove friendships
        await this.usersRepository.createQueryBuilder()
            .relation(User, "friends")
            .of(user)
            .remove(user.friends);

        // Remove good deeds
        if (user.goodDeeds.length > 0) {
            await this.usersRepository.manager.remove(user.goodDeeds);
        }

        // Remove the user
        await this.usersRepository.remove(user);
    }

    async searchUsers(query: string, currentUserId: number): Promise<User[]> {
        const currentUser = await this.findOne(currentUserId);

        const users = await this.usersRepository.find({
            where: {
                friendTag: Like(`%${query}%`),
                id: Not(currentUserId) // Исключаем текущего пользователя из результатов
            },
            select: ['id', 'username', 'friendTag']
        });

        // Фильтруем уже добавленных друзей
        return users.filter(user => !currentUser.friends.some(friend => friend.id === user.id));
    }

    async addFriend(userId: number, friendTag: string): Promise<User> {
        const user = await this.findOne(userId);
        const friend = await this.usersRepository.findOne({ where: { friendTag } });

        if (!friend) {
            throw new NotFoundException(`User with friendTag ${friendTag} not found`);
        }

        if (user.friends.some(f => f.id === friend.id)) {
            throw new ConflictException('Friend already added');
        }

        user.friends.push(friend);
        return this.usersRepository.save(user);
    }

    async getFriends(userId: number): Promise<User[]> {
        const user = await this.findOne(userId);
        return user.friends;
    }

    private async checkUserExists(username: string, email: string): Promise<void> {
        const existingUser = await this.usersRepository.findOne({
            where: [{ username }, { email }]
        });

        if (existingUser) {
            throw new ConflictException('Username or email already exists');
        }
    }

    private async checkEmailExists(email: string): Promise<void> {
        const existingUser = await this.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }
    }

    private async checkUsernameExists(username: string): Promise<void> {
        const existingUser = await this.findByUsername(username);
        if (existingUser) {
            throw new ConflictException('Username already exists');
        }
    }

    private async generateUniqueFriendTag(username: string): Promise<string> {
        let friendTag = `@${username}`;
        let counter = 1;
        while (await this.usersRepository.findOne({ where: { friendTag } })) {
            friendTag = `@${username}${counter}`;
            counter++;
        }
        return friendTag;
    }

    private async hashPassword(password: string): Promise<string> {
        if (password.length < 6) {
            throw new BadRequestException('Password must be at least 6 characters long');
        }
        return bcrypt.hash(password, 10);
    }
}
