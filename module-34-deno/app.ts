// import { serve } from "https://deno.land/std@0.180.0/http/server.ts";

import { Application } from "https://deno.land/x/oak@v12.1.0/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });

// New code of latest versions
/* async function reqHandler(req: Request) {
  return new Response("Hello world");
}
serve(reqHandler, { port: 5000 }); */

// Old code, don't work now
/* const server = serve({ port: 5000 });

for await (const req of server) {
    req.respond({ body: "Hello World\n" });
} */
