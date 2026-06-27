# Daily Journal – Angular 17

Converted from Express/EJS to a full Angular 17 standalone CLI project.

## Tech Stack
- **Angular 17** (standalone components, no NgModules)
- **TypeScript**
- **SCSS** with custom design system
- **Angular Router** for client-side navigation
- **RxJS** BehaviorSubject for reactive state
- **localStorage** for post persistence across sessions

## Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── header/          Header with sticky scroll + mobile menu
│   │   ├── footer/          Site footer
│   │   ├── home/            Post list + hero section
│   │   ├── compose/         New entry form with validation
│   │   ├── post/            Individual post view
│   │   ├── about/           About page
│   │   └── contact/         Contact page
│   ├── models/
│   │   └── post.model.ts    Post interface (id, title, content, createdAt)
│   ├── services/
│   │   └── journal.service.ts  CRUD + localStorage persistence
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── styles.scss              Global design tokens + utility classes
└── index.html
```

## Getting Started

```bash
npm install
ng serve
```

Open http://localhost:4200

## Build for Production
```bash
ng build
```

## UI/UX Improvements Over Original
- Sticky navbar with scroll blur + mobile hamburger menu
- Dark `ink` footer with navigation
- Post cards with date, excerpt, delete button
- Real-time word count in compose form
- Client-side form validation with helpful error messages
- Empty state on home when no entries
- Post persistence via localStorage (survives page refresh)
- Responsive down to 320px
- Playfair Display for headings, Inter for UI
- Smooth transitions and hover micro-interactions
