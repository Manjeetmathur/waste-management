import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary-server';

export async function POST(request: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary credentials not configured');
      return NextResponse.json(
        { error: 'Image upload service not configured. Please contact administrator.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'cleanconnect';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
          transformation: [
            { width: 1000, height: 1000, crop: 'limit' },
            { quality: 'auto' },
            { format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadResult = result as any;
    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error('Upload succeeded but no URL returned');
    }

    return NextResponse.json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Upload failed. Please try again.';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = String(error.message);
    } else if (error && typeof error === 'object' && 'http_code' in error) {
      const errorObj = error as { http_code?: number; message?: string };
      errorMessage = `Cloudinary error: ${errorObj.message || 'Upload failed'}`;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'No public ID provided' },
        { status: 400 }
      );
    }

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    );
  }
}