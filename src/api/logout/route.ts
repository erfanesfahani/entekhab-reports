import cookie from "cookie";

export async function POST() {
  return new Response(JSON.stringify({ status: "success" }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie.serialize("admin_panel", "admin", {
        httpOnly: true,
        maxAge: 0,
        sameSite: "lax",
        path: "/",
        secure: true,
      }),
    },
  });
}
