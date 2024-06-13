// models/Pdf.ts
import mongoose, { Document, Model } from 'mongoose';

export interface IPdf extends Document {
    filename: string;
    path: string;
    size: number;
    uploadDate: Date;
}

const PdfSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
});

const Pdf: Model<IPdf> = mongoose.models.Pdf || mongoose.model<IPdf>('Pdf', PdfSchema);

export default Pdf;
