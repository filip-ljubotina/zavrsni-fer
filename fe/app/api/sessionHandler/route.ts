import { createSession, deleteSession } from '@/app/lib/session';

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();

        const sessionData = await createSession(userId);
        return new Response(JSON.stringify(sessionData), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 201
        });
    } catch (error) {
        return new Response(null, { status: 500 });
    }
}

export async function DELETE() {
    try {
        await deleteSession();
        return new Response(null, { status: 200 })
    } catch (error) {
        return new Response(null, { status: 500 });
    }
}
