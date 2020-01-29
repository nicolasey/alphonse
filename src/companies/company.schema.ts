import * as mongoose from 'mongoose';
import * as slug from 'mongoose-slug-updater';
import { references } from '../core/schema.helper';
import { UserInterface } from '../users/user.schema';

mongoose.plugin(slug);

export const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        slug: 'name',
    },
    users: [references('User')],
    createdBy: references('User'),
}, { timestamps: true });

export interface CompanyInterface {
    name: string;
    createdAt: Date;
    updatedAt?: Date;
    createdBy?: UserInterface;
    users?: UserInterface[];
}

export interface CompanyDocument extends mongoose.Document, CompanyInterface {}

export const Company = mongoose.model('Company', companySchema);
