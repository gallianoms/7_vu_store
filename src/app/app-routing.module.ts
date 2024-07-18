import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { AboutComponent } from './shared/pages/about/about.component';
import { ErrorComponent } from './shared/pages/error/error.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { UserListComponent } from './features/user/pages/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-routing.module').then(
        m => m.AuthRoutingModule,
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/product/product-routing.module').then(
        m => m.ProductRoutingModule,
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/user/user-routing.module').then(
        m => m.UserRoutingModule,
      ),
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
