import { staticData } from '../assets/staticData';
import { ERROR_FETCH_DATA } from '../stringContants';
import sleep from '../utils/utils';

export const ERROR_FETCH_DATA_CHANCE = 0.2;
export const fetchData = async () => {
  await sleep(1000);

  if (Math.random() < ERROR_FETCH_DATA_CHANCE) {
    throw new Error(ERROR_FETCH_DATA);
  }

  return staticData;
};
