// // lib/multer.ts
// import multer from 'multer';
// import path from 'path';
// import { Request } from 'express';

// const storage = multer.diskStorage({
//     destination: function (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
//         cb(null, 'uploads/');
//     },
//     filename: function (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// import { FileFilterCallback } from 'multer';

// const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
//     if (file.mimetype === 'application/pdf') {
//         cb(null, true);
//     } else {
//         throw new Error('Invalid file type, only PDF is allowed!') 
//     }
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
// });

// export default upload;
