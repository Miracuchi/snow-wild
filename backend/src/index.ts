import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import datasource from "./db";
import BookResolver from "./resolvers/book.resolver";
import MaterialResolver from "./resolvers/material.resolver";
import ReservationResolver from "./resolvers/reservation.resolver";
import UserResolver from "./resolvers/user.resolver";

import cors from "cors";
import express from "express";
import http from "http";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import User from "./entities/user.entity";
import CategoryResolver from "./resolvers/category.resolver";
import ReservationMaterialResolver from "./resolvers/reservation_material.resolver";

export interface MyContext {
  req: express.Request;
  res: express.Response;
  user?: User | null;
}

const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await buildSchema({
    resolvers: [
      BookResolver,
      CategoryResolver,
      MaterialResolver,
      UserResolver,
      ReservationResolver,
      ReservationMaterialResolver,
    ],
    validate: false,
  });

  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>({ origin: "*" }),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { req, res };
      },
    })
  );
  await datasource.initialize();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server lancé sur http://localhost:4000/`);
}

main();
