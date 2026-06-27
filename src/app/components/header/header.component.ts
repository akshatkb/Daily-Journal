import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  scrolled = false;
  menuOpen = false;

  userMenuOpen = false;

  constructor(public auth: AuthService, private el: ElementRef) {}

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 20; }

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  toggleUserMenu(event?: Event) { event?.stopPropagation(); this.userMenuOpen = !this.userMenuOpen; }

  closeMenu()  { this.menuOpen = false; this.userMenuOpen = false; }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) this.userMenuOpen = false;
  }

  logout() {
    this.closeMenu();
    this.auth.logout();
  }

  get userInitial(): string {
    return this.auth.currentUser()?.name?.charAt(0).toUpperCase() ?? '?';
  }

  get userName(): string {
    const name = this.auth.currentUser()?.name?.trim() ?? '';
    if (!name) return '';
    return name.split(/\s+/)[0];
  }
}
