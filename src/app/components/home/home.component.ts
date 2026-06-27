import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { JournalService } from '../../services/journal.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  homeContent = '';
  private sub!: Subscription;

  constructor(private journal: JournalService) {}

  ngOnInit(): void {
    this.homeContent = this.journal.homeContent;
    this.sub = this.journal.posts$.subscribe(p => this.posts = p);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  deletePost(id: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (confirm('Delete this entry?')) {
      this.journal.deletePost(id);
    }
  }

  getSlug(post: Post): string {
    return this.journal.slugify(post.title);
  }

  formatDate(date: Date): string {
    return this.journal.formatDate(date);
  }

  getExcerpt(content: string): string {
    return content.length > 150 ? content.substring(0, 150) + '…' : content;
  }
}
