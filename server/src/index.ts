import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import cors from "cors";
var session = require("express-session");
var SQLiteStore = require("connect-sqlite3")(session);

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();

    app.use(cors({ origin: "http://127.0.0.1:3000", credentials: true }));

    app.use(
        session({
            name: COOKIE_NAME,
            store: new SQLiteStore(),
            secret: "asdfasdfasdfasdfasdfasdfa",
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 5 * 365 * 24 * 60 * 60 * 1000 }, // 5 years
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res }),
    });
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    });
};

main().catch((err) => {
    console.error(err);
});
