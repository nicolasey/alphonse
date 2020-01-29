import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyDocument } from './company.schema';
import { Service } from '../core/service';

@Injectable()
export class CompanyService extends Service {
    constructor(@InjectModel('Company') private readonly baseModel: Model<CompanyDocument>) {
        super(baseModel);
    }
}
