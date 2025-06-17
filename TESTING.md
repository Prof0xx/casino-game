# 🧪 Testing Guide - Casino Game Wallet Integration

This guide will help you test the wallet integration and security improvements made to the casino game platform.

## 📋 Prerequisites

### Required Software
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MetaMask** browser extension
- **MySQL** database (for full testing)
- **Modern browser** (Chrome, Firefox, Edge)

### Test Environment Setup
1. **Install MetaMask**: Add MetaMask extension to your browser
2. **Create Test Wallet**: Set up a test Ethereum wallet in MetaMask
3. **Get Test ETH**: Use a testnet faucet for test Ethereum (optional)

---

## 🚀 Quick Start Testing

### 1. Run Automated Tests
```bash
# Run the automated test script
node test-wallet-integration.js
```

### 2. Install Dependencies
```bash
# Client dependencies
cd client
npm install

# Server dependencies  
cd ../server
npm install
```

### 3. Environment Configuration
```bash
# Copy and configure environment file
cp server/.env.example server/.env.development

# Edit the file with your database credentials
# For testing, you can use placeholder values for API keys
```

### 4. Start Development Servers
```bash
# Terminal 1 - Start backend server
cd server
npm start

# Terminal 2 - Start frontend client  
cd client
npm start
```

---

## 🔍 Manual Testing Scenarios

### **Test Case 1: Wallet Connection Requirement**

**Objective**: Verify users cannot sign in without connecting wallet

**Steps**:
1. Open browser to `http://localhost:3000`
2. Navigate to sign-in page
3. **Expected**: Wallet connection interface appears first
4. Try clicking away or bypassing wallet connection
5. **Expected**: Cannot access sign-in form without wallet

**✅ Pass Criteria**:
- Wallet connection UI is prominently displayed
- Sign-in/Sign-up forms are hidden until wallet connected
- Clear messaging about wallet requirement

---

### **Test Case 2: MetaMask Integration**

**Objective**: Test wallet connection functionality

**Steps**:
1. Ensure MetaMask is installed and set up
2. Click "Connect MetaMask" button
3. **Expected**: MetaMask popup appears
4. Approve the connection in MetaMask
5. **Expected**: Wallet address displays with shortened format
6. **Expected**: Sign-in/Sign-up options become available

**✅ Pass Criteria**:
- MetaMask popup appears on button click
- Wallet address displays after connection
- Connection persists on page refresh
- Disconnect button works properly

---

### **Test Case 3: Authentication Flow**

**Objective**: Test complete sign-in/sign-up with wallet

**Steps**:
1. Connect wallet (from Test Case 2)
2. Try to sign in with existing credentials
3. **Expected**: Sign-in includes wallet information
4. Try to sign up with new credentials
5. **Expected**: Sign-up includes wallet information
6. Check server logs for wallet data

**✅ Pass Criteria**:
- Authentication only works after wallet connection
- User object includes `walletAddress` and `walletType`
- Server receives wallet data in auth requests

---

### **Test Case 4: Wallet Account Changes**

**Objective**: Test behavior when user changes MetaMask account

**Steps**:
1. Connect wallet with Account A
2. Switch to Account B in MetaMask
3. **Expected**: UI updates with new wallet address
4. Try to authenticate
5. **Expected**: New wallet address is used

**✅ Pass Criteria**:
- UI updates when MetaMask account changes
- New wallet address is reflected immediately
- Authentication uses current wallet address

---

### **Test Case 5: Security Improvements**

**Objective**: Verify crypto payment security enhancements

**Steps**:
1. Check `server/payments/cryptoPayment.js`
2. **Expected**: No hardcoded API keys visible
3. Test payment endpoint with invalid data
4. **Expected**: Proper validation error responses
5. Check server logs for error handling

**✅ Pass Criteria**:
- No hardcoded API keys in code
- Input validation prevents malformed requests
- Error responses don't expose sensitive data
- Environment variables are used for configuration

---

## 🐛 Common Issues & Troubleshooting

### **MetaMask Issues**
```javascript
// Error: MetaMask not detected
// Solution: Install MetaMask extension and refresh page

// Error: User rejected connection
// Solution: Approve the connection request in MetaMask popup

// Error: Wrong network
// Solution: Switch MetaMask to Ethereum Mainnet or desired test network
```

### **Connection Issues**
```javascript
// Error: Wallet disconnected
// Solution: Check MetaMask is unlocked and connected to the site

// Error: Account changed but UI not updated  
// Solution: Check console for errors, ensure event listeners are working
```

### **Server Issues**
```javascript
// Error: Missing environment variables
// Solution: Copy .env.example to .env.development and configure

// Error: Database connection failed
// Solution: Ensure MySQL is running and credentials are correct

// Error: Socket.io connection failed
// Solution: Check if server is running on correct port
```

---

## 📊 Testing Checklist

### Frontend Testing
- [ ] Wallet connection UI appears first
- [ ] MetaMask integration works
- [ ] Wallet address displays correctly
- [ ] Account switching updates UI
- [ ] Sign-in/Sign-up forms appear after wallet connection
- [ ] Translations display correctly
- [ ] Responsive design works on mobile
- [ ] Error messages are user-friendly

### Backend Testing  
- [ ] Wallet validation prevents unauthorized access
- [ ] User objects include wallet information
- [ ] Environment variables are used for API keys
- [ ] Input validation works for crypto payments
- [ ] Error handling doesn't expose sensitive data
- [ ] Socket.io receives wallet data correctly

### Security Testing
- [ ] No hardcoded API keys in source code
- [ ] Environment variables properly configured
- [ ] Input validation prevents injection attacks
- [ ] Error messages don't leak system information
- [ ] Wallet addresses are properly validated

---

## 🔧 Debug Tools

### Browser Console Commands
```javascript
// Check if MetaMask is available
console.log(typeof window.ethereum !== 'undefined' ? 'MetaMask detected' : 'MetaMask not found');

// Check current wallet connection
window.ethereum?.request({ method: 'eth_accounts' }).then(console.log);

// Listen to account changes
window.ethereum?.on('accountsChanged', (accounts) => console.log('Accounts changed:', accounts));
```

### Server Debug Commands
```bash
# Check environment variables
node -e "console.log(process.env.CRYPTO_API_KEY ? 'API key loaded' : 'API key missing')"

# Test database connection
node -e "require('./database/mysql')().then(() => console.log('DB connected')).catch(console.error)"
```

---

## 📈 Performance Testing

### Load Testing
- Test with multiple simultaneous wallet connections
- Monitor memory usage during extended sessions
- Check for memory leaks in wallet event listeners

### Network Testing
- Test with slow network connections
- Verify timeout handling for MetaMask requests
- Check behavior when MetaMask is temporarily unavailable

---

## 🎯 Success Criteria

**The implementation is successful when**:
1. ✅ Users cannot access authentication without wallet connection
2. ✅ MetaMask integration works seamlessly
3. ✅ Wallet information is properly stored and transmitted
4. ✅ Security vulnerabilities have been addressed
5. ✅ User experience is intuitive and error-free
6. ✅ All existing functionality remains intact

---

## 📞 Support

If you encounter issues during testing:

1. **Check the console** for JavaScript errors
2. **Review server logs** for backend issues  
3. **Verify MetaMask** is properly configured
4. **Confirm environment variables** are set correctly
5. **Test in incognito mode** to rule out browser cache issues

Happy testing! 🚀 