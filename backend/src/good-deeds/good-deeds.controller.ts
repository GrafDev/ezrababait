// src/good-deeds/good-deeds.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Logger } from '@nestjs/common';
import { GoodDeedsService } from './good-deeds.service';
import { CreateGoodDeedDto } from './dto/create-good-deed.dto';
import { UpdateGoodDeedDto } from './dto/update-good-deed.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';

@ApiTags('good-deeds')
@ApiBearerAuth()
@Controller('good-deeds')
@UseGuards(JwtAuthGuard)
export class GoodDeedsController {
    private readonly logger = new Logger(GoodDeedsController.name);

    constructor(private readonly goodDeedsService: GoodDeedsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new good deed' })
    @ApiResponse({ status: 201, description: 'The good deed has been successfully created.' })
    async create(@Body() createGoodDeedDto: CreateGoodDeedDto, @Request() req) {
        this.logger.log('Received request to create a good deed');
        this.logger.debug(`Request body: ${JSON.stringify(createGoodDeedDto)}`);
        this.logger.debug(`Request user: ${JSON.stringify(req.user)}`);

        const user = req.user as User;
        return this.goodDeedsService.create(createGoodDeedDto, user);
    }


    @Get()
    @ApiOperation({ summary: 'Get all good deeds for the current user' })
    @ApiResponse({ status: 200, description: 'Return all good deeds.' })
    findAll(@Request() req) {
        return this.goodDeedsService.findAll(req.user);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific good deed by ID' })
    @ApiResponse({ status: 200, description: 'Return the good deed.' })
    @ApiResponse({ status: 404, description: 'Good deed not found.' })
    findOne(@Param('id') id: string, @Request() req) {
        return this.goodDeedsService.findOne(+id, req.user);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a good deed' })
    @ApiResponse({ status: 200, description: 'The good deed has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Good deed not found.' })
    update(@Param('id') id: string, @Body() updateGoodDeedDto: UpdateGoodDeedDto, @Request() req) {
        return this.goodDeedsService.update(+id, updateGoodDeedDto, req.user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a good deed' })
    @ApiResponse({ status: 200, description: 'The good deed has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Good deed not found.' })
    remove(@Param('id') id: string, @Request() req) {
        return this.goodDeedsService.remove(+id, req.user);
    }

    @Get('friend/:friendId')
    @ApiOperation({ summary: 'Get friend\'s good deeds' })
    @ApiResponse({ status: 200, description: 'Return friend\'s good deeds.' })
    getFriendGoodDeeds(@Param('friendId') friendId: string) {
        return this.goodDeedsService.getFriendGoodDeeds(+friendId);
    }
    @Patch(':id/complete')
    @ApiOperation({ summary: 'Complete a good deed' })
    @ApiResponse({ status: 200, description: 'The good deed has been completed.' })
    async completeGoodDeed(@Param('id') id: string, @Request() req) {
        return this.goodDeedsService.completeGoodDeed(+id, req.user);
    }
    @Patch(':id/uncomplete')
    @ApiOperation({ summary: 'Uncomplete a good deed' })
    @ApiResponse({ status: 200, description: 'The good deed has been uncompleted.' })
    async uncompleteGoodDeed(@Param('id') id: string, @Request() req) {
        return this.goodDeedsService.uncompleteGoodDeed(+id, req.user);
    }
}
