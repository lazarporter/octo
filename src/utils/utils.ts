import { Owner } from '../types/apiData.types';
import { ERROR_UNKNOWN_OWNER } from '../stringConstants';
import { logError } from './logError';

export default function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getOwnerName = (owner: Owner): string | null => {
  if ('name' in owner) {
    return owner.name;
  } else if ('owner' in owner) {
    return getOwnerName(owner.owner);
  }

  logError(new Error(`${ERROR_UNKNOWN_OWNER} ${JSON.stringify(owner)}`));
  return null;
};
