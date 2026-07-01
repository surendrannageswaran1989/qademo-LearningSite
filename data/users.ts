export type UserRole = 'standard' | 'locked' | 'admin';

export interface TestUser {
  role: UserRole;
  username: string;
  password: string;
  shouldLoginSucceed: boolean;
  expectedUrl?: RegExp;
  expectedError?: string;
}

export const users: Record<UserRole, TestUser> = {
  standard: {
    role: 'standard',
    username: 'standard_user',
    password: 'standard123',
    shouldLoginSucceed: true,
    expectedUrl: /catalog/,
  },
  locked: {
    role: 'locked',
    username: 'locked_user',
    password: 'locked123',
    shouldLoginSucceed: false,
    expectedError: 'Account is locked',
  },
  admin: {
    role: 'admin',
    username: 'admin_user',
    password: 'admin123',
    shouldLoginSucceed: true,
    expectedUrl: /catalog/,
  },
};

export const allUsers = Object.values(users);
