import mongoose, {model, Schema, models} from 'mongoose'


const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        maxlength: [200, 'Name can not be more than 50 characters']
    },
    reference: {
        type: String,
        required: [true, 'Please add a reference'],
        maxlength: [50, 'Reference can not be more than 50 characters']
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    details: {
        type: [String],
        maxlength: [1000, 'Details can not be more than 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    images: [String],
    // the properties will be a big object where each key is the property name and the value is the property value
    properties: {
        type: Object,
        default: {}
    }


})

export const Product = models.Product || model('Product', ProductSchema)

