import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdeaDocument } from './ideas.schema';
import { Service } from '../core/service';

@Injectable()
export class IdeaService extends Service {
    constructor(@InjectModel('Idea') private readonly baseModel: Model<IdeaDocument>) {
        super(baseModel);
    }
}
