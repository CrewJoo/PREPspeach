import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('Consultation Request Received:', body);

        // TODO: DB 저장 로직 (예: Supabase, Firebase, Google Sheets 등)
        // 현재는 로그만 출력하고 성공 응답을 반환합니다.

        return NextResponse.json({ success: true, message: 'Consultation requested successfully' });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
