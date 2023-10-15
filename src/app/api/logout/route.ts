import cookie from "cookie";

export async function POST() {
  return new Response(JSON.stringify({ status: "success" }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie.serialize("entekhabReports", "", {
        maxAge: 0,
        sameSite: "lax",
        path: "/",
        secure: true,
      }),
    },
  });
}
