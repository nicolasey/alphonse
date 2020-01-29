import { Schema } from 'mongoose';

export function references(model: string, index: boolean = false) {
    return {type: Schema.Types.ObjectId, ref: model, index};
}
