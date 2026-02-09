const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Lead = require('../models/Lead');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Get counts
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const todayLeads = await Lead.countDocuments({ createdAt: { $gte: today } });
    const monthLeads = await Lead.countDocuments({ createdAt: { $gte: thisMonth } });
    
    // Get status breakdown
    const statusCounts = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    // Get recent activity
    const recentLeads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName status createdAt');
    
    res.json({
      success: true,
      stats: {
        total: totalLeads,
        new: newLeads,
        today: todayLeads,
        thisMonth: monthLeads,
        statusBreakdown: statusCounts.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {})
      },
      recentLeads
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/dashboard/leads
// @desc    Get all leads with pagination and filters
// @access  Private
router.get('/leads', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    // Build filter
    const filter = {};
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.search) {
      filter.$or = [
        { firstName: { $regex: req.query.search, $options: 'i' } },
        { lastName: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { phone: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Get leads
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('assignedTo', 'name email');
    
    const total = await Lead.countDocuments(filter);
    
    res.json({
      success: true,
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/dashboard/leads/:id
// @desc    Get single lead
// @access  Private
router.get('/leads/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('notes.createdBy', 'name');
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }
    
    res.json({
      success: true,
      lead
    });
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/dashboard/leads/:id/status
// @desc    Update lead status
// @access  Private
router.put('/leads/:id/status', protect, [
  body('status').isIn(['new', 'contacted', 'scheduled', 'completed', 'cancelled'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const { status } = req.body;
    
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }
    
    res.json({
      success: true,
      lead
    });
  } catch (error) {
    console.error('Update lead status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/dashboard/leads/:id/notes
// @desc    Add note to lead
// @access  Private
router.post('/leads/:id/notes', protect, [
  body('text').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const { text } = req.body;
    
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }
    
    lead.notes.push({
      text,
      createdBy: req.user._id
    });
    
    await lead.save();
    
    res.json({
      success: true,
      lead
    });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/dashboard/leads/:id/assign
// @desc    Assign lead to user
// @access  Private (Admin only)
router.put('/leads/:id/assign', protect, adminOnly, [
  body('userId').notEmpty()
], async (req, res) => {
  try {
    const { userId } = req.body;
    
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { assignedTo: userId },
      { new: true }
    ).populate('assignedTo', 'name email');
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }
    
    res.json({
      success: true,
      lead
    });
  } catch (error) {
    console.error('Assign lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/dashboard/users
// @desc    Get all users (for assignment dropdown)
// @access  Private (Admin only)
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select('name email role')
      .sort({ name: 1 });
    
    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
