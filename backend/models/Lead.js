const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  // Contact Info
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  zip: { type: String, required: true },
  
  // Service Details (from funnel)
  systemType: { type: String },
  filterSize: { type: String },
  lastService: { type: String },
  issues: { type: String },
  propertyType: { type: String },
  timing: { type: String },
  
  // Funnel-specific answers
  funnelAnswers: {
    type: Map,
    of: String
  },
  
  // Lead Status
  status: {
    type: String,
    enum: ['new', 'contacted', 'scheduled', 'completed', 'cancelled'],
    default: 'new'
  },
  
  // Notes
  notes: [{ 
    text: String, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  
  // Assignment
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  // Source
  source: { type: String, default: 'website' },
  
  // Email sent confirmation
  emailSent: { type: Boolean, default: false },
  emailId: { type: String }
}, {
  timestamps: true
});

// Index for common queries
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ email: 1 });
leadSchema.index({ phone: 1 });

module.exports = mongoose.model('Lead', leadSchema);
