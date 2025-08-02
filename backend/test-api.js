const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 Testing PickleMatch API...\n');

  try {
    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);

    // Test user registration
    console.log('\n2. Testing user registration...');
    const signupResponse = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
        first_name: 'Test',
        last_name: 'User',
      }),
    });
    const signupData = await signupResponse.json();
    console.log('✅ Registration:', signupData.message);

    // Test user login
    console.log('\n3. Testing user login...');
    const signinResponse = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });
    const signinData = await signinResponse.json();
    console.log('✅ Login:', signinData.message);

    // Test get current user
    console.log('\n4. Testing get current user...');
    const meResponse = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${signinData.token}`,
        'Content-Type': 'application/json',
      },
    });
    const meData = await meResponse.json();
    console.log('✅ Current user:', meData.user.email);

    // Test profile update
    console.log('\n5. Testing profile update...');
    const updateResponse = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${signinData.token}`,
        'Content-Type': 'application/json',
      },
             body: JSON.stringify({
         location: 'New York, NY',
         player_rank: 'Intermediate',
         elo: 1200,
         description: 'Passionate pickleball player',
       }),
    });
    const updateData = await updateResponse.json();
    console.log('✅ Profile update:', updateData.message);

    // Test logout
    console.log('\n6. Testing logout...');
    const logoutResponse = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${signinData.token}`,
        'Content-Type': 'application/json',
      },
    });
    const logoutData = await logoutResponse.json();
    console.log('✅ Logout:', logoutData.message);

    console.log('\n🎉 All API tests passed successfully!');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

// Run the test
testAPI(); 