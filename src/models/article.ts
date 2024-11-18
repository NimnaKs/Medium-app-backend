import { Schema, model, Document } from "mongoose";

export interface IArticle extends Document {
  articleId: string;
  userId: string;
  title: string;
  subTitle: string;
  contentFormat: "text" | "html";
  content: string;
  imageUrl: string;
}

const articleSchema = new Schema<IArticle>(
  {
    articleId: { type: String, required: true },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    contentFormat: { type: String, enum: ["text", "html"], required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true }
  },
  { timestamps: true }
);

export const Article = model<IArticle>("Article", articleSchema);