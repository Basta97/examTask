import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/auth/auth.router').then(m => m.routes)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
