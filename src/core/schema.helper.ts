import { Schema } from 'mongoose';

/**
 * Reference another model in your Schema
 *
 * @param model mongoose model string identifier
 * @param index set to true if it is to be indexed
 */
export function references(model: string, index: boolean = false) {
    return {type: Schema.Types.ObjectId, ref: model, index};
}
