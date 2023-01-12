export default (str: string) => {
  const parts = str.split('/').reverse();

  if (str.endsWith('/')) {
    return parts[1];
  }

  return parts[0];
};
