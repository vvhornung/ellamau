import multiparty from 'multiparty';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';
import fs from 'fs';
import { isAdminRequest } from '../middleware/isAdmin';

export default async function handler(req, res) {

    await isAdminRequest(req, res);


    const form = new multiparty.Form();
    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({fields, files});
        });
    });


    const client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    // Upload images to S3
    const links = [];
    for (const file of files.images) {
        const { originalFilename, path } = file;
        const ext = originalFilename.split('.').pop();
        const newFilename = `${Date.now()}.${ext}`;
        const Key = newFilename;
        const Body = fs.readFileSync(path);
        await client.send(new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key,
            Body,
            ACL: 'public-read',
            ContentType: mime.lookup(file.path) || 'application/octet-stream',
        }));
        const link = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`;
        links.push(link);
    };


    return res.json({ success: true, links});



}

export const config = {
    api: {
        bodyParser: false
    },
};
