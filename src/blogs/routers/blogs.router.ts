import { Router, Request, Response} from "express";
import {HttpStatuses} from "../../core/types/http-statuses";
import {db} from "../../db/in-memory.db";
import {blogInputDto} from "../dto/blog.input_dto";
import {videoInputDto} from "../../videos/dto/video.input-dto";
import {ValidationError} from "../../core/types/validationError";
import {videoInputDtoValidation} from "../../videos/validation/videoInputDtoValidation";
import {createErrorMessage} from "../../core/utils/error.utils";
import {Video} from "../../videos/types/video";
import {Blog} from "../types/blog";
import {videoUpdateDtoValidation} from "../../videos/validation/videoUpdateDtoValidation";

export const blogRouter =  Router();
//get all
blogRouter.get("/", (req: Request, res: Response) => {
    res.status(HttpStatuses.OK_200).send(db.blogs);
    });
// create
blogRouter.post("/", (req: Request<blogInputDto>, res: Response) => {


    const newBlog: Blog = {
        id: new Date().toISOString(),
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
    };

    db.blogs.push(newBlog);
    res.status(HttpStatuses.CREATED_201).send(newBlog);
});

// get by id

blogRouter.get("/:id", (req: Request, res: Response) => {
    const blog = db.blogs.find((m) => m.id === req.params.id);
    if (!blog) {
        res.sendStatus(HttpStatuses.NOT_FOUND_404);
        return;
    }

    res.status(HttpStatuses.OK_200).send(blog);
});

// update
blogRouter.put("/:id", (req: Request, res: Response) => {

    const blogIndex: number = db.blogs.findIndex(
        (m) => m.id === req.params.id,
    );
    if (blogIndex === -1) {
        res.sendStatus(HttpStatuses.NOT_FOUND_404);
        return;
    }

    if (req.body.name) {
        db.blogs[blogIndex].name = req.body.name;
    }
    if (req.body.description) {
        db.blogs[blogIndex].description = req.body.description;
    }
    if (req.body.websiteUrl) {
        db.blogs[blogIndex].websiteUrl = req.body.websiteUrl;
    }


    res.sendStatus(HttpStatuses.NO_CONTENT_204);
});

//delete
blogRouter.delete("/:id", (req: Request, res: Response) => {
    const blogIndex = db.blogs.findIndex((m) => m.id === req.params.id);
    if (blogIndex === -1) {
        res.sendStatus(HttpStatuses.NOT_FOUND_404);
        return;
    }
    db.blogs.splice(blogIndex, 1);
    res.sendStatus(HttpStatuses.NO_CONTENT_204);
});