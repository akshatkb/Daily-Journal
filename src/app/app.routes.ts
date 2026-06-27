import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ComposeComponent } from './components/compose/compose.component';
import { PostComponent } from './components/post/post.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { EntriesComponent } from './components/entries/entries.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',         component: HomeComponent,    canActivate: [authGuard] },
  { path: 'compose',  component: ComposeComponent, canActivate: [authGuard] },
  { path: 'entries',  component: EntriesComponent, canActivate: [authGuard] },
  { path: 'post/:slug', component: PostComponent,  canActivate: [authGuard] },
  { path: 'about',    component: AboutComponent,   canActivate: [authGuard] },
  { path: 'contact',  component: ContactComponent, canActivate: [authGuard] },
  { path: '**',       redirectTo: '' }
];
