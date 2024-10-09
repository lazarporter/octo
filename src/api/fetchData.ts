import { staticData } from '../assets/staticData';
import sleep from '../utils/utils';

export const fetchData = async () => {
  await sleep(1000);

  if (Math.random() > 0.8) {
    throw new Error('The server lit on fire during data fetch');
  }

  return staticData;
};
