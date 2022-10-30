import { faker } from "@faker-js/faker";
import { createDb } from "./src/db";
import * as jsonServer from "json-server";
import * as fs from "fs";
import { DB } from "./src/types";
import { getRandomArrayElem } from "./src/utils";
const server = jsonServer.create();
const router = jsonServer.router<DB>("db-2022-10-30T192011.373Z.json");
// OR
// const router = jsonServer.router<DB>(createDb());
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// server.use((req, res, next) => {
//   if (isAuthorized(req)) {
//     // add your authorization logic here
//     next(); // continue to JSON Server router
//   } else {
//     res.sendStatus(401);
//   }
// });

// Add custom routes before JSON Server router
server.get("/random-user", (req, res) => {
  const users = router.db.getState().users;
  const randomUser = getRandomArrayElem(users);
  res.jsonp(randomUser);
});

server.get("/save-db-snapshot", (req, res) => {
  const db = JSON.stringify(router.db.getState(), null, 1);
  const fileName = `db-${new Date().toISOString()}.json`.replace(
    /[\/|\\:*?"<>]/g,
    ""
  );
  fs.writeFileSync(fileName, db);
  res.jsonp(db);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = new Date().toISOString();
  }
  if (req.method === "PUT") {
    req.body.changedAt = new Date().toISOString();
  }
  // Continue to JSON Server router
  next();
});

//Use json server rewriter
server.use(
  jsonServer.rewriter({
    "/random-user": "/random-user",
    "/users/posts/": "/users?_embed=posts",
    "/users/comments/": "/users?_embed=comments",
    "/posts/comments/": "/posts?_embed=comments",
    "/user/:userId/posts": "/users/:userId?_embed=posts",
    "/user/:userId/comments": "/users/:userId?_embed=comments",
    "/post/:postId/comments": "/posts/:postId?_embed=comments",
  })
);
// Use default router
server.use(router);

server.listen(3005, () => {
  console.log("JSON Server is running on 3005 port");
});
