const service = require('./user.service');
const asyncHandler = require('../../utils/asyncHandler');
const { success } = require('../../utils/apiResponse');

exports.login = asyncHandler(async (req, res) => success(res, await service.login(req.body), 'Login successful'));
exports.me = asyncHandler(async (req, res) => success(res, req.user));
exports.create = asyncHandler(async (req, res) => success(res, await service.create(req.body), 'User created', 201));
exports.list = asyncHandler(async (req, res) => {
  const { items, meta } = await service.list(req.query);
  success(res, items, 'Users fetched', 200, meta);
});
exports.getById = asyncHandler(async (req, res) => success(res, await service.getById(req.params.id)));
exports.update = asyncHandler(async (req, res) => success(res, await service.update(req.params.id, req.body), 'User updated'));
exports.remove = asyncHandler(async (req, res) => {
  await service.remove(req.params.id);
  success(res, null, 'User deleted');
});
