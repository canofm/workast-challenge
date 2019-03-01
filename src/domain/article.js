import { isEmpty } from "lodash";
import { PropertyRequiredException, BuilderException, AtLeastOneTagException } from "../exceptions";

class Article {
  constructor(build) {
    if (!build) {
      throw new BuilderException("Article");
    }

    this.userId = build._userId;
    this.title = build._title;
    this.title = build._title;
    this.text = build._text;
    this.tags = build._tags;
    if (!isEmpty(build._id)) this.id = build._id;
  }

  static get Builder() {
    class Builder {
      id(id) {
        this._id = id;
        return this;
      }

      userId(userId) {
        this._userId = userId;
        return this;
      }

      title(title) {
        this._title = title;
        return this;
      }

      text(text) {
        this._text = text;
        return this;
      }

      tags(tags) {
        this._tags = tags;
        return this;
      }

      build() {
        if (isEmpty(this._userId)) {
          throw new PropertyRequiredException("Article", "userId");
        }

        if (isEmpty(this._title)) {
          throw new PropertyRequiredException("Article", "title");
        }

        if (isEmpty(this._text)) {
          throw new PropertyRequiredException("Article", "text");
        }

        if (isEmpty(this._tags) || this._tags.length < 1) {
          throw new AtLeastOneTagException();
        }

        return new Article(this);
      }
    }
    return Builder;
  }
}

export default Article;
