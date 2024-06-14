import mongodb from 'mongodb';
import fs from 'fs';

const db :any = process.env.MONGODB_URI;

const bucket = new mongodb.GridFSBucket(db, { bucketName: 'myCustomBucket' });

export const upload = fs.createReadStream('./myFile').
     pipe(bucket.openUploadStream('myFile', {
         chunkSizeBytes: 1048576,
         metadata: { field: 'myField', value: 'myValue' }
     }));