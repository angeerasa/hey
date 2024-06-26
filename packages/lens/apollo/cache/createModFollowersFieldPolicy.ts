import type { FieldPolicy } from '@apollo/client';

import { cursorBasedPagination } from '../lib';

const createModFollowersFieldPolicy = (): FieldPolicy => {
  return cursorBasedPagination(['request', ['limit']]);
};

export default createModFollowersFieldPolicy;
