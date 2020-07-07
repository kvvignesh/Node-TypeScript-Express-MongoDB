import { RequestHandler } from 'express';
import { relogRequestHandler } from '../../middleware/request-middleware';
import { Book } from '../../models/Book';

const allWragger: RequestHandler = async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
};

export const all = relogRequestHandler(allWragger);
