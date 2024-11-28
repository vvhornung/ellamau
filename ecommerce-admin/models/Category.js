import { model, Schema, models } from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        maxlength: [50, "Name can not be more than 50 characters"],
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null,
        
    },
    properties: [
        {
            name: {
                type: String,
            },
            values: {
                type: [String],
            },
        },
    ],
})

export const Category = models.Category || model("Category", CategorySchema);
