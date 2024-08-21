import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { GoodDeedsService } from './good-deeds.service';
import { CreateGoodDeedDto, UpdateGoodDeedDto } from './dto/good-deed.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('good-deeds')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('good-deeds')
export class GoodDeedsController {
    constructor(private readonly goodDeedsService: GoodDeedsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new good deed' })
    @ApiResponse({ status: 201, description: 'The good deed has been successfully created.' })
    create(@Request() req, @Body() createGoodDeedDto: CreateGoodDeedDto) {
        return this.goodDeedsService.create(createGoodDeedDto, req.user.userId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all good deeds for the authenticated user' })
    @ApiResponse({ status: 200, description: 'Return all good deeds.' })
    findAll(@Request() req) {
        return this.goodDeedsService.findAll(req.user.userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific good deed' })
    @ApiResponse({ status: 200, description: 'Return the good deed.' })
    @ApiResponse({ status: 404, description: 'Good deed not found.' })
    findOne(@Param('id') id: string, @Request() req) {
        return this.goodDeedsService.findOne(+id, req.user.userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a good deed' })
    @ApiResponse({ status: 200, description: 'The good deed has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Good deed not found.' })
    update(@Param('id') id: string, @Body() updateGoodDeedDto: UpdateGoodDeedDto, @Request() req) {
        return this.goodDeedsService.update(+id, updateGoodDeedDto, req.user.userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a good deed' })
    @ApiResponse({ status: 200, description: 'The good deed has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Good deed not found.' })
    remove(@Param('id') id: string, @Request() req) {
        return this.goodDeedsService.remove(+id, req.user.userId);
    }
}
