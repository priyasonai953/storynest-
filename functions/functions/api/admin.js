export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response("API working", { status: 200 });
  }

  try {
    const body = await request.json();

    return new Response(
      JSON.stringify({
        success: false,
        diagnostic: {
          emailSecretExists: !!env.ADMIN_EMAIL,
          passwordSecretExists: !!env.ADMIN_PASSWORD,
          enteredEmailLength: (body.email || "").length,
          enteredPasswordLength: (body.password || "").length
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid request" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
