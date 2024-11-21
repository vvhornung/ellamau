import {model, Schema, models} from 'mongoose'


const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name with more than 1 character'],
        unique: true,
        maxlength: [50, 'Name can not be more than 50 characters']
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

})

export const Product = models.Product || model('Product', ProductSchema)

