import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ideaSchema } from './ideas.schema';
import { IdeaService } from './idea.service';
import { IdeasController } from './ideas.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Idea', schema: ideaSchema },
        ]),
    ],
    providers: [IdeaService],
    controllers: [IdeasController],
})
export class IdeasModule {}
