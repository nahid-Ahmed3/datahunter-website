// Development mode authentication fallback
// This simulates authentication when Firebase is not properly configured

interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
}

const mockUsers: MockUser[] = [];

export const createMockUser = (email: string, password: string): MockUser => {
  const user: MockUser = {
    uid: `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    email,
    displayName: email.split('@')[0],
    emailVerified: false,
    metadata: {
      creationTime: new Date().toISOString(),
      lastSignInTime: new Date().toISOString(),
    },
  };
  mockUsers.push(user);
  return user;
};

export const findMockUserByEmail = (email: string): MockUser | undefined => {
  return mockUsers.find(user => user.email === email);
};

export const validateMockCredentials = (email: string, password: string): MockUser | null => {
  // Simple validation - in real app, this would be proper password hashing
  if (password.length < 6) return null;
  
  const user = findMockUserByEmail(email);
  if (user) {
    // Mock successful login
    user.metadata.lastSignInTime = new Date().toISOString();
    return user;
  }
  
  return null;
};