import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JournalService } from '../../services/journal.service';

@Component({
  selector: 'app-compose',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent {
  title = '';
  content = '';
  submitted = false;
  toast = '';

  constructor(private journal: JournalService, private router: Router) {}

  get titleError(): boolean {
    return this.submitted && !this.title.trim();
  }

  get contentError(): boolean {
    return this.submitted && !this.content.trim();
  }

  get wordCount(): number {
    return this.content.trim() ? this.content.trim().split(/\s+/).length : 0;
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.title.trim() || !this.content.trim()) return;

    this.journal.addPost(this.title, this.content);
    this.router.navigate(['/']);
  }

  onClear(): void {
    this.title = '';
    this.content = '';
    this.submitted = false;
  }
}
