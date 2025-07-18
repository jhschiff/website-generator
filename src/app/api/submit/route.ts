import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  // You can process/store the data here
  return NextResponse.json({ received: data });
} 