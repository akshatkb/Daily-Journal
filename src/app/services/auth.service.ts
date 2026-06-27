import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USERS_KEY = 'dj_users';
  private readonly SESSION_KEY = 'dj_session';

  currentUser = signal<User | null>(this.loadSession());

  constructor(private router: Router) {}

  // ── Simple hash (not cryptographic — for demo/localStorage use) ──
  private hash(str: string): string {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    }
    return Math.abs(h).toString(36);
  }

  register(name: string, email: string, password: string): { success: boolean; error?: string } {
    const users = this.getUsers();
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { success: false, error: 'An account with this email already exists.' };

    const user: User = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash: this.hash(password),
      createdAt: new Date().toISOString()
    };

    users.push(user);
    this.saveUsers(users);
    this.setSession(user);
    return { success: true };
  }

  login(email: string, password: string): { success: boolean; error?: string } {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) return { success: false, error: 'No account found with that email.' };
    if (user.passwordHash !== this.hash(password)) return { success: false, error: 'Incorrect password.' };

    this.setSession(user);
    return { success: true };
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  /** Returns a namespaced localStorage key scoped to the current user */
  getUserPostsKey(): string {
    const user = this.currentUser();
    return user ? `dj_posts_${user.id}` : 'dj_posts_guest';
  }

  private setSession(user: User): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }

  private loadSession(): User | null {
    try {
      const raw = localStorage.getItem('dj_session');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  private getUsers(): User[] {
    try {
      const raw = localStorage.getItem(this.USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }
}
