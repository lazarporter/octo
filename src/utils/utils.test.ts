import sleep from './utils';

describe('sleep utility fn', () => {
  it('should delay execution for the specified time', async () => {
    const startTime = Date.now();
    const delay = 300;
    const allowedVariance = 20;

    await sleep(delay);

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    expect(elapsedTime).toBeGreaterThanOrEqual(delay);
    expect(elapsedTime).toBeLessThan(delay + allowedVariance);
  });
});
