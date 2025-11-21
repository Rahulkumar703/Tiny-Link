import { Router } from "express";
import * as linksController from "../controllers/links.controller";
import { validateData } from "../middleware/validator.middleware";
import { createLinkSchema, linkParamsSchema } from "../schemas/links.schema";

const linksRouter = Router();

linksRouter.post(
  "/links",
  validateData(createLinkSchema, "body"),
  linksController.createLink
);

linksRouter.get("/links", linksController.getAllLinks);

linksRouter.get(
  "/links/:code",
  validateData(linkParamsSchema, "params"),
  linksController.getLinkStats
);

linksRouter.get(
  "/:code",
  validateData(linkParamsSchema, "params"),
  linksController.handleRedirect
);

linksRouter.delete(
  "/links/:code",
  validateData(linkParamsSchema, "params"),
  linksController.deleteLink
);

export default linksRouter;
