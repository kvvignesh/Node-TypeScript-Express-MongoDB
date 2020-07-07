import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import { relogRequestHandler } from '../../middleware/request-middleware';
import { Book } from '../../models/Book';

export const addBookSchema = Joi.object().keys({
  name: Joi.string().required(),
  author: Joi.string().required()
});

const addWrapper: RequestHandler = async (req, res) => {
  const { name, author } = req.body;

  const book = new Book({ name, author });
  await book.save();

  res.status(201).json(book.toJSON());
};

export const add = relogRequestHandler(addWrapper, { validation: { body: addBookSchema } });
