import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { companySchema } from './company.schema';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Company', schema: companySchema },
        ]),
    ],
    providers: [CompanyService],
    controllers: [CompanyController],
})
export class CompaniesModule {}
