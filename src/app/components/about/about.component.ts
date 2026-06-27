import { Component } from '@angular/core';
import { JournalService } from '../../services/journal.service';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  aboutContent: string;
  constructor(private journal: JournalService) {
    this.aboutContent = this.journal.aboutContent;
  }
}
