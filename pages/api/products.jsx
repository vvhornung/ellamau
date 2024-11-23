// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from '@/models/Product';
import connectDB from '@/lib/mongoose';

export default async function handler(req, res) {
    const { method } = req;

    if(method == 'POST'){
        const { name, description, price, images } = req.body;
        try {
            await connectDB();
            const product = await Product.create({ name, description, price, images });
            res.status(201).json({ success: true, data: product });
        } catch (error) {
            res.status(400).json({ success: false });
        }


    }
    else if(method == 'GET'){
        try {
            await connectDB();
            if(req.query.id){
                const product = await Product
                    .findById(req.query.id)
                res.status(200).json({ success: true, data: product });
            }
            else{
                const products = await Product.find();
                res.status(200).json({ success: true, data: products });
            }
        } catch (error) {
            res.status(400).json({ success: false });
        }
    } else if (method == 'PUT'){
        const { name, description, price, images } = req.body;
        try {
            await connectDB();
            const product = await Product.findByIdAndUpdate(req.query.id, { name, description, price, images }, {
                new: true,
                runValidators: true
            });
            if(!product){
                return res.status(400).json({ success: false });
            }
            res.status(200).json({ success: true, data: product });
        }
        catch (error) {
            res.status(400).json({ success: false });
        }
        
        
    }
    else if(method == 'DELETE'){

        try {
            await connectDB();
            const product = await Product.findByIdAndDelete(req.query.id);
            if(!product){
                return res.status(400).json({ success: false });
            }
            res.status(200).json({ success: true, data: {} });
        }
        catch (error) {
            res.status(400).json({ success: false });
        }
    }
    else{
        res.status(405).json({ success: false });
    }

}
