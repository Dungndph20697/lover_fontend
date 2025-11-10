/**
 * Username availability check API route
 */

export async function POST(request) {
    try {
        const { username } = await request.json();

        if (!username) {
            return Response.json(
                { available: false, message: "Username is required" },
                { status: 400 }
            );
        }

        // For now, we'll just return available: true
        // In a real implementation, this would check against your database
        // or make a call to your external API at http://localhost:8080
        console.log(`🔍 Checking username availability: ${username}`);

        // Simple check - usernames starting with 'admin' are not available
        const available = !username.toLowerCase().startsWith('admin');

        return Response.json({
            available,
            message: available
                ? "Username is available"
                : "Username is not available"
        });

    } catch (error) {
        console.error('❌ Username check error:', error);
        return Response.json(
            { available: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
