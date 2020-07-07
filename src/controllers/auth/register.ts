import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import { relogRequestHandler } from '../../middleware/request-middleware';
import { User } from '../../models/User';

export const addUserSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
});

const registerWrapper: RequestHandler = async (req, res) => {
  const {
    email, password, firstName, lastName
  } = req.body;

  const user = new User({
    email, firstName, lastName, createdOn: Date.now()
  });
  user.password = user.encryptPassword(password);

  await user.save();

  res.status(201).json(user.toJSON());
};

export const register = relogRequestHandler(registerWrapper, { validation: { body: addUserSchema }, skipJwtAuth: true });
