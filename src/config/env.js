require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vm_engage',
  jwtSecret: process.env.JWT_SECRET || 'vm_engage@#123',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  clientUrl: process.env.CLIENT_URL || '*',
};
