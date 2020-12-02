import bcrypt from 'bcrypt';

const getHashedPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export default getHashedPassword;
