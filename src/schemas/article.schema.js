import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongoErrorHandler from "./mongo.error.handler";

export const ARTICLE_SCHEMA_VALIDATION_MESSAGES = {
  userId: "Article must have an author.",
  title: "Article must have a title.",
  text: "Article must have a text."
};

const articleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, ARTICLE_SCHEMA_VALIDATION_MESSAGES.userId]
  },
  title: {
    type: String,
    required: [true, ARTICLE_SCHEMA_VALIDATION_MESSAGES.title]
  },
  text: {
    type: String,
    required: [true, ARTICLE_SCHEMA_VALIDATION_MESSAGES.text]
  },
  tags: {
    type: [String],
    index: true
  }
});

articleSchema.post("save", mongoErrorHandler);
articleSchema.post("update", mongoErrorHandler);
articleSchema.post("findOneAndUpdate", mongoErrorHandler);
articleSchema.post("deleteOne", mongoErrorHandler);

articleSchema.plugin(mongoosePaginate);

export const ArticleSchema = mongoose.model("article", articleSchema);
