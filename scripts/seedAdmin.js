const connectDB = require('../src/config/db');
const User = require('../src/modules/user/user.model');

(async () => {
  await connectDB();
  if (!(await User.exists({ email: 'admin@vmengage.com' }))) {
    await User.create({ name: 'Admin', email: 'admin@vmengage.com', password: 'Admin@123', role: 'Admin' });
    console.log('Admin created: admin@vmengage.com / Admin@123');
  } else console.log('Admin already exists');
  process.exit(0);
})();
