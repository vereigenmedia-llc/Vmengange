const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    clientId: { type: String, unique: true, index: true }, // e.g. ID-37129823 (auto-generated)
    name: { type: String, required: true, trim: true },
    logo: { type: String, default: null }, // file path / URL
    status: { type: String, enum: ['Active', 'InActive'], default: 'Active' },
    details: { type: String, default: '' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

clientSchema.pre('validate', function (next) {
  if (!this.clientId) this.clientId = `ID-${Math.floor(10000000 + Math.random() * 90000000)}`;
  next();
});

module.exports = mongoose.model('Client', clientSchema);
