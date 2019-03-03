import { flatMap } from "lodash";
import * as Promise from "bluebird";
import UserAPIFactory from "../api/v0/factories/user.api.factory";
import ArticleAPIFactory from "../api/v0/factories/article.api.factory";

const userRepository = UserAPIFactory.getRepository();
const articleRepository = ArticleAPIFactory.getRepository();

export const createFixture = ({ users, articles }) =>
  createUsers(users.q, users.name).then(users => createArticles(users, articles));

export const createUsers = async (q, namePattern) => {
  let users = [];
  const nameFn = namePattern ? namePattern : i => `User${i}`;
  for (let i = 0; i < q; i++) {
    users.push(await userRepository.create({ name: nameFn(i) }));
  }
  return users;
};

export const createArticles = (users, { qPerUser, ...options }) => {
  const articles = flatMap(users, user => {
    let results = [];
    for (let i = 0; i < qPerUser(i); i++) {
      results.push(_article(user.id, i, options));
    }
    return results;
  });
  return Promise.map(articles, article => articleRepository.create(article));
};

const _article = (userId, n, options) => {
  const title = options.title ? options.title(n) : `title${n}`;
  const text = options.text ? options.text(n) : `text${n}`;
  const tags = options.tags ? options.tags(n) : [`tag${n}`, `tag${n + 1}`];
  return { userId, title, text, tags };
};
