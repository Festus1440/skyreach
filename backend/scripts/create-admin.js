#!/usr/bin/env node

/**
 * Admin User Creation Script
 * 
 * Usage:
 *   node scripts/create-admin.js
 *   node scripts/create-admin.js --email admin@example.com --name "Admin User" --password secret123
 *   node scripts/create-admin.js --email user@example.com --name "John Doe" --password secret123 --role manager
 * 
 * Environment variables (from .env):
 *   DB_CONN - MongoDB connection string
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : null;
};

const hasFlag = (flag) => args.includes(flag);

async function createUser() {
  try {
    // Get values from args, env vars, or use interactive mode
    let email = getArg('--email') || process.env.ADMIN_EMAIL;
    let name = getArg('--name') || 'Admin User';
    let password = getArg('--password') || process.env.ADMIN_PASSWORD;
    let role = getArg('--role') || 'admin';
    
    // Validate role
    const validRoles = ['admin', 'manager', 'technician'];
    if (!validRoles.includes(role)) {
      console.error(`❌ Invalid role: ${role}. Must be one of: ${validRoles.join(', ')}`);
      process.exit(1);
    }
    
    // Show what credentials will be used
    console.log('\n📝 Creating user with:');
    console.log(`   Email: ${email || '(not set - will prompt)'}`);
    console.log(`   Name: ${name || '(not set - will prompt)'}`);
    console.log(`   Password: ${password ? '******** (from env/args)' : '(not set - will prompt)'}`);
    console.log(`   Role: ${role}`);
    
    // Interactive mode if not all required args/env provided
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));
    
    if (!email) {
      email = await question('Email: ');
    }
    
    if (!name) {
      name = await question('Full Name: ');
    }
    
    if (!password) {
      password = await question('Password (min 6 chars): ');
    }
    
    if (!getArg('--role') && !process.env.ADMIN_ROLE) {
      const roleInput = await question(`Role (admin/manager/technician) [${role}]: `);
      if (roleInput) role = roleInput;
    }
    
    rl.close();
    
    // Validate inputs
    if (!email || !name || !password) {
      console.error('❌ Email, name, and password are required');
      console.error('   Set them via .env file (ADMIN_EMAIL, ADMIN_PASSWORD) or command line arguments');
      process.exit(1);
    }
    
    if (password.length < 6) {
      console.error('❌ Password must be at least 6 characters');
      process.exit(1);
    }
    
    // Warn if using default credentials
    if (password === 'change-this-password' || password === 'admin123') {
      console.warn('\n⚠️  WARNING: You are using a default/weak password!');
      console.warn('   Please change it in your .env file for security.');
    }
    
    // Check DB connection string
    if (!process.env.DB_CONN) {
      console.error('❌ DB_CONN environment variable is not set!');
      console.error('   Please check your .env file');
      process.exit(1);
    }
    
    // Connect to MongoDB
    console.log('\n📡 Connecting to database...');
    console.log(`   URI: ${process.env.DB_CONN.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`); // Hide credentials
    await mongoose.connect(process.env.DB_CONN);
    console.log('✅ Connected to MongoDB');
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error(`❌ User with email "${email}" already exists`);
      await mongoose.connection.close();
      process.exit(1);
    }
    
    // Create user
    console.log('\n👤 Creating user...');
    const user = await User.create({
      email,
      name,
      password,
      role
    });
    
    console.log('\n✅ User created successfully!');
    console.log('\n📋 User Details:');
    console.log(`   ID:    ${user._id}`);
    console.log(`   Name:  ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role:  ${user.role}`);
    console.log(`   Created: ${user.createdAt}`);
    
    await mongoose.connection.close();
    console.log('\n👋 Done!');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
}

// Show help
if (hasFlag('--help') || hasFlag('-h')) {
  console.log(`
Admin User Creation Script

Usage:
  node scripts/create-admin.js [options]

Options:
  --email <email>      User email address
  --name <name>        Full name
  --password <pass>    Password (min 6 chars)
  --role <role>        Role: admin|manager|technician (default: admin)
  --help, -h           Show this help

Examples:
  # Interactive mode
  node scripts/create-admin.js

  # Command line mode
  node scripts/create-admin.js --email admin@example.com --name "Admin User" --password secret123

  # Create manager
  node scripts/create-admin.js --email manager@example.com --name "John Manager" --password secret123 --role manager

Environment Variables:
  DB_CONN    MongoDB connection string (required)
`);
  process.exit(0);
}

// Run
createUser();
