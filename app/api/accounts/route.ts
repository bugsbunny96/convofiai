import { NextRequest, NextResponse } from 'next/server';
import { UserAccountList } from '@/app/services/users-realms';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await UserAccountList(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 