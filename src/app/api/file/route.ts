import { NextRequest, NextResponse } from 'next/server';

const URL = 'https://filetools13.pdf24.org/client.php?action=upload'; // upload url post

export type UploadResponse = {
  ctime: string;
  file: string;
  host: string;
  name: string;
  size: number;
};

export async function POST(
  req: NextRequest
): Promise<NextResponse<UploadResponse[] | { error: any }>> {
  try {
    const data = await req.formData();

    const response = await fetch(URL, {
      method: 'POST',
      body: data,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to upload to external API with status: ${response.status}`
      );
    }

    const responseData = await response.json();

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}