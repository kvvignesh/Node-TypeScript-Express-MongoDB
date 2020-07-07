import { RequestHandler } from 'express';
import { relogRequestHandler } from '../../middleware/request-middleware';
import { Book } from '../../models/Book';

const buildBookSeachQuery = (name: string, author: string) => {
  const query: any = {};
  if (name) {
    query.name = new RegExp(`.*${name}.*`, 'i');
  }
  if (author) {
    query.author = new RegExp(`.*${author}.*`, 'i');
  }

  return query;
};

const searchWrapper: RequestHandler = async (req, res) => {
  const { name = undefined, author = undefined } = req.query;

  const query = buildBookSeachQuery((name as string), (author as string));
  const books = await Book.find(query);
  res.send({ books });
};

export const search = relogRequestHandler(searchWrapper);
