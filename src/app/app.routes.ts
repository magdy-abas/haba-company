import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/pages/home/home.component').then(
        (m) => m.HomeComponent,
      ),
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./components/pages/about/about.component').then(
        (m) => m.AboutComponent,
      ),
  },

  {
    path: 'services',
    loadComponent: () =>
      import('./components/pages/services/services.component').then(
        (m) => m.ServicesComponent,
      ),
  },

  {
    path: 'contact',
    loadComponent: () =>
      import('./components/pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },

  {
    path: 'blog',
    loadComponent: () =>
      import('./components/pages/blog/blog.component').then(
        (m) => m.BlogComponent,
      ),
  },
];
