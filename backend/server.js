const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

// Import models
const Lead = require('./models/Lead');

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONN);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Public contact form submission endpoint (from funnel/landing)
app.post('/api/contact', [
  // Validation
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('service').optional().trim(),
  body('message').optional().trim(),
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => `${err.path}: ${err.msg}`).join(', ');
      return res.status(400).json({
        success: false,
        message: `Please fix the following: ${errorMessages}`,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }

    const { firstName, lastName, email, phone, service, message, ...otherData } = req.body;

    // Save lead to database
    const leadData = {
      firstName,
      lastName,
      email,
      phone,
      zip: otherData.zip || '',
      systemType: otherData.systemType,
      filterSize: otherData.filterSize,
      lastService: otherData.lastService,
      issues: otherData.issues,
      propertyType: otherData.propertyType,
      timing: otherData.timing,
      funnelAnswers: otherData.funnelAnswers || otherData,
      source: otherData.source || 'website'
    };

    const lead = await Lead.create(leadData);
    console.log('✅ Lead saved:', lead._id);

    // Service name mapping for email
    const serviceNames = {
      'ac-install': 'AC Installation',
      'ac-repair': 'AC Repair',
      'heating': 'Heating Services',
      'maintenance': 'Maintenance',
      'emergency': 'Emergency Service',
      'commercial': 'Commercial HVAC',
      'other': 'Other'
    };

    const serviceName = serviceNames[service] || service || 'Furnace Maintenance';

    // Send email notification (optional)
    try {
      const transporter = nodemailer.createTransporter({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@skyreachair.com',
        to: process.env.ADMIN_EMAIL_RECIPIENT || 'service@skyreachair.com',
        replyTo: email,
        subject: `New Lead: ${firstName} ${lastName} - ${serviceName}`,
        html: `
          <h2>New Lead Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${serviceName}</p>
          <p><strong>Message:</strong> ${message || 'N/A'}</p>
          <hr>
          <p><small>Lead ID: ${lead._id}</small></p>
          <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue - lead is already saved
    }

    // Send success response
    res.json({
      success: true,
      message: 'Thank you! Your request has been submitted successfully.',
      data: {
        leadId: lead._id
      }
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║     Skyreach Heating & Cooling - Backend Server        ║
╠════════════════════════════════════════════════════════╣
║  Server running on port: ${PORT}                        ║
║  API URL: http://localhost:${PORT}/api                  ║
║  Health Check: http://localhost:${PORT}/api/health      ║
║                                                        ║
║  Auth Endpoints:                                       ║
║    POST /api/auth/login                                ║
║    POST /api/auth/logout                               ║
║    GET  /api/auth/me                                   ║
║                                                        ║
║  Dashboard Endpoints:                                  ║
║    GET  /api/dashboard/stats                           ║
║    GET  /api/dashboard/leads                           ║
║    GET  /api/dashboard/leads/:id                       ║
║    PUT  /api/dashboard/leads/:id/status                ║
║    POST /api/dashboard/leads/:id/notes                 ║
║                                                        ║
║  Public Endpoints:                                     ║
║    POST /api/contact                                   ║
╚════════════════════════════════════════════════════════╝
    `);
  });
});

module.exports = app;
