export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  firstName: string;
  lastName: string;
  avatar: string;
}
