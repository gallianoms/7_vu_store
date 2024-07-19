import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { AboutComponent } from './shared/pages/about/about.component';
import { ErrorComponent } from './shared/pages/error/error.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(
        m => m.AuthModule,
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/product/product.module').then(
        m => m.ProductModule,
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/user/user.module').then(
        m => m.UserModule,
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
