import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodDeed } from './entities/good-deed.entity';
import { CreateGoodDeedDto, UpdateGoodDeedDto } from './dto/good-deed.dto';

@Injectable()
export class GoodDeedsService {
    constructor(
        @InjectRepository(GoodDeed)
        private goodDeedsRepository: Repository<GoodDeed>,
    ) {}

    create(createGoodDeedDto: CreateGoodDeedDto, userId: number): Promise<GoodDeed> {
        const goodDeed = this.goodDeedsRepository.create({
            ...createGoodDeedDto,
            userId,
        });
        return this.goodDeedsRepository.save(goodDeed);
    }

    findAll(userId: number): Promise<GoodDeed[]> {
        return this.goodDeedsRepository.find({ where: { userId } });
    }

    findOne(id: number, userId: number): Promise<GoodDeed> {
        return this.goodDeedsRepository.findOneOrFail({ where: { id, userId } });
    }

    async update(id: number, updateGoodDeedDto: UpdateGoodDeedDto, userId: number): Promise<GoodDeed> {
        await this.goodDeedsRepository.update({ id, userId }, updateGoodDeedDto);
        return this.findOne(id, userId);
    }

    async remove(id: number, userId: number): Promise<void> {
        await this.goodDeedsRepository.delete({ id, userId });
    }
}
