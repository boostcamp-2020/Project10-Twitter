const makeRandomName = (nameLength: number) => {
  const result = Math.random().toString(36).substring(nameLength);
  return result;
};

export { makeRandomName };
