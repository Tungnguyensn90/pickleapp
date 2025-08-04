import { Platform } from 'react-native';

// Use different base URLs for iOS and Android
const getApiBaseUrl = () => {
  if (Platform.OS === 'ios') {
    return 'http://localhost:3000/api';
  } else {
    return 'http://10.0.2.2:3000/api';
  }
};

const API_BASE_URL = getApiBaseUrl();

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get headers
  getHeaders(includeAuth = false) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Token management
  setToken(token) {
    // Store token in AsyncStorage (you'll need to import AsyncStorage)
    // For now, we'll use a simple approach
    global.authToken = token;
  }

  getToken() {
    return global.authToken;
  }

  removeToken() {
    global.authToken = null;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      console.log('Making request to:', url);
      console.log('Platform:', Platform.OS);
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(options.includeAuth),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle authentication errors specifically
        if (response.status === 401) {
          throw new Error('Access denied, no token provided');
        } else if (response.status === 403) {
          throw new Error('Access denied, invalid token');
        } else {
          throw new Error(data.error || 'Request failed');
        }
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication methods
  async signUp(userData) {
    const data = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async signIn(credentials) {
    const data = await this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
        includeAuth: true,
      });
    } finally {
      this.removeToken();
    }
  }

  async getCurrentUser() {
    return this.request('/auth/me', {
      method: 'GET',
      includeAuth: true,
    });
  }

  // Profile methods
  async getProfile() {
    return this.request('/profile', {
      method: 'GET',
      includeAuth: true,
    });
  }

  async updateProfile(profileData) {
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
      includeAuth: true,
    });
  }

  async uploadAvatar(imageFile) {
    const formData = new FormData();
    formData.append('avatar', {
      uri: imageFile.uri,
      type: imageFile.type || 'image/jpeg',
      name: imageFile.name || 'avatar.jpg',
    });

    return this.request('/profile/avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
      includeAuth: true,
    });
  }

  async deleteAvatar() {
    return this.request('/profile/avatar', {
      method: 'DELETE',
      includeAuth: true,
    });
  }

  async changePassword(passwordData) {
    return this.request('/profile/password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
      includeAuth: true,
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health', {
      method: 'GET',
    });
  }
}

export default new ApiService(); 