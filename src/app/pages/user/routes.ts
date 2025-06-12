import { route } from "rwsdk/router";
import { Login } from "./Login";
import { Profile } from "./Profile";
import { auth } from "../../../lib/auth";

export const userRoutes = [
  route("/login", [Login]),
  route("/profile", [
    ({ ctx }) => {
      if (!ctx.user) {
        return new Response(null, {
          status: 302,
          headers: { Location: "/user/login" },
        });
      }
    },
    Profile,
  ]),
  route("/logout", async function ({ request }) {
    // Handle Better Auth logout
    await auth.api.signOut({ headers: request.headers });
    
    const headers = new Headers();
    headers.set("Location", "/");
    headers.set("Set-Cookie", "better-auth.session_token=; Path=/; Max-Age=0; HttpOnly");

    return new Response(null, {
      status: 302,
      headers,
    });
  }),
];
