import { nanoid } from 'nanoid';

export const defaultGetId = name => {
  return `${name}_${nanoid(6)}`;
};
