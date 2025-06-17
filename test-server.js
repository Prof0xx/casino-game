const http = require('http');

console.log('🧪 Testing server connection...\n');

// Test server on port 1111
const options = {
  hostname: 'localhost',
  port: 1111,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`✅ Server is running!`);
  console.log(`📍 Status: ${res.statusCode}`);
  console.log(`🌐 Server URL: http://localhost:1111`);
  console.log(`\n🎯 Next Steps:`);
  console.log(`1. Open browser to: http://localhost:1111`);
  console.log(`2. You should see the casino app`);
  console.log(`3. Look for wallet connection interface`);
  console.log(`4. Install MetaMask if not already installed`);
  console.log(`5. Test wallet connection → authentication flow`);
  
  process.exit(0);
});

req.on('error', (err) => {
  console.log(`❌ Server not responding on port 1111`);
  console.log(`📝 Error: ${err.message}`);
  console.log(`\n🔧 Troubleshooting:`);
  console.log(`1. Check if server is running: npm run server:dev`);
  console.log(`2. Check for error messages in server console`);
  console.log(`3. Ensure port 1111 is not in use by other apps`);
  console.log(`4. Try restarting the server`);
  
  process.exit(1);
});

req.setTimeout(5000, () => {
  console.log('⏱️  Server connection timeout');
  console.log('💡 Try starting the server manually with: npm run server:dev');
  process.exit(1);
});

req.end(); 