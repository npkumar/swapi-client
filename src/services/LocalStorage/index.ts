// eslint-disable-next-line no-magic-numbers
const TTL_ONE_DAY = 24 * 60 * 60 * 1000;

export const setWithExpiry = (
  key: string,
  value: unknown,
  ttl = TTL_ONE_DAY
) => {
  try {
    const now = new Date();
    const item = [value, now.getTime() + ttl];

    localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.error(`Could not set ${key}, ${value}. Reason: ${e}`);
  }
};

export const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);

  if (itemStr === null) return itemStr;

  try {
    const [value, expiry] = JSON.parse(itemStr);
    const now = new Date();
    // Compare the expiry time of the item with the current time

    if (now.getTime() > expiry) {
      // If the item is expired, delete the item from storage and return null
      localStorage.removeItem(key);

      return null;
    }

    return value;
  } catch {
    return null;
  }
};
