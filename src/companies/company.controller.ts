import { Controller, Get, Post, Body, Res, HttpStatus, UseGuards, Req, Put, Param, Delete } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from '@nestjs/passport';
import { CompanyDocument } from './company.schema';

@Controller('companies')
export class CompanyController {
    constructor(
        private readonly service: CompanyService,
    ) {}

    @Get()
    async list(@Res() res) {
        const list = await this.service.list();
        return res.status(HttpStatus.OK).json(list);
    }

    @Get('/:id')
    async get(@Param('id') id: string, @Res() res) {
        const company = await this.service.getById(id);
        return res.status(HttpStatus.OK).json(company);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() body: any, @Res() res, @Req() req) {
        body.createdBy = req.user._id;
        const created = await this.service.create(body);
        return res.status(HttpStatus.OK).json(created);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    async update(@Res() res, @Body() body: CompanyDocument, @Param('id') id: string) {
        const updated = await this.service.update(id, body);
        return res.status(HttpStatus.OK).json(updated);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async delete(@Param('id') id: string, @Res() res) {
        const deleted = await this.service.delete(id);
        return res.status(HttpStatus.OK).json(deleted);
    }
}
