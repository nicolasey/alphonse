import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Document } from 'mongoose';

@Injectable()
export class Service {
    private readonly model: Model<Document>;

    constructor(model: Model<Document>) {
        this.model = model;
    }

    async list(): Promise<Document[]> {
        return this.model.find().exec();
    }

    async getById(id: string): Promise<Document> {
        return this.model.findById(id).exec();
    }

    async create(object: any): Promise<Document> {
        const newModel = await this.model.create(object);
        return newModel;
    }

    async update(id: string, object: any): Promise<Document> {
        const updated = await this.model.findByIdAndUpdate(object._id, object, {new: true});
        if (!updated) { throw new NotFoundException('Document does not exist'); }
        return updated;
    }

    async delete(id: string): Promise<Document> {
        const deleted =  await this.model.findByIdAndRemove(id);
        if (!deleted) { throw new NotFoundException('Document does not exist'); }
        return deleted;
    }
}
