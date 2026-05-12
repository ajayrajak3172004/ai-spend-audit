export async function POST(req) {

  try {

    const { token } = await req.json();

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          secret:
            process.env
              .TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const data =
      await response.json();

    return Response.json(data);

  } catch (error) {

    return Response.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}