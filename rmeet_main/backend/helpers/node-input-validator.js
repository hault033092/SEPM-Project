import { extend } from 'node-input-validator';
import { Types, model } from 'mongoose';

extend('unique', async ({ value, args }) => {
  // default field is email in this example
  const field = args[1] || 'email';

  let condition = {};

  condition[field] = value;

  // add ignore condition
  if (args[2]) {
    condition['_id'] = { $ne: Types.ObjectId(args[2]) };
  }

  let emailExist = await model(args[0]).findOne(condition).select(field);

  // email already exists
  if (emailExist) {
    return false
  }

  return true
})