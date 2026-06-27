import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class JournalService {
  private posts: Post[] = [];
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  readonly homeContent = `Welcome to your Daily Journal — a quiet space for your thoughts, reflections, and stories.
Every entry is a small act of remembrance: writing things down is how the fleeting becomes permanent.
Start writing below, and let your words fill the page.`;

  readonly aboutContent = `Every day holds moments worth remembering, whether they're life changing milestones or quiet reflections that only matter to you. Daily Journal is a personal space to capture your thoughts, experiences, emotions, and memories without pressure or expectations.\n
  Write about your day, celebrate your achievements, work through challenges, or simply record the little moments that make life meaningful. There are no rules and no perfect way to journal. Every entry becomes part of your unique story.

  Over time, your journal grows into a timeline of your life, allowing you to revisit memories, reflect on your journey, and see how far you've come. One page at a time, you're creating something that will always be yours.

  One day. One page. Your story.`;

  readonly contactContent = `Have thoughts, feedback, or just want to say hello?
We'd love to hear from you. Drop a message at hello@dailyjournal.app —
we read every email and reply to most of them.`;

  constructor(private auth: AuthService) {
    // Reload posts whenever the current user changes
    this.loadPostsForCurrentUser();
  }

  loadPostsForCurrentUser(): void {
    this.posts = this.readFromStorage();
    this.postsSubject.next(this.posts);
  }

  addPost(title: string, content: string): Post {
    const post: Post = {
      id: this.slugify(title) + '-' + Date.now(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date()
    };
    this.posts = [post, ...this.posts];
    this.saveToStorage();
    this.postsSubject.next(this.posts);
    return post;
  }

  getPostBySlug(slug: string): Post | undefined {
    return this.posts.find(p =>
      this.slugify(p.title) === this.slugify(slug) ||
      p.id.startsWith(this.slugify(slug))
    );
  }

  deletePost(id: string): void {
    this.posts = this.posts.filter(p => p.id !== id);
    this.saveToStorage();
    this.postsSubject.next(this.posts);
  }

  slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }).format(new Date(date));
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.auth.getUserPostsKey(), JSON.stringify(this.posts));
    } catch { }
  }

  private readFromStorage(): Post[] {
    try {
      const raw = localStorage.getItem(this.auth.getUserPostsKey());
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }
}
