import { staticData } from '../assets/staticData';
import sleep from '../utils/utils';

export const fetchData = async () => {
  await sleep(1000);
  return staticData;
};
