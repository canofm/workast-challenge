import mongoose from "mongoose";
import mongoErrorHandler from "./mongo.error.handler";

export const ARTICLE_SCHEMA_VALIDATION_MESSAGES = {
  userId: "Article must have an author.",
  title: "Article must have a title.",
  text: "Article must have a text."
};

const atLeastOneTagValidation = () => this.tags.length > 0;

const articleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, ARTICLE_SCHEMA_VALIDATION_MESSAGES.userId]
  },
  title: {
    type: String,
    required: [true, ARTICLE_SCHEMA_VALIDATION_MESSAGES.title],
    unique: true
  },
  text: {
    type: String,
    required: [true, ARTICLE_SCHEMA_VALIDATION_MESSAGES.text]
  },
  tags: {
    type: [String],
    index: true,
    required: atLeastOneTagValidation //TODO: revisar si tiene sentido
  }
});

articleSchema.post("save", mongoErrorHandler);
articleSchema.post("update", mongoErrorHandler);
articleSchema.post("findOneAndUpdate", mongoErrorHandler);
articleSchema.post("deleteOne", mongoErrorHandler);

export const ArticleSchema = mongoose.model("article", articleSchema);
