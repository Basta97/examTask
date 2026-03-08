import { Routes } from '@angular/router';
import { Auth } from './auth';

export const routes: Routes = [
    {
        path: '',
        component: Auth,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login').then(m => m.Login)
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/register/register').then(m => m.Register)
            },
            {
                path: 'verify',
                loadComponent: () => import('./pages/verify/verify').then(m => m.Verify)
            },
            {
                path: 'create',
                loadComponent: () => import('./pages/createpassword/createpassword').then(m => m.Createpassword)
            },
            {
                path: 'forget',
                loadComponent: () => import('./pages/forgetpassword/forgetpassword').then(m => m.Forgetpassword)
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    }
];
