const service = require('./client.service');
const asyncHandler = require('../../utils/asyncHandler');
const { success } = require('../../utils/apiResponse');

exports.create = asyncHandler(async (req, res) =>
  success(res, await service.create(req.body, req.file, req.user._id), 'Client created', 201));
exports.list = asyncHandler(async (req, res) => {
  const { items, meta } = await service.list(req.query);
  success(res, items, 'Clients fetched', 200, meta);
});
exports.getById = asyncHandler(async (req, res) => success(res, await service.getById(req.params.id)));
exports.update = asyncHandler(async (req, res) =>
  success(res, await service.update(req.params.id, req.body, req.file), 'Client updated'));
exports.remove = asyncHandler(async (req, res) => {
  await service.remove(req.params.id);
  success(res, null, 'Client deleted');
});
