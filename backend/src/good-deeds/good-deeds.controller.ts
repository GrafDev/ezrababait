// src/good-deeds/good-deeds.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { GoodDeedsService } from './good-deeds.service';
import { CreateGoodDeedDto } from './dto/create-good-deed.dto';
import { UpdateGoodDeedDto } from './dto/update-good-deed.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('good-deeds')
@ApiBearerAuth()
@Controller('good-deeds')
@UseGuards(JwtAuthGuard)
export class GoodDeedsController {
    constructor(private readonly goodDeedsService: GoodDeedsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new good deed' })
    @ApiResponse({ status: 201, description: 'The good deed has been successfully created.' })
    create(@Body() createGoodDeedDto: CreateGoodDeedDto, @Request() req) {
        return this.goodDeedsService.create(createGoodDeedDto, req.user);
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
}
