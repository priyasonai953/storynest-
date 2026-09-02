export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // GET request
  if (request.method === "GET") {
    return new Response("Admin API is ready", { status: 200 });
  }

  // Only POST is allowed for login
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const body = await request.json();

    const email = body.email || "";
    const password = body.password || "";

    // Check admin credentials from Cloudflare Secrets
    if (
      email !== env.ADMIN_EMAIL ||
      password !== env.ADMIN_PASSWORD
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid email or password"
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    // Create a temporary signed-looking session token
    // The actual secure session validation will be added next.
    const session = crypto.randomUUID();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `storynest_admin=${session}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Invalid request"
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
