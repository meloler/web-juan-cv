import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'Missing OPENAI_API_KEY in process.env' }, { status: 500 });
    }

    // Check for common formatting issues
    const checks = {
        length: apiKey.length,
        hasWhitespace: /\s/.test(apiKey),
        startsWithSk: apiKey.startsWith('sk-'),
        endsWithNewline: apiKey.endsWith('\n') || apiKey.endsWith('\r'),
    };

    try {
        // Attempt a raw fetch to OpenAI models endpoint (very lightweight)
        const response = await fetch('https://api.openai.com/v1/models', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({
                status: 'error',
                message: 'OpenAI API rejected the key',
                httpStatus: response.status,
                openAiError: data,
                keyDiagnostics: checks
            }, { status: response.status });
        }

        return NextResponse.json({
            status: 'success',
            message: 'API Key is VALID and working',
            firstModel: data.data?.[0]?.id || 'unknown',
            keyDiagnostics: checks
        });

    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: 'Network error connecting to OpenAI',
            details: error.message,
            keyDiagnostics: checks
        }, { status: 500 });
    }
}
