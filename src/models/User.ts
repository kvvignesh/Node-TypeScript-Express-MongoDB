import {
  Document, Model, Schema, model
} from 'mongoose';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';

export interface IUser extends Document {
  /** Email */
  email: string;
  /** Password */
  password: string;
  /** Password */
  firstName: string;
  /** Password */
  lastName: string;
  /** Created On */
  createdOn: Date;
  /** Created On */
  updatedOn: Date;
  encryptPassword: (password: string) => string;
  validPassword: (password: string) => boolean;
}

interface IUserModel extends Model<IUser> { }

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdOn: {
    required: true,
    type: Date
  },
  updatedOn: {
    required: true,
    type: Date,
    default: Date.now
  }
});

schema.methods.encryptPassword = (password: string) => hashSync(password, genSaltSync(10));

schema.methods.validPassword = function (password: string) {
  return compareSync(password, this.password);
};

export const User: IUserModel = model<IUser, IUserModel>('User', schema);
