import jwt from 'jsonwebtoken';

const signToken = ({ id }: { id: string }) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY!, { expiresIn: '24h' });
  return token;
};

const verifyToken = (token: string) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    return user;
  } catch {
    return null;
  }
};

export { signToken, verifyToken };
