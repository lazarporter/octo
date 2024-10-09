import { Owner } from '../hooks/apiData.types';

export default function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getOwnerName = (owner: Owner): string | null => {
  if ('name' in owner) {
    return owner.name;
  } else if ('owner' in owner) {
    return getOwnerName(owner.owner);
  }

  reportError(
    new Error(`Unknown owner type, recieved: ${JSON.stringify(owner)}`)
  );
  return null;
};
