import { flatMap } from "lodash";
import * as Promise from "bluebird";
import UserAPIFactory from "../api/factories/user.api.factory";
import ArticleAPIFactory from "../api/factories/article.api.factory";

const userRepository = UserAPIFactory.getRepository();
const articleRepository = ArticleAPIFactory.getRepository();

export const createFixture = ({ users, articles }) =>
  createUsers(users.q, users.name).then(users => createArticles(users, articles));

export const createUsers = async (q, namePattern) => {
  let users = [];
  for (let i = 0; i < q; i++) {
    users.push(await userRepository.create({ name: namePattern(i) }));
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

const _article = (userId, n, options) => ({
  userId,
  title: options.title(n),
  text: options.text(n),
  tags: options.tags(n)
});
