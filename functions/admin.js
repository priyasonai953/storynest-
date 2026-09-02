export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Login endpoint"
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  try {
    const body = await request.json();

    if (
      body.email !== env.ADMIN_EMAIL ||
      body.password !== env.ADMIN_PASSWORD
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
