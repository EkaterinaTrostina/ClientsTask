import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [
    {
        path: ':id',
        pathMatch: 'full',
        component: ClientComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/clients',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoutingModule {}
