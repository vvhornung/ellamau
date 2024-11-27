import mongoose, {model, Schema, models} from 'mongoose'


const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        maxlength: [50, 'Name can not be more than 50 characters']
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
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    images: [String],

})

export const Product = models.Product || model('Product', ProductSchema)

