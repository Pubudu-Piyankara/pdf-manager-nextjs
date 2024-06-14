import connectDB from "@/lib/database/mongodbConfig";
import multer from "multer";
import { createRouter } from 'next-connect';
import { NextRequest, NextResponse } from "next/server";
import errorMiddleware from "@/services/errorMiddleware";

// Initialize the next-connect router
const router = createRouter();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public'); // Ensure this directory exists at the project root
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Multer middleware
const upload = multer({ storage: storage });
const uploadFile = upload.single('file');

// Disable body parsing by Next.js for this route
export const config = {
    api: {
        bodyParser: false,
    },
};

// Define route handlers
router.use(uploadFile);

router.post(async (req, res) => {
    try {
        await connectDB();
        console.log("req", req.file);
        console.log("body", req.body);
        res.status(200).send("File uploaded successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading file");
    }
});

// Integrate error middleware
router.use(errorMiddleware);

export default router.handler({ onError: errorMiddleware });
