import express, { Request, Response } from "express";
import { bucket } from "../config/firebase-config";
import { Article, IArticle } from "../models/article";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Save Article Endpoint
router.post(
  "/save",
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, title, subTitle, contentFormat, content } = req.body;

      if (!req.file) {
        res.status(400).json({ message: "Image is required" });
        return;
      }

      // Upload image to Firebase Storage
      const fileName = `${uuidv4()}-${req.file.originalname}`;
      const file = bucket.file(fileName);
      await file.save(req.file.buffer, { contentType: req.file.mimetype });
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      // Save article to MongoDB
      const newArticle: IArticle = new Article({
        articleId: uuidv4(),
        userId,
        title,
        subTitle,
        contentFormat,
        content,
        imageUrl,
      });

      const savedArticle = await newArticle.save();

      res.status(201).json({
        message: "Article saved successfully",
        article: savedArticle,
      });
    } catch (error) {
      console.error("Error saving article:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;