import { Schema, model, Document, plugin } from 'mongoose';
import * as slug from 'mongoose-slug-updater';
import { references } from '../core/schema.helper';
import { UserInterface } from '../users/user.schema';

plugin(slug);

export const ideaSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        slug: 'title',
    },
    content: {
        type: String,
    },
    author: references('User'),
    reporter: references('User'),
}, { timestamps: true });

export interface IdeaInterface {
    title: string;
    slug: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
    author?: UserInterface;
    reporter?: UserInterface;
}

export interface IdeaDocument extends Document, IdeaInterface {}

export const Idea = model('Idea', ideaSchema);
