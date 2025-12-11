import { body } from "express-validator";


const titleValidation = body("name")
    .trim()
    .exists()
    .withMessage({ field: "name", message: "Name is required" })
    .isLength({ min: 1, max: 30 })
    .withMessage({
        message: "Name is too long. Should be less 30 symbols",
    });
const shortDescriptionValidation = body("description")
    .trim()
    .isLength({ max: 100 })
    .withMessage({
        message: "description should be less than 100 symbols",
    });
const content = body("websiteUrl")
    .trim()
    .isLength({ max: 1000 })
    .withMessage({ message: "content is too long" })

const blogId = body("websiteUrl")
    .trim()
    .exists()
    .isLength({ max: 10 })
    .withMessage({ message: "blogId is needed" })

export const postInputDtoValidation = [
    titleValidation,
    shortDescriptionValidation,
    content,
    blogId
];
