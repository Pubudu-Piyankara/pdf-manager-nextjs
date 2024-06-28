import {writeFile} from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
const  file= {
    arrayBuffer: () => Promise<ArrayBuffer>,
}
export async function POST(req : NextRequest){
    const data = await req.formData();
    // const reqBody = await req.json();
    // const { filename } = reqBody;
    const file = data.get('file') as Blob;//file is the name of the input field

    if(!file){
        return NextResponse.json('No file found');
    }

 
    const fileBlob = new Blob([file]);
    const bytes = await fileBlob.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = `./files/${file}`;
    // const path = `./files/${file.name}`;

    await writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);
    return NextResponse.json('File uploaded');
}