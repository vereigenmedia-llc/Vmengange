exports.success = (res, data, message = 'Success', status = 200, meta) =>
  res.status(status).json({ success: true, message, data, ...(meta && { meta }) });
