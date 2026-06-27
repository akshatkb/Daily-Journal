import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { JournalService } from '../../services/journal.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private sub!: Subscription;

  constructor(private journal: JournalService) {}

  ngOnInit(): void {
    this.sub = this.journal.posts$.subscribe(p => this.posts = p);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  getSlug(post: Post): string {
    return this.journal.slugify(post.title);
  }

  getExcerpt(content: string): string {
    return content.length > 150 ? content.substring(0, 150) + '…' : content;
  }

  formatDate(date: Date): string {
    return this.journal.formatDate(date);
  }

  deletePost(id: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (confirm('Delete this entry?')) this.journal.deletePost(id);
  }
}
