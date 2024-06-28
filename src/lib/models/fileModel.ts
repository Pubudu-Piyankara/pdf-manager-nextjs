// models/Pdf.ts
import mongoose, { Document, Model } from 'mongoose';

export interface IPdf extends Document {
    filename: string;

}

const PdfSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    
});

const Pdf: Model<IPdf> = mongoose.models.Pdf || mongoose.model<IPdf>('Pdf', PdfSchema);

export default Pdf;
