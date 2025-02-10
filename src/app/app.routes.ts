import { Routes } from '@angular/router';
import {PublicPageComponent} from './public-page/public-page.component';
import {RestrictedPageComponent} from './restricted-page/restricted-page.component';
import {maslGuard} from './masl.guard';

export const routes: Routes = [
  { path: 'public-page', component: PublicPageComponent },
  { path: 'restricted-page', component: RestrictedPageComponent, canActivate: [maslGuard] },
  { path: '**', component: PublicPageComponent },
];
