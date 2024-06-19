export default () => ({
  nodeENV: process.env.NODE_ENV?.toLowerCase() ?? 'production',
  port: parseInt(`${process.env.PORT ?? 3003}`, 10),
  apiPrefix: process.env.API_PREFIX,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
});
