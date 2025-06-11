import { defineApp, ErrorResponse } from "rwsdk/worker";
import { route, render, prefix } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import { userRoutes } from "@/app/pages/user/routes";
import { type Session, type User } from "better-auth";
import { db, setupDb } from "@/db";
import { env } from "cloudflare:workers";
import { createAuth } from "./lib/auth";

export type AppContext = {
  session: Session | null;
  user: User | null;
  authUrl: string;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request }) => {
    await setupDb(env);

    const auth = await createAuth(env);

    ctx.authUrl = env.BETTER_AUTH_URL;

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    ctx.session = session?.session || null;
    ctx.user = session?.user || null;
  },
  route("/api/auth/*", async ({ request }) => {
    const { createAuth } = await import("./lib/auth");
    const auth = await createAuth(env);
    return auth.handler(request);
  }),
  render(Document, [
    route("/", Home),
    route("/protected", [
      ({ ctx }) => {
        if (!ctx.user) {
          return new Response(null, {
            status: 302,
            headers: { Location: "/user/login" },
          });
        }
      },
      Home,
    ]),
    prefix("/user", userRoutes),
  ]),
]);
