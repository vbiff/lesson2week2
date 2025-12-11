import express, { Express } from "express";
import { testingRouter } from "./testing/routers/testing.router";
import { blogRouter } from "./blogs/routers/blogs.router";
import { postRouter } from "./posts/routers/posts.router";
import { BLOGS_PATH, POSTS_PATH, TESTING_PATH } from "./core/paths/paths";

export const setupApp = (app: Express): void => {
  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(200).send("Welcome!!!");
  });

  app.use(TESTING_PATH, testingRouter);
  app.use(BLOGS_PATH, blogRouter);
  app.use(POSTS_PATH, postRouter);
};
