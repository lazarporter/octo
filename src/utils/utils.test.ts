import sleep, { getOwnerName } from './utils';

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

describe('getOwnerName utility fn', () => {
  it('should return the owner name', () => {
    const owner = { name: 'Lazer Porter' };
    expect(getOwnerName(owner)).toBe('Lazer Porter');
  });

  it('should return null for null owner', () => {
    const owner = { name: null };
    expect(getOwnerName(owner)).toBe(null);
  });

  it('should return null for unknown owner', () => {
    const owner = {};
    // @ts-expect-error we are specifically testing for wrong-typed data
    expect(getOwnerName(owner)).toBeNull();
  });

  it('should return the owner name for nested owner', () => {
    const owner = { owner: { owner: { owner: { name: 'Lazer Porter' } } } };
    expect(getOwnerName(owner)).toBe('Lazer Porter');
  });
});
