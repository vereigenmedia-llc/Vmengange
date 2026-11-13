// Parses ?page=1&limit=7&search=abc into skip/limit helpers
exports.getPagination = (query) => {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit) || 7, 1), 100);
  return { page, limit, skip: (page - 1) * limit };
};

exports.buildMeta = (total, page, limit) => ({
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit),
});

exports.escapeRegex = (s = '') => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
