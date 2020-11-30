import jwt from 'jsonwebtoken';

const signToken = (user: any) => {
  const userData = {
    _id: user._id,
    name: user.name,
    user_id: user.user_id,
    profile_img_url: user.profile_img_url,
  };
  const token = jwt.sign(userData, process.env.JWT_SECRET_KEY!, { expiresIn: '24h' });
  return token;
};

const verifyToken = (token: string) => {
  if (!token) return null;
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  return user;
};

export { signToken, verifyToken };
