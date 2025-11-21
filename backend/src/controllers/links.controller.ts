import { Request, Response } from "express";
import { createLinkSchema, linkParamsSchema } from "../schemas/links.schema";
import { z } from "zod";
import { generateCode } from "../utils/generateCode";
import prisma from "../configs/db.config";

export const createLink = async (req: Request, res: Response) => {
  try {
    const { url, code } = req.body as z.infer<typeof createLinkSchema>;

    if (code) {
      const existingLink = await prisma.link.findUnique({
        where: { code },
      });

      if (existingLink) {
        return res.status(400).json({
          message: "Code already in use",
          ok: false,
          timestamp: Date.now(),
        });
      }
    }

    const newCode = code || generateCode();

    await prisma.link.create({
      data: {
        url,
        code: newCode,
      },
    });

    res.status(201).json({
      message: "Link created successfully",
      ok: true,
      timestamp: Date.now(),
      data: { url, code: newCode },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating link",
      ok: false,
      timestamp: Date.now(),
    });
  }
};

export const getLinkStats = async (req: Request, res: Response) => {
  try {
    const { code } = req.params as z.infer<typeof linkParamsSchema>;
    const link = await prisma.link.findUnique({
      where: { code },
    });

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
        ok: false,
        timestamp: Date.now(),
      });
    }
    res.status(200).json({
      message: "Link stats retrieved successfully",
      data: link,
      ok: true,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving link stats",
      ok: false,
      timestamp: Date.now(),
    });
  }
};

export const getAllLinks = async (req: Request, res: Response) => {
  try {
    const links = await prisma.link.findMany();
    res.status(200).json({
      message: "All links retrieved successfully",
      data: links,
      ok: true,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving all links",
      ok: false,
      timestamp: Date.now(),
    });
  }
};

export const deleteLink = async (req: Request, res: Response) => {
  try {
    const { code } = req.params as z.infer<typeof linkParamsSchema>;

    const link = await prisma.link.findUnique({
      where: { code },
    });

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
        ok: false,
        timestamp: Date.now(),
      });
    }

    await prisma.link.delete({
      where: { id: link.id },
    });

    res.status(200).json({
      message: "Link deleted successfully",
      ok: true,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting link",
      ok: false,
      timestamp: Date.now(),
    });
  }
};

export const handleRedirect = async (req: Request, res: Response) => {
  try {
    const { code } = req.params as z.infer<typeof linkParamsSchema>;

    const link = await prisma.link.findUnique({
      where: { code },
    });

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
        ok: false,
        timestamp: Date.now(),
      });
    }

    link.clicks += 1;

    await prisma.link.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    });

    res.redirect(302, link.url);
  } catch (error) {
    res.status(500).json({
      message: "Error redirecting to original URL",
      ok: false,
      timestamp: Date.now(),
    });
  }
};
