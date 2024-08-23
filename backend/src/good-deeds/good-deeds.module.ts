import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodDeedsService } from './good-deeds.service';
import { GoodDeedsController } from './good-deeds.controller';
import { GoodDeed } from './entities/good-deed.entity';

@Module({
    imports: [TypeOrmModule.forFeature([GoodDeed])],
    controllers: [GoodDeedsController],
    providers: [GoodDeedsService],
})
export class GoodDeedsModule {}
