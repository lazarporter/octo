import { staticData } from '../assets/staticData';
import { ERROR_FETCH_DATA } from '../stringContants';
import sleep from '../utils/utils';

export const fetchData = async () => {
  await sleep(1000);

  if (Math.random() > 0.8) {
    throw new Error(ERROR_FETCH_DATA);
  }

  return staticData;
};
