import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JournalService } from '../../services/journal.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post | undefined;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private journal: JournalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    this.post = this.journal.getPostBySlug(slug);
    if (!this.post) this.notFound = true;
  }

  formatDate(date: Date): string {
    return this.journal.formatDate(date);
  }

  deletePost(): void {
    if (this.post && confirm('Delete this entry permanently?')) {
      this.journal.deletePost(this.post.id);
      this.router.navigate(['/']);
    }
  }

  get paragraphs(): string[] {
    return (this.post?.content || '').split('\n').filter(p => p.trim());
  }
}
