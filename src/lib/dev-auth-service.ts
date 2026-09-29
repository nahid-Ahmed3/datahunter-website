import { createMockUser, validateMockCredentials } from './dev-auth';

interface DevUser {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
}

const devUsers: DevUser[] = [];

export const devCreateUserWithEmailAndPassword = async (email: string, password: string): Promise<DevUser> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      try {
        if (password.length < 6) {
          reject({ code: 'auth/weak-password', message: 'Password should be at least 6 characters' });
          return;
        }

        // Check if email already exists
        const existingUser = devUsers.find(user => user.email === email);
        if (existingUser) {
          reject({ code: 'auth/email-already-in-use', message: 'Email already in use' });
          return;
        }

        const user = createMockUser(email, password);
        devUsers.push(user);
        resolve(user);
      } catch (error) {
        reject({ code: 'auth/unknown', message: 'Failed to create user' });
      }
    }, 1000); // Simulate 1 second delay
  });
};

export const devSignInWithEmailAndPassword = async (email: string, password: string): Promise<DevUser> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      try {
        const user = validateMockCredentials(email, password);
        if (user) {
          resolve(user);
        } else {
          reject({ code: 'auth/wrong-password', message: 'Wrong password' });
        }
      } catch (error) {
        reject({ code: 'auth/user-not-found', message: 'User not found' });
      }
    }, 1000); // Simulate 1 second delay
  });
};

export const devSignOut = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500); // Simulate 500ms delay
  });
};