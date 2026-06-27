import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JournalService } from '../../services/journal.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  loading = false;
  showPassword = false;

  constructor(
    private auth: AuthService,
    private journal: JournalService,
    private router: Router
  ) {}

  get passwordMismatch(): boolean {
    return this.confirmPassword.length > 0 && this.password !== this.confirmPassword;
  }

  get passwordStrength(): 'weak' | 'fair' | 'strong' {
    const p = this.password;
    if (p.length < 6) return 'weak';
    if (p.length >= 10 && /[A-Z]/.test(p) && /[0-9]/.test(p)) return 'strong';
    return 'fair';
  }

  onSubmit(): void {
    this.error = '';
    if (!this.name.trim() || !this.email.trim() || !this.password || !this.confirmPassword) {
      this.error = 'Please fill in all fields.';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.loading = true;
    const result = this.auth.register(this.name, this.email, this.password);
    this.loading = false;

    if (result.success) {
      this.journal.loadPostsForCurrentUser();
      this.router.navigate(['/']);
    } else {
      this.error = result.error || 'Registration failed.';
    }
  }
}
