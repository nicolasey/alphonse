import { Schema, model, Document } from 'mongoose';

export const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    lastLoginAt: Date,
}, { timestamps: true });

export interface UserInterface {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
    lastLoginAt?: Date;
}

export interface UserDocument extends Document, UserInterface {}

export const User = model('User', userSchema);
