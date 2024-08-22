import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        const existingUser = await this.usersRepository.findOne({
            where: [
                { username: createUserDto.username },
                { email: createUserDto.email }
            ]
        });

        if (existingUser) {
            throw new ConflictException('Username or email already exists');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        // Generate friendTag
        let friendTag = `@${createUserDto.username}`;
        let counter = 1;
        while (await this.usersRepository.findOne({ where: { friendTag } })) {
            friendTag = `@${createUserDto.username}${counter}`;
            counter++;
        }

        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
            friendTag: friendTag,
        });
        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['friends', 'goodDeeds']
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByUsername(username: string): Promise<User> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        Object.assign(user, updateUserDto);
        return this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['friends', 'goodDeeds']
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Remove friendships
        user.friends = [];
        await this.usersRepository.save(user);

        // Remove good deeds
        if (user.goodDeeds) {
            await this.usersRepository.manager.remove(user.goodDeeds);
        }

        // Finally, remove the user
        await this.usersRepository.remove(user);
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
}
