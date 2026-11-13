const Campaign = require('./campaign.model');
const Client = require('../client/client.model');
const ApiError = require('../../utils/ApiError');
const { SECTIONS } = require('./campaign.validation');
const { getPagination, buildMeta, escapeRegex } = require('../../utils/pagination');

const populate = { path: 'client', select: 'name clientId logo' };

const assertClient = async (id) => {
  if (!(await Client.exists({ _id: id }))) throw new ApiError(404, 'Client not found');
};

exports.create = async (data, userId) => {
  await assertClient(data.client);
  return Campaign.create({ ...data, createdBy: userId });
};

exports.list = async (query) => {
  const { page, limit, skip } = getPagination(query);
  const filter = {};
  if (query.client) filter.client = query.client;
  if (query.status) filter.status = query.status;
  if (query.type) filter.campaignType = query.type;
  if (query.search) {
    const rx = new RegExp(escapeRegex(query.search), 'i');
    filter.$or = [{ adName: rx }, { campaignId: rx }];
  }
  const [items, total] = await Promise.all([
    Campaign.find(filter).select('-' + SECTIONS.join(' -')).populate(populate).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Campaign.countDocuments(filter),
  ]);
  return { items, meta: buildMeta(total, page, limit) };
};

exports.getById = async (id) => {
  const c = await Campaign.findById(id).populate(populate).populate('createdBy', 'name');
  if (!c) throw new ApiError(404, 'Campaign not found');
  return c;
};

exports.update = async (id, data) => {
  if (data.client) await assertClient(data.client);
  const c = await Campaign.findById(id);
  if (!c) throw new ApiError(404, 'Campaign not found');
  Object.assign(c, data); // save() runs date validation
  await c.save();
  return c.populate(populate);
};

// PUT /campaigns/:id/sections/:section  (pacing, devices, topSites ...)
exports.updateSection = async (id, section, body) => {
  if (!SECTIONS.includes(section)) throw new ApiError(400, `Unknown section. Use: ${SECTIONS.join(', ')}`);
  const c = await Campaign.findByIdAndUpdate(id, { [section]: body }, { new: true });
  if (!c) throw new ApiError(404, 'Campaign not found');
  return c;
};

exports.remove = async (id) => {
  const c = await Campaign.findByIdAndDelete(id);
  if (!c) throw new ApiError(404, 'Campaign not found');
};
