import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/clients', pathMatch: 'full' },
    {
        path: 'clients',
        loadComponent: () =>
            import('./clients/clients.component').then((m) => m.ClientsComponent),
    },
    {
        path: 'client/:id',
        loadComponent: () =>
            import('./client/client.component').then((m) => m.ClientComponent),
    },
]