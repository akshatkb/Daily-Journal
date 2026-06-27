import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JournalService } from '../../services/journal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;
  showPassword = false;

  constructor(
    private auth: AuthService,
    private journal: JournalService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error = '';
    if (!this.email.trim() || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }
    this.loading = true;
    const result = this.auth.login(this.email, this.password);
    this.loading = false;
    if (result.success) {
      this.journal.loadPostsForCurrentUser();
      this.router.navigate(['/']);
    } else {
      this.error = result.error || 'Login failed.';
    }
  }
}
