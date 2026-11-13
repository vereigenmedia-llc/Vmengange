const jwt = require('jsonwebtoken');
const User = require('./user.model');
const ApiError = require('../../utils/ApiError');
const { jwtSecret, jwtExpiresIn } = require('../../config/env');
const { getPagination, buildMeta, escapeRegex } = require('../../utils/pagination');

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new ApiError(401, 'Invalid email or password');
  if (user.status !== 'Active') throw new ApiError(403, 'Account is inactive');
  const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
  return { token, user };
};

exports.create = (data) => User.create(data);

exports.list = async (query) => {
  const { page, limit, skip } = getPagination(query);
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.role) filter.role = query.role;
  if (query.search) {
    const rx = new RegExp(escapeRegex(query.search), 'i');
    filter.$or = [{ name: rx }, { email: rx }];
  }
  const [items, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);
  return { items, meta: buildMeta(total, page, limit) };
};

exports.getById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

exports.update = async (id, data) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, 'User not found');
  Object.assign(user, data); // .save() so password hashing hook runs
  await user.save();
  return user;
};

exports.remove = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ApiError(404, 'User not found');
};
