import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Check if media management is enabled
  const correctPassword = process.env.MEDIA_ADMIN_PASSWORD;
  
  if (!correctPassword) {
    return NextResponse.json(
      { error: 'Media management not configured' },
      { status: 503 }
    );
  }

  try {
    const { password } = await request.json();
    
    if (password === correctPassword) {
      return NextResponse.json({ 
        success: true, 
        message: 'Authentication successful' 
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
