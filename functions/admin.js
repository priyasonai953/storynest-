export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (context.request.method !== "POST") {
    return new Response("Admin API is ready", { status: 200 });
  }

  const body = await context.request.json();

  if (
    body.email !== context.env.ADMIN_EMAIL ||
    body.password !== context.env.ADMIN_PASSWORD
  ) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid login" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  return new Response(
    JSON.stringify({ success: true, message: "Login successful" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
