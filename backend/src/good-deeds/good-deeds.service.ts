
// src/good-deeds/good-deeds.service.ts
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodDeed } from './entities/good-deed.entity';
import { CreateGoodDeedDto } from './dto/create-good-deed.dto';
import { UpdateGoodDeedDto } from './dto/update-good-deed.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GoodDeedsService {
    private readonly logger = new Logger(GoodDeedsService.name);

    constructor(
        @InjectRepository(GoodDeed)
        private goodDeedsRepository: Repository<GoodDeed>,
    ) {}

    async create(createGoodDeedDto: CreateGoodDeedDto, user: User): Promise<GoodDeed> {
        this.logger.log(`Attempting to create a good deed for user ${user.id}`);
        this.logger.debug(`CreateGoodDeedDto: ${JSON.stringify(createGoodDeedDto)}`);
        this.logger.debug(`User: ${JSON.stringify(user)}`);

        try {
            const goodDeed = this.goodDeedsRepository.create({
                ...createGoodDeedDto,
                user: user,
            });
            this.logger.debug(`Created good deed object: ${JSON.stringify(goodDeed)}`);

            const savedGoodDeed = await this.goodDeedsRepository.save(goodDeed);
            this.logger.log(`Successfully saved good deed with id ${savedGoodDeed.id}`);
            return savedGoodDeed;
        } catch (error) {
            this.logger.error(`Failed to create good deed: ${error.message}`, error.stack);
            throw error;
        }
    }

    async findAll(user: User): Promise<GoodDeed[]> {
        return this.goodDeedsRepository.find({ where: { userId: user.id } });
    }

    async findOne(id: number, user: User): Promise<GoodDeed> {
        const goodDeed = await this.goodDeedsRepository.findOne({
            where: { id, userId: user.id },
        });
        if (!goodDeed) {
            throw new NotFoundException(`Good deed with ID "${id}" not found`);
        }
        return goodDeed;
    }

    async update(id: number, updateGoodDeedDto: UpdateGoodDeedDto, user: User): Promise<GoodDeed> {
        const goodDeed = await this.findOne(id, user);
        Object.assign(goodDeed, updateGoodDeedDto);
        return this.goodDeedsRepository.save(goodDeed);
    }

    async remove(id: number, user: User): Promise<void> {
        const goodDeed = await this.findOne(id, user);
        await this.goodDeedsRepository.remove(goodDeed);
    }
    async getFriendGoodDeeds(friendId: number): Promise<GoodDeed[]> {
        return this.goodDeedsRepository.find({
            where: { userId: friendId },
            order: { createdAt: 'DESC' }
        });
    }
    async completeGoodDeed(id: number, user: User): Promise<GoodDeed> {
        const goodDeed = await this.findOne(id, user);
        goodDeed.completed = true;
        return this.goodDeedsRepository.save(goodDeed);
    }
}
