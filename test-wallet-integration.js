#!/usr/bin/env node

/**
 * Casino Game - Wallet Integration Test Script
 * 
 * This script helps test the wallet integration functionality
 * Run with: node test-wallet-integration.js
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🎮 Casino Game - Wallet Integration Test Suite\n');

// Test configurations
const tests = [
  {
    name: 'Environment Setup',
    description: 'Check if environment files exist',
    test: () => {
      const envFiles = ['server/.env.development', 'server/.env.example'];
      const missing = envFiles.filter(file => !fs.existsSync(file));
      
      if (missing.length > 0) {
        throw new Error(`Missing environment files: ${missing.join(', ')}`);
      }
      
      return '✅ Environment files present';
    }
  },
  {
    name: 'Dependencies Check',
    description: 'Verify required dependencies are installed',
    test: () => {
      try {
        // Check if node_modules exist
        if (!fs.existsSync('client/node_modules') || !fs.existsSync('server/node_modules')) {
          throw new Error('Dependencies not installed. Run npm install in both client and server directories.');
        }
        
        return '✅ Dependencies installed';
      } catch (error) {
        throw new Error(`Dependency check failed: ${error.message}`);
      }
    }
  },
  {
    name: 'Wallet Component',
    description: 'Check if wallet component files exist',
    test: () => {
      const requiredFiles = [
        'client/src/components/sign/walletConnect.js',
        'client/src/components/sign/sign.js'
      ];
      
      const missing = requiredFiles.filter(file => !fs.existsSync(file));
      
      if (missing.length > 0) {
        throw new Error(`Missing wallet component files: ${missing.join(', ')}`);
      }
      
      return '✅ Wallet components present';
    }
  },
  {
    name: 'Translations',
    description: 'Verify wallet translations are added',
    test: () => {
      const translationFile = 'client/src/translations/eng/words.js';
      
      if (!fs.existsSync(translationFile)) {
        throw new Error('Translation file not found');
      }
      
      const content = fs.readFileSync(translationFile, 'utf8');
      const requiredKeys = ['connect_wallet', 'wallet_connected', 'connect_metamask'];
      
      const missingKeys = requiredKeys.filter(key => !content.includes(key));
      
      if (missingKeys.length > 0) {
        throw new Error(`Missing translation keys: ${missingKeys.join(', ')}`);
      }
      
      return '✅ Wallet translations present';
    }
  },
  {
    name: 'Server Security',
    description: 'Check crypto payment security improvements',
    test: () => {
      const cryptoFile = 'server/payments/cryptoPayment.js';
      
      if (!fs.existsSync(cryptoFile)) {
        throw new Error('Crypto payment file not found');
      }
      
      const content = fs.readFileSync(cryptoFile, 'utf8');
      
      // Check if hardcoded API key is removed
      if (content.includes('Z1KG9J0-GNHMNQE-PT6HD64-ET6GTWK')) {
        throw new Error('Hardcoded API key still present - security risk!');
      }
      
      // Check if environment variable is used
      if (!content.includes('process.env.CRYPTO_API_KEY')) {
        throw new Error('Environment variable for API key not implemented');
      }
      
      return '✅ Security improvements implemented';
    }
  }
];

// Run tests
console.log('Running tests...\n');

let passed = 0;
let failed = 0;

tests.forEach((test, index) => {
  try {
    console.log(`${index + 1}. ${test.name}`);
    console.log(`   ${test.description}`);
    
    const result = test.test();
    console.log(`   ${result}\n`);
    passed++;
  } catch (error) {
    console.log(`   ❌ ${error.message}\n`);
    failed++;
  }
});

// Summary
console.log('📊 Test Summary');
console.log('================');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📋 Total: ${tests.length}\n`);

if (failed === 0) {
  console.log('🎉 All tests passed! You can proceed with manual testing.\n');
  
  console.log('📝 Next Steps:');
  console.log('1. Start the development servers');
  console.log('2. Install MetaMask browser extension');
  console.log('3. Connect a test wallet');
  console.log('4. Test the wallet integration manually');
} else {
  console.log('⚠️  Some tests failed. Please fix the issues before proceeding.\n');
  process.exit(1);
}

// Installation helper
console.log('🚀 Quick Start Commands:');
console.log('========================');
console.log('# Install dependencies:');
console.log('cd client && npm install');
console.log('cd ../server && npm install');
console.log('');
console.log('# Start development servers:');
console.log('cd server && npm start');
console.log('cd client && npm start');
console.log('');
console.log('# Run this test script:');
console.log('node test-wallet-integration.js'); 