const fs = require('fs');
const path = require('path');
const Client = require('./client.model');
const Campaign = require('../campaign/campaign.model');
const ApiError = require('../../utils/ApiError');
const { getPagination, buildMeta, escapeRegex } = require('../../utils/pagination');

const logoPath = (file) => (file ? `/uploads/logos/${file.filename}` : undefined);
const removeFile = (p) => p && fs.unlink(path.join(__dirname, '../../..', p), () => {});

exports.create = (data, file, userId) =>
  Client.create({ ...data, logo: logoPath(file), createdBy: userId });

exports.list = async (query) => {
  const { page, limit, skip } = getPagination(query);
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.search) {
    const rx = new RegExp(escapeRegex(query.search), 'i');
    filter.$or = [{ name: rx }, { clientId: rx }];
  }
  if (query.from || query.to) {
    filter.createdAt = {};
    if (query.from) filter.createdAt.$gte = new Date(query.from);
    if (query.to) filter.createdAt.$lte = new Date(query.to);
  }
  const [items, total] = await Promise.all([
    Client.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Client.countDocuments(filter),
  ]);
  return { items, meta: buildMeta(total, page, limit) };
};

exports.getById = async (id) => {
  const client = await Client.findById(id);
  if (!client) throw new ApiError(404, 'Client not found');
  return client;
};

exports.update = async (id, data, file) => {
  const client = await exports.getById(id);
  if (file) { removeFile(client.logo); client.logo = logoPath(file); }
  Object.assign(client, data);
  return client.save();
};

exports.remove = async (id) => {
  const client = await exports.getById(id);
  if (await Campaign.exists({ client: id })) {
    throw new ApiError(409, 'Cannot delete client with existing campaigns');
  }
  removeFile(client.logo);
  await client.deleteOne();
};
