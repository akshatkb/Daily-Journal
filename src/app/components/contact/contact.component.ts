import { Component } from '@angular/core';
import { JournalService } from '../../services/journal.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="page-wrapper">
      <div class="page-title">
        <div class="eyebrow">Get in touch</div>
        <h1>Contact</h1>
      </div>
      <div class="contact-card card">
        <p class="contact-text">{{ contactContent }}</p>
        <a href="mailto:hello@dailyjournal.app" class="contact-email">
          hello&#64;dailyjournal.app &rarr;
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactContent: string;
  constructor(private journal: JournalService) {
    this.contactContent = this.journal.contactContent;
  }
}
