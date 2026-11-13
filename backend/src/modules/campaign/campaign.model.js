const mongoose = require('mongoose');

const STATUSES = ['Pending', 'Active', 'Paused', 'Completed'];

const campaignSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
    status: { type: String, enum: STATUSES, default: 'Pending' },
    adName: { type: String, required: true, trim: true },
    campaignId: { type: String, unique: true, index: true }, // vm-1516262626 (auto-generated)
    campaignType: { type: String, required: true, trim: true }, // Display Ads, Video...
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null }, // null = continuous
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // Workflow tabs from the "Edit Campaign" screen – filled in later steps
    adSample: { type: mongoose.Schema.Types.Mixed, default: {} },
    pacing: { type: mongoose.Schema.Types.Mixed, default: {} },
    clicksImpressions: { type: mongoose.Schema.Types.Mixed, default: {} },
    devices: { type: mongoose.Schema.Types.Mixed, default: {} },
    userByRegion: { type: mongoose.Schema.Types.Mixed, default: {} },
    multipleAds: { type: mongoose.Schema.Types.Mixed, default: {} },
    topSites: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

campaignSchema.pre('validate', function (next) {
  if (!this.campaignId) this.campaignId = `vm-${Date.now()}${Math.floor(Math.random() * 100)}`;
  if (this.endDate && this.endDate < this.startDate) return next(new Error('endDate must be after startDate'));
  next();
});

module.exports = mongoose.model('Campaign', campaignSchema);
module.exports.STATUSES = STATUSES;
