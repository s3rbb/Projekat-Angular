import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [];
  private currentUser: User | null = null;

  register(user: User): boolean {
    const exists = this.users.find(u => u.username === user.username);
    if (exists) {
      return false;
    }
    this.users.push(user);
    this.currentUser = user;
    return true;
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(
      u => u.username === username && u.password === password
    );
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  updateProfile(data: Partial<User>): void {       // partial vraca polovicni objekat, ne ceo.
    if (this.currentUser) {
      Object.assign(this.currentUser, data);
    }
  }
}
