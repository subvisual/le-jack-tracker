export default (str: string) => {
  if (str.includes('https://')) {
    return str;
  }

  return `https://${str}`;
};
