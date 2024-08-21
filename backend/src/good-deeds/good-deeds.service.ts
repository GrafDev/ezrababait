
// src/good-deeds/good-deeds.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodDeed } from './entities/good-deed.entity';
import { CreateGoodDeedDto } from './dto/create-good-deed.dto';
import { UpdateGoodDeedDto } from './dto/update-good-deed.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GoodDeedsService {
    constructor(
        @InjectRepository(GoodDeed)
        private goodDeedsRepository: Repository<GoodDeed>,
    ) {}

    async create(createGoodDeedDto: CreateGoodDeedDto, user: User): Promise<GoodDeed> {
        const goodDeed = this.goodDeedsRepository.create({
            ...createGoodDeedDto,
            user: user,
            userId: user.id,
        });
        return this.goodDeedsRepository.save(goodDeed);
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
}
